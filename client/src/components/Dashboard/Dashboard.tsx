import React, { useState, useEffect } from "react";
import DashService from "./DashService";
import Header from "./Header";
import Forcast from "./Forcast/Forcast";
import GlobalMap from "./GlobalMap";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [state, setState] = useState({
    initialLoadHandled: false,
    forcast: "",
    coordinates: { latitude: null, longitude: null },
    locationName: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      currentPositionGrabbed,
      errorGettingCurrentPosition
    );
  }, []);

  async function currentPositionGrabbed(position) {
    const locationData = await DashService.getLocationDataFromCoordinates({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    setState({
      initialLoadHandled: true,
      forcast: locationData.forcast,
      coordinates: {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      },
      locationName: locationData.name,
    });
  }

  function errorGettingCurrentPosition() {
    console.log("Error grabbing current position... setting to default");
  }

  async function handleMapClick(e: unknown) {
    const locationData = await DashService.getLocationDataFromCoordinates({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });

    setState({
      initialLoadHandled: true,
      forcast: locationData.forcast,
      coordinates: {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      },
      locationName: locationData.name,
    });
  }

  async function handleLocationRequest(e) {
    if (e.key === "Enter") {
      const locationData = await DashService.getLocationDataFromName(
        e.target.value
      );

      setState({
        initialLoadHandled: true,
        forcast: locationData.forcast,
        coordinates: {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        },
        locationName: locationData.name,
      });
    }
  }

  return (
    <>
      <main className={styles.main}>
        <Header
          handleLocationSearch={handleLocationRequest}
          locationName={state.locationName}
        />
        <section className={styles.grid}>
          <Forcast forcast={state.forcast}></Forcast>
          <div></div>
          <GlobalMap
            coordinates={state.coordinates}
            handleMapClick={handleMapClick}
          ></GlobalMap>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
