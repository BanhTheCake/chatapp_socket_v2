const { Sequelize } = require('sequelize');
const pg = require('pg')
require('dotenv').config();

const sequelize = new Sequelize(
    'chat_app_socket',
    'root',
    'ZLXkoi5ws4SQjKrZzvhXmICg8FxN9RkR',
    {
        host: 'dpg-cchfmmda4995s2ok8600-a.singapore-postgres.render.com',
        dialect: 'postgres',
        database: 'chat_app_socket',
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;
