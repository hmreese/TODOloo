from flask import Flask
from flask import request
from flask import jsonify
import hashlib
import json
# for linking frontend-backend
from flask_cors import CORS

# for random ids
# import random
# import string

# for mongo db
from model_mongodb import User


app = Flask(__name__)
# CORS stands for Cross Origin Requests.
# Here we'll allow requests coming from any domain. Not recommended for production environment.
CORS(app)

users = {
    'users_list': []
}


@app.route('/', methods=['POST'])
def login():
    if request.method == 'POST':
        ret = request.get_json()

        try:
            username = ret["username"]
            password = ret["password"]
        except:
            return jsonify({}), 400

        if password == None or username == None:
            return jsonify({}), 400
        hashedPas = hashlib.sha256(password.encode())

        #TODO check database for username and pass
        # if pass != databasePass:
        # return jsonify({"username":username}),400


        #return the object key for user
        return jsonify({"username":username}),200


@app.route('/api/users', methods=['POST'])
def create_user():
    #name
    #username
    #passowrd
    if request.method == 'POST':
        ret = request.get_json()

        try:
            username = ret["username"]
            password = ret["password"]
            name = ret["name"]
        except:
            return jsonify({}), 418

        if password == None or username == None:
            return jsonify({}), 418

        hashedPas = hashlib.sha256(password.encode())

        #TODO add user data to database
        # if unsuccessful
        # return jsonify({"username":username}),400

        return jsonify({"username":username}),201


# @app.route('/users', methods=['GET', 'POST'])
# def get_users():
#     if request.method == 'GET':
#         search_username = request.args.get('name')
#         search_job = request.args.get('job')
#         if search_username and search_job:
#             return find_users_by_name_job(search_username, search_job)
#         elif search_username:  # updated for db_access
#             users = User().find_by_name(search_username)
#         elif search_job:
#             return find_users_by_job(search_job)
#         else:  # updated for db_access
#             users = User().find_all()
#         return {"users_list": users}
#     elif request.method == 'POST':
#         userToAdd = request.get_json()
#         # userToAdd['id'] = gen_random_id() # check for duplicate before appending.. todo
#         # users['users_list'].append(userToAdd)
#         # updated for db_access
#         # make DB request to add user
#         newUser = User(userToAdd)
#         newUser.save()
#         resp = jsonify(newUser), 201
#         return resp


# @app.route('/users/<id>', methods=['GET', 'DELETE'])
# def get_user(id):
#     if request.method == 'GET':
#        # update for db access
#         user = User({"_id": id})
#         if user.reload():
#             return user
#         else:
#             return jsonify({"error": "User not found"}), 404
#     elif request.method == 'DELETE':
#        # update for db access
#         user = User({"_id": id})
#         if user.remove():
#             resp = jsonify({}), 204
#             return user
#         else:
#             return jsonify({"error": "User not found"}), 404


# def find_users_by_name_job(name, job):
#     subdict = {'users_list': []}
#     for user in users['users_list']:
#         if user['name'] == name and user['job'] == job:
#             subdict['users_list'].append(user)
#     return subdict


# def find_users_by_job(job):
#     subdict = {'users_list': []}
#     for user in users['users_list']:
#         if user['job'] == job:
#             subdict['users_list'].append(user)
#     return subdict
