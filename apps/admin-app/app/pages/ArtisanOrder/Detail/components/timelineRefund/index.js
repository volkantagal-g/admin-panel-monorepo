import { useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Typography, Tabs, Spin } from 'antd';

import { Link } from 'react-router-dom';

import { Creators } from '@app/pages/ArtisanOrder/Detail/redux/actions';
import {
  orderReturnsSelector,
  refundTabActiveKeySelector,
  returnRunnerHistorySelector,
  returnsAvailabilitySelector,
} from '@app/pages/ArtisanOrder/Detail/redux/selectors';

import Timeline from '@shared/components/Timeline';
import Card from '@shared/components/Card';
import Address from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/Address';
import RefundBasket from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/RefundBasket';
import RefundCode from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/RefundCode';
import CancelRefundCard from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/CancelRefundCard';
import EditDateCard from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/EditDateCard';
import RefundInfo from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/RefundedBy';
import permKey from '@shared/shared/permKey.json';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/styles';

import { STATUS, TYPE as TIMELINE_TYPE } from '@shared/components/Timeline/constants';
import { TYPE as CARD_TYPE } from '@shared/components/Card/constants';
import RefundModal from '../actionsMenu/modals/RefundModal';
import { DELIVERY_TYPES } from '../actionsMenu/modals/RefundModal/constants';
import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const { Text } = Typography;

