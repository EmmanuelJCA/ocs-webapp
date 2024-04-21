export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const dateToFormat = new Date(date);

  const formattedDate = new Date(
    dateToFormat.getUTCFullYear(),
    dateToFormat.getUTCMonth(),
    dateToFormat.getUTCDate()
  ).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });

  return formattedDate;
};
