from flask import Flask
from flask import request
from flask import jsonify
import hashlib
import json
from flask_cors import CORS
from mongodb import User


app = Flask(__name__)
CORS(app)

@app.route('/<username>/home')
def get_home(username):
    user = User().find_by_username(username)
    if user is None:
        return jsonify("User does not exist"), 400

    user[0]["password"] = "nope"
    return jsonify(user), 200


@app.route('/<username>/lists/<listname>', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def get_task(username, listname):
    if request.method == 'GET':
        user = User().find_by_username(username)
        if user is None:
            return jsonify("User does not exist"), 400

        lists = user[0]["lists"]

        for l in lists:
            if l["name"] == listname:
                return jsonify(l["tasks"]), 200

        return jsonify({}), 400

    if request.method == 'POST':
        try:
            title = request.get_json()['title']
            date = request.get_json()['date']
            description = request.get_json()['description']
            priority = request.get_json()['priority']
        except:
            return jsonify({}), 400

        ret = User().add_task(username, listname, title, date, description, priority)
        user = User().find_by_username(username)
        lists = user[0]["lists"]
        return jsonify(lists), 201
        # ret = User().add_task(username, listname, title, date, description, priority)
        # return jsonify(ret_task(username, listname, -1)), 201

    if request.method == 'PATCH':
        try:
            completed = request.get_json()['completed']
            task_num = request.get_json()['task_num']
        except:
            return jsonify({}), 400

        ret = User().complete_task(username, listname, task_num, completed)
        user = User().find_by_username(username)
        lists = user[0]["lists"]
        return jsonify(lists), 201
        # return jsonify(ret_task(username, listname, task_num)), 201

    if request.method == 'DELETE':
        try:
            task_num = request.get_json()['task_num']
        except:
            return jsonify({}), 400

        ret = User().remove_task(username, listname, task_num)
        user = User().find_by_username(username)
        lists = user[0]["lists"]
        return jsonify(lists), 200
        # return jsonify({"task_deleted": task_num}), 200


@app.route('/<username>/lists', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def get_lists(username):
    user = User().find_by_username(username)
    if user is None:
        return jsonify("User does not exist"), 400

    lists = user[0]["lists"]

    if request.method == 'GET':
        return jsonify(lists), 200

    elif request.method == 'POST':
        try:
            listname = request.get_json()['listname']
        except:
            return jsonify({}), 400
        try:
            public = request.get_json()['public']
        except:
            public = False

        for l in lists:
            if l["name"] == listname:
                ret = User().update_list(username, listname, public)
                return jsonify(lists)

        ret = User().add_list(username, listname, public)
        user = User().find_by_username(username)
        lists = user[0]["lists"]
        return jsonify(lists), 201
        # ret = User().add_list(username, listname, public)
        # return jsonify(ret_list(username, listname)), 201

    elif request.method == 'PATCH':
        try:
            listname = request.get_json()['listname']
        except:
            return jsonify({}), 400
        try:
            public = request.get_json()['public']
            ret = User().update_list_public(username, listname, public)
            return jsonify(ret_list(username, listname)), 200
        except:
            public = None
        try:
            completed = request.get_json()['completed']
            ret = User().update_list_completed(username, listname, completed)
            return jsonify(ret_list(username, listname)), 200
        except:
            completed = None

        return jsonify({"No update information provided: public, completed"}), 400

    elif request.method == 'DELETE':
        try:
            listname = request.get_json()['listname']
        except:
            return jsonify({}), 400
        if username is None or listname is None:
            return jsonify({}), 400

        ret = User().remove_list(username, listname)
        user = User().find_by_username(username)
        lists = user[0]["lists"]
        return jsonify(lists), 200
        # return jsonify({'name': ret}), 200


@app.route('/<username>/friends',  methods=['GET', 'POST'])
def get_friends(username):
    if request.method == 'GET':
        friendList = []
        user = User().find_by_username(username)
        if user is None:
            return jsonify("User does not exist"), 400

        lists = user[0]["friends"]
        for i in lists:
            fren = User().find_by_username(i)
            fren[0]["password"] = "you are not a TeaPot"
            friendList.append(fren)
        return jsonify(friendList), 200

    elif request.method == 'POST':
        try:
            fUsername = request.get_json()['friend_username']
        except:
            return jsonify({}), 400
        ret = User().add_friend(username, fUsername)
        return jsonify({'friend': ret}), 200


@app.route('/', methods=['GET', 'POST'])
def helloWorld():
    if request.method == 'GET':
        return jsonify('Hello, World!'), 200

    elif request.method == 'POST':
        ret = request.get_json()
        try:
            username = ret["username"]
            password = ret["password"]
        except:
            return jsonify({}), 400

        if password is None or username is None:
            return jsonify({}), 400
        hashedPas = hashlib.sha256(password.encode())

        resp = User().find_by_username(username)

        if resp == [] or resp[0]['password'] != hashedPas.hexdigest():
            return jsonify({"username": username}), 400

        return jsonify({"username": username}), 200
        

@app.route('/api/users', methods=['POST'])
def create_user():
    if request.method == 'POST':
        ret = request.get_json()
        print(ret)
        try:
            username = ret["username"]
            password = ret["password"]
            name = ret["name"]
        except:
            print("wrong teapot")
            return jsonify({}), 418

        if password is None or username is None or User().find_by_username(username) is not None:
            return jsonify({}), 418

        hashedPas = hashlib.sha256(password.encode())
        user = {'username': username, 'password': str(hashedPas.hexdigest()), 'name': name, 'lists': [], 'friends': []}
        newUser = User(user)
        print(newUser)
        newUser.save()
        resp = jsonify({"username": username}), 201

        return resp


@app.route('/admin', methods=['GET'])
def admin_stats():
    if request.method == 'GET':
        resp = User().find_all()
        numusers = len(resp)
        count = 0
        for i in resp:
            count += len(i["lists"])

        done = jsonify({"number_of_users": numusers, "number_of_lists": count}), 200
        return done


def ret_list(username, listname):
    user = User().find_by_username(username)
    lists = user[0]["lists"]

    for l in lists:
        if l['name'] == listname:
            return l

    return {}

def ret_task(username, listname, task_num):
    user = User().find_by_username(username)
    lists = user[0]["lists"]

    for l in lists:
        if l['name'] == listname:
            return l['tasks'][task_num]

    return {}

if __name__ == "__main__":
  app.run()