import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AntSelect from '@shared/components/UI/AntSelect';

import useStyles from './styles';

const SelectWeek = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) => {
  const classes = useStyles();
  const [selectedWeek, setSelectedWeek] = useState();
  const { t } = useTranslation('euGrowthComparison');

  const weekOptions = [];

  const handleChange = val => {
    setSelectedWeek(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedWeek(value);
  }, [value]);

  return (
    <AntSelect
      className={classes.fullWidth}
      value={selectedWeek}
      options={weekOptions}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={isClearable}
      placeholder={t('SELECT_WEEK')}
      {...otherProps}
    />
  );
};

export default SelectWeek;
