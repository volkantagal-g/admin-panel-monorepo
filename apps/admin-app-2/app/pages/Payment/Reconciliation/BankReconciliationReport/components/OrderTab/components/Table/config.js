import moment from 'moment';
import { Tag, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { isLocationTurkey } from '../../../../utils';
import { PAYMENT_METHODS_COLOR_MAP, STATUS_TAG_COLOR_MAP } from '../../../../constants';
import { formatUTCDate } from '@shared/utils/dateHelper';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import { DOMAIN_TAG_COLOR } from '@app/pages/Payment/Reconciliation/constants';

const { Text } = Typography;

export const columns = t => [
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.ORDER_ID'),
    dataIndex: 'orderId',
    key: 'orderId',
    width: 200,
    align: 'center',
    fixed: 'left',
    render: id => {
      return <CopyToClipboard message={id} />;
    },
  },
  ...(isLocationTurkey ?
    [{
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.BASKET_ID'),
      dataIndex: 'basketId',
      width: 200,
      key: 'basketId',
      align: 'center',
      render: basketId => {
        return <CopyToClipboard message={basketId} />;
      },
    }]
    : []),
  ...(!isLocationTurkey ?
    [{
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.PAYMENT_ID'),
      dataIndex: 'externalPaymentTokens',
      width: 200,
      key: 'externalPaymentTokens',
      align: 'center',
      render: externalPaymentTokens => {
        return externalPaymentTokens?.map(
          externalPaymentToken => <CopyToClipboard key={externalPaymentToken} className="m-2" message={externalPaymentToken} />,
        );
      },
    }]
    : []),

  ...(isLocationTurkey ?
    [{
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.EVENT_ID'),
      dataIndex: 'transactionIds',
      key: 'transactionIds',
      width: 200,
      align: 'center',
      render: transactionIds => {
        return transactionIds?.map(transactionId => <CopyToClipboard key={transactionId} className="m-2" message={transactionId} />);
      },
    }] : []),
  {
    title: t('global:DOMAIN'),
    dataIndex: 'domainType',
    key: 'domainType',
    align: 'center',
    width: 150,
    sorter: (a, b) => a.domainType.localeCompare(b.domainType),
    render: domainType => {
      return <Tag color={DOMAIN_TAG_COLOR}> {t(`bankReconciliationReportPage:DOMAINS.${domainType}`)} </Tag>;
    },
  },
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.RECONCILIATION_DATE'),
    dataIndex: 'insertedDate',
    key: 'insertedDate',
    align: 'center',
    width: 100,
    render: insertedDate => {
      return formatUTCDate(insertedDate, DEFAULT_TIME_FORMAT);
    },
  },
  {
    title: 'DOMAIN',
    children: [
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.AMOUNT_TO_BE_REFUNDED'),
        dataIndex: 'primaryPaymentToBeRefunded',
        key: 'primaryPaymentToBeRefunded',
        align: 'center',
        width: 100,
        render: primaryPaymentToBeRefunded => {
          return <Text strong mark> {primaryPaymentToBeRefunded} </Text>;
        },

      },
      {
        title: t('bankReconciliationReportPage:FILTER.REFUND_STATUS.TITLE'),
        key: 'primaryRefundStatus',
        dataIndex: 'primaryRefundStatus',
        sorter: (a, b) => a.primaryRefundStatus.localeCompare(b.primaryRefundStatus),
        align: 'center',
        width: 100,
        render: primaryRefundStatus => {
          const translatedStatus = primaryRefundStatus && t(`bankReconciliationReportPage:REFUND_STATUS_TYPES.${primaryRefundStatus}`);
          return (
            translatedStatus ? (
              <Tag
                color={
                  STATUS_TAG_COLOR_MAP[primaryRefundStatus]
                }
              >
                {translatedStatus}
              </Tag>
            ) : '-'
          );
        },
      },
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.CHARGED_AMOUNT'),
        dataIndex: 'primaryPaymentChargedAmount',
        key: 'primaryPaymentChargedAmount',
        align: 'center',
        width: 100,
        render: primaryPaymentChargedAmount => {
          return <Text> {primaryPaymentChargedAmount} </Text>;
        },
      },
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.REFUND_AMOUNT'),
        dataIndex: 'primaryPaymentRefundAmount',
        key: 'primaryPaymentRefundAmount',
        align: 'center',
        width: 100,
        render: primaryPaymentRefundAmount => {
          return <Text> {primaryPaymentRefundAmount} </Text>;
        },
        sorter: (a, b) => a.refundAmount - b.refundAmount,
      },
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.CHECKOUT_DATE'),
        dataIndex: 'checkoutDate',
        key: 'checkoutDate',
        width: 100,
        align: 'center',
        sorter: (a, b) => new Date(a.checkoutDate) - new Date(b.checkoutDate),
        render: checkoutDate => {
          return formatUTCDate(checkoutDate, DEFAULT_TIME_FORMAT);
        },
      },
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.PAYMENT_METHOD'),
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
        width: 100,
        align: 'center',
        render: paymentMethod => {
          return (
            <Tag
              color={
                PAYMENT_METHODS_COLOR_MAP[paymentMethod]
              }
            >
              {paymentMethod}
            </Tag>
          );
        },
      },
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.ORDER_STATUS'),
        dataIndex: 'status',
        key: 'status',
        width: 100,
        align: 'center',
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: status => {
          const translatedStatus = status && t(`global:POS_REPORT_ORDER_STATUS.${status}`);
          return translatedStatus;
        },
      },
    ],
  },
  ...(isLocationTurkey ? [{
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.GETIRMONEY'),
    children: [
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.AMOUNT_TO_BE_REFUNDED'),
        dataIndex: 'additionalPaymentToBeRefunded',
        key: 'additionalPaymentToBeRefunded',
        align: 'center',
        width: 100,
        render: additionalPaymentToBeRefunded => {
          return <Text strong mark> {additionalPaymentToBeRefunded} </Text>;
        },
      },
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.REFUND_STATUS'),
        dataIndex: 'additionalRefundStatus',
        key: 'additionalRefundStatus',
        sorter: (a, b) => a.additionalRefundStatus.localeCompare(b.additionalRefundStatus),
        width: 100,
        align: 'center',
        render: additionalRefundStatus => {
          const translatedStatus = additionalRefundStatus && t(`bankReconciliationReportPage:REFUND_STATUS_TYPES.${additionalRefundStatus}`);
          return (
            translatedStatus ? (
              <Tag
                color={
                  STATUS_TAG_COLOR_MAP[additionalRefundStatus]
                }
              >
                {translatedStatus}
              </Tag>
            ) : '-'
          );
        },
      },
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.CHARGED_AMOUNT'),
        dataIndex: 'additionalPaymentChargedAmount',
        key: 'additionalPaymentChargedAmount',
        align: 'center',
        width: 100,
        render: additionalPaymentChargedAmount => {
          return <Text> {additionalPaymentChargedAmount} </Text>;
        },
        sorter: (a, b) => a.additionalPaymentChargedAmount - b.additionalPaymentChargedAmount,
      },
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.REFUND_AMOUNT'),
        dataIndex: 'additionalPaymentRefundAmount',
        key: 'additionalPaymentRefundAmount',
        width: 90,
        align: 'center',
        render: additionalPaymentRefundAmount => {
          return <Text> {additionalPaymentRefundAmount} </Text>;
        },
      },
    ],
  }] : []),

  {
    title: isLocationTurkey ? t('bankReconciliationReportPage:TABLE.COLUMNS.BANK') : t('bankReconciliationReportPage:TABLE.COLUMNS.PAYMENT_SOURCE'),
    children: [
      ...(isLocationTurkey ? [{
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.POS_BANK_LIST'),
        dataIndex: 'sourceOfStatements',
        key: 'sourceOfStatements',
        width: 100,
        align: 'center',
        render: sourceOfStatements => {
          return sourceOfStatements?.map(sourceOfStatement => <Tag className="m-2" key={uuidv4()}> {sourceOfStatement} </Tag>);
        },
      }] : []),
      ...(!isLocationTurkey ? [{
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.PAYMENT_TYPES'),
        dataIndex: 'paymentTypes',
        key: 'paymentTypes',
        width: 100,
        align: 'center',
        render: paymentTypes => {
          return paymentTypes?.map(paymentType => <Tag className="m-2" key={uuidv4()}> {paymentType} </Tag>);
        },
      }] : []),
      ...(isLocationTurkey ? [{
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.PROVISION_NUMBERS'),
        dataIndex: 'provisionNumbers',
        key: 'provisionNumbers',
        width: 100,
        align: 'center',
        render: provisionNumbers => {
          return provisionNumbers?.map(provisionNumber => <CopyToClipboard key={provisionNumber} className="m-2" message={provisionNumber} />);
        },
      }] : []),

      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.CHARGED_AMOUNT'),
        dataIndex: 'transactionTotalChargedAmount',
        key: 'transactionTotalChargedAmount',
        width: 100,
        align: 'center',
        render: transactionTotalChargedAmount => {
          return <Text> {transactionTotalChargedAmount} </Text>;
        },
      },
      {
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.REFUND_AMOUNT'),
        dataIndex: 'transactionTotalRefundAmount',
        key: 'transactionTotalRefundAmount',
        align: 'center',
        width: 100,
        sorter: (a, b) => a.transactionTotalRefundAmount - b.transactionTotalRefundAmount,
        render: transactionTotalRefundAmount => {
          return <Text> {transactionTotalRefundAmount} </Text>;
        },
      },
    ],
  },
];

