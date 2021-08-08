import Layout from "../../components/Layout";
import axios from "axios";
import { API } from "../../config";
import { getCookie } from "../../helpers/auth";
import withUser from "../withUser";

const User = ({ user, token }) => {
	return <Layout>{JSON.stringify(user)}</Layout>;
};

export default withUser(User);
