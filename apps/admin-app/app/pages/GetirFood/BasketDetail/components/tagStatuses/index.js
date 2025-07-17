import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Tag, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import Spinner from '@shared/components/Spinner';
import { GETIR_FOOD, CLIENT_STATUS_CANCELED } from '@shared/shared/constants';
import {
  clientStatuses,
  foodOrderStatuses,
  getirFoodDeliveryTypes,
} from '@shared/shared/constantValues';
import { orderDetailSelector } from '@app/pages/GetirFood/BasketDetail/redux/selectors';
import { getOrderStatusStyle } from './util';
import useStyles from './styles';

const TagStatuses = () => {
  const { t } = useTranslation('foodOrderPage');
  const classes = useStyles();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deliveryType = get(orderDetail, 'deliveryType', '');
  const orderDetailStatus = get(orderDetail, 'status', '');
  const clientStatus = get(orderDetail, 'client.status', '');
  const dropOffAtDoor = get(orderDetail, 'dropOffAtDoor', '');
  const isScheduled = get(orderDetail, 'isScheduled', '');
  const deviceType = get(orderDetail, 'deviceInfo.deviceType', '');

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className={classes.tag}>
      <Tag className={classes.productStatus} style={getOrderStatusStyle(orderDetailStatus)}>
        {get(foodOrderStatuses, orderDetailStatus) && get(foodOrderStatuses, [orderDetailStatus, getLangKey()], '')}
      </Tag>
      <Tag
        className={[
          classes.paymentStatuses,
          clientStatus === CLIENT_STATUS_CANCELED ? classes.tagDangerStatus : classes.tagSuccessStatus,
        ]}
      >
        {get(clientStatuses, clientStatus) && get(clientStatuses, [clientStatus, getLangKey()], '')}
      </Tag>
      {deliveryType && (
        <Tag
          className={[
            classes.paymentStatuses,
            deliveryType === GETIR_FOOD.DELIVERY_TYPES.GETIR ? classes.tagGetirColorPurple : classes.tagFoodStatus,
          ]}
        >
          {get(getirFoodDeliveryTypes, [deliveryType, getLangKey()])}
        </Tag>
      )}
      {deviceType &&
        <Tag className={classes.tagWarningStatus}> {deviceType === 'Web' ? 'W' : 'M'} </Tag>}
      {dropOffAtDoor && (
        <Tag className={classes.tagSuccessStatus}>
          {t('DOOR')}
        </Tag>
      )}
      {isScheduled && (
        <Tag className={classes.tagFoodStatus}>
          {t('SCHEDULED')}
        </Tag>
      )}
      <Button className={classes.jsonButton} type="primary" size="small" onClick={showModal}>
        {t('BASKET_DETAIL_JSON')}
      </Button>
      <Modal
        title={t('BASKET_DETAIL_SUPPORT')}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <pre>{JSON.stringify(orderDetail, null, 4)}</pre>
      </Modal>
    </div>
  );
};

export default TagStatuses;
