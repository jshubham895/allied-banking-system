const Account = require("../models/account.model.js");

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Details cannot be empty",
    });
  }

  const account = new Account({
    name: req.body.name,
    email: req.body.email,
    balance: req.body.balance,
    mobile: req.body.mobile,
    city: req.body.city,
  });

  account
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred during creation of Account.",
      });
    });
};

exports.findAll = (req, res) => {
  Account.find()
    .then((accounts) => {
      res.send(accounts);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retriving accounts.",
      });
    });
};

exports.findOne = (req, res) => {
  Account.findById(req.params.accountId)
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      res.send(account);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving account with id " + req.params.accountId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Account details can not be empty",
    });
  }

  Account.findByIdAndUpdate(
    req.params.accountId,
    {
      name: req.body.name,
      email: req.body.email,
      balance: req.body.balance,
      mobile: req.body.mobile,
      city: req.body.city,
    },
    { new: true }
  )
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found with the id " + req.params.accountId,
        });
      }
      res.send(account);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      return res.status(500).send({
        message: "Error updating account with id " + req.params.accountId,
      });
    });
};

exports.delete = (req, res) => {
  Account.findByIdAndRemove(req.params.accountId)
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      res.send({ message: "Account deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      return res.status(500).send({
        message: "Could not delete account with id " + req.params.accountId,
      });
    });
};
