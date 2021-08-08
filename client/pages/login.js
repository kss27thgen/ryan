import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import { API } from "../config";
import Link from "next/link";
import Router from "next/router";
import { authenticate, isAuth } from "../helpers/auth";

const Login = () => {
	const [state, setState] = useState({
		email: "",
		password: "",
		error: "",
		success: "",
		buttonText: "Login",
	});

	const { email, password, error, success, buttonText } = state;

	useEffect(() => {
		isAuth() && Router.push("/");
	}, []);

	const handleChange = (name) => (event) => {
		setState({
			...state,
			[name]: event.target.value,
			error: "",
			success: "",
			buttonText: "Login",
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setState({ ...state, buttonText: "Logging in.." });
		try {
			const response = await axios.post(`${API}/login`, {
				email,
				password,
			});

			authenticate(response, () =>
				isAuth() && isAuth().role == "admin"
					? Router.push("/admin")
					: Router.push("/user"),
			);
		} catch (error) {
			setState({
				...state,
				buttonText: "Login",
				error: error.response.data.error,
			});
		}
	};

	const loginForm = () => (
		<form onSubmit={handleSubmit}>
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
				<h1 className="mb-4">Login</h1>
				{success && showSuccessMessage(success)}
				{error && showErrorMessage(error)}
				{loginForm()}
			</div>
		</Layout>
	);
};

export default Login;
