/**
 * Formats a given date into a long date string in "en-US" locale.
 *
 * @param date - The date to format. If not provided, the current date will be used.
 * @returns A string representing the formatted date.
 */
export const formatDate = (date?: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(date);
};
