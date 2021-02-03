import DateStr from "./dateStr";
import { format } from "date-fns";

export default function WeekPicker({ date, update, disabled = false }) {
  date = new Date(date);
  function handleChange(e) {
    e.persist();
    let d = new Date(e.target.value);
    update(d.end());
  }
  return (
    <div className="relative w-full">
      <input
        type="date"
        name="date"
        id="date"
        className=""
        autoComplete="off"
        value={date ? format(date, "yyyy-MM-dd") : null}
        className="relative p-1 w-full border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 text-transparent bg-transparent focus:text-current focus:bg-white z-10"
        onChange={handleChange}
        disabled={disabled}
      />
      <DateStr
        dateString={format(date, "yyyy-MM-dd")}
        className={`absolute bg-white top-1 left-1 py-1 text-sm z-0 ${
          disabled && "line-through"
        }`}
      ></DateStr>
    </div>
  );
}
