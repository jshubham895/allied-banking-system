import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
	return (
		<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<NavLink className="nav-link navbar-brand " exact to="/">
					<FontAwesomeIcon icon="university" className="mr-2" />
					Allied Bank
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarTogglerDemo02"
					aria-controls="navbarTogglerDemo02"
					aria-expanded="false"
					aria-label="Toggle navigation"
					fixed="top"
					expand="sm"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav mr-auto  mt-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" exact to="/">
								Home
								<span className="sr-only">(current)</span>
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" exact to="/accounts">
								Accounts List
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" exact to="/transactions">
								All Transactions
							</NavLink>
						</li>
					</ul>
					<Link
						className="form-inline btn btn-outline-light my-2 my-sm-0"
						to="/accounts/add"
					>
						<FontAwesomeIcon icon="plus" size="1x" className="mr-2" />
						Create New Account
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
