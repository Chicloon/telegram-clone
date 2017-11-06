export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Channel.associate = (models) => {
    // N:M
    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      },
    });
    // 1: M
    Channel.belongsTo(models.User, {
      foreignKey: 'owner',
    });
  };

  return Channel;
};
