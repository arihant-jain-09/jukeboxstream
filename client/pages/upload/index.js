import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Notifications from "../../components/Notifications/Notifications";
import Upload from "../../components/Upload";
import { useSelector } from "react-redux";

const UploadComponent = (props) => {
  const { id: userId } = useSelector((state) => state.user);

  return (
    <Upload backRoute={`http://localhost:5000/api/upload/files/${userId}`} />
  );
};

export default UploadComponent;
