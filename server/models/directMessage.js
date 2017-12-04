export default (sequelize, DataTypes) => {
  const DirectMessage = sequelize.define('direct_message', {});

  DirectMessage.associate = (models) => {
    // N:M
    DirectMessage.belongsTo(models.User, {
      through: 'senderId',
      foreignKey: {
        name: 'senderId',
        field: 'sender_id',
      },
    });
    DirectMessage.belongsTo(models.User, {
      through: 'receiverId',
      foreignKey: {
        name: 'receiverId',
        field: 'receiver_id',
      },
    });
  };

  return DirectMessage;
};
