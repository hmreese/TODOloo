import pytest
from flask.globals import request

from flask import Flask
import requests
from flask import jsonify
import json

def test_get_user():
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
    resp = requests.get('https://todoloo307.herokuapp.com/{0}friends'.format('hreese'))
    if (resp):
        r = resp.json()
        assert (r[0] == 'bob24')
    else:
        pytest.fail("Request failed")