import { differenceInHours, format, fromUnixTime } from 'date-fns'

export const formatDateTime = (
  timestampValue: any,
  customFormat = 'dd MMM yyyy | h:mm a'
) => {
  return timestampValue ? format(fromUnixTime(timestampValue), customFormat) : ''
}

export const getDiffInDay = (starTimestamp: any, endTimestamp: any) => {
  const startDate = fromUnixTime(starTimestamp)
  const endDate = fromUnixTime(endTimestamp)
  const hourDiff = differenceInHours(startDate, endDate)
  return hourDiff <= 0 ? 0 : Math.floor(hourDiff / 24) + 1
}
