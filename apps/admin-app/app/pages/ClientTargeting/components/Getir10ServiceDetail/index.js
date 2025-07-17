import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import ExcludedGetirRFMSegmentDetail from './ExcludedGetirRFMSegmentDetail';
import FirstOrderDetail from './FirstOrderDetail';
import GetirTotalOrderDetail from './GetirTotalOrderDetail';
import IncludedGetirRFMSegmentDetail from './IncludedGetirRFMSegmentDetail';
import LastOrderDetail from './LastOrderDetail';
import MaxOrderDetail from './MaxOrderDetail';
import VisitorDetail from './VisitorDetail';
import MissedOrderDetail from './MissedOrderDetail';
import ForcedTabOpenDetail from './ForcedTabOpenDetail';
import PersonaDetail from './PersonaDetail';
import CustomerLTV from './CustomerLTV';
import Getir10DeliveryDurationDetail from './DeliveryDurationDetail';
import CancelledOrderDetail from './CancelledOrderDetail';

const GetirGeneralDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GETIR_10_SERVICE_DETAIL')} activeKey="getir10ServiceDetail">
      <VisitorDetail />
      <ForcedTabOpenDetail />
      <LastOrderDetail />
      <FirstOrderDetail />
      <MaxOrderDetail />
      <GetirTotalOrderDetail />
      <MissedOrderDetail />
      <IncludedGetirRFMSegmentDetail />
      <ExcludedGetirRFMSegmentDetail />
      <PersonaDetail />
      <CustomerLTV />
      <Getir10DeliveryDurationDetail />
      <CancelledOrderDetail />
    </CollapsePanel>
  );
};

export default GetirGeneralDetail;
