import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import UserDetail from './UserDetail';
import RentalDetail from './RentalDetail';
import RFMDetail from './RFMDetail';
import RentDuration from './RentDuration';
import RentRateInHourInterval from './RentRateInHourInterval';
import RentDistanceTravelledDetail from './RentDistanceTravelledDetail';
import VisitorDetail from './VisitorDetail';
import MembershipDetail from './MembershipDetail';
import FavoriteRentStartCityDetail from './FavoriteRentStartCityDetail';
import FavoriteRentEndCityDetail from './FavoriteRentEndCityDetail';
import ManualTransmissionRateDetail from './ManualTransmissionRateDetail';
import FavoriteDayOfTheWeekDetail from './FavoriteDayOfTheWeekDetail';

const GetirJobsServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GETIR_DRIVE_SERVICE_DETAIL')} activeKey="getirDriveServiceDetail">
      <MembershipDetail />
      <VisitorDetail />
      <UserDetail />
      <RentalDetail />
      <RFMDetail />
      <RentDuration />
      <RentRateInHourInterval />
      <RentDistanceTravelledDetail />
      <FavoriteRentStartCityDetail />
      <FavoriteRentEndCityDetail />
      <ManualTransmissionRateDetail />
      <FavoriteDayOfTheWeekDetail />
    </CollapsePanel>
  );
};

export default GetirJobsServiceDetail;
