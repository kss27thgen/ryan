import Layout from "../../components/Layout";
import withAdmin from "../withAdmin";

const Admin = ({ user }) => {
	return (
		<Layout>
			<h1>Hello Admin</h1>
			{JSON.stringify(user)}
		</Layout>
	);
};

export default withAdmin(Admin);
