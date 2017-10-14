/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'user',
    timestamps: false
  });
};
