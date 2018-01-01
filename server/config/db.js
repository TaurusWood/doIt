const Sequelize = require('sequelize');
const CONFIG = require('./config').CONFIG;

const userModel = '../schema/user.js';
const categoriesModel = '../schema/categories.js';

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
    },
    timezone: CONFIG.TIMEZONE
  }
)


// const doitDB = db.doit;
const user = doit.import(userModel);
const categories = doit.import(categoriesModel);

user.hasMany(categories, { as: 'category', foreignKey: 'user_id', targetKey: 'cat_id' });
// doit.sync({force: true}).then(res => console.log('模型同步成功'))

module.exports = {
  userTable: user,
  categoriesTable: categories
}
