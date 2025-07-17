/* eslint-disable react/require-default-props */
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getCitiesSelector,
  getFilteredWarehousesSelector,
} from '@shared/redux/selectors/common';

import { getClientListData } from '../../../redux/selectors';
import MultipleSelect from '../MultipleSelect';
import { getirMarketDomainTypesList } from '../../../utils';
import SingleSelect from '../SingleSelect';
import { WAREHOUSE_TYPES } from '@shared/shared/constants';

type WarehouseBundleFilterProps = {
  activeKey: string;
  isDomainSelectShown?: boolean;
  isSelectAllCountriesVisible?: boolean;
  selectableDomainTypes?: Array<{ _id: number, name: string }>;
}

const defaultProps: Partial<WarehouseBundleFilterProps> = {
  isDomainSelectShown: false,
  isSelectAllCountriesVisible: true,
};

const WarehouseBundleFilter = ({
  activeKey,
  isDomainSelectShown = defaultProps.isDomainSelectShown,
  isSelectAllCountriesVisible = defaultProps.isSelectAllCountriesVisible,
  selectableDomainTypes,
}: WarehouseBundleFilterProps) => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData: any = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);
  const warehouses = useSelector(getFilteredWarehousesSelector.getData);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const warehouseTypes = WAREHOUSE_TYPES.map(warehouseType => {
    const tagText = t(`global:WAREHOUSE_TYPES:${warehouseType}`);
    const customValue = warehouseType.toString();
    return {
      name: tagText,
      _id: customValue,
    };
  });

  return (
    <div>
      {isDomainSelectShown && (
        // @ts-ignore
        <MultipleSelect
          activeKey={activeKey}
          value={data.domainTypes}
          label={t('DOMAIN')}
          clientListKey="domainTypes"
          selectable={selectableDomainTypes}
          placeholder={t('DOMAIN')}
          filterableData={{ warehouses }}
        />
      )}
      {/* @ts-ignore */}
      <MultipleSelect
        activeKey={activeKey}
        value={data.cities}
        label={t('global:CITY')}
        clientListKey="cities"
        selectable={cities}
        placeholder={t('global:CITY')}
        filterableData={{ warehouses }}
        showCSVImporter
        disabled={data.cityDisabled}
        isSelectAllCountriesVisible={isSelectAllCountriesVisible}
      />
      {/* @ts-ignore */}
      <SingleSelect
        activeKey={activeKey}
        label={t('global:WAREHOUSE_TYPE')}
        placeholder={t('global:WAREHOUSE_TYPE')}
        clientListKey="warehouseType"
        value={data.warehouseType}
        selectable={warehouseTypes}
        tagValue="name"
        tagKey="_id"
        filterableData={{ warehouses }}
        allowClear
        disabled={data.warehouseTypeDisabled}
      />
      {/* @ts-ignore */}
      <MultipleSelect
        activeKey={activeKey}
        value={data.warehouses}
        label={t('global:WAREHOUSES')}
        clientListKey="warehouses"
        selectable={data.selectableWarehouses}
        placeholder={t('global:WAREHOUSES')}
        showCSVImporter
        altSelectable={warehouses}
        showSelectAllButton
        allowClear
        filterableData={{ warehouses }}
      />
    </div>
  );
};

export default WarehouseBundleFilter;
