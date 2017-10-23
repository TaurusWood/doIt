const doit = require('../config/db');
const userTable = doit.userTable;

module.exports = {
  checkName: async (nick) => {
    const result = await userTable.findOne({
      where: {
        nick: nick
      }
    })
    return result ? false : true;
  },
  signUp: async (data) => {
    await userTable.create({
      nick: data.nick,
      password: data.password,
      created_at: Date.now(),
      updated_at: Date.now()
    });
    return true;
  },
  signIn: async (userInfo) => {
    const result = await userTable.findOne({
      where: {
        nick: userInfo.nick,
        password: userInfo.password
      }
    })
    return result;
  },
  updatePassword: async (userInfo) => {
    const result = await userTable.update(
      { password: userInfo.newPassword },
      {
        where: {
          nick: userInfo.nick,
          password: userInfo.password
        }
      }
    );
    return result[0] ? true : false;
  }
}
