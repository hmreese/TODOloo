from flask import Flask
from flask import request
from flask import jsonify
import hashlib
import json
from flask_cors import CORS
from mongodb import User


app = Flask(__name__)
CORS(app)

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


# home returns whole user json
@app.route('/<username>/home')
def get_home(username):
    user = User().find_by_username(username)  
    return jsonify(user), 200


# lists returns user's lists
@app.route('/<username>/lists')
def get_lists(username):
    user = User().find_by_username(username)
    lists = user[0]["lists"] 
    return jsonify(lists), 200


# friends returns user's friends
@app.route('/<username>/friends')
def get_friends(username):
    user = User().find_by_username(username)
    lists = user[0]["friends"] 
    return jsonify(lists), 200


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

#       userToAdd = request.get_json()
#       newUser = User(userToAdd)
#       newUser.save()
#       resp = jsonify(newUser), 201
#       return resp

# TODO: create user in database
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
        newUser = User(ret)
        newUser.save()
        resp = jsonify({"username": username}), 201
        return resp
        
        # if unsuccessful
        # return jsonify({"username":username}),400

        # return jsonify({"username": username}), 201