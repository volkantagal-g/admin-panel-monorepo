import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import GetirTotalOrderDetail from './GetirTotalOrderDetail';
import VisitorDetail from './VisitorDetail';
import LastOrderDetail from './LastOrderDetail';
import FirstOrderDetail from './FirstOrderDetail';
import MissedOrderDetail from './MissedOrderDetail';
import LastAppOpenDetail from './LastAppOpenDetail';
import PromoDetail from './PromoDetail';
import LoyaltyDetail from './LoyaltyDetail';
import LoyaltyOrderDetails from './LoyaltyOrderDetail';

const GetirLocalsServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GETIR_LOCALS_SERVICE_DETAIL')} activeKey="getirLocalsServiceDetail">
      <VisitorDetail />
      <LastAppOpenDetail />
      <LastOrderDetail />
      <GetirTotalOrderDetail />
      <MissedOrderDetail />
      <FirstOrderDetail />
      <PromoDetail />
      <LoyaltyDetail />
      <LoyaltyOrderDetails />
    </CollapsePanel>
  );
};

export default GetirLocalsServiceDetail;
