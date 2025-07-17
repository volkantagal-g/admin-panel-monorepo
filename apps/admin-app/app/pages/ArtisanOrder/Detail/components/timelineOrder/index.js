import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Space, Tooltip, Typography } from 'antd';
import { SyncOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { isNumber } from 'lodash';
import { Link } from 'react-router-dom';

import { Creators } from '@app/pages/ArtisanOrder/Detail/redux/actions';
import { orderDetailSelector, returnsAvailabilitySelector } from '@app/pages/ArtisanOrder/Detail/redux/selectors';
import {
  artisanOrderCancelReasonSource,
  artisanOrderStatuses,
  ORDER_PAYMENT_STATUS,
} from '@shared/shared/constantValues';
import permKey from '@shared/shared/permKey.json';
import { CALLER_TYPES, LOCALS_ORDER_STATUS } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { formatDate, getFormattedUTCDate } from '@shared/utils/dateHelper';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/timelineOrder/styles';
import { currency } from '@shared/utils/common';
import { calcUpdatedBasketAmount, priceFormatter } from '@app/pages/ArtisanOrder/Detail/util';
import Price from '@app/pages/ArtisanOrder/Detail/components/price';
import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import RedirectText from '@shared/components/UI/RedirectText';
import { ORDER_STATUS_KEY } from '@app/pages/ArtisanOrder/constants';
import { getDateTimeWithZoneOffset } from '@app/pages/ArtisanOrder/Detail/components/timelineOrder/utils';

const { Text } = Typography;

const UNIT_GR = 'gr';
const UNIT_G = 'g';
const UNIT_ML = 'ml';

const PENDING_REFUND_STATUSES = [
  ORDER_PAYMENT_STATUS.PENDING_REFUND,
  ORDER_PAYMENT_STATUS.PENDING_PARTIAL_REFUND,
];

const defaultOrderDetail = {};
const defaultReturnsAvailability = {};

const TimelineOrder = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['artisanOrderPage', 'getirLocals']);
  const classes = useStyles();
  const { Can, canAccess } = usePermission();

  const orderDetail = useSelector(orderDetailSelector.getData) || defaultOrderDetail;
  const returnsAvailability = useSelector(returnsAvailabilitySelector.getData) || defaultReturnsAvailability;
  const {
    runnerHistory = null,
    installmentInfo,
    finalTotalDiscountedPrice,
    status,
    isQueued,
    isInQueue,
    estimatedDeliveryDurationIntervalText,
    estimatedDeliveryDurationMessage,
    calculatedCourierToShopDeliveryDurationTimeInterval,
    lastCalculatedEstimatedDeliveryDurationTimeInterval,
  } = orderDetail;
  const finalBasketPrice = orderDetail.finalBasketPrice || calcUpdatedBasketAmount(orderDetail?.productUpdateHistory) || orderDetail.totalPrice;
  const discountedPriceForShop = finalTotalDiscountedPrice ?? finalBasketPrice - orderDetail.totalDiscountAmount;
  const amountPaidByCustomer =
    orderDetail.totalChargedAmountAfterProvisionOrRefund ?? installmentInfo?.totalAmount ?? orderDetail.totalChargedAmount;
  const isOrderDeliveredOrCancelled = [
    LOCALS_ORDER_STATUS.DELIVERED,
    LOCALS_ORDER_STATUS.RATED,
    LOCALS_ORDER_STATUS.CANCELED_ADMIN,
    LOCALS_ORDER_STATUS.CANCELED_RESTAURANT,
  ].includes(status);

  // If the product is revised, returns the revised version
  // Compares the order's products _id with the productUpdateHistory's products orderProductId.
  // Returns the fist match.
  const getProductHistory = useCallback(
    product => {
      if (!product) return null;

      if (!orderDetail?.productUpdateHistory?.length) return null;

      const historyArray = orderDetail?.productUpdateHistory.filter(
        history => history.orderProductId === product._id,
      );

      if (!historyArray?.length) return null;

      if (
        typeof historyArray[0]?.price?.new === 'undefined' ||
        historyArray[0]?.price?.new === null
      ) {
        return null;
      }

      if (historyArray[0].price.new === product.totalPriceWithOption + (product.applyPromotionDiscount ? product.applyPromotionDiscount * product.count : 0)) {
        return null;
      }

      return historyArray[0];
    },
    [orderDetail?.productUpdateHistory],
  );

  const getGivenProduct = product => {
    const history = getProductHistory(product);
    const price = history?.price ? history.price?.new : product.totalPriceWithOption;
    const priceString = `${priceFormatter(price)} ${currency()}`;
    let countString = '';

    if (!history?.price) return null;

    if (product.type === 'count') {
      if (typeof history?.count?.new !== 'undefined' && history?.count?.new !== null) {
        countString = `${history?.count?.new} ${t('ORDER_HISTORY.COUNT')}`;
      }
      else {
        countString = `${product?.count} ${t('ORDER_HISTORY.COUNT')}`;
      }
    }
    else {
      const unit = history?.type === UNIT_GR ? UNIT_G : UNIT_ML;
      countString = `${history?.weight?.new} ${unit}`;
    }

    return (
      <Space align="start">
        <Text>{countString} - {product?.name[getLangKey()]} - {priceString}</Text>
        {
          product.applyPromotionDiscount &&
            <Tooltip placement="left" title={t('AUTOAPPLIED_PROMO_INFO')}><InfoCircleOutlined className={classes.infoIcon} /></Tooltip>
        }
      </Space>
    );
  };

  // Attaches the alternative products to the related product
  // Compares the order's products sourceId and _id. If there is a match, adds it as alternative product
  const addAltProducts = (products = []) => {
    return products.reduce((acc, product) => {
      if (!product.sourceId) {
        const updatedProduct = {
          ...product,
          altProducts: products.filter(
            item => (item.sourceId && product._id) && item.sourceId === product._id,
          ),
        };

        return [...acc, updatedProduct];
      }

      return acc;
    }, []);
  };

  const getCancellationSource = cancellationType => {
    switch (cancellationType) {
      case artisanOrderCancelReasonSource.GETIR:
        return t('CANCELLATION_SOURCE_GETIR');

      case artisanOrderCancelReasonSource.RESTAURANT:
        return t('CANCELLATION_SOURCE_MERCHANT');

      case artisanOrderCancelReasonSource.CLIENT:
        return t('CANCELLATION_SOURCE_CUSTOMER');

      default:
        return null;
    }
  };

  const transformedProductsList = addAltProducts(orderDetail?.products);

  const openReturnDetails = returnId => {
    dispatch(Creators.setRefundTabActiveKey({ refundTabActiveKey: returnId }));
    dispatch(Creators.getOrderReturnsRequest({ returnId }));
    dispatch(Creators.openReturnDetailsModal({ returnId }));
  };

  return (
    <ul className={classes.timeline}>
      <li className={classes.tlHeader}>
        <Button className={classes.orderButton}>
          {t('ORDER')} ({formatDate(orderDetail.checkoutDate)})
          {' - '}
          {t(`ORDER_STATUS.${ORDER_STATUS_KEY[status]}`)}
        </Button>
      </li>
      {orderDetail.checkoutDate && (
        <li className={classes.ltItem}>
          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.checkoutDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <div>
                <RedirectText
                  text={(
                    <span className={classes.label}>
                      {orderDetail.client.name}{' '}
                    </span>
                  )}
                  to={`/client/detail/${orderDetail.client._id}`}
                  permKey={permKey.PAGE_CLIENT_DETAIL}
                  target="_blank"
                />
                {t('CHECKOUT_ORDER')}. ({orderDetail.confirmationId}) (
                {t('ORDER_NUMBER')}: {orderDetail.orderNumber ?? ''})
              </div>
              {!orderDetail.hasOwnProperty('selectedSlotOption') && (
              <div className="mt-3">
                <span className={classes.label}>
                  {`${t('ETA_ACCEPTED_BY_CUSTOMER')}: `}
                </span>
                {estimatedDeliveryDurationIntervalText}
              </div>
              )}
              {!orderDetail.hasOwnProperty('selectedSlotOption') && estimatedDeliveryDurationMessage && !isOrderDeliveredOrCancelled && (
                <div>
                  <Text type={estimatedDeliveryDurationMessage.isOrderLate ? 'danger' : 'success'}>
                    {estimatedDeliveryDurationMessage.messageText}
                  </Text>
                </div>
              )}
              {calculatedCourierToShopDeliveryDurationTimeInterval && (
                <div>
                  <span className={classes.label}>
                    {`${t('COURIER_TO_SHOP_ETA')}: `}
                  </span>
                  {calculatedCourierToShopDeliveryDurationTimeInterval}
                </div>
              )}
              {lastCalculatedEstimatedDeliveryDurationTimeInterval && (
                <div>
                  <span className={classes.label}>
                    {`${t('COURIER_TO_CUSTOMER_ETA')}: `}
                  </span>
                  {lastCalculatedEstimatedDeliveryDurationTimeInterval}
                </div>
              )}
              {isQueued && !isOrderDeliveredOrCancelled && (
                <div className="mt-3">
                  <span className={classes.label}>
                    {`${t('QUEUE_INFO.QUEUE_STATUS')}: `}
                  </span>
                  {isInQueue ? t('QUEUE_INFO.ORDER_IS_IN_QUEUE') : t('QUEUE_INFO.ORDER_IS_OUT_OF_QUEUE')}
                </div>
              )}
              {orderDetail.selectedSlotOption && (
              <div className="mt-3">
                <span className={classes.label}>
                  {`${t('DELIVERY_TIME')}: `}
                </span>
                {`${getFormattedUTCDate(orderDetail?.selectedSlotOption?.start).replaceAll('/', '.')}  ${(orderDetail?.selectedSlotOption?.timeInterval)}`}
              </div>
              )}
            </div>
            <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE}>
              <div className={classes.ltWrap}>
                <div className={classes.tlContent}>
                  <div className={classes.panelBody}>
                    <div className={classes.tlContentBasket}>
                      <ul>
                        <strong>{t('BASKET')}</strong>
                        {transformedProductsList.map(item => {
                          return (
                            <li key={item._id}>
                              {/* Original Product */}
                              <span>
                                {item.count}{item.selectedAmount && ` x ${item.selectedAmount?.amountText}`}
                                <span className={classes.dash} />
                                {item.name[getLangKey()]} (<Price price={item.priceWithOption} strikethroughPrice={item.struckPrice} />)
                                <span className={classes.dash} />
                                <span className={getProductHistory(item) ? classes.muted : ''}>
                                  <Price price={item.totalPriceWithOption} />
                                </span>
                              </span>
                              {/* Changed Product */}
                              {
                                getProductHistory(item) ? (
                                  <ul>
                                    <li>{getGivenProduct(item)}</li>
                                  </ul>
                                ) : null
                              }
                              {/* Alt Products */}
                              {item.altProducts.length ? (
                                <ul>
                                  {item.altProducts.map(altProduct => (
                                    <li key={altProduct._id}>
                                      {altProduct.count}{altProduct.selectedAmount && ` x ${altProduct.selectedAmount?.amountText}`}
                                      <span className={classes.dash} />
                                      {altProduct.name[getLangKey()]}
                                      (<Price price={altProduct.priceWithOption} strikethroughPrice={altProduct.struckPrice} />)
                                      <span className={classes.dash} />
                                      <Price price={altProduct.totalPriceWithOption} />
                                      <span className={classes.dash} />
                                      <span className={classes.muted}>{t('ORDER_HISTORY.ALT_PRODUCT')}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                              {/* Note */}
                              {item.note && item.note !== '' && (
                              <ul className="list-unstyled">
                                <li>{t('PRODUCT.NOTE')} {item.note}</li>
                              </ul>
                              )}
                              {/* Option Caategories (Not in use anymore, it is always empty) */}
                              {item.optionCategories.length > 0 && item.optionCategories.map(optionCategory => {
                                return (
                                  optionCategory?.name && (
                                  <li key={optionCategory._id}>
                                    {optionCategory.name?.[getLangKey()]}
                                    <ul>
                                      {optionCategory.options.map(option => {
                                        return (
                                          <li key={option._id}>
                                            {option.name[getLangKey()]} {priceFormatter(option?.price)} {currency()}
                                            <ul>
                                              {option.optionCategories.length > 0 && (
                                                <li>
                                                  {option.optionCategories.map(optionCategory2 => {
                                                    return (
                                                      <ul key={optionCategory2._id}>
                                                        {optionCategory2.name[getLangKey]}
                                                        <li>
                                                          {optionCategory2.options.map(option2 => {
                                                            return (
                                                              <span key={option2._id}>
                                                                {option2.name[getLangKey]} - ({priceFormatter(option2?.price)} {currency()})
                                                              </span>
                                                            );
                                                          })}
                                                        </li>
                                                      </ul>
                                                    );
                                                  })}
                                                </li>
                                              )}
                                            </ul>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </li>
                                  )
                                );
                              })}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className={classes.panelBody}>
                    <div className={classes.panelFooter}>
                      <p className={classes.textAlignLeft}>
                        {t('BASKET_AMOUNT')}: {priceFormatter(orderDetail.totalPrice)} {currency()}
                      </p>
                      <p className={classes.textAlignLeft}>
                        {t('FINAL_BASKET_AMOUNT')}: {priceFormatter(finalBasketPrice)} {currency()}
                      </p>
                      {discountedPriceForShop !== finalBasketPrice && (
                      <p className={classes.textAlignLeft}>
                        {t('DISCOUNTED_PRICE_FOR_SHOP')}: {priceFormatter(discountedPriceForShop)} {currency()}
                      </p>
                      )}
                      {isNumber(orderDetail?.appliedDeliveryFee) && (
                      <p className={classes.textAlignLeft}>
                        {t('DELIVERY_FEE')}: {priceFormatter(orderDetail.appliedDeliveryFee)} {currency()}
                      </p>
                      )}
                      <p className={classes.textAlignLeft}>
                        {t('PACKAGING_PRICE')}: {orderDetail.packagingInfo ?
                          priceFormatter(orderDetail.packagingInfo.totalPackagingPrice) : '0.00'} {currency()}
                      </p>
                      {installmentInfo && (
                        <p className={classes.textAlignLeft}>
                          {t('INSTALLMENT_COUNT')}: {installmentInfo.count}
                        </p>
                      )}
                      <p className={classes.textAlignLeft}>
                        <strong>{t('AMOUNT_PAID_BY_CUSTOMER')}: {priceFormatter(amountPaidByCustomer)} {currency()}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Can>
          </div>
        </li>
      )}
      {orderDetail.verifyDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.verifyDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <b>{orderDetail.shop.name}</b> {t('VERIFY_ORDER')}
            </div>
          </div>
        </li>
      )}
      {orderDetail.prepareDate && (
        <li className={classes.ltItem}>
          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.prepareDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <b>{orderDetail.shop.name}</b> {t('PREPARE_ORDER')}
            </div>
          </div>
        </li>
      )}
      {runnerHistory &&
        runnerHistory.map(
          ({ action, actionDate, currentRunner = {}, originRunner = {} }) => {
            return (
              <>
                {currentRunner?.nameSurname !== originRunner?.nameSurname && (
                  <li className={classes.ltItem}>
                    <div className={classes.tlWrapBprimary}>
                      <span className={classes.tlDate}>
                        {formatDate(actionDate)}
                      </span>
                      <div className={classes.tlContent}>
                        <SyncOutlined className={classes.timelineIcon} spin />
                        {t('getirLocals:RUNNER.HANDOVER')} (Runner){' '}
                        {canAccess(permKey.PAGE_GL_RUNNER_DETAIL) ? (
                          <Link
                            to={ROUTE.GL_RUNNER_DETAIL.path.replace(':id', originRunner?.runnerUuid)}
                          >
                            <strong className={classes.textPrimary}>
                              {originRunner?.nameSurname}{' '}
                            </strong>
                          </Link>
                        ) : (
                          <strong>
                            {originRunner?.nameSurname}
                          </strong>
                        ) }
                        {' → '}
                        {canAccess(permKey.PAGE_GL_RUNNER_DETAIL) ? (
                          <Link
                            to={ROUTE.GL_RUNNER_DETAIL.path.replace(':id', currentRunner?.runnerUuid)}
                          >
                            <strong className={classes.textPrimary}>
                              {currentRunner?.nameSurname}
                            </strong>
                          </Link>
                        ) : (
                          <strong>
                            {currentRunner?.nameSurname}
                          </strong>
                        )}
                      </div>
                    </div>
                  </li>
                )}
                {currentRunner?.runnerUuid && (
                <li className={classes.ltItem}>
                  <div className={classes.tlWrapBprimary}>
                    <span className={classes.tlDate}>
                      {formatDate(actionDate)}
                    </span>
                    <div className={classes.tlContent}>
                      <SyncOutlined className={classes.timelineIcon} spin />
                      {canAccess(permKey.PAGE_GL_RUNNER_DETAIL) ? (
                        <Link
                          to={ROUTE.GL_RUNNER_DETAIL.path.replace(':id', currentRunner.runnerUuid)}
                        >
                          <strong className={classes.textPrimary}>
                            {currentRunner.nameSurname}
                          </strong>
                        </Link>
                      ) : (
                        <strong>
                          {currentRunner.nameSurname}{' '}
                        </strong>
                      ) }
                      (Runner) {t(`getirLocals:RUNNER.${action}`)}
                    </div>
                  </div>
                </li>
                ) }
              </>
            );
          },
        )}
      {orderDetail.handoverDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.handoverDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              {t('HANDOVER_ORDER')}
              <RedirectText
                text={<strong className={classes.textPrimary}>{orderDetail.courier.name}</strong>}
                to={`/courier/detail/${orderDetail.courier.id}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
            </div>
          </div>
        </li>
      )}
      {orderDetail.courierVerifyDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.courierVerifyDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <RedirectText
                text={<strong className={classes.textPrimary}>{orderDetail.courier.name}</strong>}
                to={`/courier/detail/${orderDetail.courier.id}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
              {t('VERIFY_ORDER')}
            </div>
          </div>
        </li>
      )}
      {orderDetail.reachDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.reachDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              {t('REACH_LOCATION')}
              <RedirectText
                text={<strong className={classes.textPrimary}>{orderDetail.courier.name}</strong>}
                to={`/courier/detail/${orderDetail.courier.id}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
            </div>
          </div>
        </li>
      )}
      {orderDetail.deliverDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.deliverDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <RedirectText
                text={<strong className={classes.textPrimary}>{orderDetail.courier.name}</strong>}
                to={`/courier/detail/${orderDetail.courier.id}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
              {t('DELIVER_ORDER')}
            </div>
          </div>
        </li>
      )}

      {orderDetail.abortDate && (
        <li className={classes.ltItem}>
          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail?.abortDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              {t('ABORT_ORDER')}
              <strong className="text-danger">
                {orderDetail?.client?.name}
              </strong>
            </div>
          </div>
        </li>
      )}

      {orderDetail?.cancelDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.cancelDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />

              <div className="mb-2">
                <strong className="text-danger">
                  {artisanOrderStatuses[orderDetail.status][getLangKey()]}
                </strong>
              </div>

              <div className={classes.seperator} />

              <div className="pt-2">
                <p>
                  <strong>{t('TRANSACTION_TYPE')}: </strong> {t('CANCELLATION')}
                </p>

                <p>
                  <strong>{t('CANCELLATION_SOURCE')}: </strong>{' '}
                  {getCancellationSource(
                    orderDetail?.cancelReason.cancelSource,
                  )}
                </p>

                <p>
                  <strong>{t('SPECIAL_PREPARED_PRODUCT')}: </strong>{' '}
                  {orderDetail?.isArtisanOrderReady ? t('YES') : t('NO')}
                </p>

                <p>
                  <strong>{t('CANCEL_REASON')}: </strong> {orderDetail?.cancelReason?.messages?.[getLangKey()]}
                </p>

                {orderDetail.canceledBy.callerType === CALLER_TYPES.ADMIN && (
                  <p>
                    <strong>{t('CANCELED_BY')}: </strong>{' '}
                    {orderDetail?.canceledBy.user?.name}
                  </p>
                )}

                <p>
                  <strong>{t('CANCEL_NOTE')}: </strong>{' '}
                  {orderDetail?.cancelNote}
                </p>

                {orderDetail?.cancelledProducts &&
                  orderDetail?.cancelledProducts.length > 0 && (
                    <p>
                      <strong>{t('CANCELLED_PRODUCTS')}: </strong>{' '}
                      {orderDetail?.cancelledProducts
                        ?.map(
                          cancelledProduct => orderDetail?.products?.filter(
                            product => product.product === cancelledProduct,
                          )[0]?.name?.[getLangKey()],
                        )
                        .map(product => {
                          return <span className={classes.mr3}>{product}</span>;
                        })}
                    </p>
                )}
              </div>
            </div>
          </div>
        </li>
      )}

      {PENDING_REFUND_STATUSES.includes(orderDetail?.paymentStatus) && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />

              <div className="mb-2">
                <strong className="text-info">{t('PENDING_REFUND')}</strong>
              </div>
            </div>
          </div>
        </li>
      )}

      {returnsAvailability.returns?.filter(item => !!item.refundType).map((item, index) => (
        <li key={item.id} className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {getDateTimeWithZoneOffset(item.createdDate, item.createTime).split(' ').join('\n')}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />

              <div className="mb-2">
                <strong className="text-danger">{t('RETURN_ITEM', { id: index + 1 })}</strong>
              </div>

              <div className={classes.seperator} />

              <div className="mt-2">
                <p>
                  <strong>{t('TRANSACTION_TYPE')}: </strong> {t(`RETURN_TYPE.${item.refundType}`)}
                </p>

                <p>
                  <strong>{t('REFUNDED_BY')}: </strong>
                  {item.refunderUser?.name}
                </p>
              </div>

              <Button
                size="middle"
                disabled={!canAccess(permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE)}
                onClick={() => openReturnDetails(item.id)}
              >
                {t('REFUND_TIMELINE.SHOW_REFUND_DETAILS')}
              </Button>
            </div>
          </div>
        </li>
      ))}

      {(orderDetail?.status && (!orderDetail?.isInQueue ||
      orderDetail?.status === LOCALS_ORDER_STATUS.ABORTED || orderDetail?.status === LOCALS_ORDER_STATUS.CANCELED_ADMIN ||
      orderDetail?.status === LOCALS_ORDER_STATUS.CANCELED_RESTAURANT)) && (
        <li className={`${classes.tlHeader} mb-0`}>
          <Button className={classes.orderButton}>{artisanOrderStatuses[orderDetail.status][getLangKey()]}</Button>
        </li>
      )}

      {orderDetail?.isInQueue &&
        orderDetail?.status !== LOCALS_ORDER_STATUS.ABORTED &&
        orderDetail?.status !== LOCALS_ORDER_STATUS.CANCELED_ADMIN &&
        orderDetail?.status !== LOCALS_ORDER_STATUS.CANCELED_RESTAURANT && (
          <li className={`${classes.tlHeader} mb-0`}>
            <Button className={classes.orderButton}>
              {t('ORDER_IN_QUEUE')}
            </Button>
          </li>
      )}

      {orderDetail.scheduledDate && (
        <li>
          <Button className={classes.orderButton}>
            {t('SCHEDULED_DELIVERY_DATE')}{' '}
            {formatDate(orderDetail.scheduledDate)}
          </Button>
        </li>
      )}

      {orderDetail?.rating?.courierRateDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.rating.courierRateDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />

              <div className="mb-2">{t('COURIER_RATED')}</div>
              <div className={classes.seperator} />

              <div className="pt-2">
                <p>
                  <strong>{t('RATE')}: </strong>
                  {orderDetail.rating.courierRating}
                </p>
                <p>
                  <strong>{t('COURIER_COMMENT')}: </strong>
                  {orderDetail.rating?.courierNote || '—'}
                </p>
              </div>
            </div>
          </div>
        </li>
      )}

      {orderDetail?.rating?.shopRateDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {formatDate(orderDetail.rating.shopRateDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />

              <div className="mb-2">{t('ORDER_RATED')}</div>
              <div className={classes.seperator} />

              <div className="pt-2">
                <p>
                  <strong>{t('RATE')}: </strong>
                  {orderDetail.rating?.shopRating}
                </p>
                <p>
                  <strong>{t('ORDER_COMMENT')}: </strong>
                  {orderDetail.rating?.shopNote || '—'}
                </p>
              </div>
            </div>
          </div>
        </li>
      )}
    </ul>
  );
};

export default TimelineOrder;
