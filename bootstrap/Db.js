const { Client } = require('pg')
const {dbUser, dbHost, dbName, dbPassword, dbPort} = require('../config/app')
module.exports = class Db {
    constructor() {
      this.client = new Client({
        user: dbUser,
        host: dbHost,
        database: dbName,
        password: dbPassword,
        port: dbPort,
      });
      this.client.connect()
    }
}
