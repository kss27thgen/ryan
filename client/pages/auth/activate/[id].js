import { withRouter } from "next/router";
import jwt from "jsonwebtoken";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import { API } from "../../../config";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import queryString from "querystring";

const ActivateAccount = ({ router }) => {
	const [state, setState] = useState({
		name: "",
		token: "",
		buttonText: "Activate Account",
		success: "",
		error: "",
	});
	const { name, token, buttonText, success, error } = state;

	useEffect(() => {
		console.log(router.asPath);
		let token = router.query.id;
		if (token) {
			const { name } = jwt.decode(token);
			setState({ ...state, name, token });
		}
	}, []);

	const clickSubmit = async (event) => {
		event.preventDefault();
		setState({ ...state, buttonText: "Activating.." });
		try {
			const response = await axios.post(`${API}/register/activate`, {
				token,
			});
			console.log("account activate response", response);
			setState({
				...state,
				name: "",
				// token: "",
				buttonText: "Activated",
				success: response.data.message,
			});
		} catch (error) {
			setState({
				...state,
				buttonText: "Activate Account",
				error: error.response.data.error,
			});
		}
	};

	return (
		<Layout>
			<div className="row mt-5">
				<div className="col-md-6 offset-md-3">
					<h2>
						Good day {name},<br /> Ready to activate your account?
					</h2>
					{success && showSuccessMessage(success)}
					{error && showErrorMessage(error)}
					<button
						className="btn btn-outline-warning btn-block mt-3"
						onClick={clickSubmit}
					>
						{buttonText}
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default withRouter(ActivateAccount);
