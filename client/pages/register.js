import { useState } from "react";
import Layout from "../components/Layout";

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

	const handleChange = (name) => (event) => {
		setState({
			...state,
			[name]: event.target.value,
			error: "",
			success: "",
			buttonText: "Register",
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.table({ name, email, password });
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
				{registerForm()}
			</div>
		</Layout>
	);
};

export default Register;
