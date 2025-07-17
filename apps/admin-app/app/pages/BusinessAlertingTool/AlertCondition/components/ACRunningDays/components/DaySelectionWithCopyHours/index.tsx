import { Row } from 'antd';
import { useSelector } from 'react-redux';

import { getDaysOfWeekForCountry } from '@shared/utils/common';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

import DayShortcutButton from './components/DayShortcutButton';

const DaySelectionWithCopyHours = ({ handleSelectedCopyHours, isFormEditable }: {handleSelectedCopyHours: Function, isFormEditable: boolean}) => {
  const selectedCountry = useSelector(getSelectedCountryV2);
  const daysOfWeekCountry = getDaysOfWeekForCountry({ selectedCountry });

  const handleSelectedDaysOfWeek = ({ id }: {id: number}) => {
    handleSelectedCopyHours(id);
  };
  return (
    <Row>
      {daysOfWeekCountry.map((day: number) => {
        return (
          <DayShortcutButton
            key={day}
            dayIndex={day}
            onSelectedDaysOfWeekChange={handleSelectedDaysOfWeek}
            isFormEditable={isFormEditable}
          />
        );
      })}
    </Row>
  );
};

export default DaySelectionWithCopyHours;