export const excelColumns = t => {
  return [
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.ORDER_ID'),
      dataIndex: 'orderId',
      key: 'orderId',
    },
    ...(isLocationTurkey ?
      [{
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.BASKET_ID'),
        dataIndex: 'basketId',
        key: 'basketId',
      }]
      : []),
    ...(!isLocationTurkey ?
      [{
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.PAYMENT_ID'),
        dataIndex: 'externalPaymentTokens',
        key: 'externalPaymentTokens',
      }]
      : []),
    ...(isLocationTurkey ?
      [{
        title: t('bankReconciliationReportPage:TABLE.COLUMNS.EVENT_ID'),
        dataIndex: 'transactionIds',
        key: 'transactionIds',
      }] : []),
    {
      title: t('global:DOMAIN'),
      dataIndex: 'domainType',
      key: 'domainType',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.RECONCILIATION_DATE'),
      dataIndex: 'checkDate',
      key: 'checkDate',
    },
    {
      title: t('bankReconciliationReportPage:EXCEL.DOMAIN_AMOUNT_TO_BE_REFUNDED'),
      dataIndex: 'primaryPaymentToBeRefunded',
      key: 'primaryPaymentToBeRefunded',
    },
    {
      title: t('bankReconciliationReportPage:EXCEL.DOMAIN_REFUND_STATUS'),
      key: 'primaryRefundStatus',
      dataIndex: 'primaryRefundStatus',
    },
    {
      title: t('bankReconciliationReportPage:EXCEL.DOMAIN_CHARGED_AMOUNT'),
      dataIndex: 'primaryPaymentChargedAmount',
      key: 'primaryPaymentChargedAmount',
    },
    {
      title: t('bankReconciliationReportPage:EXCEL.DOMAIN_REFUND_AMOUNT'),
      dataIndex: 'primaryPaymentRefundAmount',
      key: 'primaryPaymentRefundAmount',
    },
    {
      title: t('bankReconciliationReportPage:EXCEL.DOMAIN_CHECKOUT_DATE'),
      dataIndex: 'checkoutDate',
      key: 'checkoutDate',
    },
    {
      title: t('bankReconciliationReportPage:EXCEL.DOMAIN_PAYMENT_METHOD'),
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: t('bankReconciliationReportPage:EXCEL.DOMAIN_ORDER_STATUS'),
      dataIndex: 'status',
      key: 'status',
    },
    ...(isLocationTurkey ? [
      {
        title: t('bankReconciliationReportPage:EXCEL.GETIR_MONEY_AMOUNT_TO_BE_REFUNDED'),
        dataIndex: 'additionalPaymentToBeRefunded',
        key: 'additionalPaymentToBeRefunded',
      },
      {
        title: t('bankReconciliationReportPage:EXCEL.GETIR_MONEY_REFUND_STATUS'),
        dataIndex: 'additionalRefundStatus',
        key: 'additionalRefundStatus',
      },
      {
        title: t('bankReconciliationReportPage:EXCEL.GETIR_MONEY_CHARGED_AMOUNT'),
        dataIndex: 'additionalPaymentChargedAmount',
        key: 'additionalPaymentChargedAmount',
      },
      {
        title: t('bankReconciliationReportPage:EXCEL.GETIR_MONEY_REFUND_AMOUNT'),
        dataIndex: 'additionalPaymentRefundAmount',
        key: 'additionalPaymentRefundAmount',
      },
    ] : []),
    ...(isLocationTurkey ? [{
      title: t('bankReconciliationReportPage:EXCEL.BANK_POS_BANK_LIST'),
      dataIndex: 'sourceOfStatements',
      key: 'sourceOfStatements',
      align: 'center',
    }] : []),
    ...(!isLocationTurkey ? [{
      title: t('bankReconciliationReportPage:EXCEL.PAYMENT_SOURCE_PAYMENT_TYPES'),
      dataIndex: 'paymentTypes',
      key: 'paymentTypes',
      align: 'center',
    }] : []),
    ...(isLocationTurkey ? [{
      title: t('bankReconciliationReportPage:EXCEL.BANK_PROVISION_NUMBERS'),
      dataIndex: 'provisionNumbers',
      key: 'provisionNumbers',
    }] : []),
    {
      title: isLocationTurkey ? t('bankReconciliationReportPage:EXCEL.BANK_CHARGED_AMOUNT') :
        t('bankReconciliationReportPage:EXCEL.PAYMENT_SOURCE_CHARGED_AMOUNT'),
      dataIndex: 'transactionTotalChargedAmount',
      key: 'transactionTotalChargedAmount',
    },
    {
      title: isLocationTurkey ? t('bankReconciliationReportPage:EXCEL.BANK_REFUND_AMOUNT') :
        t('bankReconciliationReportPage:EXCEL.PAYMENT_SOURCE_REFUND_AMOUNT'),
      dataIndex: 'transactionTotalRefundAmount',
      key: 'transactionTotalRefundAmount',
    },
  ];
};

export const excelFileName = `bank_reconciliation_report_v2_${moment(new Date()).format(
  'DD-MM-YYYY',
)}`;
