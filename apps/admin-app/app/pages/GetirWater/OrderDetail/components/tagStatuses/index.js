import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Tag, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import Spinner from '@shared/components/Spinner';
import { WATER_CUSTOMER_STATUS, WATER_OS, WATER_PAYMENT_TYPES, WATER_PAYMENT_STATUS } from '@shared/shared/constants';

import { orderDetailSelector } from '../../redux/selectors';
import useStyles from './styles';

const TagStatuses = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);

  const { t } = useTranslation('waterOrderPage');
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const paymentTypeResponse = _.get(orderDetail, 'paymentType', '');
  const isScheduled = _.get(orderDetail, 'isScheduled', false);
  const paymentType = _.findKey(WATER_PAYMENT_TYPES, item => item === paymentTypeResponse.type);
  const paymentStatusResponse = _.get(orderDetail, 'paymentStatus', 0);
  const paymentStatus = _.findKey(WATER_PAYMENT_STATUS, item => item === paymentStatusResponse);
  const customerStatusResponse = _.get(orderDetail, 'customerStatus', 0);
  const customerStatus = _.findKey(WATER_CUSTOMER_STATUS, item => item === customerStatusResponse);
  const iosAndroidResponse = _.get(orderDetail, 'iosAndroid', 0);
  const iosAndroid = _.findKey(WATER_OS, item => item === iosAndroidResponse);
  const promotionCode = _.get(orderDetail, 'promoCode', false);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className={classes.tag}>
      <Tag className={classes.courierStatus}>{t('STATIC_IG')}</Tag>
      {customerStatus && <Tag className={classes.paymentStatuses}>{t(`CUSTOMER_STATUS.${customerStatus}`)}</Tag>}
      {paymentType && <Tag className={classes.tagWarningStatus}>{t(`PAYMENT_TYPE.${paymentType}`)}</Tag>}
      {paymentStatus && <Tag className={classes.paymentStatuses}>{t(`PAYMENT_STATUS.${paymentStatus}`)}</Tag>}
      {promotionCode && <Tag className={classes.tagWarningStatus}>{promotionCode}</Tag>}
      <Tag className={classes.tagSuccessStatus}>{t(`OS.${iosAndroid}`)}</Tag>
      {isScheduled && <Tag className={classes.tagInfoStatus}>{t('SCHEDULED_ORDER')}</Tag>}
      <Button className={classes.jsonButton} type="primary" size="small" onClick={showModal}>
        {t('ORDER_DETAIL_JSON')}
      </Button>
      <Modal title={t('ORDER_DETAIL_SUPPORT')} visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <pre>{JSON.stringify(orderDetail, null, 4)}</pre>
      </Modal>
    </div>
  );
};

export default TagStatuses;
