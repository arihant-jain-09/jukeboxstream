import { useSession } from "next-auth/react";
import React from "react";
import Layout from "../../../components/Layout/Layout";
import Upload from "../../../components/Upload/Upload";

const UploadPage = (props) => {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return <>...loading</>;
  }
  const groups = session.user.roles;
  if (groups && groups.find((e) => e === "admin")) {
    return (
      <Layout {...props} isAdmin="true">
        <Upload />
      </Layout>
    );
  } else {
    return <div>Not an Admin</div>;
  }
};

export default UploadPage;
