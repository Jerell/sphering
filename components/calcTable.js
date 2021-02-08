import NumberInput from "../components/inputs/numberInput";
import styles from "../styles/calcTable.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faChartArea } from "@fortawesome/free-solid-svg-icons";
import { round } from "../public/utils";

function Headings() {
  const cln = "heading";
  return (
    <div className={`${styles.row}`}>
      <div className={styles[cln]}>
        <div>Gas flowrate at Southwark Platform</div>
        <div>MMscfd</div>
      </div>
      <div className={styles[cln]}>
        <div>Gas flowrate at Blythe Platform</div>
        <div>MMscfd</div>
      </div>
      <div className={styles[cln]}>
        <div>Condensate flowrate at Bacton</div>
        <div>
          <div>bbl/d</div>
          <div>m3/h</div>
        </div>
      </div>
      <div className={`${styles[cln]} col-span-2`}>
        <div>Condensate Flowrate</div>
        <div>
          <div>Southwark</div>
          <div>Blythe</div>
        </div>
        <div>
          <div>bbl/d</div>
          <div>bbl/d</div>
        </div>
      </div>
      <div className={`${styles[cln]} col-span-2`}>
        <div>Backpressure</div>
        <div>
          <div>Southwark</div>
          <div>Blythe</div>
        </div>
        <div>
          <div>barg</div>
          <div>barg</div>
        </div>
      </div>
      <div className={styles[cln]}>
        <div>Pressure drop</div>
        <div>Blythe</div>
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

function CaseRow({
  casenum,
  cgrSouthwark,
  cgrBlythe,
  addRow,
  setPeriod,
  setTransit,
  selectCase,
  selected,
}) {
  const cln = "case";

  const [gfrSouthwark, setGfrSouthwark] = useState(0);
  const [gfrBlythe, setGfrBlythe] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);

  // const [nomax, setNoMax] = useState(0);

  let wasEmpty = true;

  function emptyCheck() {
    const bothInputsEntered = gfrSouthwark && gfrBlythe;
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
    if (setPeriod) setPeriod(pigging.period);
    if (setTransit) setTransit(pigging.transit);
    emptyCheck();
  }, [gfrSouthwark, gfrBlythe]);

  const updateGfrS = (n) => setGfrSouthwark(n ? n : 0);
  const updateGfrB = (n) => setGfrBlythe(n ? n : 0);

  const columnU = parseFloat(gfrSouthwark) + 0.1 * parseFloat(gfrBlythe);

  const condensateFR = {
    southwark: gfrSouthwark * cgrSouthwark,
    blythe: gfrBlythe * cgrBlythe,
  };

  const cfrAtBacton = {
    bb: condensateFR.southwark + condensateFR.blythe,
    m3: function () {
      return this.bb * 0.0066;
    },
  };

  const backPressure = {
    blythe: 0.0021 * gfrBlythe ** 2 - 0.151 * gfrBlythe + 86.101,
  };

  const pressureDrop = {
    blythe: backPressure.blythe * 0.651 - 50.113,
  };

  const pigging = {
    period: 0.3195 * cfrAtBacton.m3() ** 2 - 9.5667 * cfrAtBacton.m3() + 85.095,
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
        className={`${styles.row} ${
          !gfrSouthwark && !gfrBlythe && styles.rowIncomplete
        }`}
        data-label={`case number ${casenum}`}
      >
        <FontAwesomeIcon
          icon={faChartArea}
          className={`${styles.rowChart} ${selected && styles.selectedCase}`}
          onClick={() => selectCase({ ...pigging, casenum })}
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
            <div>{round(cfrAtBacton.bb)}</div>
            <div>{round(cfrAtBacton.m3())}</div>
          </div>
        </div>
        <div className={`${styles[cln]} col-span-2`}>
          <div>
            <div>{round(condensateFR.southwark)}</div>
            <div>{round(condensateFR.blythe)}</div>
          </div>
        </div>
        <div className={`${styles[cln]} col-span-2`}>
          <div>
            <div>{spheresAndPressure[numberMax]}</div>
            <div>{round(backPressure.blythe)}</div>
          </div>
        </div>
        <div className={styles[cln]}>
          <div>{round(pressureDrop.blythe, 1)}</div>
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

export function DataTable({ cgrSouthwark, cgrBlythe, setPeriod, setTransit }) {
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
      cgrSouthwark={cgrSouthwark}
      cgrBlythe={cgrBlythe}
      addRow={addRow}
      key={i}
      setPeriod={setPeriod}
      setTransit={setTransit}
      selectCase={selectCase}
      selected={selectedCaseNum === i + 1}
    />
  ));

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
    </>
  );
}

export default function CalcTable({ setPeriod, setTransit }) {
  const defaults = {
    cgrs: 0.8909,
    cgrb: 20.205,
  };
  const [cgrSouthwark, setCgrSouthwark] = useState(defaults.cgrs);
  const [cgrBlythe, setCgrBlythe] = useState(defaults.cgrb);

  const updateCgrS = (n) => setCgrSouthwark(n ? n : defaults.cgrs);
  const updateCgrB = (n) => setCgrBlythe(n ? n : defaults.cgrb);

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
          label="CGR Southwark Line"
          placeholder={defaults.cgrs}
          fn={updateCgrS}
          unit="bbl/MMscfd"
          unitRight
          newLine
        />
        <NumberInput
          // inputWidth={1}
          label="CGR Blythe Platform"
          placeholder={defaults.cgrb}
          fn={updateCgrB}
          unit="bbl/MMscfd"
          unitRight
          lineBreak
        />
        <div className="contents col-span-full">
          <DataTable
            cgrSouthwark={cgrSouthwark}
            cgrBlythe={cgrBlythe}
            setPeriod={setPeriod}
            setTransit={setTransit}
          />
        </div>
      </form>
    </>
  );
}
