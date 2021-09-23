const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
	
	if(UserModel.findByUserName(req.body.userName) !== undefined)
		res.status(400).send({errors: 'User name exists'});
	else {
		UserModel.createUser(req.body)
			.then((result) => {
				res.status(201).send({id: result.dataValues.id});
			});
	}
};

exports.getByToken = (req, res) => {
    UserModel.findById(req.jwt.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};