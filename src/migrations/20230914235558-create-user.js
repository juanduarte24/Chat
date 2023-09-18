'use strict';
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      lastname: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      email: {
        type: Sequelize.STRING(50),
        unique:true,
        allowNull:false,
        
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue : "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.STRING(120)
      },
      validEmail: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};