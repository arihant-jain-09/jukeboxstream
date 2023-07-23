import { Auth } from "aws-amplify";
import { useState } from "react";

export default function  useCheckAdminStatus() {
  const [isAdmin, setIsAdmin] = useState(false);

  async function checkAdminStatus() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
      const isAdmin = groups && groups.includes("admin");
      setIsAdmin(isAdmin)
    } catch (error) {
      setIsAdmin(false)
      console.error(error);
    }
  }
  checkAdminStatus()

  return [isAdmin];
  
};
