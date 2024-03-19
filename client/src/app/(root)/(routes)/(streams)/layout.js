"use client";
import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import ImageGrid from "@/components/ImageGrid/ImageGrid";
import { GET_ALL_SONGS } from "@/utils/api-end-points";
import "@aws-amplify/ui-react/styles.css";

const RootLayout = ({ children, ...props }) => {
  return (
    <>
      <ImageGrid apiRoute={GET_ALL_SONGS} {...props} />
      {children}
    </>
  );
};
export default withAuthenticator(RootLayout);
