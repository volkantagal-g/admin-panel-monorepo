import { Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { showCourierTypeSelector, getCourierCountsDataSelector } from '../../../../redux/selectors';
import { Creators } from '../../../../redux/actions';
import { checkTotalValuesByCourierType } from '../../../../utils';
import { VEHICLE_TYPE } from '@shared/shared/constants';
import CourierTypeButton from '../CourierTypeButton';
import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '@app/pages/GetirMarket/LiveMap/mixPanelEvents';

import useStyles from './styles';

const CouriersTypePanel = () => {
  const { t } = useTranslation('getirMarketLiveMapPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    showEMotorcycleCouriers,
    showMotoCouriers,
    showEBicycleCouriers,
    showCarCouriers,
    showOnFootCouriers,
    showBusyCouriers,
    showMiTuCouriers,
    showECarCouriers,
    showMoto50ccCouriers,
  } = useSelector(showCourierTypeSelector);
  const courierStatusCountsWithCourierPlan = useSelector(getCourierCountsDataSelector);

  const { container, buttonWrapper, showCourierTypeButtonContainer } = classes;

  const handleResetCouriersMarkers = () => {
    dispatch(Creators.resetCouriersMarkers());
    AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, { button: LIVE_MAP_EVENTS.COURIER_TYPES.DELETE });
  };

  const { E_BICYCLE, E_MOTORCYCLE, MITU, MOTO, ON_FOOT, VAN, E_CAR, MOTO_50CC } = VEHICLE_TYPE;
  return (
    <Row className={container}>
      <div className={showCourierTypeButtonContainer}>
        <CourierTypeButton
          showCourierType={showEMotorcycleCouriers}
          courierType="showEMotorcycleCouriers"
          showButton={checkTotalValuesByCourierType(E_MOTORCYCLE, 'selectedCity', courierStatusCountsWithCourierPlan)}
          tooltipText={t('TOOLTIP_SHOW_E_MOTORCYCLE_COURIERS')}
        >
          {t('E_MOTORCYCLE')}
        </CourierTypeButton>
        <CourierTypeButton
          showCourierType={showEBicycleCouriers}
          courierType="showEBicycleCouriers"
          showButton={checkTotalValuesByCourierType(E_BICYCLE, 'selectedCity', courierStatusCountsWithCourierPlan)}
          tooltipText={t('TOOLTIP_SHOW_E_BICYCLE_COURIERS')}
        >
          {t('E_BICYCLE')}
        </CourierTypeButton>
        <CourierTypeButton
          showCourierType={showMotoCouriers}
          courierType="showMotoCouriers"
          showButton={checkTotalValuesByCourierType(MOTO, 'selectedCity', courierStatusCountsWithCourierPlan)}
          tooltipText={t('TOOLTIP_SHOW_MOTO_COURIERS')}
        >
          {t('MOTO')}
        </CourierTypeButton>
        <CourierTypeButton
          showCourierType={showMoto50ccCouriers}
          courierType="showMoto50ccCouriers"
          showButton={checkTotalValuesByCourierType(MOTO_50CC, 'selectedCity', courierStatusCountsWithCourierPlan)}
          tooltipText={t('TOOLTIP_SHOW_MOTO_50CC_COURIERS')}
        >
          {t('MOTO_50CC')}
        </CourierTypeButton>
        <CourierTypeButton
          showCourierType={showCarCouriers}
          courierType="showCarCouriers"
          showButton={checkTotalValuesByCourierType(VAN, 'selectedCity', courierStatusCountsWithCourierPlan)}
          tooltipText={t('TOOLTIP_SHOW_VAN_COURIERS')}
        >
          {t('VAN')}
        </CourierTypeButton>
        <CourierTypeButton
          showCourierType={showMiTuCouriers}
          courierType="showMiTuCouriers"
          showButton={checkTotalValuesByCourierType(MITU, 'selectedCity', courierStatusCountsWithCourierPlan)}
          tooltipText={t('TOOLTIP_SHOW_MITU_COURIERS')}
        >
          {t('MITU')}
        </CourierTypeButton>
        <CourierTypeButton
          showCourierType={showOnFootCouriers}
          courierType="showOnFootCouriers"
          showButton={checkTotalValuesByCourierType(ON_FOOT, 'selectedCity', courierStatusCountsWithCourierPlan)}
          tooltipText={t('TOOLTIP_SHOW_ON_FOOT_COURIERS')}
        >
          {t('ON_FOOT')}
        </CourierTypeButton>
        <CourierTypeButton
          showCourierType={showECarCouriers}
          courierType="showECarCouriers"
          showButton={checkTotalValuesByCourierType(E_CAR, 'selectedCountry', courierStatusCountsWithCourierPlan)}
          tooltipText={t('TOOLTIP_SHOW_E_CAR_COURIERS')}
        >
          {t('E_CAR')}
        </CourierTypeButton>
        <CourierTypeButton
          showCourierType={showBusyCouriers}
          courierType="showBusyCouriers"
          showButton
          tooltipText={t('TOOLTIP_SHOW_BUSY_COURIERS')}
        >
          {t('BUSY')}
        </CourierTypeButton>
        <Button
          onClick={handleResetCouriersMarkers}
          className={buttonWrapper}
          icon={(
            <DeleteOutlined
              className={classes.iconButtonWrapper}
            />
          )}
        />
      </div>
    </Row>
  );
};

export default CouriersTypePanel;
