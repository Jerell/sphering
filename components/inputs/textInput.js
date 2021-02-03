export default function TextInput({
  label,
  labelClasses,
  required,
  newLine = false,
  lineBreak = false,
}) {
  return (
    <>
      {newLine && <div className="col-span-12"></div>}
      <label htmlFor={label} className={`text-right ${labelClasses}`}>
        {label[0].toUpperCase() + label.substr(1)}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        name={label}
        className={`col-span-2 border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 p-2`}
      ></input>
      {lineBreak && <div className="col-span-12"></div>}
    </>
  );
}
