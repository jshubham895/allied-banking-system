const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  balance: { type: Number, required: true },
  mobile: { type: Number, required: true },
  city: { type: String, required: true },
});

module.exports = mongoose.model("Account", AccountSchema);
