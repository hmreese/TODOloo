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


# @app.route('/')
# def hello_world():
#     return 'Hello, World!'


@app.route('/', methods=['POST'])
def login():
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

        # TODO check database for username and pass
        # if pass != databasePass:
        # return jsonify({"username":username}),400

        # return the object key for user
        return jsonify({"username": username}), 200


@app.route('/api/users', methods=['POST'])
def create_user():
    # name
    # username
    # password
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

        # TODO add user data to database
        # if unsuccessful
        # return jsonify({"username":username}),400

        return jsonify({"username": username}), 201

@app.route('/<id>/home')
def get_home(id):
    user = User().find_by_id(id)
    return jsonify(user), 200
