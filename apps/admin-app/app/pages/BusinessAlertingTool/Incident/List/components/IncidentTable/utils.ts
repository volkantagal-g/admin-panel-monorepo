import moment from 'moment';

import { msToString } from '@shared/utils/dateHelper';

/**
 * Returns the time duration createdAt and closedAt dates of the object, or uses the current date if closedAt is not available.
 *
 * @param {string} createdAt - createdAt should be a valid a date string.
 * @param {any} closedAt - closedAt should be a valid a date string or moment object.
 * @returns {any} - The moment duration or string result.
 */
export function getIncidentDurationWithFormat(createdAt: string, closedAt: any): any {
  const differenceDate = closedAt || moment.now();
  return msToString({ duration: Math.abs(moment(createdAt).diff(differenceDate)), shouldAddSecond: true });
}

/**
 * Returns the time duration createdAt and closedAt dates of the object, or uses the current date if closedAt is not available.
 *
 * @param {string} createdAt - createdAt should be a valid a date string.
 * @param {any} closedAt - closedAt should be a valid a date string or moment object.
 * @returns {any} - The moment duration or string result.
 */
export function getIncidentDuration(createdAt: string, closedAt: any): any {
  const differenceDate = closedAt || moment.now();
  return moment(createdAt).diff(differenceDate);
}
