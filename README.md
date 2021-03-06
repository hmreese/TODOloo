# Project Description
For college students who are disorganized, the “TODOloo” is a to-do list application that makes organizing and completing daily tasks fun. Unlike traditional to-do lists or notes apps, our product produces the maximum amount of dopamine possible for completing tasks.

Join now! https://todoloo307.herokuapp.com/

# UI Prototype
https://www.figma.com/file/74NjrMQzElmnqmF5CAaNzJ/TODOloo-app?node-id=6%3A2
Last Updated: 10/20/21

# Development Environment Setup
Clone the repo

## Frontend - React
1. npm install
2. npm start

## Backend - Flask
1. cd backend
2. Start your virtual environment
3. set FLASK_APP=backend.py
4. set FLASK_ENV=development
5. flask run

## MongoDB Atlas
1. Obtain database access credentials from @hmreese
2. Add a .env file to your backend directory with the following line:
   --> MONGODB_URI = "mongodb+srv://<user>:<password>@cluster0.qcncr.mongodb.net/Cluster0?retryWrites=true&w=majority"

NOTE: make sure that ".env" is listed in your gitignore file to ensure passwords are kept private.

# Continuous Integration
https://github.com/hmreese/TODOloo/actions

## Wiki
https://github.com/hmreese/TODOloo/wiki

## Pretty code addons/linters

instructions on how to set up IDE plugins can be found on site

python - https://pypi.org/project/pycodestyle/
JavaScript/React - https://create-react-app.dev/docs/setting-up-your-editor
 
## Testing Coverage
  
   ![image](https://user-images.githubusercontent.com/56707357/144517732-5c7a4489-f7e9-431e-9767-977da8b4fc41.png)
