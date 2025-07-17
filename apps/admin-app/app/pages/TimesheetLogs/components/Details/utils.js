import moment from 'moment';

export const sortTimespan = arr => [...(arr || [])].sort((a, b) => (a.start > b.start ? 1 : -1));

export const convertMinToHr = (mins = 0, t, format) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (format === 'HH:mm') {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
  return `${h ? `${h}${t('global:TIME.ABBR.HOUR')}` : ''} ${m ? `${m}${t('global:TIME.ABBR.MINUTE')}` : ''}`.trim();
};

export const getRowClassNames = (row, classes) => {
  if (row.isApproved) {
    return classes.approved;
  }
  return '';
};

export const translateColumn = (postFix, t) => t(`TIMESHEET_LOGS_MODAL.LIST.COLUMNS.${postFix}`);

export const translateInfo = (postFix, t) => t(`TIMESHEET_LOGS_MODAL.LIST.INFO.${postFix}`);

export const getLabels = rowData => {
  let hasAtLeastOneLateClockIn = false;
  let hasEmptyValue = false;

  for (let i = 0; i < rowData.scheduleTimes?.length; i += 1) {
    const { start, end } = rowData.scheduleTimes[i];

    if (!start || !end) {
      hasEmptyValue = true;
    }
  }

  for (let i = 0; i < rowData.breaks?.length; i += 1) {
    const { duration } = rowData.breaks[i];

    if (duration === undefined || duration === null) {
      hasEmptyValue = true;
    }
  }

  for (let i = 0; i < rowData.clockTimes?.length; i += 1) {
    const { start, end } = rowData.clockTimes[i];
    const scheduleTime = rowData.scheduleTimes?.[i];

    if (!start || !end) {
      hasEmptyValue = true;
    }

    if (scheduleTime && scheduleTime?.start) {
      const startHour = moment(start).hour();
      const startMinute = moment(start).minute();
      const scheduleTimeHour = moment(scheduleTime?.start).hour();
      const scheduleTimeMinute = moment(scheduleTime?.start).minute();

      if (startHour > scheduleTimeHour || (startHour === scheduleTimeHour && startMinute > scheduleTimeMinute)) {
        hasAtLeastOneLateClockIn = true;
        break;
      }
    }
  }

  return {
    hasAtLeastOneLateClockIn,
    hasEmptyValue,
  };
};
