import { parseISO, format } from "date-fns";

export default function DateStr({
  dateString,
  formatAs = "LLLL d, yyyy",
  className,
}) {
  const date = parseISO(dateString);
  return (
    <h3 className={className}>
      <time dateTime={dateString}>{format(date, formatAs)}</time>
    </h3>
  );
}
