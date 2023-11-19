import { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';

export const UpdateUserLocation = async ({ lat, long }) => {
  const user = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(user, {
    'custom:lat': lat.toString(),
    'custom:long': long.toString(),
  });
  return user;
};

export const getUser = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (userDetails === null) {
          const { username, attributes } =
            (await Auth.currentAuthenticatedUser()) || null;
          setUserDetails({
            userId: username,
            email: attributes?.email,
            emailVerified: attributes?.email_verified,
            location: {
              lat: attributes['custom:lat']?.toString(),
              long: attributes['custom:long']?.toString(),
            },
          });
        }
      } catch {
        setUserDetails(null);
      }
    };

    getUserDetails();
    Hub.listen('auth', () => getUserDetails());
  }, [Auth, userDetails, setUserDetails]);

  return userDetails;
};

export default getUser;

export const isUserAdmin = (user) => {
  const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
  const isAdmin = groups && groups.includes('admin');
  return isAdmin;
};

export function useCheckAdminStatus() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups =
          user?.signInUserSession.accessToken.payload['cognito:groups'];
        const isAdmin = groups && groups.includes('admin');
        setIsAdmin(isAdmin);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return [isAdmin, loading, error];
}
