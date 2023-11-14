import Layout from '../../components/Layout/Layout';
import { useCheckAdminStatus } from '../../utils/auth';

const Admin = (props) => {
  const [isAdmin] = useCheckAdminStatus();
  console.log(isAdmin);

  if (isAdmin) {
    return <Layout {...props} isAdmin="true"></Layout>;
  } else {
    return <div>Not an Admin</div>;
  }
};

export default Admin;
