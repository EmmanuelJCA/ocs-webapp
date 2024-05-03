export const isValidUUIDv4 = (uuid?: string | null): uuid is string => {
  if (!uuid || typeof uuid !== 'string' || uuid.trim() === '') return false;

  const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return regex.test(uuid);
};
