import pymongo
from bson import ObjectId
import dns
import os
from dotenv import load_dotenv


class Model(dict):
    """
    A simple model that wraps mongodb document
    """
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
    # to use a .env file, create .env and include a statmement
    # MONGODB_URI='mongodb+srv://<atlas-user>:<password>@cluster0.6f9re.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority'
    # with <atlas-user>, <password> and <myFirstDatabase> updated accordingly
    # make sure .env is in .gitignore so that your password isn't relased into the wild

    load_dotenv()  # take environment variables from .env.
    MONGODB_URI = os.environ['MONGODB_URI']
    db_client = pymongo.MongoClient(MONGODB_URI)

    # db_client = pymongo.MongoClient('localhost', 27017)
    # change if your db is in another host and port
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

    def add_list(self, username, listname):
        query = {"username": username}
        update = {
            "$push": {
                "lists": {
                    "name": listname,
                    "public": False,
                    "completed": False,
                    "tasks": []
                }
            }
        }

        list(self.collection.update(query, update, False))

        return listname

### HANNAH LOGIC please fix me I am broken
    def remove_list(self, username, listname):
        query = {"username": username}
        update = {
            "$push": {
                "lists": {
                    "name": listname,
                    "public": False,
                    "tasks": []
                }
            }
        }
        options = {"upsert": False}

        ret = list(self.collection.update(query, update, options))

        return ret
