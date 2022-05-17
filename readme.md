Node assessment

* Steps to run the project
  1. run the command npm install
  2. Run the project using npm run dev

Project structure

### `index.js`
This is main file where the server is being started.

### `app.js`
This is the main file where all the server configuratios are being done.

### `middlewares`
All the middlewares goes into that folder. such that error handling, authentication and authorizatin for routes and request handlers with try catch

### `model`
This folder contains the model of rulesets, cashback, and transactions. 

### `routes`
In this folder, all the routes are being created with their respective requirements.
for now it contains 
 1. cashback router
 2. ruleset router
 3. transaction router
 4. index.js (where all the routes are being intialized with their respective base path)

### `start`
In this folder, the startup configuration for routes is being done. like initializing all the routes, adding some middlewares, intiailizing the db etc

### `test`
This folder contains all the unit tests being defined for testing the app features etc.

### `utils`
This folder contains all the Utility functions which are required in the app

The app flow for some route is 
  1. -> index.js
  2. -> app.js
  3. -> start/routes 
  4. -> and then their respective router with path defined