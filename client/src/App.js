// Task 1 : Basic Banking System
// Name-Shubham Jain

import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Accounts from "./components/pages/Accounts";
import EditAccount from "./components/users/EditAccount";
import AddAccount from "./components/users/AddAccount";
import Account from "./components/users/Account";
import Transcations from "./components/pages/Transactions";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
	faTrashAlt,
	faEdit,
	faMoneyBill,
	faPlus,
	faRupeeSign,
	faUniversity,
	faUserLock,
	faUserShield,
	faTachometerAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(
	fab,
	faTachometerAlt,
	faTrashAlt,
	faUserShield,
	faEdit,
	faMoneyBill,
	faPlus,
	faRupeeSign,
	faUniversity,
	faUserLock
);

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="mt-5">
					<Switch>
						<Route exact path="/accounts" component={Accounts} />
						<Route exact path="/transactions" component={Transcations} />
						<Route exact path="/accounts/add" component={AddAccount} />
						<Route
							exact
							path="/accounts/edit/:accountId"
							component={EditAccount}
						/>
						<Route exact path="/accounts/view/:accountId" component={Account} />
						<Route exact path="/" component={Home} />
					</Switch>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
