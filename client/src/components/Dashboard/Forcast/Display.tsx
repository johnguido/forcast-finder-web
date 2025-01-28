import { useState } from "react";
import ForcastCard from "./ForcastCard";
import styles from "./Display.module.css";

interface DisplayProps {
  forcast: unknown;
  temperatureSelection: string;
}

const Display = ({ forcast, temperatureSelection }: DisplayProps) => {
  const [activeCard, setActiveCard] = useState(0);

  function handleActiveCardSelect(id: number) {
    setActiveCard(id);
  }

  const forcastJsx = [];

  for (let i = 0; i < 7; i++) {
    if (i === activeCard) {
      forcastJsx.push(
        <ForcastCard
          forcastDay={forcast ? forcast[i] : null}
          temperatureSelection={temperatureSelection}
          isActive={true}
          id={i.toString()}
          handleActiveCardSelect={handleActiveCardSelect}
          key={i}
        />
      );
    } else {
      forcastJsx.push(
        <ForcastCard
          forcastDay={forcast ? forcast[i] : null}
          temperatureSelection={temperatureSelection}
          isActive={false}
          id={i.toString()}
          handleActiveCardSelect={handleActiveCardSelect}
          key={i}
        />
      );
    }
  }

  return <div className={styles.mainForcastLower}>{forcastJsx}</div>;
};

export default Display;
