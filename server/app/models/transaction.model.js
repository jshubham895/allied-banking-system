const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
	time: { type: String },
	day: { type: Number },
	month: { type: Number },
	year: { type: Number },
	hour: { type: Number },
	minute: { type: Number },
	from: { type: String, required: true },
	fromId: { type: String, required: true },
	to: { type: String, required: true },
	toId: { type: String, required: true },
	status: { type: String },
	amountExchange: { type: Number, required: true }
});

module.exports = mongoose.model("Transaction", transactionSchema);
