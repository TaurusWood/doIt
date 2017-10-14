const db = require('../config/db');
const doitDB = db.doit;
const userTable = doitDB.import('../schema/user');

module.exports = {
  checkName: async (username) => {
    const result = await userTable.findOne({
      where: {
        username: username
      }
    })
    return result ? false : true;
  },
  signUp: async (data) => {
    await userTable.create({
      username: data.username,
      password: data.password,
      created_at: Date.now(),
      updated_at: Date.now()
    });
    return true;
  },
  signIn: async (userInfo) => {
    const result = await userTable.findOne({
      where: {
        username: userInfo.username,
        password: userInfo.password
      }
    })
    console.log(result);
    return result ? true : false;
  },
  updatePassword: async (userInfo) => {
    const result = await userTable.update(
      { password: userInfo.newPassword },
      {
        where: {
          username: userInfo.username,
          password: userInfo.password
        }
      }
    );
    console.log(result[0], typeof result[0]);
    return result[0] ? true : false;
  }
}
