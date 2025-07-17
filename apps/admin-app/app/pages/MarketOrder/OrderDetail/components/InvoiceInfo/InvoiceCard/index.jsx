import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';

import useStyles from '../styles';
import { Creators } from '../../../redux/actions';
import { getLangKey } from '@shared/i18n';
import { orderInvoiceStatuses, posBanks } from '@shared/shared/constantValues';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { LANGUAGE_CODES, ORDER_INVOICE_STATUS } from '@shared/shared/constants';
import { Card } from '@shared/components/GUI';
import { getOrderByIdSelector } from '../../../redux/selectors';

const InvoiceCard = ({ orderDetail = {} }) => {
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('marketOrderPage');
  const {
    invoice: invoiceDetail,
    payment,
    country,
    client,
    _id: orderId,
    domainType,
  } = orderDetail || {};
  const status = get(invoiceDetail, 'status', '');
  const logoStatus = get(invoiceDetail, 'logoStatus', '');
  const invoice = get(invoiceDetail, 'invoice', {});
  const posBank = posBanks[get(payment, 'parameters.posBank', '')];
  const { invoiceNumber, ptInvoiceNumber } = invoice;
  const localeCode = country?.defaultLanguageCode;
  const isTurkeyOrder =
    localeCode?.toUpperCase() === LANGUAGE_CODES.TR.toUpperCase();
  const newOrderDetail = useSelector(getOrderByIdSelector.getData);

  const hasNewInvoiceDetails = newOrderDetail?.invoice?.status === ORDER_INVOICE_STATUS.INVOICED && newOrderDetail?.invoice?.url;

  const getInvoiceUrl = () => {
    if (hasNewInvoiceDetails) {
      window.open(newOrderDetail.invoice.url, '_blank');
      return;
    }

    const clientId = get(client, 'client._id', '');
    dispatch(Creators.getInvoiceUrlRequest({ clientId, orderId, domainType }));
  };

  const isInvoiceButtonVisible = hasNewInvoiceDetails || (isTurkeyOrder
    ? invoiceNumber || ptInvoiceNumber
    : status === ORDER_INVOICE_STATUS.INVOICED);

  return (
    <Card title={t('INVOICE_INFO.INVOICE_INFO')} size="small">
      <div className={classes.infoCard}>
        {!hasNewInvoiceDetails && (
          <>
            <div className={classes.infoCardLabel}>
              <span className={classes.col1}>{t('INVOICE_INFO.GIB_STATUS')}</span>
              <span className={classes.col2}>
                {orderInvoiceStatuses[status]?.[getLangKey()]}
              </span>
            </div>
            <div className={classes.infoCardLabel}>
              <span className={classes.col1}>{t('INVOICE_INFO.LOGO_STATUS')}</span>
              <span className={classes.col2}>
                {orderInvoiceStatuses[logoStatus]?.[getLangKey()]}
              </span>
            </div>
          </>
        )}
        <div className={classes.infoCardLabel}>
          <span className={classes.col1}>{hasNewInvoiceDetails ? t('INVOICE_INFO.INVOICE_LINK') : t('INVOICE_INFO.INVOICE_NO')}</span>
          {canAccess(permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_INVOICE_BUTTON) ? (
            <span className={classes.col2}>
              {!hasNewInvoiceDetails && (invoiceNumber)}
              {isInvoiceButtonVisible && (
                <div>
                  {hasNewInvoiceDetails ? (
                    <>
                      <a href={newOrderDetail.invoice.url} target="_blank" rel="noopener noreferrer">{t('INVOICE_INFO.SHOW_INVOICE')}</a>
                      <LinkOutlined
                        className={classes.linkIcon}
                        onClick={getInvoiceUrl}
                      />
                    </>
                  ) : (
                    <DownloadOutlined
                      className={classes.downloadIcon}
                      onClick={getInvoiceUrl}
                    />
                  )}
                </div>
              )}
            </span>
          ) : null}
        </div>
        {!hasNewInvoiceDetails && (
          <div className={classes.infoCardLabel}>
            <span className={classes.col1}>{t('INVOICE_INFO.POS_BANK')}</span>
            <span className={classes.col2}>{posBank?.[getLangKey()]}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
export default memo(InvoiceCard);
