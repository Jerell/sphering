import { easePoly } from "d3";

function UnitSelect({ type }) {
  let options;
  switch (type) {
    case "currency":
      options = ["£", "€", "MYR", "US$", "AU$", "PKR"];
      break;
    default:
      options = ["unit 1", "unit 2"];
  }
  return (
    <div className="inline-flex mx-1">
      <label htmlFor="unit" className="sr-only">
        Unit
      </label>
      <select name="unit" className="outline-none">
        {options.map((o, i) => (
          <option key={i}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function NumberInput({
  label,
  labelClasses,
  required,
  newLine = false,
  lineBreak = false,
  unit,
  unitRight = false,
  units,
  fn,
  min = 0,
  placeholder,
  border = true,
  center,
  inputWidth = 2,
}) {
  function handleChange(e) {
    e.persist();
    if (fn) {
      fn(e.target.value);
    }
  }
  return (
    <>
      {newLine && <div className="col-span-12"></div>}
      {label && (
        <label htmlFor={label} className={`text-right ${labelClasses}`}>
          {label[0].toUpperCase() + label.substr(1)}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`col-span-${inputWidth} flex ${
          border && "border"
        } border-gray-300 focus-within:ring-red-500 focus-within:border-red-500 p-2
        } ${unitRight ? "" : "pr-0"} ${unitRight && "flex-row-reverse"}`}
      >
        {unit && <span className="inline-flex mx-1">{unit}</span>}
        {units && <UnitSelect type={units}></UnitSelect>}
        <input
          type="number"
          min={min}
          name={label}
          className={`focus:outline-none w-full ${
            !border && "bg-transparent border-b border-gray-400"
          } ${center && "text-center"}`}
          onChange={handleChange}
          placeholder={placeholder}
        ></input>
      </div>
      {lineBreak && <div className="col-span-12"></div>}
    </>
  );
}
