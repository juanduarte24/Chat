'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const transporter = require('../helpers/mailer');
const jwt = require('jsonwebtoken')
require('dotenv').config();


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, { foreignKey: 'senderId' });
      User.belongsToMany(models.Conversation, { through: 'Participant' });
      User.hasMany(models.Conversation, { foreignKey: 'createdBy' });

    }
  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    validEmail: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user, options) => {
        const hashed = await bcrypt.hash(user.password, 10)
        user.password = hashed;
      },
      afterCreate: (user, options) => {
        const { email, firstname, lastname } = user;
        const token = jwt.sign({email}, process.env.JWT_EMAIL_SECRET,{
          expiresIn : '3d',
          algorithm: 'HS512'
        })
        transporter.sendMail({
          to: email,
          subject: 'Bienvenido al Chat',
          html: `<h1>Hola ${firstname} ${lastname} Da click en el <a href="http://localhost:5173/auth/email-validation?token=${token}">enlace</a> para verificar el correo</h1>`
        })
      }
    }
  }
  );
  return User;
};