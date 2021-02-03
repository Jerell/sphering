import SingleProjectInput from "./submission/singleProjectInput";
import SubmitButton from "./submitButton";

export default function Submission({ selecteddate }) {
  return (
    <>
      <h2 className="text-xl">Submit</h2>
      <form className="w-full">
        <SingleProjectInput
          selecteddate={selecteddate}
          taskName={"boug"}
        ></SingleProjectInput>
        <SingleProjectInput
          selecteddate={selecteddate}
          taskName={"aska"}
        ></SingleProjectInput>
        <SingleProjectInput
          selecteddate={selecteddate}
          taskName={"lksd"}
        ></SingleProjectInput>
        <SubmitButton></SubmitButton>
      </form>
    </>
  );
}
