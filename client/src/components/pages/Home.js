import React, { useState } from "react";
import "./Home.css";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Axios from "axios";

function Home() {
	let history = useHistory();

	const [loginDetails, setLoginDetails] = useState({
		email: "",
		password: ""
	});
	const { email, password } = loginDetails;
	const onInputChange = (e) => {
		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await Axios.post(
				"http://localhost:3001/accounts/login",
				loginDetails
			);
			const token = result.data.token;
			// console.log(token);
			const accountId = result.data.user._id;
			// console.log(accountId);
			history.push({
				pathname: `/accounts/view/${accountId}`,
				state: {
					token: token
				}
			});
		} catch (error) {
			console.log(error.response);
			alert(error.response.data.error);
		}
	};

	return (
		<div>
			<Navbar />
			<div
				className="img d-flex flex-column justify-content-around align-items-end"
				style={{ backgroundImage: "url(./background.jpg)" }}
			>
				<div className="banner mr-5">
					<p className="heading">Banking made easy.</p>
				</div>
				<div>
					<form className="form" onSubmit={(e) => onSubmit(e)}>
						<div className="form-group">
							<label>Email address</label>
							<input
								type="email"
								className="form-control"
								placeholder="Enter your email"
								name="email"
								value={email}
								onChange={(e) => onInputChange(e)}
							/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input
								type="password"
								className="form-control"
								placeholder="Enter your password"
								name="password"
								value={password}
								onChange={(e) => onInputChange(e)}
							/>
						</div>

						<button type="submit" className="btn btn-light">
							Sign In
						</button>
					</form>
				</div>

				<div className="buttons d-flex flex-column justify-content-around align-items-center">
					<div>
						{/* <Link
							to="/accounts"
							className="btn btn-dark btn-lg bg-dark p-2 pl-5 pr-5 mr-5 banner-btn"
						>
							View Accounts
						</Link> */}
					</div>
					<div>
						<Link
							to="/accounts/add"
							className="btn btn-dark btn-lg bg-dark p-2 pl-5 pr-5 banner-btn-1 mr-5"
						>
							No Account ? Create one
						</Link>
					</div>
				</div>
			</div>
			<div className="why-us">
				<h1 className="d-flex justify-content-center why-us-heading">
					Why Us ?
				</h1>
				<div className="wrapper d-flex justify-content-around">
					<div className="wrapper-className card">
						<FontAwesomeIcon
							icon="user-lock"
							className="wrapper-icon card-img-top"
							size="6x"
						/>
						<p className="wrapper-heading card-title">Secure Transactions</p>
						<p className="wrapper-paragraph lead card-text">
							Completely designed for fast and secure transaction between two
							accounts
						</p>
					</div>
					<div className="wrapper-className card">
						<FontAwesomeIcon
							icon="user-shield"
							className="wrapper-icon card-img-top"
							size="6x"
						/>
						<p className="wrapper-heading card-title">
							Data Privacy and Encryption
						</p>
						<p className="wrapper-paragraph lead card-text">
							Full User Data and transactions protection.{" "}
						</p>
					</div>
					<div className="wrapper-className card">
						<FontAwesomeIcon
							icon="tachometer-alt"
							className="wrapper-icon card-img-top"
							size="6x"
						/>
						<p className="wrapper-heading card-title">Fast Transactions</p>
						<p className="wrapper-paragraph lead card-text">
							Send money instantly using UPI or Debit Card or Credit Card
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
