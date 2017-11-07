export default (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    lastVisited: DataTypes.DATE,
  });

  return Member;
};
