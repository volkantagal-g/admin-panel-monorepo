import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { Col, Row, Space as AntSpace } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useMemo } from 'react';

import { Creators } from '../../redux/actions';
import { getLangKey } from '@shared/i18n';
import { formatDate, getTime } from '@shared/utils/dateHelper';
import {
  orderDetailSelector,
  getSlottedDeliveryOptionsSelector,
  changeDeliveryTimeSlotSelector,
  getConfigsWithKeySelector,
} from '../../redux/selectors';
import useStyles from './styles';
import { marketOrderStatuses } from '@shared/shared/constantValues';
import { currencyFormat } from '@shared/utils/localization';
import { ROUTE } from '@app/routes';
import {
  GETIR_MARKET_DOMAIN_TYPE,
  MARKET_ORDER_STATUS,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_MARKET_QUEUE_STATUS,
  ADMIN_PANEL_CONFIGS,
} from '@shared/shared/constants';
import TimelineProgressBar from './components/TimelineProgressBar';
import MarketOrderBasketInfo from './components/BasketInfo';
import { Space, Button, Tag } from '@shared/components/GUI';
import { calculateDisplayDurationForVoyagerCeta, getIntervalFromLayers } from '../../utils';
import { ORDER_CANCEL_SOURCES_LABELS } from '../CancelMarketOrderModal/constants';

const CourierLink = ({ courierId, courierName, classes }) => {
  return (
    <b>
      <a href={ROUTE.COURIER_DETAIL.path.replace(':id', courierId)}>
        <strong className={classes.textPrimary}>{courierName}</strong>
      </a>
    </b>
  );
};

const WarehouseLink = ({ warehouseId, className, warehouseName }) => (
  <b>
    <a href={ROUTE.WAREHOUSE_DETAIL.path.replace(':id', warehouseId)}>
      <strong className={className}>{warehouseName}</strong>
    </a>
  </b>
);

