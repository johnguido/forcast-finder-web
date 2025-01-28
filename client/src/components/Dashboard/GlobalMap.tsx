import Map from "react-map-gl";
import styles from "./GlobalMap.module.css";
import "mapbox-gl/dist/mapbox-gl.css";

interface GlobalMapProps {
  coordinates: { latitude: number | null; longitude: number | null };
  handleMapClick(e: unknown): void;
}

const GlobalMap = ({ coordinates, handleMapClick }: GlobalMapProps) => {
  if (coordinates.latitude == null || coordinates.longitude == null) {
    return <></>;
  }

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapUpper}>
        <h2>Global Map</h2>
      </div>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiY3dhZ2dnZXIiLCJhIjoiY201Mzd6dHlhMDh1MzJrcTNuazF1czdhZyJ9.gWM80xo6ayAXjemlWVNDIA"
        initialViewState={{
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          zoom: 5,
        }}
        style={{
          width: "100%",
          height: "96%",
          borderRadius: "30px 30px 30px 30px",
        }}
        onClick={(e: unknown) => handleMapClick(e)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      />
    </div>
  );
};

export default GlobalMap;
