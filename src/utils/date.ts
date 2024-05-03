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

export const formatDateTime = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const dateToFormat = new Date(date);
  return dateToFormat.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    hour12: true,
    minute: '2-digit',
    ...options,
  });
};
