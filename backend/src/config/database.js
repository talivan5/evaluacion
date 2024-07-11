const { Sequelize, DataTypes } = require('sequelize');
const logger = require('./logger.js');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

sequelize.sync()
  .then(() => logger.info('Base de datos sincronizada'))
  .catch(err => logger.error('Error al sincronizar la base de datos', err));

module.exports = sequelize;
