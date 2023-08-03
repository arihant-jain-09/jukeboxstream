import App from '../components/App/App';
import { useDispatch } from 'react-redux';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { SetUser } from '../redux/userSlice';

const Home = ({ signOut, user }) => {
  const dispatch = useDispatch();
  const user_id = user.signInUserSession.idToken.payload.sub;
  const user_email = user.signInUserSession.idToken.payload.email;
  dispatch(SetUser({ email: user_email, id: user_id }));
  return <App />;
  // return 'hi';
};
export default withAuthenticator(Home);
