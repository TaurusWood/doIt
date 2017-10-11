const db = require('../config/db');

const doitDB = db.doit;
const userTable = doitDB.import('../schema/user');

const signUp = async (data) => {
  await userTable.create({
    username: data.username,
    password: data.password,
    createdAt: Date.now(),
    updatedAt: Date.now()
  })

  console.log(Date.now())
}

module.exports = {
  signUp
}
