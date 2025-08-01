import React from 'react';
import { Tag } from 'antd';
import moment, { Moment } from 'moment';

import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';

type DateTagProps = {
  date: Moment | Date | string;
};

function getColor(date: Moment) {
  const now = moment();
  const oneHourAgo = now.clone().subtract(1, 'hour');

  if (date.isBefore(oneHourAgo)) {
    return 'red';
  }
  if (date.isAfter(now)) {
    return 'blue';
  }
  return 'green';
}

export function DateTag({ date }:DateTagProps) {
  const momentDate = moment(date);

  const formattedDate = momentDate.format(DEFAULT_TIME_FORMAT);

  const color = getColor(momentDate);

  return <Tag color={color}>{formattedDate}</Tag>;
}
