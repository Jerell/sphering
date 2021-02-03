import { format } from "date-fns";

function DayInput({ day, placeholder, taskName, required }) {
  return (
    <div
      className={`relative mt-3 m-2 ${
        !required ? "opacity-70" : ""
      } focus-within:opacity-100`}
    >
      <label
        htmlFor={`${taskName} ${day}`}
        className="text-sm font-medium text-red-700 absolute p-0.5 -top-3 left-2 bg-white"
      >
        {day}
      </label>
      <input
        name={`${taskName} ${day}`}
        type="number"
        className="border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 p-2"
        placeholder={placeholder ? placeholder : ""}
        min="0"
        required={required}
      />
    </div>
  );
}

function TaskHeader({ taskName }) {
  return <p className="text-md italic">{taskName}</p>;
}

export default function SingleProjectInput({
  projectCode,
  taskName,
  selecteddate,
}) {
  const dayValues = [0, 0, 1, 2, 0, 4, 3];
  return (
    <div>
      <TaskHeader taskName={taskName}></TaskHeader>
      <div className="flex flex-wrap w-full">
        {dayValues.map((v, day) => {
          const weekday = format(selecteddate.end().addDays(day - 6), "EEEE");
          return (
            <DayInput
              key={day}
              day={weekday}
              taskName={taskName}
              placeholder={v}
              required={!weekday.includes("S")}
            ></DayInput>
          );
        })}
      </div>
    </div>
  );
}
