import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";

import { SetUser } from "../../redux/userSlice";

export default function MyAuthComponent({ children }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  // your logic to  check if the user is logged
  if (session) {
    dispatch(SetUser(session.user));
    return (
      <html>
        <head></head>
        <body>{children}</body>
      </html>
    );
  } else
    return (
      <>
        Not signed in <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            signIn("cognito", {
              callbackUrl: process.env.NEXTAUTH_URL,
            });
          }}
        >
          Sign in
        </button>
      </>
    );
}
