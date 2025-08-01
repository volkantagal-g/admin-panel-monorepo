import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { memo } from 'react';

import { orderDetailSelector } from '../../redux/selectors';
import { Space } from '@shared/components/GUI';

const OrderAddress = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const { t } = useTranslation('marketOrderPage');
  const deliveryAddressClientNote = get(orderDetail, 'client.note', '');
  const orderDeliveryAddress = get(orderDetail, 'delivery.address', {});
  const { name, address, aptNo, floor, doorNo, description } =
    orderDeliveryAddress;

  const addressInfo = [
    {
      label: t('ADDRESS_INFO.NAME'),
      value: name,
    },
    {
      label: t('ADDRESS_INFO.ADDRESS'),
      value: address,
    },
    {
      label: t('ADDRESS_INFO.APARTMENT'),
      value: aptNo,
    },
    {
      label: t('ADDRESS_INFO.DOOR_NO'),
      value: doorNo,
    },
    {
      label: t('ADDRESS_INFO.FLOOR'),
      value: floor,
    },
    {
      label: t('ADDRESS_INFO.DIRECTIONS'),
      value: description,
    },
    {
      label: t('ADDRESS_INFO.CLIENT_NOTE'),
      value: deliveryAddressClientNote,
    },
  ];

  return (
    <Space title={t('global:ADDRESS')} className="p-2">
      <div className="w-100">
        {addressInfo.map(({ value, label }) => (
          <div key={label} style={{ display: 'flex', gap: 2 }}>
            <div className="mr-1" style={{ minWidth: '6rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ flex: 1 }}>{label}</span>
              <span>:</span>
            </div>
            <div>{value}</div>
          </div>
        ))}
      </div>
    </Space>
  );
};

export default memo(OrderAddress);
