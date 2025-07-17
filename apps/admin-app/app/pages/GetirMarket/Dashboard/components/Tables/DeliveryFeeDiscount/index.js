import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AnalyticsService from '@shared/services/analytics';

import { columns } from './config';
import { deliveryFeeDiscountSelector } from '../../../redux/selectors';
import { getRowClassName } from '../utils';
import useParentStyles from '../styles';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { MARKET_DASHBOARD_EVENTS } from '../../../mixPanelEvents';

const DeliveryFeeDiscount = () => {
  const { t } = useTranslation('getirMarketDashboardPage');
  const deliveryFeeDiscount = useSelector(deliveryFeeDiscountSelector.getData);
  const isPending = useSelector(deliveryFeeDiscountSelector.getIsPending);
  const parentClasses = useParentStyles();

  const handleSort = (pagination, filters, sort) => {
    AnalyticsService.track(
      MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.EVENT_NAME,
      {
        button: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.TABLE_SORTING.DELIVERY_FEE_DISCOUNT[sort?.columnKey],
        tableName: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.TABLE_SORTING.DELIVERY_FEE_DISCOUNT.NAME,
      },
    );
  };

  return (
    <AntTableV2
      data={deliveryFeeDiscount}
      columns={columns(t, parentClasses)}
      loading={isPending}
      className={parentClasses.table}
      containerClassName={parentClasses.antTableContainer}
      showFooter={false}
      scroll={null}
      rowClassName={(_, index) => getRowClassName(parentClasses, index)}
      onChange={handleSort}
    />
  );
};

export default DeliveryFeeDiscount;
