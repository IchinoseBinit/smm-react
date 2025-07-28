export function formatToLocalTime(utcString?: string): string {
  if (!utcString) return "";
  const date = new Date(utcString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: undefined, // prevents seconds from showing
  });
}
