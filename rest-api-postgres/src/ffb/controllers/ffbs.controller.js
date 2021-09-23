const FFBModel = require('../models/ffbs.model');
const crypto = require('crypto');

exports.findByFilter = (req, res) => {
	console.log(req.query);
    FFBModel.findByFilter(req.query)
        .then((result) => {
            res.status(200).send(result);
        })
};