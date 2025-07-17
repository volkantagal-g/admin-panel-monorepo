import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Tag, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import {
  artisanOrderPaymentStatuses,
  artisanOrderStatuses,
  clientStatuses,
  getirArtisanDeliveryTypes,
  paymentMethods,
  GETIR_ARTISAN,
} from '@shared/shared/constantValues';
import { orderDetailSelector, paymentMethodsSelector } from '../../redux/selectors';
import { CLIENT_STATUS_CANCELED } from '@shared/shared/constants';
import Spinner from '@shared/components/Spinner';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/tagStatuses/styles';

const TagStatuses = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const paymentMethodsData = useSelector(paymentMethodsSelector.getPaymentMethods);
  const { t } = useTranslation('artisanOrderPage');
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const debited = get(orderDetail, 'paymentInfo.isDebit', '');
  const is3DPayment = get(orderDetail, 'paymentInfo.is3DPayment', '');
  const isBkm = get(orderDetail, 'paymentInfo.isBKM', '');
  const paymentInfo = get(orderDetail, 'paymentInfo', '');
  const paymentStatus = get(orderDetail, 'paymentStatus', '');
  const deliveryType = get(orderDetail, 'deliveryType', '');
  const orderDetailStatus = get(orderDetail, 'status', '');
  const paymentMethod = get(orderDetail, 'paymentInfo.paymentMethod', '');
  const additionalPaymentMethod = get(orderDetail, 'additionalPaymentInfo.paymentMethod');
  const clientStatus = get(orderDetail, 'client.status', '');
  const promotions = get(orderDetail, 'promotions');
  const selectedPromo = get(orderDetail, 'promo');
  const dropOffAtDoor = get(orderDetail, 'dropOffAtDoor', '');
  const isScheduled = get(orderDetail, 'isScheduled', '');
  const deviceType = get(orderDetail, 'deviceInfo.deviceType', '');
  const isShopRetail = get(orderDetail, 'isShopRetail', false);
  const subscriptionId = get(orderDetail, 'subscriptionInfo.subscriptionId', null);
  const installmentInfo = get(orderDetail, 'installmentInfo');
  const selectedSlotOption = get(orderDetail, 'selectedSlotOption');

  const promotionList = (!!promotions?.length && promotions) || (!!selectedPromo && [selectedPromo]) || [];

  const paymentMethodFiltered = paymentMethodsData.find(item => {
    return item.type === paymentMethod;
  });

  const additionalPaymentMethodFiltered = paymentMethodsData.find(item => {
    return item.type === additionalPaymentMethod;
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className={classes.tag}>
      <Tag className={classes.productStatus}>
        {artisanOrderStatuses[orderDetailStatus] && artisanOrderStatuses[orderDetailStatus][getLangKey()]}
      </Tag>
      <Tag className={classes.paymentStatuses} style={{ background: clientStatus === CLIENT_STATUS_CANCELED ? '#F0AD4F' : '#5cb85c' }}>
        {clientStatuses[clientStatus] && clientStatuses[clientStatus][getLangKey()]}
      </Tag>
      {deliveryType && (
        <Tag
          className={classes.paymentStatuses}
          style={{ background: clientStatus === GETIR_ARTISAN.DELIVERY_TYPES.GETIR ? '#5D3EBC' : '#1E7C38' }}
        >
          {getirArtisanDeliveryTypes[deliveryType][getLangKey()]}
        </Tag>
      )}
      {selectedSlotOption && (
        <Tag
          className={classes.paymentStatuses}
          style={{ background: '#1E7C38' }}
        >
          {t('SLOTTED')}
        </Tag>
      )}
      {paymentStatus && (
        <Tag className={classes.tagWarningStatus}>{artisanOrderPaymentStatuses[paymentStatus][getLangKey()]}
          {paymentInfo && isBkm &&
          <span>{paymentMethods[paymentMethod][getLangKey()]}</span>}
        </Tag>
      )}
      {debited && (
        <Tag className={classes.tagWarningStatus}>
          {t('DEBIT')}
        </Tag>
      )}
      {is3DPayment &&
        <Tag className={classes.tagSuccessStatus}>{t('IS3D')}</Tag>}
      {paymentMethodFiltered &&
        <Tag className={classes.tagWarningStatus}>{get(paymentMethodFiltered, ['name', getLangKey()], '')}</Tag>}
      {additionalPaymentMethodFiltered &&
        <Tag className={classes.tagWarningStatus}>{get(additionalPaymentMethodFiltered, ['name', getLangKey()], '')}</Tag>}
      {installmentInfo && (
        <Tag className={classes.tagWarningStatus}>
          {t('WITH_INSTALLMENT')}
        </Tag>
      )}
      {!!promotionList.length && promotionList.map(({ promoCode }) => (
        <Tag className={classes.tagSuccessStatus}>
          {promoCode}
        </Tag>
      ))}
      {deviceType &&
        <Tag className={classes.tagSuccessStatus}> {deviceType} </Tag>}
      {dropOffAtDoor && (
        <Tag className={classes.tagSuccessStatus}>
          {t('DOOR')}
        </Tag>
      )}
      {isScheduled && (
        <Tag className={classes.tagArtisanStatus}>
          {t('SCHEDULED')}
        </Tag>
      )}
      {isShopRetail && (
        <Tag className={classes.tagArtisanStatus}>
          {t('RETAIL')}
        </Tag>
      )}
      {subscriptionId && (
        <Tag className={classes.imgTag}>
          <img src={`/assets/images/getirozel_badge_${getLangKey()}.svg`} alt="subs" />
        </Tag>
      )}
      <Button className={classes.jsonButton} type="primary" size="small" onClick={showModal}>
        {t('ORDER_DETAIL_JSON')}
      </Button>
      <Modal
        title={t('ORDER_DETAIL_SUPPORT')}
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
