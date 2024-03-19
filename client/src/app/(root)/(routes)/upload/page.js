"use client";
import Upload from "@/components/Upload";
import { BASE_UPLOAD_IMAGE } from "@/utils/api-end-points";
import getUser from "@/utils/auth";
const UploadPage = () => {
  const user = getUser();
  if (!user) return null;
  const userId = user.userId;
  return <Upload backRoute={`${BASE_UPLOAD_IMAGE}/${userId}`} />;
};

export default UploadPage;
