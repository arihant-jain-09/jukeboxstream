import Layout from "../components/Layout/Layout";
import { useSession } from "next-auth/react";
import { adminSideItems } from "../utils/adminSidebarImports";

const Admin = (props) => {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return <>...loading</>;
  }
  const groups = session.user.roles;
  if (groups && groups.find((e) => e === "admin")) {
    return (
      <>
        <Layout {...props} sideItems={adminSideItems}></Layout>
      </>
    );
  } else {
    return <div>Not an Admin</div>;
  }
};

export default Admin;