const ClientLink = ({ clientId, className, customerName, query }) => (
  <Link to={`${ROUTE.CLIENT_DETAIL.path.replace(':id', clientId)}${query}`}>
    <strong className={className}>{customerName}</strong>
  </Link>
);
const TimelineOrder = () => {
  const { t } = useTranslation('marketOrderPage');
  const dispatch = useDispatch();
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isModalVisible = useSelector(
    getSlottedDeliveryOptionsSelector.isSlotModalVisible,
  );
  const updatedSlotId = useSelector(
    changeDeliveryTimeSlotSelector.getUpdatedSlot,
  );
  const deliveryOptions = useSelector(
    getSlottedDeliveryOptionsSelector.getData,
  );
  const { slots } = deliveryOptions ?? {};

  const isoCountryCode = get(orderDetail, 'country.currency.code.alpha', 'TRY');
  const { format: currencyFormatter } = currencyFormat({ currency: isoCountryCode });

  const classes = useStyles();

  const verify = get(orderDetail, 'verify', {});
  const customerName = get(orderDetail, 'client.client.name', '');
  const warehouseName = get(orderDetail, 'warehouse.warehouse.name', '');
  const courierName = get(orderDetail, 'courier.courier.name', '');
  const cancelBy = get(orderDetail, 'cancel.cancelBy.name', 'Admin');
  const courierId = get(orderDetail, 'courier.courier._id', '');
  const client = get(orderDetail, 'client.client', {});
  const { _id: clientId, integrationKey } = client;
  const warehouseId = get(orderDetail, 'warehouse.warehouse._id', '');
  const paymentDate = get(orderDetail, 'payment.date', '');
  const pickingDate = get(orderDetail, 'picking.date', '');
  const prepareDate = get(orderDetail, 'prepare.date', '');
  const verifyDate = verify?.date ? verify?.date : verify?.[0]?.date;
  const deliveryDate = get(orderDetail, 'deliver.date', '');
  const ratedDate = get(orderDetail, 'rate.date', '');
  const comment = get(orderDetail, 'rate.comment', '');
  const rating = get(orderDetail, 'rate.rating', '');
  const abortedDate = get(orderDetail, 'abort.date', '');
  const handoverDate = get(orderDetail, 'handover.date', '');
  const onwayDate = get(orderDetail, 'onway.date', '');
  const reachDate = get(orderDetail, 'reach.date', '');
  const checkoutDate = get(orderDetail, 'checkout.date', '');
  const cancelDate = get(orderDetail, 'cancel.date', '');

  const note = get(orderDetail, 'cancel.note', '');
  const title = get(orderDetail, 'cancel.reason.title', '');
  const message = get(orderDetail, 'cancel.reason.messages', '');
  const status = get(orderDetail, 'status', '');
  const source = get(orderDetail, 'cancel.source');

  const orderStatus = marketOrderStatuses[status]?.[getLangKey()];
  const cancelNote = note?.[getLangKey()] || `${note}`;
  const cancelTitle = title?.[getLangKey()];
  const cancelMessage = message?.[getLangKey()];
  const clientIntegrationKeyQuery = integrationKey
    ? `?integrationKey=${integrationKey}`
    : '';
  const cancelSource = source ? ORDER_CANCEL_SOURCES_LABELS[source] : undefined;

  const queueIntervalConfigData = useSelector(getConfigsWithKeySelector(ADMIN_PANEL_CONFIGS.WATER_QUEUE_INTERVAL_CONFIG).getData);
  const etaIntervalConfigData = useSelector(getConfigsWithKeySelector(ADMIN_PANEL_CONFIGS.WATER_ETA_INTERVAL_CONFIG).getData);

  const {
    estimatedTimeOfArrival,
    slottedDeliveryInfo,
    estimatedTimeOfArrivalInterval,
  } = get(orderDetail, 'delivery', {});
  const { lastCalculationDate, lastShown } = estimatedTimeOfArrival ?? {};
  const { lower, upper } = estimatedTimeOfArrivalInterval ?? {};

  const onToggleModal = () => {
    dispatch(Creators.toggleSlotModal({ isVisible: !isModalVisible }));
  };

  const isSlottedDelivery =
    status === MARKET_ORDER_STATUS.RESERVED && !isEmpty(slottedDeliveryInfo);

  const { deliveryDay, deliveryEndTime, deliveryStartTime } = useMemo(() => {
    let dStartTime;
    let dEndTime;
    let dDay;
    const { times: [startTime, endTime] = [], end } =
      slots?.find(slot => slot?.slotId === updatedSlotId) ?? {};

    if (isSlottedDelivery) {
      dStartTime =
        startTime ?? formatDate(slottedDeliveryInfo?.start, 'HH:mm');
      dEndTime = endTime ?? formatDate(slottedDeliveryInfo?.end, 'HH:mm');
      dDay = formatDate(end ?? slottedDeliveryInfo?.end, 'dddd, YYYY-MM-DD');
    }
    return {
      deliveryDay: dDay,
      deliveryEndTime: dEndTime,
      deliveryStartTime: dStartTime,
    };
  }, [isSlottedDelivery, slottedDeliveryInfo, updatedSlotId, slots]);

  const isOrderDelivered = status >= MARKET_ORDER_STATUS.DELIVERED;

  const orderDuration = moment
    .duration(moment().diff(moment(checkoutDate)))
    .asMinutes()
    .toFixed();

  const isOrderLate =
    orderDetail?.domainType === GETIR_MARKET_DOMAIN_TYPE
      ? orderDuration > 15
      : orderDuration > 10;

  const checkoutInfo = useMemo(() => {
    if (orderDetail?.domainType === GETIR_VOYAGER_DOMAIN_TYPE) {
      const isOrderQueued = orderDetail.delivery.queue.status >= GETIR_MARKET_QUEUE_STATUS.QUESTION_ASKED;
      const firstCalculatedEta = get(orderDetail, 'delivery.estimatedTimeOfArrival.firstEstimation', undefined);
      let cetaText = `${lower ?? ''} - ${upper ?? ''}`;

      if (firstCalculatedEta && queueIntervalConfigData) {
        if (isOrderQueued) {
          const intervalDisplay = getIntervalFromLayers({
            intervalLayers: queueIntervalConfigData.value.LAYERS,
            value: firstCalculatedEta,
          });

          cetaText = intervalDisplay;
        }
        else {
          const { displayDuration } = calculateDisplayDurationForVoyagerCeta({
            estimatedTimeOfArrival: firstCalculatedEta,
            durationConfig: etaIntervalConfigData.value,
          });
          cetaText = displayDuration;
        }
      }

      const isWaterOrderLate = orderDuration > Number(cetaText.split('-')[1] ?? 0);

      return [
        {
          label: t('TIMELINE.ORDER_DATE'),
          value: formatDate(checkoutDate),
          color: 'primary',
        },
        {
          label: t('TIMELINE.WATER_CETA'),
          value: `${cetaText}${t('DURATION.MINUTE')}`,
          color: 'secondary',
          hidden: !(lower && upper),
        },
        { label: t('TIMELINE.WATER_TETA'), value: `${lastShown}`, color: 'success' },
        {
          label: t('TIMELINE.WATER_LATEST_TETA_DATE'),
          value: formatDate(lastCalculationDate),
          color: 'secondary',
        },
        {
          label: t('TIMELINE.WATER_ORDER_LATE'),
          value: isWaterOrderLate ? t('global:YES') : t('global:NO'),
          color: isWaterOrderLate ? 'danger' : 'primary',
          hidden: isOrderDelivered,
        },
      ];
    }

    return [
      {
        label: t('TIMELINE.ORDER_DATE'),
        value: formatDate(checkoutDate),
        color: 'primary',
      },
      {
        label: t('TIMELINE.CETA'),
        value: `${lower ?? ''} - ${upper ?? ''}min`,
        color: 'secondary',
        hidden: !(lower && upper),
      },
      { label: t('TIMELINE.TETA'), value: `${lastShown}min`, color: 'success' },
      {
        label: t('TIMELINE.LATEST_TETA_DATE'),
        value: formatDate(lastCalculationDate),
        color: 'secondary',
      },
      {
        label: t('TIMELINE.ORDER_LATE'),
        value: isOrderLate ? t('global:YES') : t('global:NO'),
        color: isOrderLate ? 'danger' : 'primary',
        hidden: isOrderDelivered,
      },
    ];
  }, [checkoutDate, etaIntervalConfigData, isOrderDelivered,
    isOrderLate, lastCalculationDate, lastShown, lower,
    orderDetail, orderDuration, queueIntervalConfigData, t, upper]);

  return (
    <Row data-testid="timeline">
      <TimelineProgressBar
        orderDetail={orderDetail}
        titleLabel={t('TOTAL_TIME')}
      />
      {isSlottedDelivery && (
        <div
          className="w-100 ml-6 flex justify-content-end"
          style={{ fontSize: '14px' }}
        >
          <Space>
            <AntSpace
              align="center"
              style={{ justifyContent: 'space-between' }}
            >
              <Trans
                i18nKey="marketOrderPage:SLOTTED_ORDER_MESSAGE"
                values={{
                  deliveryDay,
                  deliveryStartTime,
                  deliveryEndTime,
                }}
              />
              <Button
                color="secondary"
                size="extra-small"
                onClick={onToggleModal}
              >
                {t('ACTION.CHANGE_SLOT')}
              </Button>
            </AntSpace>
          </Space>
        </div>
      )}
      <Col span={24}>
        <ul className={classes.timeline}>
          <li className={classes.etaInfo}>
            {checkoutInfo?.map(({ value, label, color, hidden }) => (!hidden ? (
              <Tag key={label} size="extra-small" color={color}>
                {label}: {value}
              </Tag>
            ) : null))}
          </li>
          <MarketOrderBasketInfo
            orderDetail={orderDetail}
            classes={classes}
            t={t}
            currencyFormatter={currencyFormatter}
          />
          {paymentDate && (
            <li className={classes.ltItem}>
              <div className={classes.tlWrapBprimary}>
                <span className={classes.tlDate}>{getTime(paymentDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  <div className="text-lt m-b-sm">
                    <ClientLink
                      query={clientIntegrationKeyQuery}
                      className={classes.textPrimary}
                      clientId={clientId}
                      customerName={customerName}
                    />
                    {t('TIMELINE.CHECKOUT_ORDER')}
                  </div>
                </Space>
              </div>
            </li>
          )}
          {pickingDate && (
            <li className={classes.ltItem}>
              <div className={classes.ltWrap}>
                <span className={classes.tlDate}>{getTime(pickingDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  {t('TIMELINE.PICKER_ASSIGNED')}
                </Space>
              </div>
            </li>
          )}
          {verifyDate && (
            <li className={classes.ltItem}>
              <div className={classes.tlWrapBprimary}>
                <span className={classes.tlDate}>{getTime(verifyDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  <div className="text-lt m-b-sm">
                    <WarehouseLink
                      classes={classes.textPrimary}
                      warehouseId={warehouseId}
                      warehouseName={warehouseName}
                    />{' '}
                    {t('TIMELINE.VERIFY_ORDER')}
                  </div>
                </Space>
              </div>
            </li>
          )}
          {prepareDate && (
            <li className={classes.ltItem}>
              <div className={classes.tlWrapBprimary}>
                <span className={classes.tlDate}>{getTime(prepareDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  <div className="text-lt m-b-sm">
                    <WarehouseLink
                      classes={classes.textPrimary}
                      warehouseId={warehouseId}
                      warehouseName={warehouseName}
                    />{' '}
                    {t('TIMELINE.PREPARE_ORDER')}
                  </div>
                </Space>
              </div>
            </li>
          )}
          {handoverDate && (
            <li className={classes.ltItem}>
              <div className={classes.ltWrap}>
                <span className={classes.tlDate}>{getTime(handoverDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  <div className="text-lt m-b-sm">
                    {t('TIMELINE.HANDOVER_ORDER')}
                    <CourierLink
                      classes={classes}
                      courierId={courierId}
                      courierName={courierName}
                    />{' '}
                  </div>
                </Space>
              </div>
            </li>
          )}
          {onwayDate && (
            <li className={classes.ltItem}>
              <div className={classes.ltWrap}>
                <span className={classes.tlDate}>{getTime(onwayDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  <div className="text-lt m-b-sm">
                    <CourierLink
                      classes={classes}
                      courierId={courierId}
                      courierName={courierName}
                    />{' '}
                    {t('TIMELINE.VERIFY_ORDER')}
                  </div>
                </Space>
              </div>
            </li>
          )}
          {reachDate && (
            <li className={classes.ltItem}>
              <div className={classes.ltWrap}>
                <span className={classes.tlDate}>{getTime(reachDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  <div className="text-lt m-b-sm">
                    <CourierLink
                      classes={classes}
                      courierId={courierId}
                      courierName={courierName}
                    />{' '}
                    {t('TIMELINE.REACH_LOCATION')}
                  </div>
                </Space>
              </div>
            </li>
          )}
          {deliveryDate && (
            <li className={classes.ltItem}>
              <div className={classes.ltWrap}>
                <span className={classes.tlDate}>{getTime(deliveryDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  <div className="text-lt m-b-sm">
                    <CourierLink
                      classes={classes}
                      courierId={courierId}
                      courierName={courierName}
                    />{' '}
                    {t('TIMELINE.DELIVER_ORDER')}
                  </div>
                </Space>
              </div>
            </li>
          )}
          {ratedDate && (
            <li className={classes.ltItem}>
              <div className={classes.ltWrap}>
                <span className={classes.tlDate}>{getTime(ratedDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  <div className="text-lt m-b-sm">
                    <strong>
                      <ClientLink
                        query={clientIntegrationKeyQuery}
                        className={classes.textPrimary}
                        clientId={clientId}
                        customerName={customerName}
                      />
                    </strong>{' '}
                    {t('TIMELINE.RATED_ORDER')}
                  </div>
                  <div>
                    <div className={classes.panelFooter}>
                      <div className={classes.textAlignLeft}>
                        <strong>{t('TIMELINE.ORDER_RATE')}</strong>
                        {rating}
                      </div>
                      <div className={classes.textAlignLeft}>
                        <strong>{t('TIMELINE.ORDER_COMMENT')}</strong>
                        {comment}
                      </div>
                    </div>
                  </div>
                </Space>
              </div>
            </li>
          )}
          {abortedDate && (
            <li className={classes.ltItem}>
              <div className={classes.ltWrap}>
                <span className={classes.tlDate}>{getTime(abortedDate)}</span>
                <Space className={classes.tlContent}>
                  <div className="text-lt m-b-sm">
                    <SyncOutlined className={classes.timelineIcon} spin />
                    <b>{courierName}</b> {t('TIMELINE.ABORT_ORDER')}
                  </div>
                </Space>
              </div>
            </li>
          )}
          {cancelDate && (
            <li className={classes.ltItem}>
              <div className={classes.ltWrap}>
                <span className={classes.tlDate}>{getTime(cancelDate)}</span>
                <Space className={classes.tlContent}>
                  <SyncOutlined className={classes.timelineIcon} spin />
                  <b className={classes.cancelTitleText}>
                    {marketOrderStatuses?.[status]?.[getLangKey()]}
                  </b>
                  <div>
                    <div className={classes.panelFooter}>
                      <p>
                        <strong>{t('TIMELINE.CANCEL_TITLE')}</strong>
                        {cancelTitle}
                      </p>
                      <p>
                        <strong>{t('TIMELINE.CANCEL_MESSAGE')}</strong>
                        {cancelMessage}
                      </p>
                      <p>
                        <strong>{t('TIMELINE.CANCEL_NOTE')}</strong>
                        {cancelNote}
                      </p>
                      {cancelSource && (
                        <p>
                          <strong>{t('TIMELINE.CANCEL_SOURCE')}</strong>
                          {cancelSource}
                        </p>
                      )}
                      <p>
                        <strong>{t('TIMELINE.CANCELED_BY_FULL_NAME')}</strong>
                        {cancelBy}
                      </p>
                    </div>
                  </div>
                </Space>
              </div>
            </li>
          )}
          <li className={classes.tlHeader}>
            <Button size="extra-small" className={classes.orderButton}>
              <span>{orderStatus}</span>
            </Button>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default TimelineOrder;
