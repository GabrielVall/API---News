const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // suponiendo que estás usando la configuración anterior

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING, // Nota: ¡Nunca guardes contraseñas en texto plano!
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;
