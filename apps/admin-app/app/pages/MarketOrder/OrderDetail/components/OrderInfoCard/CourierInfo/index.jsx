import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { useSelector } from 'react-redux';

import permKeys from '@shared/shared/permKey.json';
import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import {
  marketVehicleTypes,
  courierStatuses,
} from '@shared/shared/constantValues';
import { Space } from '@shared/components/GUI';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import useStyles from '../styles';
import { getOrderByIdSelector } from '../../../redux/selectors';

const CourierInfo = ({ courier }) => {
  const classes = useStyles();
  const { _id, name, gsm, fleetVehiclePlate, status, personalGsm, fleetVehicleType } = courier;
  const { t } = useTranslation('marketOrderPage');

  const newOrderDetail = useSelector(getOrderByIdSelector.getData);

  const courierDetailsUrl = ROUTE.COURIER_DETAIL.path.replace(':id', _id);
  const courierVehicleType = marketVehicleTypes?.[fleetVehicleType]?.[getLangKey()] || '';

  const courierCardInfo = [
    {
      label: t('CARD_INFO.COURIER.NAME'),
      value: name,
    },
    {
      label: t('CARD_INFO.COURIER.GSM'),
      value: gsm,
    },
    {
      label: t('CARD_INFO.COURIER.VEHICLE'),
      value: `${fleetVehiclePlate || ''} (${courierVehicleType || ''})`,
    },
    {
      label: t('CARD_INFO.COURIER.PERSONAL_GSM'),
      value: personalGsm,
    },
    {
      label: t('CARD_INFO.COURIER.STATUS'),
      value: courierStatuses?.[status]?.[getLangKey()],
    },
    ...((newOrderDetail?.confirmationCode) ? [{
      label: t('CARD_INFO.COURIER.DELIVERY_CODE'),
      value: newOrderDetail.confirmationCode,
    }] : []),
  ];
  return (
    <Space
      className="p-2"
      title={t('CARD_INFO.COURIER.TITLE')}
      extra={(
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={courierDetailsUrl}
          permKey={permKeys.PAGE_COURIER_DETAIL}
          target="_blank"
          size="small"
          type="default"
          data-testid="courier-detail-link"
        />
      )}
    >
      <div className={classes.orderInfoCard} data-testid="courier-info-card">
        {courierCardInfo?.map(({ label, value }) => (
          <div key={label} className={classes.orderInfoCardLabel}>
            <strong>{label}</strong>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </Space>
  );
};
export default memo(CourierInfo);
