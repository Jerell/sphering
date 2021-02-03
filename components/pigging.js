import NumberInput from "./inputs/numberInput";

export default function Pigging() {
  return (
    <div className="grid col-span-full grid-cols-12 gap-2 my-12 items-center">
      <p className="italic col-span-2">
        First pig enters at <span className="font-semibold">41</span> hours.
      </p>
      <NumberInput
        label="Pigging period"
        placeholder={20}
        unit="hours"
        unitRight
      />
      <NumberInput
        label="Transit time"
        placeholder={20}
        unit="hours"
        unitRight
      />
      <NumberInput
        label="Time in run"
        placeholder={20}
        unit="hours"
        unitRight
      />
      {/* <div className="col-span-full">
      </div> */}
    </div>
  );
}
