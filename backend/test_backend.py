from backend import ret_list
import pytest
from flask.globals import request

from flask import Flask
import requests
from flask import jsonify
import json

## GET TESTS ##

def test_get_hello():
    resp = requests.get('https://todoloo307.herokuapp.com')
    if (resp):
        r = resp.json()
        assert (r == 'Hello, World!')
    else:
        pytest.fail("Request failed: ", resp.status_code)

def test_get_home():
    resp = requests.get('https://todoloo307.herokuapp.com/{0}/home'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0]['username'] == 'hreese')
    else:
        pytest.fail("Request failed: ", resp.status_code)

def test_get_lists():
    resp = requests.get('https://todoloo307.herokuapp.com/{0}/lists'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0]['name'] == 'School')
    else:
        pytest.fail("Request failed: ", resp.status_code)

def test_get_friends():
    resp = requests.get('https://todoloo307.herokuapp.com/{0}/friends'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0][0]['username'] == 'bob24')
    else:
        pytest.fail("Request failed: ", resp.status_code)

def test_get_task():
    resp = requests.get('https://todoloo307.herokuapp.com/{0}/lists/{1}'.format('hreese', 'School'))
    if (resp):
        r = resp.json()
        assert (r[0]['title'] == 'Math Homework')
    else:
        pytest.fail("Request failed: ", resp.status_code)

# TODO: michael todo
def test_get_admin_stats():
    resp = requests.get('https://todoloo307.herokuapp.com/admin')
    if (resp):
        r = resp.json()
        assert (len(r) != 0)
    else:
        pytest.fail("Request failed")    

## POST TESTS ##

def test_create_user():
    user = {
        "username": "testMcTesterson",
        "password": "test123",
        "name": "Test"
    }

    resp = requests.post('https://todoloo307.herokuapp.com/api/users', json=user)
    if (resp):
        r = resp.json()
        assert (r['username'] == 'testMcTesterson')
    else:
        pytest.fail("Request failed: ", resp.status_code)

def test_login(): 
    user = {
        "username": "testMcTesterson",
        "password": "test123",
    }

    resp = requests.post('https://todoloo307.herokuapp.com/', json=user)
    if (resp):
        r = resp.json()
        assert ((r['username'] == 'testMcTesterson') and (resp.status_code == 200))
    else:
        pytest.fail("Request failed: ", resp.status_code)

def test_add_list():
    new_list = {
        "listname": "test_list"
    }

    resp = requests.post('https://todoloo307.herokuapp.com/testMcTesterson/lists', json=new_list)
    if (resp):
        r = resp.json()
        assert ((r['name'] == 'test_list'))
    else:
        pytest.fail("Request failed: ", resp.status_code)

def test_add_task():
    task = {
        "task_num": 0,
        "title": "tester",
        "date": "11-11-2021",
        "description": "N/A",
        "priority": 3
    }
   
    resp = requests.post('https://todoloo307.herokuapp.com/testMcTesterson/lists/test_list', json=task)
    if (resp):
        r = resp.json()
        print(r)
        assert ((r['title'] == 'tester') and (resp.status_code == 200))
    else:
        pytest.fail("Request failed: ", resp.status_code)

## HELPER TESTS ##

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

## TEARDOWN ##

# @pytest.fixture(scope="session", autouse=True)
# def cleanup():
