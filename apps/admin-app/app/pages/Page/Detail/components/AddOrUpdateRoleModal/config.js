import { Button, Checkbox, Divider, Select, Space } from 'antd';

import { useTranslation } from 'react-i18next';

import { useCallback } from 'react';

import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import useStyles from '@app/pages/Page/Detail/components/AddOrUpdateRoleModal/style';

import SelectCountry, { convertSelectOptions as convertCountrySelectOptions } from '@shared/containers/Select/Country';
import { createMap } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';

export const CountrySelector = ({
  id,
  countries,
  setCountries,
  hasGlobalAccess,
  setHasGlobalAccess,
  disabled,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['pagePage', 'global']);

  const getSelectCountryRenderMenu = useCallback(({ menu }) => {
    return (
      <>
        <Space className={classes.countryRenderSpace}>
          <Checkbox
            checked={hasGlobalAccess}
            onChange={event => {
              setHasGlobalAccess(event.target.checked);
            }}
          >
            {t('GLOBAL_ACCESS')}
          </Checkbox>
        </Space>
        <Divider className={classes.countryRenderDivider} />
        {menu}
      </>
    );
  }, [classes.countryRenderDivider, classes.countryRenderSpace, hasGlobalAccess, setHasGlobalAccess, t]);

  return (
    <SelectCountry
      id={id}
      value={hasGlobalAccess ? [{ value: 'global_access', label: `🌐 - ${t('GLOBAL_ACCESS')}` }] : countries}
      mode="multiple"
      onChange={newSelectedCountries => {
        setCountries(newSelectedCountries.filter(c => c.value !== 'global_access'));
      }}
      labelInValue
      dropdownRender={menu => getSelectCountryRenderMenu({ menu })}
      disabled={disabled}
      showOldCountries
    />
  );
};

export const columns = ({ t, pageComponents, componentAccess, updateComponentAccess, deleteComponentAccess, countries, editingRow, setEditingRow }) => {
  const pageComponentsMap = createMap(pageComponents);
  const selectedLanguage = getSelectedLanguage();
  const countryMap = createMap(countries);
  const componentAccessIds = componentAccess.reduce((acc, value) => {
    acc.add(value.componentId); return acc;
  }, new Set());

  return [
    {
      title: t('PAGE_COMPONENTS'),
      dataIndex: 'componentId',
      render: (componentId, record, index) => {
        if (editingRow !== index) return pageComponentsMap[componentId]?.name[selectedLanguage];

        const pageComponentsOptions =
          pageComponents.filter(c => !componentAccessIds.has(c._id) || c._id === componentId).map(pageComponent => ({
            label: pageComponent.name[getLangKey()],
            value: pageComponent._id,
          }));

        return (
          <Select
            value={componentId}
            onChange={selectedComponentId => {
              updateComponentAccess(index, { componentId: selectedComponentId });
            }}
            options={pageComponentsOptions}
            style={{ width: '100%' }}
            showSearch
            optionFilterProp="label"
            allowClear
          />
        );
      },
    },
    {
      title: t('COUNTRIES'),
      dataIndex: 'countries',
      render: (countryIds, record, index) => {
        const selectedCountries = countryIds.map(id => countryMap[id]);
        const countryOptions = convertCountrySelectOptions({ countries: selectedCountries });
        return (
          <CountrySelector
            id={`component_country_select_${index}`}
            countries={countryOptions}
            setCountries={selection => {
              updateComponentAccess(index, { countries: selection.map(c => c.value), hasGlobalAccess: false });
            }}
            hasGlobalAccess={record.hasGlobalAccess}
            setHasGlobalAccess={hasGlobalAccess => {
              updateComponentAccess(index, { countries: [], hasGlobalAccess });
            }}
            disabled={editingRow !== index}
          />
        );
      },
    },
    {
      title: t('ACTION'),
      dataIndex: 'action',
      width: 120,
      render: (_, record, index) => {
        const editingThisRow = editingRow === index;
        const editing = editingRow !== -1;
        const isValid = record.componentId && (record.countries.length || record.hasGlobalAccess);
        return (
          <>
            {editingThisRow && (
            <Button className="mr-1" size="small" onClick={() => setEditingRow(-1)} disabled={!isValid}>
              {t('SAVE')}
            </Button>
            )}
            {!editingThisRow && (
            <Button className="mr-1" size="small" onClick={() => setEditingRow(index)} disabled={editing}>
              {t('EDIT')}
            </Button>
            )}
            <Button type="danger" size="small" onClick={() => deleteComponentAccess(index)}>
              {t('REMOVE')}
            </Button>
          </>
        );
      },
    },
  ];
};
