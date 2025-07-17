import { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select, Space, Typography } from 'antd';

import { Creators } from '@shared/containers/Filter/redux/actions';
import { getSelectedDomainType, getSelectedDomainTypes } from "@shared/containers/Filter/redux/selectors";
import { useValidateState } from "@shared/containers/Filter/hooks/useValidateState";
import { ERROR_MESSAGES, domainTypeList } from '@shared/containers/Filter/constants';
import useStyles from './styles';

const { Text } = Typography;

const DomainTypeSelect = ({ 
  title,
  value, filterKey, mode, placeholder, domainListType, defaultValue, onChange, containerClass, className, 
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');
  const classes = useStyles();

  useValidateState({
    filterKey,
    componentName: 'DomainTypeSelect',
  });

  const stateSelector = mode ? getSelectedDomainTypes : getSelectedDomainType;
  const stateValue = useSelector(stateSelector(filterKey));

  const inputPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    if (mode) return t('DOMAIN_TYPES');

    return t('DOMAIN_TYPE');
  }, [mode, placeholder, t]);

  const selectedDomainTypeList = domainTypeList[domainListType];

  const domainTypeOptions = useMemo(() =>
    selectedDomainTypeList.map(domainType => ({
      value: domainType,
      label: t(`GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
    })),
  [selectedDomainTypeList, t]);

  const onDomainTypeChange = useCallback(inputValue => {
    if (mode) dispatch(Creators.setSelectedDomainTypes({ selectedDomainTypes: inputValue, filterKey }));
    else dispatch(Creators.setSelectedDomainType({ selectedDomainType: inputValue, filterKey }));

    if (onChange) onChange(inputValue);
  }, [dispatch, filterKey, mode, onChange]);

  useEffect(() => {
    if (mode && !Array.isArray(defaultValue)) throw new Error(t(`filterComponent:${ERROR_MESSAGES.INVALID_DEFAULT_DOMAIN_TYPE}`));
  }, [defaultValue, mode, t]);

  useEffect(() => {
    if (!stateValue?.length && defaultValue) {
      onDomainTypeChange(defaultValue);
    }
  }, [defaultValue, onDomainTypeChange, stateValue?.length]);

  return (
    <Space direction="vertical" className={containerClass}>
      {title && (<Text>{title}</Text>)}
      <Select
        mode={mode}
        value={value ?? stateValue}
        defaultValue={defaultValue}
        onChange={onDomainTypeChange}
        optionFilterProp="label"
        options={domainTypeOptions}
        placeholder={inputPlaceholder}
        className={className ?? classes.domainTypeSelect}
        showArrow
        showSearch
      />
    </Space>
  );
};

DomainTypeSelect.defaultProps = { domainListType: 'all' };

DomainTypeSelect.propTypes = {
  mode: PropTypes.oneOf(['multiple', 'tags']),
  placeholder: PropTypes.string,
  domainListType: PropTypes.oneOf(['market', 'withoutWarehouses', 'all']),
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default DomainTypeSelect;
