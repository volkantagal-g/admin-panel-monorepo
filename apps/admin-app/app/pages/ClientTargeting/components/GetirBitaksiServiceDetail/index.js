import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import ForcedTabOpenDetail from './ForcedTabOpenDetail';
import TotalOrderDetail from './TotalOrderDetail';
import LastTripDetail from './LastTripDetail';
import FirstTripDetail from './FirstTripDetail';
import MaxOrderDetail from './MaxOrderDetail';
// import MissedOrderDetail from './MissedOrderDetail';
import VisitorDetail from './VisitorDetail';
import CallDetail from './CallDetail';
import TripFrequencyDetail from './TripFrequencyDetail';
import PromoDetail from './PromoDetail';

const GetirBitaksiServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GETIR_BITAKSI_SERVICE_DETAIL')} activeKey="getirBitaksiServiceDetail">
      {/* TODO: Commented ones are not ready from data side, uncomment when ready */}
      {/* Also uncomment parts from initialState.js and prepareParams.js files */}
      <VisitorDetail />
      <ForcedTabOpenDetail />
      <LastTripDetail />
      <FirstTripDetail />
      <MaxOrderDetail />
      <TotalOrderDetail />
      {/* <MissedOrderDetail /> */}
      <CallDetail />
      <TripFrequencyDetail />
      <PromoDetail />
    </CollapsePanel>
  );
};

export default GetirBitaksiServiceDetail;
