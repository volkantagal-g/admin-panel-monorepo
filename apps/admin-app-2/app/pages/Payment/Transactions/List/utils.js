import moment from 'moment';

import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';

export const isSelectedLanguageTR = getSelectedLanguage() === 'tr';
export const momentLocalType = isSelectedLanguageTR ? 'tr' : 'en';

export const untilTodayRange = current => {
  return current && current.valueOf() > moment();
};
export const getActiveColumns = allColumns => {
  const activeColumns = allColumns.filter(col => col.isActive);
  return activeColumns;
};

export const defaultColumns = allColumns => {
  const activeColumnsArr = getActiveColumns(allColumns);
  const columnsValues = activeColumnsArr.map(col => col.value);
  return columnsValues;
};

export const columnOptions = allColumns => {
  const options = allColumns.filter(col => !col.hideOnOptions);
  return options;
};
