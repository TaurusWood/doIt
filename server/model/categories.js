const userTable = require('../config/db').userTable;
const categoriesTable = require('../config/db').categoriesTable;
const generateUUID = require('../config/uuid');

module.exports = {
  hasCategories: async (user_id) => {
    const result = await categoriesTable.findAll({
      where: { user_id },
      limit: 1
    })
    return result.length ? true : false;
  },
  getCategories: async (user_id) => {
    const result = await categoriesTable.findAll({
      where: { user_id }
    });
    return result;
  },
  addCategories: async (categories, user_id) => {
    const result = [];
    const user = await userTable.findOne({
      where: { uid: user_id }
    })
    for (let i = 0; i < categories.length; i++) {
      categories[i].cat_id = generateUUID(8, 10);
      const category = await user.createCategory(categories[i]);
      const newCategory = category.get({ plain: true });
      category && result.push(newCategory);
    }
    return categories.length === 1 ? result[0] : result;
  },
  delCategories: async (cai_id) => {
    await categoriesTable.destroy({
      where: cai_id
    })
    return true;
  }
}
