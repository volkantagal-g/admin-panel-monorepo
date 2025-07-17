import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import { availableDomainTypesForCountrySelector, getCitiesSelector, getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { domainSummaryTableDataSelector } from '../../redux/selectors';
import useStyles from './styles';
import useParentStyles from '../styles';
import TheTable from '../TheTable';
import { formatTableData } from './utils';

const GrowthWarehouseBreakdownContainer = () => {
  const { t } = useTranslation('growthDashboard');
  const classes = useStyles();
  const parentClasses = useParentStyles();

  const [selectedDomainType, setSelectedDomainType] = useState(GETIR_10_DOMAIN_TYPE);

  const formattedData = useSelector(domainSummaryTableDataSelector.getFormattedData(parentClasses));
  const warehousesMap = useSelector(getFilteredWarehousesSelector.getFilteredWarehousesMap);
  const citiesMap = useSelector(getCitiesSelector.getCitiesMap);
  const isWarehouseBreakdownDataPending = useSelector(domainSummaryTableDataSelector.getIsPending);

  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));

  const selectedDomainTypeData = formattedData?.byWarehouses[selectedDomainType];
  const tableData = !isEmpty(selectedDomainTypeData) ? formatTableData({
    data: selectedDomainTypeData,
    warehousesMap,
    citiesMap,
    classes: parentClasses,
  }) : null;

  return (
    <div>
      {!isEmpty(availableDomainTypes) && (
        <>
          <Radio.Group
            buttonStyle="solid"
            className={classes.radioGroup}
            defaultValue={selectedDomainType}
            onChange={e => setSelectedDomainType(e.target.value)}
          >
            {availableDomainTypes?.map(domainType => {
              return (
                <Radio.Button key={domainType} value={domainType} className={classes.radioButton}>
                  {`${t(`GETIR_MARKET_DOMAIN_TYPES.${domainType}`)} ${t('WAREHOUSES')}`}
                </Radio.Button>
              );
            })}
          </Radio.Group>

          <TheTable
            data={tableData}
            isPending={isWarehouseBreakdownDataPending}
            tableClassName={parentClasses.rightPaddingForScrollBar}
            showSorters
          />
        </>
      )}
    </div>
  );
};

export default GrowthWarehouseBreakdownContainer;
