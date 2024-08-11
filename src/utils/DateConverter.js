export function convertDateFormat(date) {
  const dateObject = new Date(date);

  const date_format =
    dateObject.getDate() +
    " - " +
    dateObject.getMonth() +
    " - " +
    dateObject.getFullYear();
  return date_format;
}
