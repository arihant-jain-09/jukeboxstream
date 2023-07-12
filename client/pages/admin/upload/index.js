import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Upload from "../../../components/Upload";

const UploadComponent = () => {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return <>...loading</>;
  }
  const groups = session.user.roles;
  if (groups && groups.find((e) => e === "admin")) {
    return <Upload backRoute="http://localhost:5000/api/upload/files" />;
  } else {
    return <div>Not an Admin</div>;
  }
};

export default UploadComponent;
