import LabelSelect from "./labelSelect";
import TextInput from "./textInput";
import NumberInput from "./numberInput";
import { useState } from "react";
import { StartDate, EndDate } from "./weekSelect";
import SubmitButton from "../submitButton";

function ProjectSelect({}) {
  const options = ["New project", "Project 1", "Project 2", "Project 3"];
  const [selection, setSelection] = useState(options[0]);

  return (
    <>
      <LabelSelect
        label="project"
        options={options}
        required
        update={setSelection}
        lineBreak
      ></LabelSelect>
      {selection === options[0] && (
        <>
          <TextInput label="project name" required></TextInput>
          <TextInput label="project code" required></TextInput>
        </>
      )}
    </>
  );
}

function ApproverSelect({}) {
  return (
    <LabelSelect
      label="approver"
      options={["Person 1", "Person 2", "Person 3"]}
      multiple
      required
      newLine
    ></LabelSelect>
  );
}

function WorkerSelect({}) {
  return (
    <LabelSelect
      label="worker"
      options={[
        "Person 1",
        "Person 2",
        "Person 3",
        "Person 4",
        "Person 5",
        "Person 6",
      ]}
      multiple
      required
    ></LabelSelect>
  );
}

function TaskName({}) {
  return (
    <>
      <TextInput label="Task name" newLine required></TextInput>
      <TextInput label="Task number" lineBreak></TextInput>
    </>
  );
}

function Budget({}) {
  return (
    <>
      <NumberInput label="cost" units="currency" newLine></NumberInput>
      <NumberInput label="hours" unit="h" unitRight></NumberInput>
    </>
  );
}

function Subheading({ children }) {
  return (
    <h3 className="col-span-12 mt-4 italic font-thin text-gray-500">
      {children}
    </h3>
  );
}

function Task({ n = 1 }) {
  return (
    <>
      <Subheading>New Task {n}</Subheading>
      <TaskName></TaskName>
      {n === 1 && <Subheading>Task budget</Subheading>}
      <Budget></Budget>
      {n === 1 && (
        <Subheading>Approvers are those who sign off on time spent</Subheading>
      )}
      <ApproverSelect></ApproverSelect>
      <WorkerSelect></WorkerSelect>
      {n === 1 && <Subheading>Duration</Subheading>}
      <StartDate></StartDate>
      <EndDate></EndDate>
      <div className="col-span-12 border border-b"></div>
    </>
  );
}

export default function NewTaskForm({}) {
  const [numTasks, setNumTasks] = useState(1);

  const t = Array.apply(null, { length: numTasks }).map((e, i) => (
    <Task key={i} n={i + 1}></Task>
  ));

  return (
    <>
      <h2 className="text-xl">New Task</h2>
      <form className="w-full grid grid-cols-1 md:grid-cols-9 gap-2 items-center">
        <Subheading>A project is a group of multiple tasks (CTRs)</Subheading>
        <ProjectSelect></ProjectSelect>
        <NumberInput
          label="Number of tasks"
          newLine
          lineBreak
          fn={setNumTasks}
          min={1}
          labelClasses="text-gray-400"
        ></NumberInput>
        {t}
        <div className="text-right">
          <SubmitButton></SubmitButton>
        </div>
      </form>
    </>
  );
}
