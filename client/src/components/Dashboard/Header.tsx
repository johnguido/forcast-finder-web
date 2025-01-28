import styles from "./Header.module.css";

interface HeaderProps {
  handleLocationSearch(e: React.KeyboardEvent): void;
  locationName: string | null;
}

const Header = ({ handleLocationSearch, locationName }: HeaderProps) => {
  return (
    <>
      <header className={styles.main}>
        <div className={styles.headerDashNotification}>
          <div className={styles.dashNotificationCircle}>
            <img
              height="45%"
              width="auto"
              src="./imgs/dashboard.png"
              alt="Dashboard"
            />
          </div>
          <div className={styles.dashNotificationCircle}>
            <img
              height="45%"
              width="auto"
              src="./imgs/notification.png"
              alt="Notification"
            />
          </div>
        </div>
        <div className={styles.headerCurrentLocation}>
          <img src="./imgs/locationPin.png" alt="location pin" />
          {locationName ? (
            <h3>{locationName}</h3>
          ) : (
            <h3>Loading forcast data...</h3>
          )}
        </div>
        <div className={styles.headerLocationSearch}>
          <input
            onKeyDown={(e) => handleLocationSearch(e)}
            id="location-search"
            type="text"
            name="location"
            placeholder="Search location..."
            autoComplete="off"
          />
        </div>
        <div className={styles.headerThemeSwitch}>
          <div className={styles.headerThemeCircle}>THEME SWITCH</div>
        </div>
        <div className={styles.headerProfile}>
          <img
            height="120%"
            width="auto"
            src="./imgs/profile.png"
            alt="Profile"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
