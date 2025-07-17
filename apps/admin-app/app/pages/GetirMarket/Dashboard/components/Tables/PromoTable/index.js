import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AnalyticsService from '@shared/services/analytics';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { GETIR_MARKET_DOMAIN_TYPE } from '@shared/shared/constants';
import useParentStyles from '../styles';

import { getColumns } from './config';
import { getRowClassName } from '../utils';
import { filtersSelector, promoStatisticsSelector } from '../../../redux/selectors';
import { promoObjectiveTypes } from '@shared/shared/constantValues';
import { MARKET_DASHBOARD_EVENTS } from '../../../mixPanelEvents';

const PromoTable = () => {
  const { t } = useTranslation('getirMarketDashboardPage');
  const parentClasses = useParentStyles();
  const [selectedRows, setSelectedRows] = useState(new Set());
  const promoData = useSelector(promoStatisticsSelector.getData(selectedRows));
  const isPending = useSelector(promoStatisticsSelector.getIsPending);
  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);

  const handleRowClick = record => {
    if (selectedRows.has(record.index)) {
      const copiedSelectedRows = new Set(selectedRows);
      copiedSelectedRows.delete(record.index);
      return setSelectedRows(copiedSelectedRows);
    }
    AnalyticsService.track(
      MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.EVENT_NAME,
      { button: promoObjectiveTypes[record.objectiveType]?.en, tableName: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.PROMO.NAME },
    );
    return setSelectedRows(prev => new Set(prev.add(record.index)));
  };

  return (
    <AntTableV2
      data={promoData}
      columns={getColumns(selectedRows, parentClasses, t)}
      className={`${parentClasses.promoTable} ${parentClasses.table} ${parentClasses.rightPaddingForScrollBar}`}
      containerClassName={parentClasses.antTableContainer}
      loading={isPending}
      rowClassName={(record, index) => getRowClassName(parentClasses, index, record)}
      onRow={record => {
        return { onClick: () => handleRowClick(record) };
      }}
      showFooter={false}
      scroll={{ y: selectedDomainType === GETIR_MARKET_DOMAIN_TYPE ? 198 : 218 }}
    />
  );
};

export default PromoTable;
