import pymongo
from bson import ObjectId
import dns
import os
from dotenv import load_dotenv


class Model(dict):
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self._id:
            self.collection.insert(self)
        else:
            self.collection.update(
                {"_id": ObjectId(self._id)}, self)
        self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result:
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp


class User(Model):
    load_dotenv()  # take environment variables from .env.
    MONGODB_URI = os.environ['MONGODB_URI']
    db_client = pymongo.MongoClient(MONGODB_URI)

    # db name is 'users' and collection name is 'users_list'
    collection = db_client["users"]["users_list"]

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    def find_by_name(self, name):
        users = list(self.collection.find({"name": name}))
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    def find_by_id(self, id):
        users = list(self.collection.find({"_id": ObjectId(id)}))
        for user in users:
            user["_id"] = str(user["_id"])
        return user["lists"]

    def find_by_username(self, username):
        users = list(self.collection.find({"username": username}))
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    def add_list(self, username, listname, public):
        query = {"username": username}
        update = {
            "$push": {
                "lists": {
                    "name": listname,
                    "public": public,
                    "completed": False,
                    "tasks": []
                }
            }
        }

        list(self.collection.update(query, update, False))

        return listname

    def update_list_public(self, username, listname, public):
        query = {
            "username": username,
            "lists.name": listname
        }
        update = {
            "$set": {
                "lists.$.public": public
            }
        }

        list(self.collection.update(query, update, False))

        return public

    def update_list_completed(self, username, listname, completed):
        query = {
            "username": username,
            "lists.name": listname
        }
        update = {
            "$set": {
                "lists.$.completed": completed
            }
        }

        list(self.collection.update(query, update, False))

        return completed

    def remove_list(self, username, listname):
        query = {
            "username": username,
        }

        update = {
            "$pull": {
                "lists": {
                    "name": listname
                }
            }
        }

        list(self.collection.update(query, update, False))

        return listname

    def add_task(self, username, listname, title, date, description, priority):
        query = {
            "username": username,
            "lists.name": listname
        }
        update = {
            "$push": {
                "lists.$.tasks": {
                    "title": title,
                    "date": date,
                    "completed": False,
                    "description": description,
                    "priority": priority
                }
            }
        }

        list(self.collection.update(query, update, False))

        return title

    def complete_task(self, username, listname, task_num, completed):
        query = {
            "username": username,
            "lists.name": listname,
        }
        update = {
            "$set": {
                "lists.$.tasks.{0}.completed".format(task_num): completed
            }
        }

        list(self.collection.update(query, update, False))

        return {"task": task_num, "completed": completed}

    def remove_task(self, username, listname, task_num):
        query = {
            "username": username,
            "lists.name": listname,
        }
        update = {
            "$unset": {
                "lists.$.tasks.{0}".format(task_num): 1
            }
        }

        list(self.collection.update(query, update, False))

        update = {
            "$pull": {
                "lists.$.tasks": None
            }
        }

        list(self.collection.update(query, update, False))

        return task_num

    def add_friend(self, username, friend):

        query = {
            "username": username,
        }
        update = {
            "$push": {
                "friends": friend
            }
        }

        list(self.collection.update(query, update, False))

        return friend
