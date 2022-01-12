import React from "react";
import { useHistory } from "react-router-dom";
import gifs from "./62994-success-lottie-animation.gif";
import "./Popup.css";

const Popup = ({ from, to, amountExchange, handleClose }) => {
	let history = useHistory();

	const Redirected = () => {
		history.push("/accounts");
	};

	return (
		<div className="popup-box">
			<div className="box">
				<div className="left">
					<h1 className="pb-3">Transfer Successful</h1>
					<p>From : {from}</p>
					<p>To : {to}</p>
					<p>Transferred Amount : {amountExchange}</p>
					<button
						className="btn btn-outline-success "
						onClick={async (e) => {
							await handleClose();
							await Redirected();
						}}
					>
						Go to home
					</button>
				</div>
				<div className="right">
					<img src={gifs} alt="success" className="gif" />
				</div>
			</div>
		</div>
	);
};

export default Popup;
