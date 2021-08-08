import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { isAuth, logout } from "../helpers/auth";

Router.onRouteChangeStart = (url) => nProgress.start();
Router.onRouteChangeComplete = (url) => nProgress.done();
Router.onRouteChangeError = (url) => nProgress.done();

const Layout = ({ children }) => {
	const head = () => (
		<>
			<link
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
				rel="stylesheet"
				integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
				crossOrigin="anonymous"
			/>
			<link rel="stylesheet" href="/css/style.css" />
		</>
	);

	const nav = () => (
		<ul className="nav nav-tabs bg-warning">
			<li className="nav-item">
				<Link href="/">
					<a className="nav-link text-dark">Home</a>
				</Link>
			</li>

			{!isAuth() && (
				<>
					<li className="nav-item">
						<Link href="/login">
							<a className="nav-link text-dark">Login</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/register">
							<a className="nav-link text-dark">Register</a>
						</Link>
					</li>
				</>
			)}

			{isAuth() && isAuth().role == "admin" && (
				<li className="nav-item ml-auto" style={{ marginLeft: "auto" }}>
					<Link href="/admin">
						<a className="nav-link text-dark">Admin</a>
					</Link>
				</li>
			)}
			{isAuth() && isAuth().role == "subscriber" && (
				<li className="nav-item ml-auto" style={{ marginLeft: "auto" }}>
					<Link href="/user">
						<a className="nav-link text-dark">{isAuth().name}</a>
					</Link>
				</li>
			)}

			{isAuth() && (
				<li className="nav-item" style={{ cursor: "pointer" }}>
					<a className="nav-link text-dark" onClick={logout}>
						Logout
					</a>
				</li>
			)}
		</ul>
	);

	return (
		<>
			{head()}
			{nav()}
			<div className="container pt-5 pb-5">{children}</div>
		</>
	);
};

export default Layout;
