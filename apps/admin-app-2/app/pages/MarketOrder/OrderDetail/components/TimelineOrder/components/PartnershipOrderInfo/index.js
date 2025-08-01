import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { INTEGRATION_TYPES } from '@shared/shared/constants';

const PartnershipOrderInfo = ({
  classes,
  integrations,
  currencyFormatter,
  t,
}) => {
  const [integrationType] = get(integrations, 'types', []);
  const partnershipOrderInfo = get(
    integrations,
    `items.${integrationType}`,
    {},
  );
  const partnershipOrderPaymentInfo = get(partnershipOrderInfo, 'payment', {});

  const { tipAmount, salesTaxAmount, fees, discountAmount, chargeAmount } =
    partnershipOrderInfo;

  const integrationTitle = t(`INTEGRATION.${integrationType?.toUpperCase()}`);
  const hasGorillasInfo =
    integrationType?.toLowerCase() === INTEGRATION_TYPES.GORILLAS?.toLowerCase();

  return !isEmpty(partnershipOrderInfo) ? (
    <div data-testid="partnership-order-info">
      <div className={classes.panelFooter}>
        <h6>
          <strong>{`${integrationTitle} ${t('global:DETAIL')}`}</strong>
        </h6>
        <p>
          <strong className="mr-1">{t('CHANNEL')}:</strong>
          {partnershipOrderInfo?.channel?.name ?? integrationType}
        </p>
        {partnershipOrderInfo?.id && (
          <p>
            <strong className="mr-1">{t('ORDER_ID')}: </strong>{' '}
            {partnershipOrderInfo?.id ?? partnershipOrderInfo?.orderId}
          </p>
        )}
        <p>
          <strong className="mr-1">{t('REFERENCE_ID')}: </strong>
          {partnershipOrderInfo?.referenceId}
        </p>
        {!isEmpty(partnershipOrderPaymentInfo) && (
          <>
            <h6>
              <strong className="mr-1">{t('PAYMENT_INFO')}</strong>
            </h6>
            {partnershipOrderPaymentInfo?.adjustments?.map(adjustment => {
              const { name, price } = adjustment;
              return (
                <li key={name}>
                  <div>
                    <strong className="mr-1">{t('global:NAME')}</strong>: {name}
                  </div>
                  <div>
                    <strong className="mr-1">{t('global:PRICE')}</strong>:
                    {currencyFormatter((price?.inc_tax || 0) / 100)}
                  </div>
                </li>
              );
            })}
            <p>
              <strong className="mr-1">{t('CHECKOUT_AMOUNT')}</strong>:
              {currencyFormatter(
                (partnershipOrderPaymentInfo?.checkoutAmount || 0) / 100,
              )}
            </p>
            <p>
              <strong className="mr-1">{t('CART_AMOUNT')}</strong>:
              {currencyFormatter(
                (partnershipOrderPaymentInfo?.items_in_cart?.inc_tax || 0) / 100,
              )}
            </p>
            <p>
              <strong className="mr-1">{t('FINAL_AMOUNT')}</strong>:
              {currencyFormatter(
                (partnershipOrderPaymentInfo?.final?.inc_tax || 0) / 100,
              )}
            </p>
            {!isEmpty(partnershipOrderPaymentInfo?.discount) && (
              <p>
                <strong className="mr-1">{t('DISCOUNT_AMOUNT')}</strong> :
                {currencyFormatter(
                  (partnershipOrderPaymentInfo?.discount?.inc_tax || 0) / 100,
                )}
              </p>
            )}
          </>
        )}
        {hasGorillasInfo && (
          <>
            <p>
              <strong className="mr-1">{t('CHARGED_AMOUNT')}:</strong>
              {currencyFormatter(chargeAmount || 0)}
            </p>
            <p>
              <strong className="mr-1">{t('DISCOUNT_AMOUNT')}:</strong>
              {currencyFormatter(discountAmount || 0)}
            </p>
            <p>
              <strong className="mr-1">
                {t('GORILLAS.SALES_TAX_AMOUNT')}:
              </strong>
              {currencyFormatter(salesTaxAmount || 0)}
            </p>
            <p>
              <strong className="mr-1">{t('TIP_AMOUNT')}:</strong>
              {currencyFormatter(tipAmount || 0)}
            </p>
            <p>
              <strong className="mr-1">{t('TIMELINE.DELIVERY_FEE')}:</strong>
              {currencyFormatter(fees?.deliveryFee || 0)}
            </p>
            <p>
              <strong className="mr-1">{t('SERVICE_FEE')}:</strong>
              {currencyFormatter(fees?.serviceFee || 0)}
            </p>
          </>
        )}
      </div>
    </div>
  ) : null;
};
export default PartnershipOrderInfo;
