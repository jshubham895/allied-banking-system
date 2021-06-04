import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditAccount = () => {
  let history = useHistory();
  const { accountId } = useParams();

  const [account, setAccount] = useState({
    name: "",
    email: "",
    balance: "",
    mobile: "",
    city: "",
  });

  const { name, email, balance, mobile, city } = account;
  const onInputChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadAccount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (e) => {
    e.preventDefault();
    await Axios.put(`http://localhost:3001/accounts/${accountId}`, account);
    history.push("/accounts");
  };

  const loadAccount = async () => {
    const result = await Axios.get(
      `http://localhost:3001/accounts/${accountId}`
    );
    setAccount(result.data);
  };

  return (
    <div className="container">
      <div className="w-75 shadow p-5">
        <div className="py-4">
          <h1>Edit Account</h1>
        </div>
        <div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Balance</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your balance"
                name="balance"
                value={balance}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your mobile number"
                name="mobile"
                value={mobile}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your city name"
                name="city"
                value={city}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button className="btn btn-warning">Update Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
