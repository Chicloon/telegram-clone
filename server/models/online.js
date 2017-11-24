export default (sequelize, DataTypes) => {
  const Online = sequelize.define('online', {
    online: DataTypes.BOOLEAN,
  });

  Online.associate = (models) => {
    Online.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return Online;
};
