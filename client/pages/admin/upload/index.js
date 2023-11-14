import Layout from '../../../components/Layout/Layout';
import Upload from '../../../components/Upload';
import { BASE_UPLOAD_IMAGE } from '../../../utils/api-end-points';
import { useCheckAdminStatus } from '../../../utils/auth';

const UploadComponent = () => {
  const [isAdmin] = useCheckAdminStatus();
  if (isAdmin) {
    return <Upload backRoute={BASE_UPLOAD_IMAGE} isAdmin="true" />;
  } else {
    return <div>Not an Admin</div>;
  }
};

export default UploadComponent;
