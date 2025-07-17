import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import VisitorDetail from './VisitorDetail';
import OrderDetail from './OrderDetail';
import LastOrderDetail from './LastOrderDetail';
import FirstOrderDetail from './FirstOrderDetail';
import MaxOrderDetail from './MaxOrderDetail';
import OrderFrequencyDetail from './OrderFrequencyDetail';
import CarboyPurchaseFrequencyDetail from './CarboyPurchaseFrequencyDetail';
import AppOpenDetail from './AppOpenDetail';
import PromoDetail from './PromoDetail';

const GetirWaterServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GWMP_SERVICE_DETAIL')} activeKey="getirWaterServiceDetail">
      <VisitorDetail />
      <FirstOrderDetail />
      <LastOrderDetail />
      <OrderDetail />
      <MaxOrderDetail />
      <OrderFrequencyDetail />
      <CarboyPurchaseFrequencyDetail />
      <AppOpenDetail />
      <PromoDetail />
    </CollapsePanel>
  );
};

export default GetirWaterServiceDetail;
