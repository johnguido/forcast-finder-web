import styles from "./ForcastCard.module.css";

interface forcastDay {
  datetime: string;
  icon: string;
  temp: number;
  feelslike: number;
  winddir: number;
  windspeed: number;
  humidity: number;
  uvindex: number;
  sunriseEpoch: number;
  sunsetEpoch: number;
}

interface ForcastCardProps {
  forcastDay: forcastDay;
  temperatureSelection: string;
  isActive: boolean;
  id: string;
  handleActiveCardSelect(id: number): void;
}

const ForcastCard = ({
  forcastDay,
  temperatureSelection,
  isActive,
  id,
  handleActiveCardSelect,
}: ForcastCardProps) => {
  function getDayName(): string {
    const today = new Date(
      forcastDay.datetime.replace(/-/g, "/").replace(/T.+/, "")
    );

    const day = today.getDay();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysOfWeekForActive = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (isActive) {
      return daysOfWeekForActive[day];
    } else {
      return daysOfWeek[day];
    }
  }

  function getTemperature(): number {
    let temp = forcastDay.temp;

    if (temperatureSelection == "C") {
      temp = (temp - 32) / 1.8;
    }

    return Math.round(temp);
  }

  function getFeelsLike(): number {
    let feelslike = forcastDay.feelslike;

    if (temperatureSelection == "C") {
      feelslike = (feelslike - 32) / 1.8;
    }

    return Math.round(feelslike);
  }

  function getWindDirection() {
    const degrees = forcastDay.winddir;

    if ((degrees >= 0 && degrees <= 23) || (degrees >= 337 && degrees <= 360)) {
      return "N";
    }

    if (degrees >= 24 && degrees <= 68) {
      return "NE";
    }

    if (degrees >= 69 && degrees <= 113) {
      return "E";
    }

    if (degrees >= 114 && degrees <= 158) {
      return "SE";
    }

    if (degrees >= 159 && degrees <= 203) {
      return "S";
    }

    if (degrees >= 204 && degrees <= 248) {
      return "SW";
    }

    if (degrees >= 249 && degrees <= 293) {
      return "W";
    }

    if (degrees >= 294 && degrees <= 336) {
      return "NW";
    }
  }

  function formatDate(date: Date) {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    const am_pm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    return hours + ":" + minutes + " " + am_pm;
  }

  if (forcastDay == null) {
    return (
      <>
        {isActive ? (
          <div className={styles.forcastCardActive} id={id}>
            <div className={styles.forcastCardActiveUpper}>
              <div>Monday</div>
              <div>11:49 AM</div>
            </div>
            <div className={styles.forcardCardActiveLower}>
              <div className={styles.forcastCardActiveLowerLeft}>
                <div>16°</div>
                <div>
                  <h6>Real Feel: 10°</h6>
                  <h6>Wind: NE 8 mph</h6>
                  <h6>Humidity: 51%</h6>
                  <h6>UV: 1</h6>
                </div>
              </div>
              <div className={styles.forcastCardActiveLowerRight}>
                <div className={styles.forcastCardActiveLowerRightImage}>
                  <img src="./imgs/weather/clear-day.png" alt="Clear Day" />
                </div>
                <div className={styles.forcastCardActiveLowerRightSunTime}>
                  <h6>Sunrise: 7:59 AM</h6>
                  <h6>Sunset: 6:31 PM</h6>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={styles.forcastCard}
            onClick={() => handleActiveCardSelect(parseInt(id))}
            id={id}
          >
            <div className={styles.forcastCardUpper}>Tue</div>
            <div className={styles.forcastCardMiddle}>
              <img src="./imgs/weather/clear-day.png" alt="Clear Day" />
            </div>
            <div className={styles.forcastCardLower}>10°</div>
          </div>
        )}
      </>
    );
  }

  //forcast data populated

  return (
    <>
      {isActive ? (
        <div className={styles.forcastCardActive} id={id}>
          <div className={styles.forcastCardActiveUpper}>
            <div>{getDayName()}</div>
            <div> {formatDate(new Date())}</div>
          </div>
          <div className={styles.forcardCardActiveLower}>
            <div className={styles.forcastCardActiveLowerLeft}>
              <div>{getTemperature()}°</div>
              <div>
                <h6>Real Feel: {getFeelsLike()}°</h6>
                <h6>
                  Wind: {getWindDirection()} {Math.round(forcastDay.windspeed)}{" "}
                  mph
                </h6>
                <h6>Humidity: {Math.round(forcastDay.humidity)}%</h6>
                <h6>UV: {forcastDay.uvindex}</h6>
              </div>
            </div>
            <div className={styles.forcastCardActiveLowerRight}>
              <div className={styles.forcastCardActiveLowerRightImage}>
                <img
                  src={"./imgs/weather/" + forcastDay.icon + ".png"}
                  alt={forcastDay.icon}
                />
              </div>
              <div className={styles.forcastCardActiveLowerRightSunTime}>
                <h6>
                  Sunrise:{" "}
                  {formatDate(new Date(forcastDay.sunriseEpoch * 1000))}
                </h6>
                <h6>
                  Sunset: {formatDate(new Date(forcastDay.sunsetEpoch * 1000))}
                </h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={styles.forcastCard}
          onClick={() => handleActiveCardSelect(parseInt(id))}
          id={id}
        >
          <div className={styles.forcastCardUpper}>{getDayName()}</div>
          <div className={styles.forcastCardMiddle}>
            <img
              src={"./imgs/weather/" + forcastDay.icon + ".png"}
              alt={forcastDay.icon}
            />
          </div>
          <div className={styles.forcastCardLower}>{getTemperature()}°</div>
        </div>
      )}
    </>
  );
};

export default ForcastCard;
