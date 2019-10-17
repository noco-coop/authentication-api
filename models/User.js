const Sequelize = require('sequelize');
const { dialect } = require('../config');
const sequelize = require(`../connections/${dialect}`);
const Model = Sequelize.Model;
class User extends Model {}
User.init({
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull defaults to true
  },
  code: {
    type: Sequelize.INTEGER
  },
  expires: {
    type: Sequelize.DATE
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'user'
  // options
});

module.exports = User;
