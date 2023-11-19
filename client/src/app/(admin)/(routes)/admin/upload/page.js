import Upload from '@/components/Upload';
import { BASE_UPLOAD_IMAGE } from '@/utils/api-end-points';

const UploadComponent = () => {
  return <Upload backRoute={BASE_UPLOAD_IMAGE} isAdmin="true" />;
};

export default UploadComponent;
