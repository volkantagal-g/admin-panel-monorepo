import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { locationWriteOffReasons } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import AntSelect from '@shared/components/UI/AntSelect';
import useStyles from './styles';

const SelectReasons = ({ value, mode, onChange, showArrow, isDisabled, ...otherProps }) => {
  const { t } = useTranslation();

  const [selectedReasons, setSelectedReasons] = useState();
  const reasonsSelectOptions = convertConstantValuesToSelectOptions(locationWriteOffReasons);

  const classes = useStyles();
  const handleChange = val => {
    setSelectedReasons(val);
    onChange(val);
  };
  useEffect(() => {
    setSelectedReasons(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedReasons}
      options={reasonsSelectOptions}
      placeholder={t('global:FILTER')}
      mode={mode}
      onChange={handleChange}
      disabled={isDisabled}
      filterOption={getSelectFilterOption}
      showSearch
      className={classes.reasonsSelect}
      {...otherProps}
    />
  );
};

export default SelectReasons;
