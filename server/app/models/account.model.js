const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	balance: { type: Number, min: 0, required: true },
	mobile: { type: Number, required: true },
	city: { type: String, required: true }
});

AccountSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject.__v;
		delete returnedObject.password;
	}
});

module.exports = mongoose.model("Account", AccountSchema);
