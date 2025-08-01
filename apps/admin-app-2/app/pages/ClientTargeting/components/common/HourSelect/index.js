import { useSelector } from 'react-redux';

import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { getUtcHour } from '@app/pages/ClientTargeting/utils';

import MultipleSelect from '../MultipleSelect';

const HourSelect = ({
  activeKey,
  value,
  label,
  placeholder,
}) => {
  const hours = [];
  const timezone = useSelector(getSelectedCountryTimezone.getData);

  for (let i = 0; i < 24; i++) {
    const formatHour = i < 10 ? `0${i}:00` : `${i}:00`;
    hours.push({ id: getUtcHour(formatHour, 'HH', timezone), name: formatHour });
  }
  return (
    <MultipleSelect
      activeKey={activeKey}
      label={label}
      clientListKey="hourIntervals"
      value={value}
      selectable={hours}
      tagKey="id"
      tagValue="name"
      placeholder={placeholder}
    />
  );
};

export default HourSelect;