const TimelineRefund = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');
  const { canAccess } = usePermission();

  const refundTabActiveKey = useSelector(refundTabActiveKeySelector.getData);
  const returnRunnerHistory =
    useSelector(returnRunnerHistorySelector)?.data?.data?.types ?? null;
  const [isTimeSlotChangeModalOpen, setIsTimeSlotChangeModalOpen] = useState(false);
  const [shopReturnDetails, setShopReturnDetails] = useState(null);
  const [isBasketDetailsLoading, setIsBasketDetailsLoading] = useState(false);

  const orderReturns = useSelector(orderReturnsSelector.getData);
  const isOrderReturnsPending = useSelector(orderReturnsSelector.getIsPending);
  const returnsAvailability = useSelector(returnsAvailabilitySelector.getData);

  const { returns: returnsMeta } = returnsAvailability;
  const { states: returnStates = [] } = orderReturns;

  const isReturnProcessCompleted = returnStates[returnStates.length - 1]?.active;

  const onTabClick = activeKey => {
    if (activeKey === refundTabActiveKey) {
      return;
    }
    dispatch(Creators.getOrderReturnsRequest({ returnId: activeKey }));
  };

  const onTimeSlotChangeClose = useCallback(() => setIsTimeSlotChangeModalOpen(false), []);

  // Merges and sorts the returnHistory with the runner history by date
  const orderReturnsWithRunner = useMemo(() => {
    const { returnHistory } = orderReturns;
    const returnHistoryArr = Array.isArray(returnHistory) ? returnHistory : [];
    const returnRunnerHistoryArr = Array.isArray(returnRunnerHistory)
      ? returnRunnerHistory
      : [];

    return [...returnHistoryArr, ...returnRunnerHistoryArr]
      .map(item => (item?.happenedDate ? item : { ...item, happenedDate: item.actionDate }))
      .sort(
        (item1, item2) => new Date(item1.happenedDate) - new Date(item2.happenedDate),
      );
  }, [orderReturns, returnRunnerHistory]);

  useEffect(() => {
    if (!refundTabActiveKey) return;

    setIsBasketDetailsLoading(true);

    dispatch(Creators.getShopReturnDetailsRequest({
      returnId: refundTabActiveKey,
      onSuccess: data => {
        setShopReturnDetails(data);
      },
      onFinally: () => setIsBasketDetailsLoading(false),
    }));
  }, [refundTabActiveKey, dispatch]);

  if (!returnsMeta?.length) {
    return null;
  }

  return (
    <Spin spinning={isOrderReturnsPending}>
      <Text className={classes.title}>{t('REFUND_TIMELINE.TITLE')}</Text>
      <Tabs
        className={classes.tabs}
        onTabClick={onTabClick}
        activeKey={refundTabActiveKey}
      >
        {returnsMeta.map((returnMeta, i) => (
          <Tabs.TabPane
            tab={`${t('REFUND_TIMELINE.REFUND')} ${i + 1}`}
            key={returnMeta.id}
          >
            <Timeline type={TIMELINE_TYPE.DANGER} status={isReturnProcessCompleted ? STATUS.DONE : STATUS.WAITING}>
              <Timeline.Item
                label={(
                  <Card type={CARD_TYPE.MUTED}>
                    <Text strong>{returnMeta.createdDate}</Text>
                  </Card>
                )}
              >
                <CancelRefundCard returnId={returnMeta.id} />
              </Timeline.Item>

              <Timeline.Item hideDot>
                <RefundInfo refundedBy={returnMeta.refunderUser?.name} deliveryType={orderReturns?.deliveryType} />
              </Timeline.Item>

              <Timeline.Item hideDot>
                <RefundCode refundCode={orderReturns.returnCode} />
              </Timeline.Item>
              {canAccess(permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE) &&
              orderReturns?.deliveryType === DELIVERY_TYPES.COURIER_RETRIEVES && (
                <Timeline.Item hideDot>
                  <EditDateCard
                    isDisabled={!orderReturns?.editable}
                    selectedSlotDate={orderReturns?.selectedSlotDate}
                    selectedSlotTime={orderReturns?.selectedSlotTime}
                    onClick={() => {
                      setIsTimeSlotChangeModalOpen(true);
                    }}
                  />
                </Timeline.Item>
              )}
              {
                canAccess(permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE) && (
                <Timeline.Item hideDot>
                  <Address location={orderReturns.location} />
                </Timeline.Item>
                )
              }
              {
                canAccess(permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE) && (
                  <Timeline.Item>
                    <RefundBasket
                      returnId={returnMeta?.id}
                      products={orderReturns?.selectedProducts}
                      detailProducts={shopReturnDetails?.products || []}
                      totalPrice={shopReturnDetails?.paymentInfo?.totalAmount}
                      isBasketDetailsLoading={isBasketDetailsLoading}
                    />
                  </Timeline.Item>
                )
              }
              {orderReturnsWithRunner.map(
                (
                  {
                    happenedDate,
                    explanation,
                    action,
                    currentRunner = {},
                    originRunner = {},
                  },
                  j,
                ) => (
                  // Since there is no unique id is provided in the array and array items' order or count is not going to be changed interactively
                  // array index is used here as a key
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={j}>
                    {currentRunner?.runnerUuid !== originRunner?.runnerUuid && (
                      <Timeline.Item
                        type={TIMELINE_TYPE.DANGER}
                        label={(
                          <Card
                            type={CARD_TYPE.MUTED}
                            classNames={classes.labelCard}
                          >
                            <Text strong>
                              {moment(happenedDate).format('l [\n] H:mm:ss')}
                            </Text>
                          </Card>
                        )}
                      >
                        <Card classNames={classes.refundEventCard}>
                          <div>
                            <Text>
                              {t('getirLocals:RUNNER.REFUND_HANDOVER')} (Runner){' '}
                              {canAccess(permKey.PAGE_GL_RUNNER_DETAIL) ? (
                                <Link
                                  to={ROUTE.GL_RUNNER_DETAIL.path.replace(':id', originRunner?.runnerUuid)}
                                >
                                  <strong className={classes.textPrimary}>
                                    {originRunner?.nameSurname}
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
                                  {originRunner?.nameSurname}
                                </strong>
                              ) }
                            </Text>
                          </div>
                        </Card>
                      </Timeline.Item>
                    )}
                    <Timeline.Item
                      type={TIMELINE_TYPE.DANGER}
                      label={(
                        <Card
                          type={CARD_TYPE.MUTED}
                          classNames={classes.labelCard}
                        >
                          <Text strong>
                            {moment(happenedDate).format('l [\n] H:mm:ss')}
                          </Text>
                        </Card>
                      )}
                    >
                      <Card classNames={classes.refundEventCard}>
                        <Text>
                          {currentRunner?.runnerUuid && (
                            <>
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
                                  {currentRunner.nameSurname}
                                </strong>
                              ) }
                              {' '}
                              (Runner)
                            </>
                          )}{' '}
                          {explanation || t(`getirLocals:RUNNER.REFUND_${action}`)}
                        </Text>
                      </Card>
                    </Timeline.Item>
                  </Fragment>
                ),
              )}
            </Timeline>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <RefundModal.TimeSlotChange
        title={t('TIME_SLOT_CHANGE')}
        returnId={refundTabActiveKey}
        isOpen={isTimeSlotChangeModalOpen}
        onClose={onTimeSlotChangeClose}
      />
    </Spin>
  );
};

export default TimelineRefund;
