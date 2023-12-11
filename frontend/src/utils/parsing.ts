export function getTimeStamp(dateTime: string): number | undefined {
  const date = new Date(dateTime);
  if (!isNaN(date.getTime())) {
    return date.getTime()
  }
  return undefined
}
