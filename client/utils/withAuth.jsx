import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
  const WrapperComponent = (props) => {
    const router = useRouter();
    const { user } = useAuthenticator((context) => [context.user]);
    const [signedUser, setSignedUser] = useState(user);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const obj = await Auth.currentAuthenticatedUser();
          const userObj = {
            'custom:lat': obj.signInUserSession.idToken.payload['custom:lat'],
            'custom:long': obj.signInUserSession.idToken.payload['custom:long'],
            email: obj.signInUserSession.idToken.payload.email,
            id: obj.signInUserSession.idToken.payload.sub,
          };
          setSignedUser(userObj);
        } catch (err) {
          router.push('/');
        }
      };

      checkAuth();
    }, [router, user]);

    return <WrappedComponent {...props} user={signedUser} />;
  };

  return WrapperComponent;
};

export default withAuth;
