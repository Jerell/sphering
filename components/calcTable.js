import NumberInput from "../components/inputs/numberInput";
import styles from "../styles/calcTable.module.css";

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

function CaseRow({ casenum }) {
  const cln = "case";
  return (
    <>
      <div
        className={`${styles.row}`}
        // style={{ "--label": "guh" }}
        data-label={`case number ${casenum}`}
      >
        <div className={styles[cln]}>
          <div>
            <NumberInput
              required
              border={false}
              unitRight
              placeholder={33}
              center
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
            />
          </div>
        </div>
        <div className={styles[cln]}>
          <div>
            <div>1527</div>
            <div>10</div>
          </div>
        </div>
        <div className={`${styles[cln]} col-span-2`}>
          <div>
            <div>29</div>
            <div>1497</div>
          </div>
        </div>
        <div className={`${styles[cln]} col-span-2`}>
          <div>
            <div>87-89</div>
            <div>86</div>
          </div>
        </div>
        <div className={styles[cln]}>
          <div>6.2</div>
        </div>
        <div className={`${styles[cln]} col-span-2`}>
          <div>
            <div>2</div>
            <div>21</div>
            <div>33</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DataTable() {
  return (
    <>
      <Headings />
      <CaseRow casenum={1} />
      <CaseRow casenum={2} />
      <CaseRow casenum={3} />
      <CaseRow casenum={4} />
    </>
  );
}

export default function CalcTable() {
  return (
    <>
      <h1 className="text-xl mb-4">Calculation Table</h1>
      <form className="grid grid-cols-1 md:grid-cols-9 gap-2 items-center">
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
          inputWidth={1}
          label="CGR Southwark Line"
          placeholder={0.89}
          unit="bbl/MMscfd"
          unitRight
          newLine
        />
        <NumberInput
          inputWidth={1}
          label="CGR Blythe Platform"
          placeholder={20.21}
          unit="bbl/MMscfd"
          unitRight
          lineBreak
        />
        <div className="contents">
          <DataTable />
        </div>
      </form>
    </>
  );
}
