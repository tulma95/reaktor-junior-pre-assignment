# Status file parser

Application parses status file found at '/var/lib/dpkg/status' and makes HTML interface to inspect packages which are served from backend through rest API

Frontend is made with React and backend is made with node.js

## Links

[Heroku](https://package-viewer-pro.herokuapp.com/)

## How to install and run

Clone repository to your computer and move to it

```
git clone https://github.com/tulma95/reaktor-junior-pre-assignment
cd reaktor-junior-pre-assignment
```

Install dependencies and create frontend build

```
npm run build
```

Run application
```
npm start
```

Open your browser and go to localhost:3003

## .env configuration
By default application runs in port 3003 but you can change it by making .env file to the project root with line 
```
PORT=*your port*
```

