import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  return (
    <div>
      <div className="img" style={{ backgroundImage: "url(./background.jpg)" }}>
        <div className="banner">
          <p className="heading">Banking made easy.</p>
        </div>
        <Link
          to="/accounts"
          className="btn btn-dark btn-lg bg-dark p-2 pl-5 pr-5 banner-btn"
        >
          View Accounts
        </Link>
        <Link
          to="/accounts/add"
          className="btn btn-dark btn-lg bg-dark p-2 pl-5 pr-5 banner-btn-1"
        >
          No Account ? Create one
        </Link>
      </div>
      <div className="why-us">
        <h1 className="d-flex justify-content-center why-us-heading">
          Why Us ?
        </h1>
        <div className="wrapper d-flex justify-content-around">
          <div className="wrapper-class">
            <FontAwesomeIcon
              icon="user-lock"
              className="wrapper-icon"
              size="6x"
            />
            <p className="wrapper-heading">Secure Transactions</p>
            <p className="wrapper-paragraph lead">
              Completely designed for fast and secure transaction between two
              accounts
            </p>
          </div>
          <div className="wrapper-class">
            <FontAwesomeIcon
              icon="user-shield"
              className="wrapper-icon"
              size="6x"
            />
            <p className="wrapper-heading">Data Privacy and Encryption</p>
            <p className="wrapper-paragraph lead">
              Full User Data and transactions protection.{" "}
            </p>
          </div>
          <div className="wrapper-class">
            <FontAwesomeIcon
              icon="tachometer-alt"
              className="wrapper-icon"
              size="6x"
            />
            <p className="wrapper-heading">Fast Transactions</p>
            <p className="wrapper-paragraph lead">
              Send money instantly using UPI or Debit Card or Credit Card
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
