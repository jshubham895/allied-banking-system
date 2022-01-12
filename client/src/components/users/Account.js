import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "./Popup";
import Error from "./Error";
import formatter from "../../formatter";

const Account = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [res, setRes] = useState([]);
	const [isErr, setIsErr] = useState(false);
	const [err, setErr] = useState([]);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const toggleError = () => {
		setIsErr(!isErr);
	};

	const [account, setAccount] = useState({
		name: "",
		email: "",
		balance: "",
		mobile: "",
		city: ""
	});

	const [accountsList, setAccountsList] = useState([]);
	// const [senderList, setSenderList] = useState([]);
	// const [receiverList, setReceiverList] = useState([]);
	const [balance, setBalance] = useState(0);
	const [transactionsList, setTransactionsList] = useState([]);

	const [transactionDetails, setTransactionDetails] = useState({
		amountExchange: "",
		to: ""
	});

	const { to, amountExchange } = transactionDetails;
	const onInputChange = (e) => {
		setTransactionDetails({
			...transactionDetails,
			[e.target.name]: e.target.value
		});
	};

	const { accountId } = useParams();
	const from = `${account.name}`;

	const loadAccount = async () => {
		const result = await Axios.get(
			`http://localhost:3001/accounts/${accountId}`
		);
		setAccount(result.data);
		setBalance(result.data.balance);
		// console.log(result.data.balance);
	};

	const loadAccounts = async () => {
		const result = await Axios.get(`http://localhost:3001/accounts`);
		setAccountsList(result.data);
	};

	const transactions = async () => {
		const result = await Axios.get(
			`http://localhost:3001/transactions/${account.name}`
		);
		setTransactionsList(result.data);
	};

	// const sentMoney = async () => {
	// 	const result = await Axios.get(
	// 		`http://localhost:3001/transactions/from/${account.name}`
	// 	);
	// 	setSenderList(result.data);
	// };

	// const receivedMoney = async () => {
	// 	const result = await Axios.get(
	// 		`http://localhost:3001/transactions/to/${account.name}`
	// 	);
	// 	setReceiverList(result.data);
	// };

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(isOpen);
		try {
			const response = await Axios.post("http://localhost:3001/transactions", {
				from: from,
				to: to,
				balance: balance,
				amountExchange: amountExchange
			});
			setRes(response);
			togglePopup();
			// console.log(response);
			// history.push("/transactions");
		} catch (error) {
			setErr(error.response.data.error);
			toggleError();
		}
	};

	// useEffect(() => {
	// 	loadAccount();
	// }, [transactionDetails]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		async function fetchData() {
			await loadAccount();
			await loadAccounts();
			await transactions();
		}
		fetchData();
	}, [transactionDetails, account.name]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	sentMoney();
	// }, [account.name]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	receivedMoney();
	// }, [account.name]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="container py-4">
			<hr />
			<hr />
			<Link className="btn-primary btn" to="/accounts">
				Back
			</Link>
			<hr />.<h1 className="display-4">Account No: {accountId}</h1>
			<div>
				<table className="table table-bordered table-striped bg-warning w-50 font-weight-normal ">
					<tbody key={account._id}>
						<tr>
							<th scope="col">Name</th>
							<th scope="row">{account.name}</th>
						</tr>
						<tr>
							<th scope="col">Email</th>
							<th scope="row">{account.email}</th>
						</tr>
						<tr>
							<th scope="col">
								Balance( <FontAwesomeIcon icon="rupee-sign" />)
							</th>
							<th scope="row">{account.balance}</th>
						</tr>
						<tr>
							<th scope="col">Mobile Number</th>
							<th scope="row">{account.mobile}</th>
						</tr>
						<tr>
							<th scope="col">City</th>
							<th scope="row">{account.city}</th>
						</tr>
					</tbody>
				</table>
			</div>
			<hr />
			<hr />
			<p className="display-4">Transaction History</p>
			<table className="table table-light container shadow-lg mt-5">
				<thead className="table-dark bg-success">
					<tr>
						<th scope="col">Sender</th>
						<th scope="col">Receiver</th>
						<th scope="col">Amount</th>
						<th scope="col">Date and Time</th>
						<th scope="col">Transaction ID</th>
						<th scope="col">Debit/Credit</th>
					</tr>
				</thead>
				<tbody>
					{transactionsList.map((value, key) => {
						return (
							<tr key={value._id}>
								<td>{value.from}</td>
								<td>{value.to}</td>
								<td>{formatter(value.amountExchange)}</td>
								<td>
									{value.day}/{value.month}/{value.year} &nbsp;&nbsp;&nbsp;
									{value.hour}:{value.minute}
								</td>
								<td>{value._id}</td>
								{value.from === account.name ? <td>Debit</td> : <td>Credit</td>}
							</tr>
						);
					})}
					{/* {senderList.map((value, key) => {
						return (
							<tr key={value._id}>
								<td>{value.from}</td>
								<td>{value.to}</td>
								<td>{value.amountExchange}</td>
								<td>
									{value.day}/{value.month}/{value.year} &nbsp;&nbsp;&nbsp;
									{value.hour}:{value.minute}
								</td>
								<td>{value._id}</td>
								<td>Debit</td>
							</tr>
						);
					})}
					{receiverList.map((value, key) => {
						return (
							<tr key={key}>
								<td>{value.from}</td>
								<td>{value.to}</td>
								<td>{value.amountExchange}</td>
								<td>
									{value.day}/{value.month}/{value.year} &nbsp;&nbsp;&nbsp;
									{value.hour}:{value.minute}
								</td>
								<td>{value._id}</td>
								<td>Credit</td>
							</tr>
						);
					})} */}
				</tbody>
			</table>
			<hr />
			<hr />
			<p className="display-4">Transfer Money</p>
			<form className="form-group" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<label>From</label>
					<input
						type="text"
						className="form-control"
						name="from"
						value={account.name}
						onChange={(e) => onInputChange(e)}
						readOnly
					/>
				</div>

				<div className="form-group">
					<label>To</label>
					<select
						className="form-control form-input-background"
						id="toAccount"
						required
						name="to"
						value={account.value}
						onChange={(e) => onInputChange(e)}
					>
						<option defaultValue isdisabled="true">
							Select the receiver account
						</option>
						{/* eslint-disable-next-line */}
						{accountsList.map(function (val) {
							if (val.name !== account.name) {
								return (
									<option key={val._id} value={val.name}>
										{val.name}
									</option>
								);
							}
						})}
					</select>
				</div>
				<div className="form-group">
					<label>
						Enter Amount ( <FontAwesomeIcon icon="rupee-sign" size="xs" /> )
					</label>
					<input
						className="form-control form-input-background"
						type="number"
						name="amountExchange"
						value={amountExchange}
						min="0"
						max={account.balance}
						required
						onChange={(e) => onInputChange(e)}
					/>
					<p>{formatter(amountExchange)}</p>
				</div>

				<div className="center">
					<button className="btn btn-danger" type="submit">
						Send
					</button>
				</div>
			</form>
			{isOpen && (
				<Popup
					handleClose={togglePopup}
					from={res.data.from}
					to={res.data.to}
					amountExchange={formatter(res.data.amountExchange)}
				/>
			)}
			{isErr && <Error handleClose={toggleError} message={err} />}
		</div>
	);
};

export default Account;
