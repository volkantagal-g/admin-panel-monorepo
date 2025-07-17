import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Modal, Tag, Button, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { get, has } from 'lodash';

import { getLangKey } from '@shared/i18n';
import {
  foodOrderPaymentStatuses,
  foodOrderStatuses,
  clientStatuses,
  getirFoodDeliveryTypes,
  foodOrderPaymentMethods,
} from '@shared/shared/constantValues';
import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import { orderDetailSelector, orderFinancialsSelector, orderCourierJsonSelector, basketDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { CLIENT_STATUS_CANCELED, GETIR_FOOD } from '@shared/shared/constants';
import Spinner from '@shared/components/Spinner';
import useStyles from '@app/pages/GetirFood/OrderDetail/components/tagStatuses/styles';
import { getOrderStatusStyle, getPaymentMethodsStringName } from '@app/pages/GetirFood/OrderDetail/util';
import { ENVIRONMENT } from '@shared/config';

const TagStatuses = () => {
  const { orderDetailId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation('foodOrderPage');
  const classes = useStyles();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const basketDetail = useSelector(basketDetailSelector.getData) || {};
  const isBasketDetailPending = useSelector(basketDetailSelector.getIsPending);
  const orderCourierJson = useSelector(orderCourierJsonSelector.getData);
  const isOrderCourierPending = useSelector(orderCourierJsonSelector.getIsPending);
  const orderFinancials = useSelector(orderFinancialsSelector.getData);
  const isOrderFinancialsPending = useSelector(orderFinancialsSelector.getIsPending);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBasketJsonModalVisible, setIsBasketJsonModalVisible] = useState(false);
  const [isCourierJsonModalVisible, setIsCourierJsonModalVisible] = useState(false);
  const [isFinanceJsonModalVisible, setIsFinanceJsonModalVisible] = useState(false);
  const basketId = get(orderDetail, 'basketId');
  const foodBasketIds = [basketId];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showBasketJsonModal = () => {
    if (!Object.keys(basketDetail).length) {
      dispatch(Creators.getBasketDetailRequest({ basketOrderId: orderDetail.basketId }));
    }
    setIsBasketJsonModalVisible(true);
  };

  const handleBasketJsonModalCancel = () => {
    setIsBasketJsonModalVisible(false);
  };

  const showCourierJsonModal = () => {
    dispatch(Creators.getOrderCourierJsonRequest({ foodBasketIds }));
    setIsCourierJsonModalVisible(true);
  };

  const handleCourierJsonModalCancel = () => {
    setIsCourierJsonModalVisible(false);
  };

  const showFinanceJsonModal = () => {
    dispatch(Creators.getOrderFinancialsRequest({ orderDetailId }));
    setIsFinanceJsonModalVisible(true);
  };

  const handleFinanceJsonModalCancel = () => {
    setIsFinanceJsonModalVisible(false);
  };

  const debited = get(orderDetail, 'paymentInfo.isDebit', '');
  const is3DPayment = get(orderDetail, 'paymentInfo.is3DPayment', '');
  const isBkm = get(orderDetail, 'paymentInfo.isBKM', '');
  const paymentInfo = get(orderDetail, 'paymentInfo', '');
  const paymentStatus = get(orderDetail, 'paymentStatus', '');
  const hasPaymentStatus = has(orderDetail, 'paymentStatus');
  const deliveryType = get(orderDetail, 'deliveryType', '');
  const orderDetailStatus = get(orderDetail, 'status', '');
  const paymentMethod = get(orderDetail, 'paymentInfo.paymentMethod', '');
  const paymentMethodType = get(orderDetail, ['paymentInfo', 'paymentMethod', 'type'], '');
  const additionalPaymentInfo = get(orderDetail, 'additionalPaymentInfo');
  const clientStatus = get(orderDetail, 'client.status', '');
  const promoCode = get(orderDetail, 'promo.promoCode', '');
  const promoId = get(orderDetail, 'promo._id', '');
  const dropOffAtDoor = get(orderDetail, 'dropOffAtDoor', '');
  const isScheduled = get(orderDetail, 'isScheduled', '');
  const deviceType = get(orderDetail, 'deviceInfo.deviceType', '');
  const promo = get(orderDetail, 'promo', '');
  const loyaltyStampsCount = get(orderDetail, 'loyaltyStampsCount', {});
  const restaurantId = get(orderDetail, 'restaurant.id');
  const subscriptionId = get(orderDetail, 'subscriptionId', null);
  const orderFinancialsJson = get(orderFinancials, 'data', {});
  const isQueued = get(orderDetail, 'isQueued', null);

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
      <Tag className={classes.tagSuccessStatus}>{isQueued ? t('QUEUED') : t('NOT_QUEUED')}</Tag>
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
      {hasPaymentStatus && (
        <Tag className={classes.tagWarningStatus}>
          {get(foodOrderPaymentStatuses, [paymentStatus, getLangKey()], '')}
          {paymentInfo && isBkm &&
            <span>{get(foodOrderPaymentMethods, [paymentMethodType, getLangKey()], '')}</span>}
        </Tag>
      )}
      {debited && (
        <Tag className={classes.tagWarningStatus}>
          {t('DEBIT')}
        </Tag>
      )}
      {is3DPayment &&
        <Tag className={classes.tagSuccessStatus}>{t('IS3D')}</Tag>}
      {paymentMethodType &&
        <Tag className={classes.tagWarningStatus}>{getPaymentMethodsStringName(additionalPaymentInfo, paymentMethod)}</Tag>}
      {deviceType &&
        <Tag className={classes.tagWarningStatus}> {deviceType === 'Web' ? 'W' : 'M'} </Tag>}
      {promo && (
        <Tag className={classes.tagSuccessStatus}>
          {promoCode}
        </Tag>
      )}
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
      {loyaltyStampsCount?.result > 0 && (
        <Tag className={classes.tagSuccessStatus}>
          {t('LOYALTY')}
        </Tag>
      )}
      {promo && (
        <Button
          href={`${ENVIRONMENT.REACT_APP_FOOD_RESTAURANT_PANEL_URL}/r/${restaurantId}/promo/detail/${promoId}`}
          className={classes.jsonButton}
          type="primary"
          size="small"
          target="_blank"
        >
          {t('CAMPAIGN_DETAILS')}
        </Button>
      )}
      {subscriptionId && (
        <span className={classes.subsTagWrapper}>
          <img src={`/assets/images/getirozel_badge_${getLangKey()}.svg`} alt="subs" />
        </span>
      )}
      <Button
        className={classes.jsonButton}
        type="primary"
        size="small"
        onClick={showModal}
        data-testid="FOOD_ORDER_DETAIL__ORDER_DETAIL_JSON_BUTTON"
      >
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
      <Button
        className={classes.jsonButton}
        type="primary"
        size="small"
        onClick={showBasketJsonModal}
        data-testid="FOOD_ORDER_DETAIL__BASKET_DETAIL_JSON_BUTTON"
      >
        {t('BASKET_DETAIL_JSON')}
      </Button>
      <Modal
        title={t('BASKET_DETAIL_SUPPORT')}
        visible={isBasketJsonModalVisible}
        footer={null}
        width="50%"
        onCancel={handleBasketJsonModalCancel}
      >
        {isBasketDetailPending
          ? <Spin />
          : (
            <>
              <NavLink target="_blank" to={`/baskets/detail/${basketDetail._id}`}>
                <Button type="button">{t('DETAILS')}</Button>
              </NavLink>
              <pre>{JSON.stringify(basketDetail, null, 4)}</pre>
            </>
          )}
      </Modal>
      <Button
        className={classes.jsonButton}
        type="primary"
        size="small"
        onClick={showCourierJsonModal}
        data-testid="FOOD_ORDER_DETAIL__COURIER_JSON_BUTTON"
      >
        {t('COURIER_JSON')}
      </Button>
      <Modal
        title={t('COURIER_JSON').replace('-', ' ')}
        visible={isCourierJsonModalVisible}
        footer={null}
        width="50%"
        onCancel={handleCourierJsonModalCancel}
      >
        {isOrderCourierPending ? <Spin /> : <pre>{JSON.stringify(orderCourierJson, null, 4)}</pre>}
      </Modal>
      <Button
        className={classes.jsonButton}
        type="primary"
        size="small"
        onClick={showFinanceJsonModal}
        data-testid="FOOD_ORDER_DETAIL__FINANCE_JSON_BUTTON"
      >
        {t('FINANCE_JSON')}
      </Button>
      <Modal
        title={t('FINANCE_JSON').replace('-', ' ')}
        visible={isFinanceJsonModalVisible}
        footer={null}
        width="50%"
        onCancel={handleFinanceJsonModalCancel}
      >
        {isOrderFinancialsPending ? <Spin /> : <pre>{JSON.stringify(orderFinancialsJson, null, 4)}</pre>}
      </Modal>
    </div>
  );
};

export default TagStatuses;
