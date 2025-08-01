import { Row, Tag } from 'antd';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import {
  STATUS_TAG_COLOR_MAP,
  CUSTOM_DATE_FORMAT,
} from '@app/pages/Payment/constants';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import {
  getRequestedAmount,
  dateStringWithTimeZone,
  getOrderDetailUrlByMerchant,
} from '@app/pages/Payment/utils';
import { formatUTCDate } from '@shared/utils/dateHelper';
import PaymentProviderList from './components/PaymentProviderList';
import RedirectText from '@shared/components/UI/RedirectText';
import permKey from '@shared/shared/permKey.json';

export const allColumns = t => {
  return [
    {
      title: t('paymentTransactionPage:FILTER.MERCHANT_ORDER_ID.TITLE'),
      key: 'merchantOrderId',
      width: 250,
      isActive: true,
      render: ({ data }) => {
        const merchantKey = data?.merchant?.key;
        const isTip = merchantKey.includes('TIP');
        const returnUrl = getOrderDetailUrlByMerchant(merchantKey);
        return (
          data?.merchantOrderId && (
            <Row className="align-items-center justify-content-center">
              {
                isTip ? data?.merchantOrderId : (
                  <RedirectText
                    text={data?.merchantOrderId}
                    to={`${returnUrl}${data?.merchantOrderId}`}
                    permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL}
                    target="_blank"
                    isIconVisible
                  />
                )
              }
            </Row>
          )
        );
      },
      value: t('paymentTransactionPage:FILTER.MERCHANT_ORDER_ID.TITLE'),
      label: t('paymentTransactionPage:FILTER.MERCHANT_ORDER_ID.TITLE'),
      align: 'center',
    },
    {
      title: t('paymentTransactionPage:FILTER.TRANSACTION_ID.TITLE'),
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 200,
      render: transactionId => {
        return (
          <Row className="align-items-center justify-content-center">
            <RedirectText
              text={transactionId}
              to={`/payment/transactions/detail/${transactionId}`}
              permKey={permKey.PAGE_PAYMENT_TRANSACTION_DETAIL}
              target="_blank"
              isIconVisible
            />
          </Row>
        );
      },
      isActive: true,
      hideOnOptions: true,
      value: t('paymentTransactionPage:FILTER.TRANSACTION_ID.TITLE'),
      label: t('paymentTransactionPage:FILTER.TRANSACTION_ID.TITLE'),
      align: 'center',
    },
    {
      title: t('paymentTransactionPage:FILTER.EVENT_ID.TITLE'),
      key: 'eventId',
      width: 220,
      render: ({ data }) => {
        const { events = [] } = data;
        return (
          <Row className="align-items-center justify-content-center">
            <ul
              className="m-0 p-0 list-unstyled overflow-auto"
              style={{ maxHeight: 100 }}
            >
              {events.map(event => {
                return (
                  <li>
                    <RedirectText
                      text={event._id}
                      to={`/payment/event/detail/${event._id}`}
                      permKey={permKey.PAGE_PAYMENT_EVENT_DETAIL}
                      target="_blank"
                      isIconVisible
                    />
                  </li>
                );
              })}
            </ul>
          </Row>
        );
      },
      isActive: true,
      value: t('paymentTransactionPage:FILTER.EVENT_ID.TITLE'),
      label: t('paymentTransactionPage:FILTER.EVENT_ID.TITLE'),
      align: 'center',
    },
    {
      title: t('paymentTransactionPage:FILTER.PSP_REFERENCE.TITLE'),
      key: 'pspReference',
      width: 200,
      isActive: false,
      render: ({ data }) => {
        const { events = [] } = data;
        const pspReferences = events.map(
          event => event?.payment?.data?.pspReference,
        );
        return pspReferences.map(pspRef => (
          <CopyToClipboard className="mb-1" message={pspRef} />
        ));
      },
      value: t('paymentTransactionPage:FILTER.PSP_REFERENCE.TITLE'),
      label: t('paymentTransactionPage:FILTER.PSP_REFERENCE.TITLE'),
      align: 'center',
    },
    {
      title: t('paymentTransactionPage:FILTER.SHOPPER_ID.TITLE'),
      key: 'shopper',
      width: 200,
      isActive: false,
      align: 'center',
      render: ({ data }) => {
        const shopper = data?.shopper;
        return (
          <Row className="align-items-center justify-content-center">
            <RedirectText
              text={shopper?._id}
              to={`/client/detail/${shopper?._id}`}
              permKey={permKey.PAGE_CLIENT_DETAIL}
              target="_blank"
              isIconVisible
            />
          </Row>
        );
      },
      value: t('paymentTransactionPage:FILTER.SHOPPER_ID.TITLE'),
      label: t('paymentTransactionPage:FILTER.SHOPPER_ID.TITLE'),
    },
    {
      title: t('paymentTransactionPage:TABLE.COLUMNS.PROVIDER_AND_METHOD'),
      key: 'providerAndMethod',
      width: 250,
      isActive: true,
      align: 'center',
      render: ({ data }) => {
        const isMixed = data?.mixed;
        // if the transaction is not mixed, get last event's payment method and provider
        const checkedData = isMixed
          ? data?.events
          : [data.events[data.events.length - 1]];
        return (
          <Row className="align-items-center justify-content-center">
            <PaymentProviderList data={checkedData} />
          </Row>
        );
      },
      value: t('paymentTransactionPage:TABLE.COLUMNS.PROVIDER_AND_METHOD'),
      label: t('paymentTransactionPage:TABLE.COLUMNS.PROVIDER_AND_METHOD'),
    },
    {
      title: t('paymentTransactionPage:MIXED_PAYMENT'),
      key: 'mixed',
      width: 150,
      isActive: false,
      render: ({ data }) => {
        return data?.mixed ? (
          <CheckCircleOutlined className="text-success" />
        ) : (
          <CloseCircleOutlined className="text-danger" />
        );
      },
      value: t('paymentTransactionPage:MIXED_PAYMENT'),
      label: t('paymentTransactionPage:MIXED_PAYMENT'),
      align: 'center',
    },
    {
      title: t('global:STATUS'),
      key: 'status',
      width: 150,
      isActive: true,
      hideOnOptions: true,
      render: ({ data }) => {
        const financialSummaryStatus = data?.financialSummary?.status;
        const lastEventStatus = data?.events[data.events.length - 1].status;
        const status = financialSummaryStatus || lastEventStatus;
        return <Tag color={STATUS_TAG_COLOR_MAP[status]}> {status}</Tag>;
      },
      value: t('global:STATUS'),
      label: t('global:STATUS'),
      align: 'center',
    },
    {
      title: t('global:CREATED_AT'),
      key: 'createdAt',
      width: 150,
      isActive: true,
      render: transaction => dateStringWithTimeZone(
        formatUTCDate(transaction?.data?.createdAt, CUSTOM_DATE_FORMAT),
        'UTC',
      ),
      value: t('global:CREATED_AT'),
      label: t('global:CREATED_AT'),
      sorter: true,
      align: 'center',
    },
    {
      title: t('global:UPDATE_AT'),
      key: 'updatedAt',
      width: 150,
      isActive: true,
      hideOnOptions: true,
      render: transaction => dateStringWithTimeZone(
        formatUTCDate(transaction?.data?.updatedAt, CUSTOM_DATE_FORMAT),
        'UTC',
      ),
      value: t('global:UPDATE_AT'),
      label: t('global:UPDATE_AT'),
      sorter: true,
      align: 'center',
    },
    {
      title: t('paymentTransactionPage:TABLE.COLUMNS.MERCHANT_ID'),
      key: 'merchantId',
      width: 200,
      isActive: false,
      value: t('paymentTransactionPage:TABLE.COLUMNS.MERCHANT_ID'),
      label: t('paymentTransactionPage:TABLE.COLUMNS.MERCHANT_ID'),
      align: 'center',
      render: transaction => {
        const merchantId = transaction?.data?.merchant?._id;
        return (
          <Row className="align-items-center justify-content-center">
            <RedirectText
              text={merchantId}
              to={`/payment/merchants/detail/${merchantId}`}
              permKey={permKey.PAGE_PAYMENT_MERCHANT_DETAIL}
              target="_blank"
              isIconVisible
            />
          </Row>
        );
      },
    },
    {
      title: t('paymentTransactionPage:TABLE.COLUMNS.MERCHANT_KEY'),
      key: 'merchantKey',
      width: 170,
      isActive: false,
      render: transaction => {
        const merchantKey = transaction?.data?.merchant?.key;
        const merchantId = transaction?.data?.merchant?._id;
        return (
          <Row className="align-items-center justify-content-center">
            <RedirectText
              text={merchantKey}
              to={`/payment/merchants/detail/${merchantId}`}
              permKey={permKey.PAGE_PAYMENT_MERCHANT_DETAIL}
              target="_blank"
              isIconVisible
            />
          </Row>
        );
      },
      value: t('paymentTransactionPage:TABLE.COLUMNS.MERCHANT_KEY'),
      label: t('paymentTransactionPage:TABLE.COLUMNS.MERCHANT_KEY'),
      align: 'center',
    },
    {
      title: t('paymentTransactionPage:TABLE.COLUMNS.MERCHANT_REFERENCE'),
      key: 'merchantReference',
      width: 200,
      isActive: false,
      render: transaction => {
        return (
          <CopyToClipboard message={transaction?.data?.merchantReference} />
        );
      },
      value: t('paymentTransactionPage:TABLE.COLUMNS.MERCHANT_REFERENCE'),
      label: t('paymentTransactionPage:TABLE.COLUMNS.MERCHANT_REFERENCE'),
      align: 'center',
    },
    {
      title: t('global:LOCATION'),
      key: 'location',
      width: 150,
      isActive: false,
      align: 'center',
      render: transaction => transaction?.data?.location,
      value: t('global:LOCATION'),
      label: t('global:LOCATION'),
    },
    {
      title: t('global:AMOUNT'),
      key: 'amount',
      width: 150,
      isActive: true,
      render: ({ data }) => {
        const financialSummary = data?.financialSummary;
        return getRequestedAmount(financialSummary);
      },
      value: t('global:AMOUNT'),
      label: t('global:AMOUNT'),
      align: 'center',
    },
    {
      title: t('paymentTransactionPage:FILTER.DEVICE_TYPE.TITLE'),
      key: 'shooper',
      width: 150,
      isActive: false,
      render: ({ data }) => {
        const deviceType = data?.shopper?.device?.deviceType;
        return deviceType;
      },
      value: t('paymentTransactionPage:FILTER.DEVICE_TYPE.TITLE'),
      label: t('paymentTransactionPage:FILTER.DEVICE_TYPE.TITLE'),
      align: 'center',
    },
  ];
};
