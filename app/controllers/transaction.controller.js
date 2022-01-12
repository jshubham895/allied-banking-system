const { Mongoose } = require("mongoose");
const Transaction = require("../models/transaction.model.js");
const Account = require("../models/account.model.js");

exports.create = async (req, res) => {
	const account = await Account.findOne({ name: req.body.from });
	const balance = account.balance;

	if (Number(req.body.amountExchange) > balance) {
		return res.status(400).send({
			error: "Insufficient balance",
			message: "Transaction declined due to insufficient balance"
		});
	}

	const date = new Date();
	const transaction = await new Transaction({
		time: date.toUTCString(),
		day: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		from: req.body.from,
		to: req.body.to,
		status: "negative",
		amountExchange: req.body.amountExchange
	});

	await transaction
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred during the transaction."
			});
		});

	const amountExchange = Number(req.body.amountExchange);
	const from = req.body.from;
	const to = req.body.to;

	await Account.findOne(
		{
			name: from
		},
		function (error, sender) {
			updateSenderBalance(sender.balance - amountExchange);
		}
	);

	function updateSenderBalance(newBalance) {
		Account.findOneAndUpdate(
			{
				name: from
			},
			{ $set: { balance: newBalance } },
			null,
			function (error, sender) {
				if (error) {
					console.log(error);
				}
			}
		);
	}

	await Account.findOne(
		{
			name: to
		},
		function (err, receiver) {
			updateReceiverBalance(receiver.balance + amountExchange);
		}
	);

	function updateReceiverBalance(updateBalance) {
		Account.findOneAndUpdate(
			{
				name: to
			},
			{ $set: { balance: updateBalance } },
			null,
			function (err, receiver) {
				if (err) {
					console.log(error);
				}
			}
		);
	}
};

exports.findAll = (req, res) => {
	Transaction.find()
		.then((transactions) => {
			res.send(transactions);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retriving transactions."
			});
		});
};

exports.findOneFrom = (req, res) => {
	const from = req.params.from;
	Transaction.find({ from: from })
		.then((transaction) => {
			if (!transaction) {
				return res.status(404).send({
					message: "Transaction not found with from " + req.params.from
				});
			}
			res.send(transaction);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Transaction not found with id " + req.params.from
				});
			}
			return res.status(500).send({
				message: "Error retrieving transaction with id " + req.params.from
			});
		});
};

exports.findOneTo = (req, res) => {
	const to = req.params.to;
	Transaction.find({ to: to }, function (err, obj) {
		res.send(obj);
	});
};

exports.find = (req, res) => {
	const name = req.params.from;
	Transaction.find(
		{ $or: [{ from: name }, { to: name }] },
		function (err, obj) {
			res.send(obj);
		}
	);
};
