import NumberInput from "../components/inputs/numberInput";
import styles from "../styles/calcTable.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { round } from "../public/utils";

function Headings() {
  const cln = "heading";
  return (
    <div className={`${styles.row}`}>
      <div className={styles[cln]}>
        <div>Gas flowrate at SW Platform</div>
        <div>MMscfd</div>
      </div>
      <div className={styles[cln]}>
        <div>Gas flowrate at BY Platform</div>
        <div>MMscfd</div>
      </div>
      <div className={styles[cln]}>
        <div>Condensate flowrate at BC</div>
        <div>
          <div>bbl/d</div>
          <div>m3/h</div>
        </div>
      </div>
      <div className={`${styles[cln]} col-span-2`}>
        <div>Condensate Flowrate</div>
        <div>
          <div>SW</div>
          <div>BY</div>
        </div>
        <div>
          <div>bbl/d</div>
          <div>bbl/d</div>
        </div>
      </div>
      <div className={`${styles[cln]} col-span-2`}>
        <div>Backpressure</div>
        <div>
          <div>SW</div>
          <div>BY</div>
        </div>
        <div>
          <div>barg</div>
          <div>barg</div>
        </div>
      </div>
      <div className={styles[cln]}>
        <div>Pressure drop</div>
        <div>BY</div>
        <div>barg</div>
      </div>
      <div className={`${styles[cln]} col-span-2`}>
        <div>Pigging</div>
        <div>
          <div>No. (max)</div>
          <div>Period</div>
          <div>Transit time</div>
        </div>
        <div>
          <div className="invisible">N/A</div>
          <div>hours</div>
          <div>hours</div>
        </div>
      </div>
    </div>
  );
}

