const categoriesTable = require('../config/db').categoriesTable;

module.exports = {
  getCategories: async (user_id) => {
    console.log(user_id);
    const result = await categoriesTable.findAll({
      where: user_id
    });
    return result;
  },
  addCategories: async (categories) => {
    const result = await categoriesTable.bulkCreate(
      categories
    );
    return result;
  }
}
