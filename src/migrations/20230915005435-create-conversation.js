'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(30)
      },
      conversationImage: {
        type: Sequelize.STRING,
        defaultValue: 'https://img.favpng.com/25/7/19/users-group-computer-icons-png-favpng-WKWD9rqs5kwcviNe9am7xgiPx.jpg'
      },
      type: {
        type: Sequelize.ENUM('single', 'group'),
        defaultValue:'single'
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references : {
          model : "Users",
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Conversations');
  }
};