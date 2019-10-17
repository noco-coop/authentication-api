const Sequelize = require('sequelize');
const { dialect, database, force_migration, logging } = require('../config');
const { host, port, username, password, db } = database;
console.log('DIALECT', database)

let sequelize = null;

sequelize = new Sequelize(db, username, password, {
  host,
  port,
  dialect: dialect,
  logging: logging.database,
})

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to ${dialect}`);
    sequelize.sync({ force: force_migration });
  })
  .catch(err => {
    console.error('Unable to connect to the database:');
  });


module.exports = sequelize;
