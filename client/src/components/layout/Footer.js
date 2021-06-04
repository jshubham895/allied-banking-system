import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import("./Footer.css");

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top container-fluid">
        <div className="d-flex justify-content-around">
          <div className="flex-item">
            <p className="footer-text">Allied Bank</p>
            <ul className="list-unstyled linklist">
              <li>
                <Link className="linklist" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="linklist" to="/accounts">
                  Accounts List
                </Link>
              </li>
              <li>
                <Link className="linklist" to="/transactions">
                  All Transactions
                </Link>
              </li>
              <li>
                <Link className="linklist" to="/">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-item">
            <h1 className="footer-text">Contact Us</h1>
            <form className="form-inline">
              <div className="form-group mb-2">
                <label className="sr-only">Email</label>
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext btn btn-warning"
                  value="Email"
                />
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <label className="sr-only">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email address here"
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Submit
              </button>
            </form>
            <hr />
            <hr />
            <hr />
            <div className="social d-flex justify-content-around">
              <a href="/" className="icon social-icon">
                <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
              </a>
              <a href="/" className="icon social-icon">
                <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
              </a>
              <a href="/" className="icon social-icon">
                <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
              </a>
              <a href="/" className="icon social-icon">
                <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
              </a>
              <a href="/" className="icon social-icon">
                <FontAwesomeIcon icon={["fab", "reddit"]} size="2x" />
              </a>
              <a href="/" className="icon social-icon">
                <FontAwesomeIcon icon={["fab", "linkedin"]} size="2x" />
              </a>
              <a href="/" className="icon social-icon">
                <FontAwesomeIcon icon={["fab", "snapchat"]} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright container-fluid  d-flex justify-content-between">
        <div className="footer-line">
          © 2020 Copyright &nbsp;&nbsp;&nbsp;
          <a href="/" className="footer-line">
            Allied Bank Ltd
          </a>
        </div>
        <a
          className="footer-line"
          href="https://www.linkedin.com/in/shubham-jain-340569190/"
        >
          Made by Shubham Jain
        </a>
      </div>
    </div>
  );
};

export default Footer;
