import WeekPicker from "../weekPicker";
import { useState } from "react";

export function LabelDatePicker({
  label,
  labelClasses,
  required,
  newLine = false,
  lineBreak = false,
  date,
  disabled,
}) {
  const [d, setDate] = useState(new Date(date));
  return (
    <>
      {newLine && <div className="col-span-12"></div>}
      <label htmlFor={label} className={`text-right ${labelClasses}`}>
        {label[0].toUpperCase() + label.substr(1)}
        {required && <span className="text-red-500">*</span>}
      </label>
      <WeekPicker date={d} update={setDate} disabled={disabled}></WeekPicker>
      {lineBreak && <div className="col-span-12"></div>}
    </>
  );
}

export function StartDate({}) {
  return (
    <LabelDatePicker
      label="start date"
      required
      date={new Date()}
      newLine
    ></LabelDatePicker>
  );
}

export function EndDate({}) {
  const [disabled, setDisabled] = useState(false);
  function handleClick(e) {
    e.persist();
    setDisabled(false);
  }
  return (
    <LabelDatePicker
      label="end date"
      date={new Date()}
      newLine
      lineBreak
      disabled={disabled}
      onClick={handleClick}
    ></LabelDatePicker>
  );
}
