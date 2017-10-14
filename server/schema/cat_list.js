/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cat_list', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    name: {
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
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    group_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'cat_list',
    timestamps: false
  });
};
