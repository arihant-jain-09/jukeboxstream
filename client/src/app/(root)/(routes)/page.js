"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const RootPage = (props) => {
  useEffect(() => {
    redirect("/home");
  });
  return <></>;
};

export default RootPage;
