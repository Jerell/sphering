import NumberInput from "../components/inputs/numberInput";
import styles from "../styles/calcTable.module.css";

export function DataTable() {
  return (
    <>
      <div className="min-w-full col-span-full grid grid-cols-10 gap-1">
        <div className={styles.heading}>
          <div>Gas flowrate at Southwark Platform</div>
          <div>MMscfd</div>
        </div>
        <div className={styles.heading}>
          <div>Gas flowrate at Blythe Platform</div>
          <div>MMscfd</div>
        </div>
        <div className={styles.heading}>
          <div>Condensate flowrate at Bacton</div>
          <div>
            <div>bbl/d</div>
            <div>m3/h</div>
          </div>
        </div>
        <div className={`${styles.heading} col-span-2`}>
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
        <div className={`${styles.heading} col-span-2`}>
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
        <div className={styles.heading}>
          <div>Pressure drop</div>
          <div>Blythe</div>
          <div>barg</div>
        </div>
        <div className={`${styles.heading} col-span-2`}>
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
    </>
  );
}

export default function CalcTable() {
  return (
    <>
      <h1 className="text-xl mb-4">Calculation Table</h1>
      <form className="grid grid-cols-1 md:grid-cols-9 gap-2 items-center">
        <NumberInput
          label="CGR Southwark Line"
          placeholder={0.89}
          unit="bbl/MMscfd"
          unitRight
        />
        <NumberInput
          label="CGR Blythe Platform"
          placeholder={20.21}
          unit="bbl/MMscfd"
          unitRight
          lineBreak
        />
        <DataTable />
      </form>
    </>
  );
}
