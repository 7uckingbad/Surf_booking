import styles from "./Location.module.scss";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
//* координаты линия изгиба надо еще добавить
import marker from "../../assets/LocationService/marker.svg";
import busImg from "../../assets/LocationService/bus.svg";
import carImg from "../../assets/LocationService/car.svg";
import locationImg from "../../assets/LocationService/location.svg";
import vector from "../../assets/IntroSectionImages/Vector.svg";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 39.354791,
  lng: -9.397044,
};

const handleOpenMaps = () => {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`,
    "_blank",
  );
};

export const LocationSection = () => {
  console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  return (
    <section className={styles.locationSection} id="location">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker
            position={center}
            icon={{
              url: marker,
            }}
          />
        </GoogleMap>
      </LoadScript>

      <div className={styles.infoCard}>
        <h2 className={styles.infoCardTitle}>VISIT OUR CAMP</h2>
        <h3 className={styles.infoCardLocationText}>OUR LOCATION</h3>
        <p className={styles.infoCardText}>
          We are located in the heart of Peniche, just steps from the best surf
          spots. Whether you're driving or taking the bus, we are easy to reach.
        </p>
        <div className={styles.detailsList}>
          <div className={styles.detailItem}>
            <img src={busImg} alt="" className={styles.detailimage} />
            Bus: 1 hour from Lisbon (Route 788)
          </div>
          <div className={styles.detailItem}>
            <img src={carImg} alt="" className={styles.detailimage} />
            Parking: Free on-site parking available
          </div>
          <div className={styles.detailItem}>
            <img src={locationImg} alt="" className={styles.detailimage} />
            Address: Av. do Mar 24, Peniche, Portugal
          </div>
        </div>

        <button className={styles.detailsBlockButton} onClick={handleOpenMaps}>
          Open in Google Maps <img src={vector} alt="" />
        </button>
      </div>
    </section>
  );
};
