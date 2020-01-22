# MERN CRUD bare minimum initialization

## Development
```diff
+ Modules installation
npm i -D nodemon concurrently
```
---
## Server - Backend
```diff
+ Modules installation
//old
npm i express bcryptjs jsonwebtoken config express-validator mongoose

// base
npm i express dotenv mongoose

//auth
npm i mongoose-findorcreate express-validator express-session passport passport-local passport-local-mongoose passport-facebook passport-google-oauth20

+ package.json setup
"scripts": {
  "start": "node server.js",
  "server": "nodemon server.js",
  "client": "npm start --prefix client",
  "clientinstall": "npm i --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
}
```
---
## Client - Frontend
```diff
+ Modules installation
npx create-react-app client && cd client
npm i axios react-router-dom

+ package.json setup
"proxy": "http://localhost:5000"
```
---