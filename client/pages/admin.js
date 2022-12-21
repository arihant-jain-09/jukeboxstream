import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { adminSideItems } from "../utils/adminSidebarImports";

const Admin = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const checkUser = useCallback(async () => {
    const user = await Auth.currentAuthenticatedUser();
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    if (groups && groups.find((e) => e === "Admin")) {
      setIsAdmin(true);
    } else {
      navigate("/");
      alert("Not an Admin");
    }
  }, [navigate]);

  useEffect(() => {
    checkUser();
    return () => {};
  }, [checkUser]);

  return (
    <>
      {isAdmin && (
        <Layout
          {...props}
          isAdmin={isAdmin}
          sideItems={adminSideItems}
        ></Layout>
      )}
    </>
  );
};

export default withAuthenticator(Admin);
