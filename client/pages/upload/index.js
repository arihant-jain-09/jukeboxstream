import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Notifications from "../../components/Notifications/Notifications";
import Upload from "../../components/Upload";
import { useSelector } from "react-redux";
import { BASE_UPLOAD_IMAGE } from "../../utils/api-end-points";

const UploadComponent = (props) => {
  const { id: userId } = useSelector((state) => state.user);

  return (
    <Upload backRoute={`${BASE_UPLOAD_IMAGE}/${userId}`} />
  );
};

export default UploadComponent;
