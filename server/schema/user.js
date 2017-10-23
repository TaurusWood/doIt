const generateUUID = require('../config/uuid');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(12),
      defaultValue: generateUUID(12, 16),
      allowNull: false,
    },
    nick: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false
    }
  }, {
    tableName: 'user',
    timestamps: true,
    paranoid: true, // 虚拟删除，数据不会真实删除，而是添加一个delelteAt
    underscored: true, // 自动添加下划线 createdAt => created_at
  });
};
