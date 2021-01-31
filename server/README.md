# Server

## Using Concurrently

#### Concurrently allow us to run backend and frontend in one script

```
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "cd ../client && npm start",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
```

or

```
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix ../client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
```
