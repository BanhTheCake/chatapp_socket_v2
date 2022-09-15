require('dotenv').config();
module.exports = {
    development: {
        username: 'root',
        password: 'ZLXkoi5ws4SQjKrZzvhXmICg8FxN9RkR',
        database: 'chat_app_socket',
        host: 'dpg-cchfmmda4995s2ok8600-a.singapore-postgres.render.com',
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
    test: {
        username: 'root',
        password: 'ZLXkoi5ws4SQjKrZzvhXmICg8FxN9RkR',
        database: 'chat_app_socket',
        host: 'dpg-cchfmmda4995s2ok8600-a.singapore-postgres.render.com',
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
    production: {
        username: 'root',
        password: 'ZLXkoi5ws4SQjKrZzvhXmICg8FxN9RkR',
        database: 'chat_app_socket',
        host: 'dpg-cchfmmda4995s2ok8600-a.singapore-postgres.render.com',
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
