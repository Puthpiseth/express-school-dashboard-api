# express-school-dashboard-api

![Alt text](./MPDDashboard.png?raw=true "MPD dashboard")

## Installation

express-school-dashboard-api requires [Node.js](https://nodejs.org/) v14+ and mysql database to run.

Install the dependencies :
```sh
npm i
```

Create a .env inside the root project folder (see .env.example) :
```sh
touch .env
```

Create the mysql database :
```sh
> mysql -u root -p
$mysql> CREATE DATABASE dashboard
```

Run the project (database schema and relations will be automatically created) :
```sh
npm start
```

