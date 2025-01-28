import styles from "./Header.module.css";

interface HeaderProps {
  handleTemperatureSelect(isChecked: boolean): void;
}

const Header = ({ handleTemperatureSelect }: HeaderProps) => {
  return (
    <div className={styles.upper}>
      <div className={styles.daySelect}>
        <h2 className={styles.daySelectOption} id="today">
          Today
        </h2>
        <h2 className={styles.daySelectOption} id="tomorrow">
          Tomorrow
        </h2>
        <h2 className={styles.daySelectOption} id={styles.nextSeven}>
          Next 7 days
        </h2>
      </div>
      <div className={styles.temperatureSwitch}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            onChange={(e) => handleTemperatureSelect(e.target.checked)}
          ></input>
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  );
};

export default Header;
