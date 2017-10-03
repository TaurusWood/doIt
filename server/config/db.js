const Sequelize = require('sequelize');
const CONFIG = require('./config');

const doit = new Sequelize(
  CONFIG.DATABASE,
  CONFIG.USERNAME,
  CONFIG.PASSWORD,
  {
    host: CONFIG.HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
)
