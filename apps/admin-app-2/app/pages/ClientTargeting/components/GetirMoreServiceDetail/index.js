import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import CancelledOrderDetail from './CancelledOrderDetail';
import Getir30DeliveryDurationDetail from './DeliveryDurationDetail';
import ExcludedGetirRFMSegmentDetail from './ExcludedGetirRFMSegmentDetail';
import FirstOrderDetail from './FirstOrderDetail';
import ForcedTabOpenDetail from './ForcedTabOpenDetail';
import GetirTotalOrderDetail from './GetirTotalOrderDetail';
import IncludedGetirRFMSegmentDetail from './IncludedGetirRFMSegmentDetail';
import LastOrderDetail from './LastOrderDetail';
import MaxOrderDetail from './MaxOrderDetail';
import MissedOrderDetail from './MissedOrderDetail';
import VisitorDetail from './VisitorDetail';

const GetirMoreServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GETIR_MORE_SERVICE_DETAIL')} activeKey="getirMoreServiceDetail">
      <LastOrderDetail />
      <FirstOrderDetail />
      <VisitorDetail />
      <ForcedTabOpenDetail />
      <MaxOrderDetail />
      <GetirTotalOrderDetail />
      <MissedOrderDetail />
      <IncludedGetirRFMSegmentDetail />
      <ExcludedGetirRFMSegmentDetail />
      <Getir30DeliveryDurationDetail />
      <CancelledOrderDetail />
    </CollapsePanel>
  );
};

export default GetirMoreServiceDetail;
