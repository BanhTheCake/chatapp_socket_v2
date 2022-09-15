module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Messages', [{
       from: '98cc66cd-6116-4430-b7dd-4729d633aa2a',
       to: 'dc2d90f0-7d99-4cba-8ec8-f6a227a5f1d9',
       text: 'halo again'
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Messages', null, {});
    }
  };