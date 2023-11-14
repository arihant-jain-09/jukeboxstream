import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './Nearby.module.scss';
import Button from '../../components/Button/button';
import axios from 'axios';
import { BASE_LOCATION_ROUTE } from '../../utils/api-end-points';
import { UpdateUserLocation, getUser } from '../../utils/auth';

const Nearby = (props) => {
  const user = getUser();
  const [location, setLocation] = useState(null);
  console.log(user);
  const getLocation = () => {
    if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      const successCallback = (position) => {
        var crd = position.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        setLocation(crd);
      };

      const errorCallback = (error) => {
        console.log(error);
      };

      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (location) {
      (async () => {
        let user = await UpdateUserLocation({
          lat: location.latitude,
          long: location.longitude,
        });
        const { data } = await axios.post(BASE_LOCATION_ROUTE, {
          latitude: location.latitude,
          longitude: location.longitude,
          userId: user.username,
        });
        console.log(data);
      })();
    }

    return () => {};
  }, [location]);

  return (
    <Layout {...props}>
      {!location ? (
        <div className={styles['Nearby']}>
          <div>You need to enable Location Permission</div>
          <Button onClick={getLocation}>Grant Location</Button>
        </div>
      ) : (
        <div>Location accessed</div>
      )}
    </Layout>
  );
};

export default Nearby;
