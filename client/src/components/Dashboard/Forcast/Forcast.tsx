import { useState } from "react";
import Header from "./Header";
import Display from "./Display";

interface ForcastProps {
  forcast: unknown;
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
          forcast={forcast.days}
          temperatureSelection={temperatureSelection}
        ></Display>
      </section>
    </>
  );
};

export default Forcast;
