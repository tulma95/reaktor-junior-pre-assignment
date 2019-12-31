# Status file parser

Application parses status file found at '/var/lib/dpkg/status' and makes HTML interface to inspect packages. If the application can't find that file it uses statusMock.txt instead.

Frontend is made with React and backend is made with node.js

## Links

[Heroku](https://limitless-wave-90268.herokuapp.com/)

## How to install and run

Clone repository to your computer

```
git clone https://github.com/tulma95/reaktor-junior-pre-assignment
```

Install dependencies and create frontend build

```
cd reaktor-junior-pre-assignment
npm run build
```

Run application
```
npm start
```

Open your browser and go to localhost:3003

## .env Configuration
By default application runs in port 3003 but you can change it by making .env file with line 
```
PORT=*your port*
```

## Tests
Backend tests are made with jest to prevent regression in file parsing. 

Tests can be ran with command
```
npm test
```
