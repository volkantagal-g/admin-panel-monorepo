import moment from 'moment';

import { Button } from 'antd';

import { t } from '@shared/i18n';

export const tableColumns = ({ renderCell, shouldRender, mins, headerSelectable, onSelectDay, disabled }) => {
  const createDayMinColumn = dayKey => {
    const slotCount = (24 * 60) / mins;
    const [dayIndexStart, dayIndexEnd] = [(slotCount * dayKey), (slotCount * (dayKey + 1))];
    const dayIndices = [...Array(dayIndexEnd - dayIndexStart).keys()].map(i => i + dayIndexStart);

    return {
      title: headerSelectable ?
        <Button size="small" disabled={disabled} onClick={() => onSelectDay(dayIndices)}>{t(`global:DAY_OF_WEEKS:${dayKey}`)}</Button> :
        t(`global:DAY_OF_WEEKS:${dayKey}`),
      key: `day${dayKey}`,
      width: '12.5%',
      render: counter => {
        const timeIndex = counter + dayIndexStart;
        return renderCell(timeIndex);
      },
      shouldCellUpdate: () => {
        return shouldRender;
      },
    };
  };

  return ([
    {
      title: '',
      key: 'timeRange',
      render: counter => {
        const minTime = mins * counter;

        const startTime = moment().hour(0).minute(minTime).format('HH:mm');
        const endTime = moment().hour(0).minute(minTime + mins).format('HH:mm');
        return `${startTime} - ${endTime}`;
      },
    },
    createDayMinColumn(1),
    createDayMinColumn(2),
    createDayMinColumn(3),
    createDayMinColumn(4),
    createDayMinColumn(5),
    createDayMinColumn(6),
    createDayMinColumn(0),
  ]);
};
