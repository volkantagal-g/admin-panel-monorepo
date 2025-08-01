import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import FirstOrderDetail from './FirstOrderDetail';
import ForcedTabOpenDetail from './ForcedTabOpenDetail';
import GetirTotalOrderDetail from './GetirTotalOrderDetail';
import LastOrderDetail from './LastOrderDetail';
import MissedOrderDetail from './MissedOrderDetail';
import VisitorDetail from './VisitorDetail';
import LastVisitorDetail from './LastVisitorDetail';
import ExcludeOrderDetail from './ExcludeOrderDetail';
import ExcludedFoodFilter from './ExcludedFoodFilter';
import IncludedFoodFilter from './IncludedFoodFilter';
import CancelledOrderDetail from './CancelledOrderDetail';
import BehaviorGetirRFMSegmentDetail from './BehaviorGetirRFMSegmentDetail';
import Segmentation from './Segmentation';
import LoyaltyOrderDetails from './LoyaltyOrderDetail';
import LoyaltyDetail from './LoyaltyDetail';
import PromoDetail from './PromoDetail';

const GetirFoodServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GETIR_FOOD_SERVICE_DETAIL')} activeKey="getirFoodServiceDetail">
      <VisitorDetail />
      <LastVisitorDetail />
      <ForcedTabOpenDetail />
      <LastOrderDetail />
      <FirstOrderDetail />
      <GetirTotalOrderDetail />
      <ExcludeOrderDetail />
      <MissedOrderDetail />
      <IncludedFoodFilter />
      <ExcludedFoodFilter />
      <CancelledOrderDetail />
      <BehaviorGetirRFMSegmentDetail />
      <Segmentation />
      <LoyaltyDetail />
      <LoyaltyOrderDetails />
      <PromoDetail />
    </CollapsePanel>
  );
};

export default GetirFoodServiceDetail;
