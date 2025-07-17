import { useCallback } from 'react';
import { Checkbox, Divider, Space } from 'antd';

import SelectCountry from '@shared/containers/Select/Country';
import SelectDomainType from '@shared/containers/Select/DomainType';

import useStyles from './style';

export const COUNTRIES_GLOBAL_ACCESS = 'GLOBAL_ACCESS';
export const DOMAIN_TYPE_ALL_DOMAINS = 9999;

export const CountrySelector = ({
  t,
  countries,
  setCountries,
  hasGlobalAccess,
  setHasGlobalAccess,
  onDropdownVisibleChange,
  onBlur,
  disabled,
}) => {
  const classes = useStyles();

  const getSelectCountryRenderMenu = useCallback(({ menu }) => {
    return (
      <>
        <Space className={classes.dropdownRenderSpace}>
          <Checkbox
            checked={hasGlobalAccess}
            onChange={event => {
              setHasGlobalAccess(event.target.checked);
              if (event.target.checked) setCountries([]);
            }}
          >
            {t('GLOBAL_ACCESS')}
          </Checkbox>
        </Space>
        <Divider className={classes.dropdownRenderDivider} />
        {menu}
      </>
    );
  }, [classes.dropdownRenderDivider, classes.dropdownRenderSpace, hasGlobalAccess, setHasGlobalAccess, setCountries, t]);

  return (
    <SelectCountry
      value={hasGlobalAccess ? [{ value: COUNTRIES_GLOBAL_ACCESS, label: `🌐 - ${t('GLOBAL_ACCESS')}` }] : countries}
      mode="multiple"
      onChange={newSelectedCountries => {
        setCountries(newSelectedCountries.filter(c => c !== COUNTRIES_GLOBAL_ACCESS));
        setHasGlobalAccess(false);
      }}
      dropdownRender={menu => getSelectCountryRenderMenu({ menu })}
      onDropdownVisibleChange={onDropdownVisibleChange}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
};

export const DomainSelector = ({
  t,
  domainTypes,
  setDomainTypes,
  hasAllDomainTypes,
  setHasAllDomainTypes,
  onDropdownVisibleChange,
  onBlur,
  disabled,
}) => {
  const classes = useStyles();

  const getSelectDomainTypeRenderMenu = useCallback(({ menu }) => {
    return (
      <>
        <Space className={classes.dropdownRenderSpace}>
          <Checkbox
            checked={hasAllDomainTypes}
            onChange={event => {
              setHasAllDomainTypes(event.target.checked);
              if (event.target.checked) setDomainTypes([]);
            }}
          >
            {t('ALL_DOMAIN_TYPES')}
          </Checkbox>
        </Space>
        <Divider className={classes.dropdownRenderDivider} />
        {menu}
      </>
    );
  }, [classes.dropdownRenderDivider, classes.dropdownRenderSpace, hasAllDomainTypes, setHasAllDomainTypes, setDomainTypes, t]);

  return (
    <SelectDomainType
      mode="multiple"
      value={hasAllDomainTypes ? [{ value: DOMAIN_TYPE_ALL_DOMAINS, label: t('ALL_DOMAIN_TYPES') }] : domainTypes}
      onChange={_domainTypes => {
        setDomainTypes(_domainTypes.filter(d => d !== DOMAIN_TYPE_ALL_DOMAINS));
        setHasAllDomainTypes(false);
      }}
      dropdownRender={menu => getSelectDomainTypeRenderMenu({ menu })}
      onDropdownVisibleChange={onDropdownVisibleChange}
      onBlur={onBlur}
      isDisabled={disabled}
    />
  );
};
