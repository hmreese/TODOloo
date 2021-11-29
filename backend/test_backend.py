from backend import ret_list
import pytest
from flask.globals import request

from flask import Flask
import requests
from flask import jsonify
import json

## GET Tests ##

def test_get_hello():
    resp = requests.get('https://todoloo307.herokuapp.com')
    if (resp):
        r = resp.json()
        assert (r == 'Hello, World!')
    else:
        pytest.fail("Request failed")

def test_get_home():
    resp = requests.get('https://todoloo307.herokuapp.com/{0}/home'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0]['username'] == 'hreese')
    else:
        pytest.fail("Request failed")

def test_get_lists():
    resp = requests.get('https://todoloo307.herokuapp.com/{0}/lists'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0]['name'] == 'School')
    else:
        pytest.fail("Request failed")

def test_get_friends():
    resp = requests.get('https://todoloo307.herokuapp.com/{0}/friends'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0][0]['username'] == 'bob24')
    else:
        pytest.fail("Request failed")

def test_get_task():
    resp = requests.get('https://todoloo307.herokuapp.com/{0}/lists/{1}'.format('hreese', 'School'))
    if (resp):
        r = resp.json()
        assert (r[0]['title'] == 'Math Homework')
    else:
        pytest.fail("Request failed")

# TODO: michael todo
# def test_get_admin_stats():
#     resp = requests.get('https://todoloo307.herokuapp.com/admin')
#     if (resp):
#         r = resp.json()
#         # assert something
#     else:
#         pytest.fail("Request failed")    

## HELPER FUNCTIONS ##

def test_ret_list():
    username = 'hreese'
    listname = 'tester'

    expected = {
        "completed": False,
        "name": "tester",
        "public": False,
        "tasks": []
    }

    ret = ret_list(username, listname)
    print(ret)

    assert(ret == expected)