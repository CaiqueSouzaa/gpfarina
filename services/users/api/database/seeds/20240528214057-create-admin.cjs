'use strict';

const bcrypt = require('bcrypt');
const uuid4 = require('uuid4');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('users', [{
        uuid4: uuid4(),
        name: 'Admin',
        login: 'admin',
        password_hash: await bcrypt.hash('admin', 12),
        created_at: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
