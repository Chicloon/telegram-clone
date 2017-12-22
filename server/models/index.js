import Sequelize from 'sequelize';

const sequelize = new Sequelize('telegram', 'efim', '123', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true,
  },
});

// const sequelize = new Sequelize('telegram', 'postgres', 'postgres', {
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 5433,
//   operatorsAliases: Sequelize.Op,
//   define: {
//     underscored: true,
//   },
// });

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Member: sequelize.import('./member'),
  DirectMessage: sequelize.import('./directMessage'),
  Online: sequelize.import('./online'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
models.op = Sequelize.Op;

export default models;
