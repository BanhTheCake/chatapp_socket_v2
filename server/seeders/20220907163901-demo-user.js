module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: 'admin',
      image: 'none',
      isAdmin: true,
      isFirstLogin: true,
      userId: '98cc66cd-6116-4430-b7dd-4729d633aa2a'
    },
    {
      username: 'nonAdmin',
      password: 'nonAdmin',
      image: 'none',
      isAdmin: false,
      isFirstLogin: true,
      userId: 'dc2d90f0-7d99-4cba-8ec8-f6a227a5f1d9'
    },
    {
      username: 'banh',
      password: 'banh',
      image: 'none',
      isAdmin: false,
      isFirstLogin: true,
      userId: '2212e3f8-37a5-4f25-9ae2-19d79f5499fa'
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};