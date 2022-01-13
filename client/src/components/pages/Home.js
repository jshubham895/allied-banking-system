import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function Home() {
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
				<div className="buttons d-flex flex-column justify-content-around align-items-center">
					<div>
						<Link
							to="/accounts"
							className="btn btn-dark btn-lg bg-dark p-2 pl-5 pr-5 mr-5 banner-btn"
						>
							View Accounts
						</Link>
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
					<div className="wrapper-class card">
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
					<div className="wrapper-class card">
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
					<div className="wrapper-class card">
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
