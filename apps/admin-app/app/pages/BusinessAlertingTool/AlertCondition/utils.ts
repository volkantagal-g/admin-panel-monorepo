import { cloneDeep, isEmpty, sortBy, uniq } from 'lodash';

import { DEFINED_HOURS_OPTIONS } from './components/ACRunningDays/constants';
import { getWeekMinutesMap, getWorkingHoursByDay } from './components/ACRunningDays/utils';

/**
 * Converts an object of arrays of minutes into an array of running hours objects.
 *
 * @param {Object<number, number[]>} obj - An object where the keys represent hours and the values are arrays of minutes,
 * to be converted into running hours objects.
 * @returns {Array<{startMin: number, endMin: number}>} - An array of objects containing 'startMin' and 'endMin' properties,
 * representing the start and end minutes of running hours.
 *
 * @example
 * const minutesObject = {
 *   1: [60, 120, 180],
 *   2: [2940, 3000],
 *   3: [3900],
 * };
 *
 * const runningHoursArray = convertObjectToRunningHours(minutesObject);
 * console.log(runningHoursArray);
 * // Output: [
 * //   { startMin: 60, endMin: 240 },
 * //   { startMin: 2940, endMin: 3060 },
 * //   { startMin: 3900, endMin: 3960 }
 * // ]
 */
export function convertObjectToRunningHours(obj: { [key: number]: number[] }): Array<{ startMin: number; endMin: number; }> {
  let arr: number[] = [];

  Object.entries(obj).forEach(([_, startMins]) => {
    arr = [...arr, ...startMins];
  });
  arr = uniq(sortBy(arr));

  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  const runningHours: { startMin: number, endMin: number }[] = [];
  let currentObj = { startMin: arr[0], endMin: arr[0] };

  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    if (diff > 60) {
      currentObj.endMin = arr[i - 1] + 60;
      runningHours.push(currentObj);
      currentObj = { startMin: arr[i], endMin: arr[i] };
    }
  }

  // Handling the last object
  currentObj.endMin = arr[arr.length - 1] + 60;
  runningHours.push(currentObj);

  return runningHours;
}

export function convertRunningHoursToObject(arr: Array<{ startMin: number; endMin: number; }>): { [key: number]: number[] } {
  const obj: { [key: number]: number[] } = {};

  arr.forEach(({ startMin, endMin }) => {
    for (let i = startMin; i < endMin; i += 60) {
      const day = i % 1440 === 0 ? Math.floor(i / 1440) : Math.floor(i / 1440);

      if (!obj[day]) {
        obj[day] = [];
      }
      // if working hours are like 09:15, 09:45 etc. then we need to round it to 09:00, 10:00 etc.
      if (i % 60 !== 0) {
        obj[day].push(i - (i % 60));
      }
      else {
        obj[day].push(i);
      }
    }
  });

  return obj;
}

export function getFormattedAlertConditionDetails(data: AlertCondition) {
  return {
    ...data,
    conditions: getFormattedConditions(data.conditions || {}),
    queryInfo: {
      ...data?.queryInfo,
      runningConfig: {
        ...data?.queryInfo?.runningConfig,
        runningHours: convertRunningHoursToObject(data?.queryInfo?.runningConfig?.runningHours || []),
      },
    },
    notificationPreferences: {
      ...data?.notificationPreferences,
      slack: {
        ...data?.notificationPreferences?.slack,
        channels: getFormattedSlackRecepients(data?.notificationPreferences?.slack?.recipients || []),
        workspace: data?.notificationPreferences?.slack?.recipients?.[0]?.workspace,
      },
    },
  };
}

function getFormattedConditions(conditions: { [x: string]: any }) {
  const formattedConditions: { [x: string]: any } = {};

  Object.entries(conditions).forEach(([key, value]) => {
    if (value.isActive) {
      formattedConditions[key] = {
        ...value,
        priority: key,
      };
    }
  });

  return formattedConditions;
}

function getFormattedSlackRecepients(recipients: any[]) {
  return recipients.map(recipient => recipient.channel);
}

export function manipulateValuesAfterSubmit(values: any) {
  const params = cloneDeep(values);

  return {
    ...params,
    notificationPreferences: { ...formatNotificationPreferencesAfterSubmit(values) },
    conditions: { ...formatConditionsAfterSubmit(values) },
    queryInfo: {
      ...params.queryInfo,
      runningConfig: { ...formatRunningConfigAfterSubmit(values) },
    },
  };
}

export function formatNotificationPreferencesAfterSubmit(values: any) {
  const params = cloneDeep(values);

  // Slack Notification
  if (params.notificationPreferences && params.notificationPreferences.slack) {
    const slackPreferences = params.notificationPreferences.slack;
    if (slackPreferences.isActive) {
      if (slackPreferences.channels && slackPreferences.channels.length > 0) {
        const recipients = slackPreferences.channels.map((channel: string) => ({
          workspace: slackPreferences.workspace,
          channel,
        }));
        slackPreferences.recipients = recipients;
        delete slackPreferences.channels;
        delete slackPreferences.workspace;
      }
    }
    else {
      delete params.notificationPreferences.slack;
    }
  }

  // Email Notification
  if (params.notificationPreferences && params.notificationPreferences.email) {
    const emailPreferences = params.notificationPreferences.email;

    if (!emailPreferences.isActive) {
      delete params.notificationPreferences.email;
    }
  }

  return params.notificationPreferences;
}

export function formatConditionsAfterSubmit(values: any) {
  const params = cloneDeep(values);

  // Condition Critical
  if (params.conditions && params.conditions.critical) {
    delete params.conditions.critical.priority;
    params.conditions.critical.isActive = true;
  }

  // Condition Warning
  if (params.conditions && params.conditions.warning) {
    delete params.conditions.warning.priority;
    params.conditions.warning.isActive = true;
  }

  return params.conditions;
}

export function formatRunningConfigAfterSubmit(values: any) {
  const params = cloneDeep(values);

  // Running Hours Convertion
  if (params.queryInfo && params.queryInfo.runningConfig && !isEmpty(params.queryInfo.runningConfig.runningHours)) {
    params.queryInfo.runningConfig.runningHours = convertObjectToRunningHours(params.queryInfo.runningConfig.runningHours);
  }

  return params.queryInfo.runningConfig;
}

export const selectedPredefinedWorkingHours = ({ type }: { type: string }) => {
  let workingHours = {};
  if (type === DEFINED_HOURS_OPTIONS.WORKING_HOURS) {
    workingHours = getWorkingHoursByDay();
  }
  if (type === DEFINED_HOURS_OPTIONS.ALL_WEEK) {
    workingHours = getWeekMinutesMap();
  }
  if (type === DEFINED_HOURS_OPTIONS.CLEAR_ALL_SELECTED_HOURS) {
    workingHours = {};
  }
  return workingHours;
};
