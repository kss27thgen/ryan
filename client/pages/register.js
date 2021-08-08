import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import { API } from "../config";
import { isAuth } from "../helpers/auth";
import Router from "next/router";

const Register = () => {
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: "",
		buttonText: "Register",
	});

	const { name, email, password, error, success, buttonText } = state;

	useEffect(() => {
		isAuth() && Router.push("/");
	}, []);

	const handleChange = (name) => (event) => {
		setState({
			...state,
			[name]: event.target.value,
			error: "",
			success: "",
			buttonText: "Register",
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setState({ ...state, buttonText: "Registering.." });
		try {
			const response = await axios.post(`${API}/register`, {
				name,
				email,
				password,
			});
			setState({
				...state,
				name: "",
				email: "",
				password: "",
				buttonText: "Submitted",
				success: response.data.message,
			});
		} catch (error) {
			setState({
				...state,
				buttonText: "Register",
				error: error.response.data.error,
			});
		}
	};

	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group mb-2">
				<input
					type="text"
					value={name}
					className="form-control"
					placeholder="Your name"
					onChange={handleChange("name")}
				/>
			</div>
			<div className="form-group mb-2">
				<input
					type="email"
					value={email}
					className="form-control"
					placeholder="Your email"
					onChange={handleChange("email")}
				/>
			</div>
			<div className="form-group mb-4">
				<input
					type="password"
					value={password}
					className="form-control"
					placeholder="Your password"
					onChange={handleChange("password")}
				/>
			</div>
			<div className="form-group">
				<button className="btn btn-outline-warning">
					{buttonText}
				</button>
			</div>
		</form>
	);

	return (
		<Layout>
			<div className="col-md-6 offset-md-3">
				<h1 className="mb-4">Register</h1>
				{success && showSuccessMessage(success)}
				{error && showErrorMessage(error)}
				{registerForm()}
			</div>
		</Layout>
	);
};

export default Register;
