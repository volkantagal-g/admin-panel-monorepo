import moment from 'moment-timezone';

import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import {
  DATE_TYPE,
  GETIR_DRIVE_EXTERNAL_SOURCE_MOOV,
  GETIR_DRIVE_EXTERNAL_SOURCE_GETIR,
  GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI,
} from '@shared/shared/constants';
import { numberFormat } from '@shared/utils/localization';

export const getDefaultChartOptions = () => {
  return {
    chart: {
      type: 'spline',
      zoomType: 'x',
      height: 125,
      spacing: [4, 2, 2, 4],
    },
    title: { text: '' },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%e %b',
        month: '%e %b',
        year: '%b',
      },
    },
    yAxis: {
      allowDecimals: true,
      title: {
        text: '',
        margin: 4,
      },
      min: 0,
      gridLineColor: '#eaeaea',
    },
    legend: {
      margin: 1,
      itemStyle: {
        color: '#333333',
        cursor: 'pointer',
        fontSize: '11px',
      },
    },
    tooltip: {
      dateTimeLabelFormats: {
        millisecond: '%A, %b %e, %H:%M:%S.%L',
        second: '%A, %b %e, %H:%M:%S',
        minute: '%H:%M,  %e%b',
        hour: '%A, %e %b, %H:%M',
        day: '%e %b, %a',
        week: '%e %b %Y',
        month: '%B %Y',
        year: '%Y',
      },
      style: { fontSize: '12px' },
      crosshairs: [true],
      shared: true,
      useHTML: true,
      pointFormatter() {
        return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${numberFormat({ maxDecimal: 0 }).format(
          this.y,
        )}</b><br/>`;
      },
    },
    credits: { enabled: false },
    plotOptions: {
      spline: {
        lineWidth: 2,
        states: { hover: { lineWidth: 4 } },
        marker: { enabled: false },
      },
    },
    series: [],
  };
};

export const getTimeSeriesMap = options => {
  const {
    startDate,
    endDate: _endDate,
    minHour: startHour,
    maxHour,
    dateType,
  } = options;
  const template = {};
  const selectedCountryTimezone = getSelectedCountryTimezone.getData();
  const now = moment.tz(selectedCountryTimezone);
  const endDate = now.isBefore(_endDate) ? now : _endDate;
  const endHour = now.isBefore(_endDate) ? now.hour() + 1 : maxHour;
  const utcOffset = moment.tz(selectedCountryTimezone).utcOffset();
  const dateRangeDayCount = endDate.diff(startDate, 'days');
  let tempDate = null;

  if (dateType === DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR) {
    for (let day = 0; day <= dateRangeDayCount; day += 1) {
      for (let hour = startHour; hour < endHour; hour += 1) {
        tempDate = moment.tz(startDate, selectedCountryTimezone)
          .startOf('day')
          .add(day, 'days')
          .add(hour, 'hours')
          .add(utcOffset, 'minutes')
          .valueOf();
        template[tempDate] = {
          timestamp: tempDate,
          [GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]: 0,
          [GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]: 0,
          [GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]: 0,
        };
      }
    }
  }
  else if (dateType === DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_DAY) {
    for (let day = 0; day <= dateRangeDayCount; day += 1) {
      tempDate = moment.tz(startDate, selectedCountryTimezone)
        .startOf('day')
        .add(day, 'days')
        .add(utcOffset, 'minutes')
        .valueOf();
      template[tempDate] = {
        timestamp: tempDate,
        [GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]: 0,
        [GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]: 0,
        [GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]: 0,
      };
    }
  }
  else if (dateType === DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_WEEK) {
    for (let day = 0; day <= dateRangeDayCount; day += 7) {
      tempDate = moment.tz(startDate, selectedCountryTimezone)
        .startOf('week')
        .add(day, 'days')
        .add(utcOffset, 'minutes')
        .valueOf();
      template[tempDate] = {
        timestamp: tempDate,
        [GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]: 0,
        [GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]: 0,
        [GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]: 0,
      };
    }
  }

  return template;
};
