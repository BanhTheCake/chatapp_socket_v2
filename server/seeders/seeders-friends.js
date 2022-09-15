module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Friends', [{
       userId: '98cc66cd-6116-4430-b7dd-4729d633aa2a',
       friendUserId: 'dc2d90f0-7d99-4cba-8ec8-f6a227a5f1d9'
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Friends', null, {});
    }
  };