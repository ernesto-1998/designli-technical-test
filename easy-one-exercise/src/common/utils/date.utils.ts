export const extractMonthFromTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', { month: 'long' });
};
