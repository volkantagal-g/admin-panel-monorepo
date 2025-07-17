import moment from 'moment';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

const getTimeRange = (startDate, endDate) => {
  const formattedStartDate = startDate.format('MMM Do');
  const formattedEndDate = endDate.format('MMM Do');

  if (formattedStartDate === formattedEndDate) {
    return formattedStartDate;
  }
  if (startDate.format('MMM') === endDate.format('MMM')) {
    return `${formattedStartDate} - ${endDate.format('Do')}`;
  }
  return `${formattedStartDate} - ${formattedEndDate}`;
};

export const getFormattedData = (data = []) => {
  const finalData = data.map(obj => {
    // implement selected country timezone
    const { timezone } = getSelectedCountry().timezones[0];
    const startDate = moment(obj.startDatetime).tz(timezone);
    const endDate = moment(obj.endDatetime).tz(timezone);

    const dayRequested = Math.ceil(
      moment.duration(endDate.diff(startDate)).asDays(),
    );

    return {
      ...obj,
      dayRequested,
      datesRequested: getTimeRange(startDate, endDate),
    };
  });

  return finalData;
};

export const getTableProps = ({
  isStatusPending,
  setSelectedLeaves,
  selectedLeaves,
}) => {
  return {
    ...(isStatusPending
      ? {
        rowSelection: {
          selectedRowKeys: selectedLeaves.reduce(
            (acc, cur) => [...acc, cur.leaveId],
            [],
          ),
          type: 'checkbox',
          onSelect: (record, selected) => {
            if (selected) {
              const { personId, id } = record;
              setSelectedLeaves(prev => [
                ...prev,
                { leaveId: id, personId },
              ]);
            }
            else {
              setSelectedLeaves(prev => prev.filter(row => row.leaveId !== record.id));
            }
          },
          onSelectAll: (selected, selectedRows) => {
            if (selected) {
              selectedRows.forEach(row => setSelectedLeaves(prev => [
                ...prev,
                { leaveId: row.id, personId: row.personId },
              ]));
            }
            else {
              setSelectedLeaves([]);
            }
          },
        },
      }
      : null),
  };
};
