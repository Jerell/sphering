export default function LabelSelect({
  label,
  options,
  labelClasses,
  multiple = false,
  required = false,
  newLine = false,
  lineBreak = false,
  update,
}) {
  function handleChange(e) {
    e.persist();
    if (update) {
      update(e.target.value);
    }
  }
  return (
    <>
      {newLine && <div className="col-span-12"></div>}
      <label
        htmlFor={label}
        className={`text-right ${labelClasses ? labelClasses : ""}`}
      >
        {label[0].toUpperCase() + label.substr(1)}
        {multiple && <span className="text-gray-500">(s)</span>}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={label}
        className="col-span-2 border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 p-2"
        multiple={multiple}
        onChange={handleChange}
      >
        {options.map((o, i) => (
          <option key={i}>{o}</option>
        ))}
      </select>
      {lineBreak && <div className="col-span-12"></div>}
    </>
  );
}
