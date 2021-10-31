from flask import Flask
from flask import request
from flask import jsonify
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


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/<id>/home')
def get_home(id):
    user = User().find_by_id(id)
    return jsonify(user), 200
