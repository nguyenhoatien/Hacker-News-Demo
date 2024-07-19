import {format} from '../src/utils/dateFormatter';
import {subDays} from 'date-fns';

describe('format', () => {
  test('formats date correctly for more than 12 months difference', () => {
    const startDate = subDays(new Date('2022-01-01'), 400);
    const result = format(startDate);
    expect(result).toBe('Nov 27, 2020'); // Example expected date, adjust based on the current date
  });

  test('formats date correctly for less than 12 months difference', () => {
    const startDate = subDays(new Date(), 300);
    const result = format(startDate);
    expect(result).toContain('ago');
  });

  test('uses default date when no argument is provided', () => {
    const result = format();
    expect(result).toContain('ago');
  });

  test('throws error when startDate is not a valid date', () => {
    expect(() => format('invalid date')).toThrow(RangeError);
  });
});
