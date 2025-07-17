import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import { locationWriteOffStatuses } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import AntSelect from '@shared/components/UI/AntSelect';

const SelectStatuses = ({ value, mode, onChange, showArrow, isDisabled, ...otherProps }) => {
  const { t } = useTranslation();

  const [selectedStatuses, setSelectedStatuses] = useState();
  const statusesSelectOptions = convertConstantValuesToSelectOptions(locationWriteOffStatuses);
  const classes = useStyles();
  const handleChange = val => {
    setSelectedStatuses(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedStatuses(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedStatuses}
      options={statusesSelectOptions}
      placeholder={t('global:FILTER')}
      mode={mode}
      onChange={handleChange}
      disabled={isDisabled}
      filterOption={getSelectFilterOption}
      showSearch
      className={classes.statusesSelect}
      {...otherProps}
    />
  );
};

export default SelectStatuses;
