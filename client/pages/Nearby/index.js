import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Nearby.module.scss";
import Button from "../../components/Button/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetLocation } from "../../redux/userSlice";

const Nearby = (props) => {
  const dispatch = useDispatch();
  const { id: userId, location } = useSelector((state) => state.user);
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
        dispatch(SetLocation(crd));
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
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (location) {
      (async () => {
        const { data } = await axios.post(
          `http://localhost:5000/api/location`,
          {
            latitude: location.latitude,
            longitude: location.longitude,
            userId: userId,
          }
        );
        console.log(data);
      })();
    }

    return () => {};
  }, [location]);

  return (
    <Layout {...props}>
      {!location ? (
        <div className={styles["Nearby"]}>
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
