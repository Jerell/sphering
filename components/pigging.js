import NumberInput from "./inputs/numberInput";
import XY from "./xy";
import { useState, useEffect } from "react";
import { round } from "../public/utils";

export default function Pigging({ journey, period, transitTime }) {
  const defaults = {
    period: 20,
    timeInRun: 70,
    transit: 70,
  };

  // const [hasChanged, setHasChanged] = useState(false);

  // const [period, setPeriod] = useState(defaults.period);
  const [timeInRun, setTimeInRun] = useState(defaults.timeInRun);
  // const [transitTime, setTransitTime] = useState(defaults.transit);

  // const updatePeriod = (n) => setPeriod(n ? n : defaults.period);
  const updateTimeInRun = (n) => setTimeInRun(n ? n : defaults.timeInRun);
  // const updateTransitTime = (n) => setTransitTime(n ? n : defaults.transit);

  // useEffect(() => {
  //   setHasChanged(nomax !== Infinity);
  // }, [period]);
  // const firstEntry = 2 * period + 1;

  return (
    <div className="grid col-span-full grid-cols-12 gap-2 my-6 items-center">
      {/* <p className="italic col-span-2">
        {hasChanged ? (
          <>
            First pig enters at{" "}
            <span className="font-semibold">{round(firstEntry, 1)}</span> hours.
          </>
        ) : null}
      </p> */}
      {/* <NumberInput
        label="Pigging period"
        placeholder={defaults.period}
        unit="hours"
        unitRight
        fn={updatePeriod}
      /> */}
      {/* <NumberInput
        label="Transit time"
        placeholder={defaults.transit}
        unit="hours"
        unitRight
        fn={updateTransitTime}
      /> */}
      <NumberInput
        label="Time in run"
        placeholder={defaults.timeInRun}
        unit="hours"
        unitRight
        fn={updateTimeInRun}
      />
      <div className="col-span-full">
        <XY
          period={period}
          transitTime={transitTime}
          timeInRun={timeInRun}
          journey={journey}
        />
      </div>
    </div>
  );
}
