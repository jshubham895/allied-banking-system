const Account = require("../models/account.model.js");
const bcrypt = require("bcrypt");
const { createTokens } = require("./JWT");

exports.create = async (req, res) => {
	if (!req.body.name || req.body.balance < 0) {
		return res.status(400).send({
			message: "Empty name or balance less than 0"
		});
	}

	const hash = await bcrypt.hash(req.body.password, 10);

	const account = await new Account({
		name: req.body.name,
		email: req.body.email,
		password: hash,
		balance: req.body.balance,
		mobile: req.body.mobile,
		city: req.body.city
	});

	await account
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred during creation of Account."
			});
		});
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	const user = await Account.findOne({ email: email });

	if (!user) res.status(400).json({ error: "User does not exist" });
	else {
		const dbPassword = user.password;
		await bcrypt.compare(password, dbPassword).then((match) => {
			if (!match) {
				res
					.status(400)
					.json({ error: "Wrong username and password combination" });
			} else {
				const accessToken = createTokens(user);

				res.json({ token: accessToken, user: user });
			}
		});
	}
};

exports.findAll = (req, res) => {
	Account.find()
		.then((accounts) => {
			res.send(accounts);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retriving accounts."
			});
		});
};

exports.findOne = (req, res) => {
	Account.findById(req.params.accountId)
		.then((account) => {
			if (!account) {
				return res.status(404).send({
					message: "Account not found with id " + req.params.accountId
				});
			}
			res.send(account);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Account not found with id " + req.params.accountId
				});
			}
			return res.status(500).send({
				message: "Error retrieving account with id " + req.params.accountId
			});
		});
};

exports.update = (req, res) => {
	if (!req.body.name) {
		return res.status(400).send({
			message: "Account details can not be empty"
		});
	}

	Account.findByIdAndUpdate(
		req.params.accountId,
		{
			name: req.body.name,
			email: req.body.email,
			balance: req.body.balance,
			mobile: req.body.mobile,
			city: req.body.city
		},
		{ new: true }
	)
		.then((account) => {
			if (!account) {
				return res.status(404).send({
					message: "Account not found with the id " + req.params.accountId
				});
			}
			res.send(account);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Account not found with id " + req.params.accountId
				});
			}
			return res.status(500).send({
				message: "Error updating account with id " + req.params.accountId
			});
		});
};

exports.delete = (req, res) => {
	Account.findByIdAndRemove(req.params.accountId)
		.then((account) => {
			if (!account) {
				return res.status(404).send({
					message: "Account not found with id " + req.params.accountId
				});
			}
			res.send({ message: "Account deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "Account not found with id " + req.params.accountId
				});
			}
			return res.status(500).send({
				message: "Could not delete account with id " + req.params.accountId
			});
		});
};

exports.findByName = (req, res) => {
	const nameById = req.params.name;
	Account.findOne({ name: nameById }).then((account) => {
		if (!account) {
			return res.status(404).send({
				message: "Account not found with name " + req.params.name
			});
		}
		res.send(account._id);
	});
};
