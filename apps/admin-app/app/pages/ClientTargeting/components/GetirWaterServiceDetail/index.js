import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import ForcedTabOpenDetail from './ForcedTabOpenDetail';
import GetirTotalOrderDetail from './GetirTotalOrderDetail';
import LastOrderDetail from './LastOrderDetail';
import FirstOrderDetail from './FirstOrderDetail';
import MaxOrderDetail from './MaxOrderDetail';
import MissedOrderDetail from './MissedOrderDetail';
import VisitorDetail from './VisitorDetail';
import CarboyPurchaseFrequency from './CarboyPurchaseFrequency';
import GetirWaterDeliveryDurationDetail from './DeliveryDurationDetail';
import CancelledOrderDetail from './CancelledOrderDetail';

const GetirWaterServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GETIR_WATER_SERVICE_DETAIL')} activeKey="getirWaterServiceDetail">
      <VisitorDetail />
      <ForcedTabOpenDetail />
      <LastOrderDetail />
      <FirstOrderDetail />
      <MaxOrderDetail />
      <GetirTotalOrderDetail />
      <MissedOrderDetail />
      <CarboyPurchaseFrequency />
      <GetirWaterDeliveryDurationDetail />
      <CancelledOrderDetail />
    </CollapsePanel>
  );
};

export default GetirWaterServiceDetail;
