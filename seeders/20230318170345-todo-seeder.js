'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const addTodos = [
      {
        title: "Todo 1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Todo 2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Todo 3",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    return queryInterface.bulkInsert('Todos', addTodos, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
