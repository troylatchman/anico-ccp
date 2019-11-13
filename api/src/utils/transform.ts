import { parse, format } from 'date-fns';

export function formatDate(
  inputDateString: string,
  inputDateFormat = 'yyyyMMdd',
  outputDateFormat = 'MM/dd/yyyy',
) {
  const inputDate = parse(inputDateString, inputDateFormat, new Date());
  return format(inputDate, outputDateFormat);
}
