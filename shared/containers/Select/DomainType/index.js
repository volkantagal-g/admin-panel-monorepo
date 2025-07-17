import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { domainTypes as allDomainTypes } from '@shared/shared/constantValues';
import useStyles from './styles';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import AntSelect from '@shared/components/UI/AntSelect';

const SelectDomainType = ({ value, mode, onChange, showArrow, isDisabled, domainTypes = allDomainTypes, ...otherProps }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [selectedDomainTypes, setSelectedDomainTypes] = useState();
  const domainTypesSelectOptions = convertConstantValuesToSelectOptions(domainTypes);

  const handleChange = val => {
    setSelectedDomainTypes(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedDomainTypes(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedDomainTypes}
      options={domainTypesSelectOptions}
      placeholder={t('FILTER')}
      mode={mode}
      onChange={handleChange}
      disabled={isDisabled}
      className={classes.domainTypeSelect}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectDomainType;
