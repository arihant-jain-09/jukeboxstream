import Layout from "../../components/Layout/Layout";
import { useSession } from "next-auth/react";

const Admin = (props) => {
  const { data: session, status } = useSession();
  console.log(session);
  if (status == "loading") {
    return <>...loading</>;
  }
  const groups = session.user.roles;
  if (groups && groups.find((e) => e === "admin")) {
    return <Layout {...props} isAdmin="true"></Layout>;
  } else {
    return <div>Not an Admin</div>;
  }
};

export default Admin;
