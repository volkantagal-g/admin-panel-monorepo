import { Typography } from 'antd';

import { getLangKey } from '@shared/i18n';
import daysTra from '@app/pages/GetirWater/Campaigns/utils/daysTranslation';

const { Text } = Typography;

const days = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

const selectedCellColor = '#25d925';

export const tableColumns = selectedTimes => {
  const renderColumns = (record, dayIndex) => {
    const currentDays = selectedTimes.filter(time => time.dayOfWeek === dayIndex);
    const findDayIndex = currentDays.findIndex(day => day.startTime === record.startDate && day.endTime === record.endDate);
    return {
      props: {
        'data-index': dayIndex,
        style: { background: findDayIndex !== -1 ? selectedCellColor : 'white' },
      },
    };
  };

  return [
    {
      title: '',
      dataIndex: 'hours',
      key: 'hours',
      render: (_, record) => {
        return (
          <Text strong>
            {record.startDate} - {record.endDate}
          </Text>
        );
      },
      align: 'center',
    },
    {
      title: daysTra[days.monday][getLangKey()],
      dataIndex: 'monday',
      key: 'monday',
      align: 'center',
      render: (_, record) => renderColumns(record, days.monday),
    },
    {
      title: daysTra[days.tuesday][getLangKey()],
      dataIndex: 'tuesday',
      key: 'tuesday',
      align: 'center',
      render: (_, record) => renderColumns(record, days.tuesday),
    },
    {
      title: daysTra[days.wednesday][getLangKey()],
      dataIndex: 'wednesday',
      key: 'wednesday',
      align: 'center',
      render: (_, record) => renderColumns(record, days.wednesday),
    },
    {
      title: daysTra[days.thursday][getLangKey()],
      dataIndex: 'thursday',
      key: 'thursday',
      align: 'center',
      render: (_, record) => renderColumns(record, days.thursday),
    },
    {
      title: daysTra[days.friday][getLangKey()],
      dataIndex: 'friday',
      key: 'friday',
      align: 'center',
      render: (_, record) => renderColumns(record, days.friday),
    },
    {
      title: daysTra[days.saturday][getLangKey()],
      dataIndex: 'saturday',
      key: 'saturday',
      align: 'center',
      render: (_, record) => renderColumns(record, days.saturday),
    },
    {
      title: daysTra[days.sunday][getLangKey()],
      dataIndex: 'sunday',
      key: 'sunday',
      align: 'center',
      render: (_, record) => renderColumns(record, days.sunday),
    },
  ];
};
