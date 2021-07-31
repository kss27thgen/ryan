import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

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
