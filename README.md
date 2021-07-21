## Setup
```shell
npm install
```

## How to launch ?
```shell
npm run serve
```

## How to add new routes ?
In the api directory you'll have public and private routes. Public routes do no require a jwt token and you need to be authentified to access private route.
Add a new file in your desired directory, the name of the file will be the routes name.

E.g: 'users.js' -> '/api/users' (or '/users' if in public)

## How to log ?
In your class's constructor add `logger: Logger`. The main logger is declared in the index file and passed upon the children, so you'll have to check your hierarchy.
There's 4 different typs of logs: error, info, debug and warning

E.g: `logger.Error('test')`

### How to add file support to the logger ?
In /utils/logger.ts add `new transports.File({ filename: 'somefile.log' })` to transport.
