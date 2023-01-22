import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
require("dotenv").config();

const AddAccount = () => {
	let history = useHistory();

	const [account, setAccount] = useState({
		name: "",
		email: "",
		password: "",
		balance: "",
		mobile: "",
		city: ""
	});

	const { name, email, balance, password, mobile, city } = account;
	const onInputChange = (e) => {
		setAccount({ ...account, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(process.env.API_URL);
		await Axios.post("/accounts/signup", account);
		alert("Account created successful	ly");
		history.push("/");
	};

	return (
		<div className="container">
			<div className="py-4">
				<h1>Create New Account</h1>
			</div>
			<div className="createUser">
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="mb-3">
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
						<label className="form-label">Email address</label>
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
						<label className="form-label">Password</label>
						<input
							type="password"
							className="form-control"
							placeholder="Enter your password"
							name="password"
							value={password}
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
							min={0}
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
					<button className="btn btn-primary mb-4">Create Account</button>
				</form>
			</div>
		</div>
	);
};

export default AddAccount;