function CaseRow({ casenum, cgrSW, cgrBY, addRow, selectCase, selected }) {
  const cln = "case";

  const [gfrSW, setgfrSW] = useState(0);
  const [gfrBY, setGfrBY] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);

  // const [nomax, setNoMax] = useState(0);

  let wasEmpty = true;

  function emptyCheck() {
    const bothInputsEntered = gfrSW && gfrBY;
    wasEmpty = isEmpty;
    setIsEmpty(!bothInputsEntered);
  }

  function emptyTrigger() {
    if (wasEmpty && !isEmpty) {
      addRow(casenum);
    }
  }

  useEffect(emptyTrigger, [isEmpty]);

  useEffect(() => {
    // if (setPeriod) setPeriod(pigging.period);
    // if (setTransit) setTransit(pigging.transit);
    emptyCheck();
  }, [gfrSW, gfrBY]);

  const updateGfrS = (n) => setgfrSW(n ? n : 0);
  const updateGfrB = (n) => setGfrBY(n ? n : 0);

  const columnU = parseFloat(gfrSW) + 0.1 * parseFloat(gfrBY);

  const condensateFR = {
    SW: gfrSW * cgrSW,
    BY: gfrBY * cgrBY,
  };

  const cfrAtBC = {
    bb: condensateFR.SW + condensateFR.BY,
    m3: function () {
      return this.bb * 0.0066;
    },
  };

  const backPressure = {
    BY: 0.0021 * gfrBY ** 2 - 0.151 * gfrBY + 86.101,
  };

  const pressureDrop = {
    BY: backPressure.BY * 0.651 - 50.113,
  };

  const pigging = {
    period: 0.3195 * cfrAtBC.m3() ** 2 - 9.5667 * cfrAtBC.m3() + 85.095,
    transit: 2315.4 * columnU ** -1.148,
  };

  const numberMax = Math.ceil(
    Math.ceil(pigging.transit) / Math.ceil(pigging.period)
  );

  const spheresAndPressure = [
    "N/A",
    "85-86",
    "87-89",
    "89-90",
    "90-91",
    ">91",
    ">91",
    ">91",
    ">91",
    ">91",
    ">91",
  ];

  return (
    <>
      <div
        className={`${styles.row} ${!gfrSW && !gfrBY && styles.rowIncomplete}`}
        data-label={`case number ${casenum}`}
      >
        <FontAwesomeIcon
          icon={faPlayCircle}
          className={`${styles.rowChart} ${selected && styles.selectedCase} ${
            (!gfrSW || !gfrBY) && styles.caseIncomplete
          }`}
          onClick={() => {
            if (!gfrSW || !gfrBY) return;
            selectCase({ ...pigging, casenum });
          }}
        />
        <div className={styles[cln]}>
          <div>
            <NumberInput
              required
              border={false}
              unitRight
              placeholder={33}
              center
              fn={updateGfrS}
            />
          </div>
        </div>
        <div className={styles[cln]}>
          <div>
            <NumberInput
              required
              border={false}
              unitRight
              placeholder={74.1}
              center
              fn={updateGfrB}
            />
          </div>
        </div>
        <div className={styles[cln]}>
          <div>
            <div>{round(cfrAtBC.bb)}</div>
            <div>{round(cfrAtBC.m3())}</div>
          </div>
        </div>
        <div className={`${styles[cln]} col-span-2`}>
          <div>
            <div>{round(condensateFR.SW)}</div>
            <div>{round(condensateFR.BY)}</div>
          </div>
        </div>
        <div className={`${styles[cln]} col-span-2`}>
          <div>
            <div>{spheresAndPressure[numberMax]}</div>
            <div>{round(backPressure.BY)}</div>
          </div>
        </div>
        <div className={styles[cln]}>
          <div>{round(pressureDrop.BY, 1)}</div>
        </div>
        <div className={`${styles[cln]} col-span-2`}>
          <div>
            <div>{numberMax}</div>
            <div>{round(pigging.period)}</div>
            <div>{round(pigging.transit)}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DataTable({ cgrSW, cgrBY, setPeriod, setTransit }) {
  const [numRows, setNumRows] = useState(1);
  const [selectedCaseNum, setSelectedCaseNum] = useState(0);

  function selectCase({ period, transit, casenum }) {
    setPeriod(period);
    setTransit(transit);
    setSelectedCaseNum(casenum);
  }

  const rows = Array.apply(null, { length: numRows }).map((e, i) => (
    <CaseRow
      casenum={i + 1}
      cgrSW={cgrSW}
      cgrBY={cgrBY}
      addRow={addRow}
      key={i}
      setPeriod={setPeriod}
      setTransit={setTransit}
      selectCase={selectCase}
      selected={selectedCaseNum === i + 1}
    />
  ));

  const addRowButton = (
    <p className={styles.addRow} onClick={() => addRow(numRows)}>
      Add new case
    </p>
  );

  const removeRowButton =
    numRows > 1 ? (
      <FontAwesomeIcon
        icon={faMinusCircle}
        className={styles.rowRemove}
        onClick={() => setNumRows(numRows - 1)}
      />
    ) : null;

  function addRow(which) {
    if (which === numRows) setNumRows(numRows + 1);
  }

  return (
    <>
      <Headings />
      {rows}
      {removeRowButton}
      {addRowButton}
    </>
  );
}

export default function CalcTable({ setPeriod, setTransit }) {
  const defaults = {
    cgrs: 0.8909,
    cgrb: 20.205,
  };
  const [cgrSW, setcgrSW] = useState(defaults.cgrs);
  const [cgrBY, setcgrBY] = useState(defaults.cgrb);

  const updateCgrS = (n) => setcgrSW(n ? n : defaults.cgrs);
  const updateCgrB = (n) => setcgrBY(n ? n : defaults.cgrb);

  return (
    <>
      <h2 className="text-xl mb-2">Calculation Table</h2>
      <form className="grid col-span-full grid-cols-12 gap-2 items-center mb-4 relative">
        <div className="col-span-full">
          <p className="font-semibold">
            If no CGRs are specified then the default will be used.
          </p>
          <p className="italic">
            Defualt CGRs are based upon linear correlations from existing data
            of gas flowrates and condensate flowrates.
          </p>
        </div>
        <NumberInput
          // inputWidth={1}
          label="CGR SW Line"
          placeholder={defaults.cgrs}
          fn={updateCgrS}
          unit="bbl/MMscfd"
          unitRight
          newLine
        />
        <NumberInput
          // inputWidth={1}
          label="CGR BY Platform"
          placeholder={defaults.cgrb}
          fn={updateCgrB}
          unit="bbl/MMscfd"
          unitRight
          lineBreak
        />
        <div className="contents col-span-full">
          <DataTable
            cgrSW={cgrSW}
            cgrBY={cgrBY}
            setPeriod={setPeriod}
            setTransit={setTransit}
          />
        </div>
      </form>
    </>
  );
}
