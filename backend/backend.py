from flask import Flask
from flask import request
from flask import jsonify
import hashlib
import json
from flask_cors import CORS
from mongodb import User


app = Flask(__name__)
CORS(app)

users = {
    'users_list': []
}

# HIGH = 3
# MED = 2
# LOW = 1

# home returns whole user json
@app.route('/<username>/home')
def get_home(username):
    user = User().find_by_username(username)
    return jsonify(user), 200


@app.route('/<username>/lists/<listname>', methods=['GET', 'POST', 'DELETE'])
def get_task(username, listname):
    if request.method == 'GET':
        user = User().find_by_username(username)
        lists = user[0]["lists"]
        
        for l in lists:
            if l["name"] == listname:
                return jsonify(l["tasks"]), 200

        return jsonify({}), 400

    if request.method == 'POST':
        try:
            task_num = request.get_json()['task_num']
            title = request.get_json()['title']
            date = request.get_json()['date']
            description = request.get_json()['description']
            priority = request.get_json()['priority']
            completed = request.get_json()['completed']
        except:
            return jsonify({}), 400
        if task_num is None or title is None or date is None or description is None or priority is None or completed is None:
            return jsonify({}), 400

        ret = User().add_task(username, listname, title, date, description, priority, task_num)
        user = User().find_by_username(username)
        lists = user[0]["lists"]
        return jsonify(lists), 201

    # TODO: not yet functional
    if request.method == 'DELETE':
        try:
            task_num = request.get_json()['task_num']
        except:
            return jsonify({}), 400
        if task_num is None:
            return jsonify({}), 400

        #hannah func
        # ret = User().remove_task(username, listID, taskIndex)
        return jsonify({}), 200


# lists returns user's lists
@app.route('/<username>/lists', methods=['GET', 'POST', 'DELETE'])
def get_lists(username):
    user = User().find_by_username(username)
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

    # TODO: not yet functional
    if request.method == 'DELETE':
        try:
            listname = request.get_json()['listname']
        except:
            return jsonify({}), 400
        if username is None or listname is None:
            return jsonify({}), 400
        #hannah func
        # ret = User().remove_list(username, listname)
        return jsonify({}), 200


# friends returns user's friends
@app.route('/<username>/friends')
def get_friends(username):
    user = User().find_by_username(username)
    lists = user[0]["friends"]
    return jsonify(lists), 200


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return 'Hello, World!'

    if request.method == 'POST':
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
            return jsonify({"username":username}),400

        return jsonify({"username": username}), 200


@app.route('/api/users', methods=['POST'])
def create_user():
    if request.method == 'POST':
        ret = request.get_json()
        try:
            username = ret["username"]
            password = ret["password"]
            name = ret["name"]
        except:
            return jsonify({}), 418

        if password is None or username is None:
            return jsonify({}), 418

        hashedPas = hashlib.sha256(password.encode())
        user = {'username': username, 'password': str(hashedPas.hexdigest()), 'name': name, 'lists': [], 'friends': []}
        newUser = User(user)
        print(newUser)
        newUser.save()
        resp = jsonify({"username": username}), 201

        return resp