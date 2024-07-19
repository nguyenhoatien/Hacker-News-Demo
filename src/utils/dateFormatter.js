import {
  format as formatDate,
  formatDistance,
  subDays,
  differenceInMonths,
} from 'date-fns';

export const format = (startDate = subDays(new Date(), 3)) => {
  const endDate = new Date();
  const monthsDiff = differenceInMonths(endDate, startDate);

  if (monthsDiff >= 12) {
    return formatDate(startDate, 'MMM dd, yyyy');
  } else {
    return formatDistance(startDate, endDate, {addSuffix: true});
  }
};
