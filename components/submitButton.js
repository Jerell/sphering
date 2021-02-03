export default function SubmitButton({ fn }) {
  function handleClick(e) {
    e.persist();
    e.preventDefault();
    if (fn) {
      fn(e);
    }
  }
  return (
    <button
      className="mt-4 py-2 px-4 border border-transparent text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-24"
      onClick={handleClick}
    >
      Submit
    </button>
  );
}
