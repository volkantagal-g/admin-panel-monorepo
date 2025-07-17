import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import useStyles from './styles';
import { getColumns } from './config';
import { getRowClassName } from '../utils';
import { warehouseStatsSelector } from '../../../redux/selectors';
import { availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';
import { ORDER_GROWTH_SUMMARY_DOMAIN_TYPES } from './constants';

const OrderGrowthSummary = () => {
  const { t } = useTranslation('getirMarketDashboardPage');
  const classes = useStyles();
  const availableDomainsForCountry = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, ORDER_GROWTH_SUMMARY_DOMAIN_TYPES));

  const warehouseStatsData = useSelector(warehouseStatsSelector.getFormattedData(classes, availableDomainsForCountry));
  const isPending = useSelector(warehouseStatsSelector.getIsPending);

  return (
    <AntTableV2
      id="OrderGrowthSummaryTable"
      data={warehouseStatsData}
      columns={getColumns(classes, t)}
      className={classes.table}
      containerClassName={classes.antTableContainer}
      scroll={{ y: 428, x: 'max-content' }}
      loading={isPending}
      rowClassName={(record, index) => getRowClassName(classes, index)}
      showFooter={false}
    />
  );
};

export default OrderGrowthSummary;
