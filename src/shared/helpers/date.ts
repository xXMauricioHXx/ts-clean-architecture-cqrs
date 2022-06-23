import { DateTime } from 'luxon';

export const dateNow = (): Date => {
  return DateTime.now().toJSDate();
};

export const isoToMysqlDatetime = (date: string): string =>
  DateTime.fromISO(date).toFormat('yyyy-MM-dd HH:mm:ss');
