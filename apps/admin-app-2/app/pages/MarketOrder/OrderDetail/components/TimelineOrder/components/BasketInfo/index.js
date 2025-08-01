import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { getLangKey } from '@shared/i18n';
import BasketList from '../BasketList';
import PartnershipOrderInfo from '../PartnershipOrderInfo';
import { Space } from '@shared/components/GUI';

const MarketOrderBasketInfo = ({
  classes,
  orderDetail,
  currencyFormatter,
  t,
}) => {
  const chargedAmount = get(
    orderDetail,
    'basket.calculation.totalChargedAmount',
    0,
  );
  const hasProvision = !isEmpty(get(orderDetail, 'provision', {}));
  const hasBagUsage = orderDetail.basket?.bagUsage?.used?.length > 0;
  const totalWeight = get(orderDetail, 'basket.calculation.totalWeight', 0);
  const totalVolume = get(orderDetail, 'basket.calculation.totalVolume', 0);
  const totalDeliveryFee = currencyFormatter(
    get(orderDetail, 'basket.calculation.totalDeliveryFee', 0),
  );
  const updatedBasketAmount = currencyFormatter(
    get(orderDetail, 'basket.calculation.totalAmount', 0),
  );
  const totalGetirFinanceAmount = get(orderDetail, 'basket.calculation.totalGetirFinanceAmount', 0);
  const totalChargedAmount = chargedAmount + totalGetirFinanceAmount;

  const basketAmount = currencyFormatter(
    get(
      orderDetail,
      hasProvision
        ? 'provision.initialTotalAmount'
        : 'basket.calculation.totalAmount',
    ),
  );

  return (
    <div className={classes.ltWrap} data-testid="market-order-basket-info">
      <Space>
        <div className={classes.panelBody}>
          <div className={classes.tlContentBasket}>
            <BasketList orderDetail={orderDetail} />
            {hasBagUsage && (
              <ul>
                <strong>{t('TIMELINE.BAGS')}</strong>
                {orderDetail.basket?.bagUsage?.used?.map(item => {
                  return (
                    <li className={classes.ltItem} key={item?.id}>
                      <span>
                        {item.count}x -{item?.fullName[getLangKey()]} - (
                        {currencyFormatter(item?.totalAmount)})
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className={classes.panelBody}>
          <div className={classes.panelFooter}>
            <p className={classes.textAlignRight}>
              {t('TIMELINE.BASKET_AMOUNT')}: {basketAmount}
            </p>
            {hasProvision && (
              <p className={classes.textAlignRight}>
                {t('TIMELINE.UPDATED_BASKET_AMOUNT')}: {updatedBasketAmount}
              </p>
            )}
            {totalDeliveryFee > 0 && (
              <p className={classes.textAlignRight}>
                {t('TIMELINE.DELIVERY_FEE')}: {totalDeliveryFee}
              </p>
            )}
            <p className={classes.textAlignRight}>
              {t('TIMELINE.WEIGHT')}: {(totalWeight / 1000).toFixed(2)}kg
            </p>
            <p className={classes.textAlignRight}>
              {t('TIMELINE.VOLUME')}: {totalVolume} cm<sup>3</sup>
            </p>
            {totalGetirFinanceAmount > 0 && (
              <p className={classes.textAlignRight}>
                <strong>
                  {t('TIMELINE.GETIR_MONEY_CHARGED_AMOUNT')}:{' '}
                  {currencyFormatter(totalGetirFinanceAmount)}
                </strong>
              </p>
            )}
            <p className={classes.textAlignRight}>
              <strong>
                {t('CARD_AMOUNT')}: {currencyFormatter(chargedAmount)}
              </strong>
            </p>
            <p className={classes.textAlignRight}>
              <strong>
                {t('TIMELINE.TOTAL_CHARGED_AMOUNT')}:{' '}
                {currencyFormatter(totalChargedAmount)}
              </strong>
            </p>
          </div>
          { orderDetail?.integrations && (
          <PartnershipOrderInfo
            classes={classes}
            integrations={orderDetail?.integrations}
            currencyFormatter={currencyFormatter}
            t={t}
          />
          )}
        </div>
      </Space>
    </div>
  );
};
export default MarketOrderBasketInfo;
