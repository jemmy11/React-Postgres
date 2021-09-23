const sequelize = require('../../common/services/sequelize.service').sequelize;
const Sequelize = require('sequelize');

const User = sequelize.define('users', 
	{
		id: {
			  type: Sequelize.UUID,
			  defaultValue: Sequelize.UUIDV4,
			  allowNull: false,
			  primaryKey: true
			},
		fullName: Sequelize.STRING, 
		userName: Sequelize.STRING, 
		password: Sequelize.STRING 
	});
	
User.sync({ force: false })
  .then(() => {
    console.log('User is created');
});

exports.findByUserName = (userName) => {
    return User.findAll({ where: { userName: userName } })
		.then(function(user) {
		return user;
	});
};

exports.findById = (id) => {
    return User.findOne({ attributes: ['userName', 'fullName'], where: { id: id } })
		.then(function(user) {
		return user;
	});
};

exports.createUser = (userData) => {
    return User.create({ fullName: userData.fullName, userName: userData.userName,  password: userData.password})
		.then(function(user) {
		return user;
	});
};

