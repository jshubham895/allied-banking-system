import React from "react";
import { useHistory } from "react-router-dom";
import gifs from "./13865-sign-for-error-flat-style.gif";
import "./Popup.css";

const Popup = ({ message, handleClose }) => {
	let history = useHistory();

	const Redirected = () => {
		history.push("/accounts");
	};

	return (
		<div className="popup-box">
			<div className="box">
				<div className="left">
					<h1 className="pb-3">{message}</h1>
					<button
						className="btn btn-outline-danger "
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
