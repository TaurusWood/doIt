module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categories', {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    flag: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    group_id: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    group_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'categories',
    timestamps: true,
    paranoid: true, // 虚拟删除，数据不会真实删除，而是添加一个delelteAt
    underscored: true, // 自动添加下划线 createdAt => created_at
  });
};
