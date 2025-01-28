import { useState } from "react";
import Header from "./Header";
import Display from "./Display";

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

interface ForcastProps {
  forcast: { days: Array<forcastDay> };
}

const Forcast = ({ forcast }: ForcastProps) => {
  const [temperatureSelection, setTemperatureSelection] = useState("F");

  function handleTemperatureSelect(isChecked: boolean) {
    if (isChecked) {
      setTemperatureSelection("C");
    } else {
      setTemperatureSelection("F");
    }
  }

  return (
    <>
      <section>
        <Header handleTemperatureSelect={handleTemperatureSelect}></Header>
        <Display
          forcastDays={forcast ? forcast.days : null}
          temperatureSelection={temperatureSelection}
        ></Display>
      </section>
    </>
  );
};

export default Forcast;
