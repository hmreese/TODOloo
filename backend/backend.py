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

# users = {
#     'users_list': [
#         {
#             "name": "Hannah",
#             "username": "hreese",
#             "password": "123",
#             "lists": {
#                 "School":{
#                     "tasks": [
#                         {
#                             "task_num": 0,
#                             "title": "DIE",
#                             "date": "10-22-21",
#                             "description": "it is important",
#                             "priority": HIGH,
#                             "completed": False
#                         },
#                         {
#                             "task_num" : 1,
#                             "title": "Work",
#                             "date": "10-23-21",
#                             "description": "it is important",
#                             "priority": MED,
#                             "completed": False
#                         }
#                     ]
#                 }
#             }
#         }
#     ]
# }

# home returns whole user json
@app.route('/<username>/home')
def get_home(username):
    user = User().find_by_username(username)
    return jsonify(user), 200


# lists returns user's lists
@app.route('/<username>/<listID>', methods=['POST', 'DELETE'])
def get_lists(username, listID):
    if request.method == 'POST':
        try:
            taskIndex = request.get_json()['taskIndex']
        except:
            return jsonify({}), 400
        if taskIndex is None:
            return jsonify({}), 400


        # if task index exsits in list
        # ie return a task and if not null:
        #   add new task
        # else:
        #   update cur task
        return jsonify({}), 200

    if request.method == 'DELETE':
        try:
            taskIndex = request.get_json()['taskIndex']
        except:
            return jsonify({}), 400
        if taskIndex is None:
            return jsonify({}), 400

        #hanna func
        # ret = User().remove_task(username, listID)
        return jsonify({}), 200

# lists returns user's lists
@app.route('/<username>/lists', methods=['GET', 'POST', 'DELETE'])
def get_lists(username):
    if request.method == 'GET':
        user = User().find_by_username(username)
        lists = user[0]["lists"]
        return jsonify(lists), 200

    elif request.method == 'POST':
        try:
            listname = request.get_json()['listname']
        except:
            return jsonify({}), 400
        l = {'name': listname, 'tasks': []}
        ret = User().add_list(username, listname)
        return jsonify(ret)

    if request.method == 'DELETE':
        try:
            listname = request.get_json()['listname']
        except:
            return jsonify({}), 400
        if username is None or listname is None:
            return jsonify({}), 400
        #hanna func
        # ret = User().remove_list(username, listname)
        return jsonify(ret), 200


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
        print(hashedPas.hexdigest())
        user = {'username': username, 'password': str(hashedPas.hexdigest()), 'name': name, 'lists': [], 'friends': []}

        # TODO add user data to database
        newUser = User(user)
        newUser.save()
        resp = jsonify({"username": username}), 201

        return resp

        # if unsuccessful
        # return jsonify({"username":username}),400

        # return jsonify({"username": username}), 201