import pytest
from flask.globals import request

from flask import Flask
import requests
from flask import jsonify
import json

from mongodb import User, Model

## GET TESTS ##

def test_get_hello():
    resp = requests.get('https://todoloo307server.herokuapp.com/')
    if (resp):
        r = resp.json()
        assert (r == 'Hello, World!')
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_home():
    resp = requests.get('https://todoloo307server.herokuapp.com/{0}/home'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0]['username'] == 'hreese')
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_home_fail():
    resp = requests.get('https://todoloo307server.herokuapp.com/{0}/home'.format("tim"))
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_lists():
    resp = requests.get('https://todoloo307server.herokuapp.com/{0}/lists'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0]['name'] == 'School')
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_lists_fail():
    resp = requests.get('https://todoloo307server.herokuapp.com/{0}/lists'.format('asdf'))
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_friends():
    resp = requests.get('https://todoloo307server.herokuapp.com/{0}/friends'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0][0]['username'] == 'bob24')
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_friends_fail():
    resp = requests.get('https://todoloo307server.herokuapp.com/{0}/friends'.format('askjdf'))
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_task():
    resp = requests.get('https://todoloo307server.herokuapp.com/{0}/lists/{1}'.format('hreese', 'School'))
    if (resp):
        r = resp.json()
        assert (r[0]['title'] == 'Math Homework')
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_task_fail1():
    resp = requests.get('https://todoloo307server.herokuapp.com/{0}/lists/{1}'.format("asdfa", 'School'))
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_task_fail2():
    resp = requests.get('https://todoloo307server.herokuapp.com/{0}/lists/{1}'.format('hreese', 'asdgasdg'))
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_get_admin_stats():
    resp = requests.get('https://todoloo307server.herokuapp.com/admin')
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

    resp = requests.post('https://todoloo307server.herokuapp.com/api/users', json=user)
    if (resp):
        r = resp.json()
        assert (r['username'] == 'testMcTesterson')
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_create_user_fail1():
    user = {
        "password": "test123",
        "name": "Test"
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/api/users', json=user)
    if (resp.status_code):
        assert (resp.status_code == 418)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_create_user_fail2():
    user = {
        "username": "",
        "password": "test123",
        "name": "Test"
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/api/users', json=user)
    if (resp.status_code):
        assert (resp.status_code == 418)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_login():
    user = {
        "username": "testMcTesterson",
        "password": "test123"
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/', json=user)
    if (resp):
        r = resp.json()
        assert ((r['username'] == 'testMcTesterson') and (resp.status_code == 200))
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_login_fail1():
    user = {
        "username": "testMcTesterson",
        "password": ""
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/', json=user)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_login_fail2():
    user = {
        "username": "testMcTesterson",
        "password": "test"
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/', json=user)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_add_list():
    new_list = {
        "listname": "test_list"
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/testMcTesterson/lists', json=new_list)
    if (resp):
        r = resp.json()
        assert ((r[-1]['name'] == 'test_list'))
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_add_list_fail():
    new_list = {
        "timmy": "test_list"
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/testMcTesterson/lists', json=new_list)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_add_task():
    task = {
        "title": "tester",
        "date": "11-11-2021",
        "description": "N/A",
        "priority": 3
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/testMcTesterson/lists/test_list', json=task)
    if (resp):
        r = resp.json()
        assert ((r[0]['tasks'][-1]['title'] == 'tester') and (resp.status_code == 201))
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_add_task_fail():
    task = {
        "title": "tester",
        "date": "11-11-2021",
        "description": "N/A"
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/testMcTesterson/lists/test_list', json=task)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_add_friend():
    friend = {
        "friend_username": "hreese"
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/testMcTesterson/friends', json=friend)
    if (resp):
        r = resp.json()
        assert ((r[0][-1]['username'] == 'hreese') and (resp.status_code == 200))
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_add_friend_fail():
    friend = {
        "not_a_teapot": "hreese"
    }

    resp = requests.post('https://todoloo307server.herokuapp.com/testMcTesterson/friends', json=friend)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)

## PATCH TESTS ##

def test_update_list():
    update = {
        "listname": "test_list",
        "public": True
    }

    resp = requests.patch('https://todoloo307server.herokuapp.com/testMcTesterson/lists', json=update)
    if (resp):
        r = resp.json()
        assert ((r[0]['public'] == True) and (resp.status_code == 200))
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_update_list_fail1():
    update = {
        "listname": "test_list"
    }

    resp = requests.patch('https://todoloo307server.herokuapp.com/testMcTesterson/lists', json=update)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_update_list_fail2():
    update = {
        "temp": "test_list"
    }

    resp = requests.patch('https://todoloo307server.herokuapp.com/testMcTesterson/lists', json=update)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_complete_task():
    update = {
        "task_num": 0,
        "completed": True
    }

    resp = requests.patch('https://todoloo307server.herokuapp.com/testMcTesterson/lists/test_list', json=update)
    if (resp):
        r = resp.json()
        assert ((r[0]['tasks'][0]['completed'] == True) and (resp.status_code == 201))
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_complete_task_fail():
    update = {
        "temp": 0,
        "completed": True
    }

    resp = requests.patch('https://todoloo307server.herokuapp.com/testMcTesterson/lists/test_list', json=update)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_complete_list():
    update = {
        "listname": "test_list",
        "completed": True
    }

    resp = requests.patch('https://todoloo307server.herokuapp.com/testMcTesterson/lists', json=update)
    if (resp):
        r = resp.json()
        assert ((r[0]['completed'] == True) and (resp.status_code == 200))
    else:
        pytest.fail("Request failed: ", resp.status_code)


## DELETE TESTS ##

def test_delete_task():
    task = {
        "task_num": 0
    }

    resp = requests.delete('https://todoloo307server.herokuapp.com/testMcTesterson/lists/test_list', json=task)
    if (resp):
        r = resp.json()
        try:
            t = r[0]['tasks'][0]
        except:
            assert(resp.status_code == 200)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_delete_task_fail():
    task = {
        "temp": 0
    }

    resp = requests.delete('https://todoloo307server.herokuapp.com/testMcTesterson/lists/test_list', json=task)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_delete_list():
    lst = {
        "listname": "test_list"
    }

    resp = requests.delete('https://todoloo307server.herokuapp.com/testMcTesterson/lists', json=lst)
    if (resp):
        r = resp.json()
        assert ((r == []) and (resp.status_code == 200))
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_delete_list_fail1():
    lst = {
        "fail": "test_list"
    }

    resp = requests.delete('https://todoloo307server.herokuapp.com/testMcTesterson/lists', json=lst)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)


def test_delete_list_fail2():
    lst = {
        "listname": ""
    }

    resp = requests.delete('https://todoloo307server.herokuapp.com/testMcTesterson/lists', json=lst)
    if (resp.status_code):
        assert (resp.status_code == 400)
    else:
        pytest.fail("Request failed: ", resp.status_code)

## TEARDOWN ##

# "testMcTesterson" must be deleted from database at end of tests
