export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const dateToFormat = new Date(date);
  const formattedDate = dateToFormat.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });

  return formattedDate;
};
