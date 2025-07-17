import { SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { get } from 'lodash';

import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';

import RedirectText from '@shared/components/UI/RedirectText';
import { getLangKey } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';
import { formatDate } from '@shared/utils/dateHelper';

import {
  financeOrderStatuses,
  getirFinanceOrderCancelList,
} from '@shared/shared/constantValues';
import { secondsToMinutes } from '../../util';
import useStyles from './styles';

const TimelineOrder = () => {
  const classes = useStyles();
  const { t } = useTranslation('financeOrderDetailPage');

  const { checkoutDate, ...orderDetail } =
    useSelector(financeOrderDetailSelector.getData) ?? {};

  const pickingDate = get(orderDetail, 'picking.pickingDate');
  const pickerName = get(orderDetail, 'picker.picker.name');
  const pickerId = get(orderDetail, 'picking.pickerId');
  const clientName = get(orderDetail, 'client.client.name');
  const clientId = get(orderDetail, 'client.client._id');
  const preparationDate = get(orderDetail, 'prepare.preparationDate');
  const prepareProducts = get(orderDetail, 'prepare.products');
  const handoverDateTime = get(orderDetail, 'handover.handoverDateTime');
  const courierName = get(orderDetail, 'courier.courier.name');
  const courierId = get(orderDetail, 'courier.courier.id');
  const verifyDateTime = get(orderDetail, 'verify.verifyDateTime');
  const reachDate = get(orderDetail, 'reach.reachDate');
  const deliverDate = get(orderDetail, 'delivery.deliverDate');
  const orderStatus = get(orderDetail, 'status');
  const cancelDate = get(orderDetail, 'cancelDate');
  const cancelReason = get(orderDetail, 'cancelReasonCode');
  const cancelVendorRejectCode = get(orderDetail, 'cancelVendorRejectCode');
  const collectItemsBarcodes = get(
    orderDetail,
    'delivery.collectItemsBarcodes',
  );

  const cancelReasonCode = cancelVendorRejectCode || cancelReason;

  const cancelBy = get(orderDetail, 'cancelBy');
  const cancellationDescription = get(orderDetail, 'cancellationDescription');
  const products = get(orderDetail, 'basket.products') || [];

  const estimatedDeliveryDuration = secondsToMinutes(
    get(
      orderDetail,
      'deliveryInformation.estimatedTimeOfArrival.lastCalculatedInSecond',
    ) || 0,
  );

  return (
    <ul className={classes.timeline}>
      <li className={classes.tlHeader}>
        <Button className={classes.orderButton}>
          <span>
            {t('ORDER_STATUS')} ({formatDate(checkoutDate)})
          </span>{' '}
          -
          <span>
            {t('FIRST_SHOWN_SHORT')}: {estimatedDeliveryDuration}{' '}
            {t('MINUTE_SHORT')}
          </span>
        </Button>
      </li>
      {checkoutDate && (
        <li className={classes.ltItem}>
          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>{formatDate(checkoutDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <div className="text-lt m-b-sm">
                <RedirectText
                  text={(
                    <strong className={classes.textPrimary}>
                      {clientName}
                    </strong>
                  )}
                  to={`/client/detail/${clientId}`}
                  permKey={permKey.PAGE_CLIENT_DETAIL}
                  target="_blank"
                />
                {t('ORDER.CHECKOUT_ORDER')}.
              </div>
              {products.length > 0 && (
                <div className={classes.gfBasket}>
                  <ul>
                    <strong>{t('BASKET')}</strong>
                    {products.map(product => (
                      <li key={product.productId}>
                        <span>{product.name[getLangKey()]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </li>
      )}
      {pickingDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(pickingDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <RedirectText
                text={
                  <strong className={classes.textPrimary}>{pickerName}</strong>
                }
                to={`/picker/detail/${pickerId}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
              {t('VERIFY_ORDER')}
            </div>
          </div>
        </li>
      )}
      {preparationDate && (
        <li className={classes.ltItem}>
          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>
              {formatDate(preparationDate)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <RedirectText
                text={
                  <strong className={classes.textPrimary}>{pickerName}</strong>
                }
                to={`/picker/detail/${pickerId}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
              {t('PREPARE_ORDER')}

              {prepareProducts.length > 0 && (
                <div className={classes.gfBasket}>
                  <ul>
                    <strong>{t('BARCODE')}</strong>
                    {prepareProducts.map(product => (
                      <li key={product.productId}>
                        <span>{product.validationCodes[0] || '-'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </li>
      )}
      {handoverDateTime && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>
              {formatDate(handoverDateTime)}
            </span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              {t('HANDOVER_ORDER')}
              <RedirectText
                text={
                  <strong className={classes.textPrimary}>{courierName}</strong>
                }
                to={`/courier/detail/${courierId}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
            </div>
          </div>
        </li>
      )}
      {verifyDateTime && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(verifyDateTime)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <RedirectText
                text={
                  <strong className={classes.textPrimary}>{courierName}</strong>
                }
                to={`/courier/detail/${courierId}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
              {t('VERIFY_ORDER')}
            </div>
          </div>
        </li>
      )}
      {reachDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(reachDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <RedirectText
                text={
                  <strong className={classes.textPrimary}>{courierName}</strong>
                }
                to={`/courier/detail/${courierId}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
              {t('REACH_LOCATION')}
            </div>
          </div>
        </li>
      )}
      {deliverDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(deliverDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <RedirectText
                text={
                  <strong className={classes.textPrimary}>{courierName}</strong>
                }
                to={`/courier/detail/${courierId}`}
                permKey={permKey.PAGE_COURIER_DETAIL}
                target="_blank"
              />
              {t('DELIVER_ORDER')}
              {collectItemsBarcodes.length > 0 && (
                <div className={classes.gfBasket}>
                  <ul>
                    <strong>{t('BARCODE')}</strong>
                    {collectItemsBarcodes.map(product => (
                      <li key={product.productId}>
                        <span>{product.validationCode}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </li>
      )}
      {getirFinanceOrderCancelList.includes(orderStatus) && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(cancelDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <b className={classes.cancelTitleText}>
                {financeOrderStatuses?.[orderStatus]?.[getLangKey()] || '-'}
              </b>
              {cancelReasonCode && (
                <div className={classes.panelBody}>
                  <div className={classes.panelFooter}>
                    <p className={classes.cancelMessage}>
                      <strong>{t('TIMELINE.CANCEL_MESSAGE')}</strong>
                      {t(`CANCEL_REASONS.CODE_${cancelReasonCode}`)}
                    </p>
                    {cancellationDescription && (
                      <p>
                        <strong>{t('TIMELINE.CANCEL_NOTE')}</strong>
                        {cancellationDescription}
                      </p>
                    )}
                    {cancelBy && (
                      <p>
                        <strong>{t('TIMELINE.CANCELED_BY_FULLNAME')}</strong>
                        {cancelBy}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </li>
      )}
      {orderStatus && (
        <li className={`${classes.tlHeader} mb-0`}>
          <Button className={classes.orderButton}>
            {financeOrderStatuses?.[orderStatus]?.[getLangKey()] || '-'}
          </Button>
        </li>
      )}
    </ul>
  );
};

export { TimelineOrder };
