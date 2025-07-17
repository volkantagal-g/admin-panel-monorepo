import { Tag } from 'antd';
import moment from 'moment';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { PAYMENT_METHODS_COLOR_MAP, TRANSACTION_BEHAVIOUR_TYPES_COLOR_MAP } from '@app/pages/Payment/Reconciliation/BankReconciliationReport/constants';
import { formatUTCDate } from '@shared/utils/dateHelper';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';

export const columns = t => [
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.RENT_ID'),
    dataIndex: 'rentId',
    key: 'rentId',
    fixed: 'left',
    width: 250,
    render: rentId => {
      return <CopyToClipboard message={rentId} />;
    },
  },
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.ORIGINAL_TRANSACTION_ID'),
    dataIndex: 'originalTransactionId',
    key: 'originalTransactionId',
    width: 250,
    render: originalTransactionId => {
      return <CopyToClipboard message={originalTransactionId} />;
    },
  },

  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.TRANSACTION_BEHAVIOUR_TYPE'),
    dataIndex: 'transactionBehaviourType',
    key: 'transactionBehaviourType',
    align: 'center',
    width: 150,
    render: transactionBehaviourType => {
      const translatedType = t(`bankReconciliationReportPage:TRANSACTION_BEHAVIOUR_TYPE_OPTIONS.${transactionBehaviourType}`);
      return (
        <Tag
          color={
            TRANSACTION_BEHAVIOUR_TYPES_COLOR_MAP[transactionBehaviourType]
          }
        >
          {translatedType}
        </Tag>
      );
    },
  },
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.BANK_AMOUNT'),
    key: 'purchaseAmountFromSource',
    align: 'center',
    width: 200,
    render: rowData => {
      const { transactionBehaviourType, refundAmountFromSource, purchaseAmountFromSource } = rowData;
      return transactionBehaviourType === 'Refund' ? refundAmountFromSource : purchaseAmountFromSource;
    },
  },
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.DOMAIN_AMOUNT'),
    key: 'purchaseAmountFromDomain',
    align: 'center',
    width: 150,
    render: rowData => {
      const { transactionBehaviourType, refundAmountFromDomain, purchaseAmountFromDomain } = rowData;
      return transactionBehaviourType === 'Refund' ? refundAmountFromDomain : purchaseAmountFromDomain;
    },
  },
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.TRANSACTION_DATE'),
    dataIndex: 'transactionDate',
    key: 'transactionDate',
    width: 150,
    render: transactionDate => {
      return formatUTCDate(transactionDate, DEFAULT_TIME_FORMAT);
    },
  },
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.RECONCILIATION_DATE'),
    dataIndex: 'checkDate',
    key: 'checkDate',
    width: 150,
    render: checkDate => {
      return formatUTCDate(checkDate, DEFAULT_TIME_FORMAT);
    },
  },
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.REASON'),
    dataIndex: 'reconciliationResponse',
    key: 'reconciliationResponse',
    render: reconciliationResponse => reconciliationResponse?.reasonsForDisagreement
      && t(`bankReconciliationReportPage:DISAGREEMENT_NOTES.${reconciliationResponse.reasonsForDisagreement}`),
    width: 250,
  },
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.POS_BANK'),
    dataIndex: 'sourceOfStatement',
    key: 'sourceOfStatement',
    width: 100,
    align: 'center',
    render: sourceOfStatement => {
      return <Tag className="m-2"> {sourceOfStatement} </Tag>;
    },
  },
  {
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.PAYMENT_METHOD'),
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    width: 150,
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
    title: t('bankReconciliationReportPage:TABLE.COLUMNS.PROVISION_NUMBERS'),
    dataIndex: 'provisionNumber',
    key: 'provisionNumber',
    width: 150,
  },
];

export const excelColumns = t => {
  return [
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.RENT_ID'),
      dataIndex: 'rentId',
      key: 'rentId',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.ORIGINAL_TRANSACTION_ID'),
      dataIndex: 'originalTransactionId',
      key: 'originalTransactionId',
    },

    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.TRANSACTION_BEHAVIOUR_TYPE'),
      dataIndex: 'transactionBehaviourType',
      key: 'transactionBehaviourType',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.BANK_AMOUNT'),
      key: 'purchaseAmountFromSource',
      dataIndex: 'purchaseAmountFromSource',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.DOMAIN_AMOUNT'),
      key: 'purchaseAmountFromDomain',
      dataIndex: 'purchaseAmountFromSource',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.TRANSACTION_DATE'),
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.RECONCILIATION_DATE'),
      dataIndex: 'checkDate',
      key: 'checkDate',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.IS_RECONCILED'),
      dataIndex: 'isReconciled',
      key: 'isReconciled',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.REASON'),
      dataIndex: 'reasonsForDisagreement',
      key: 'reasonsForDisagreement',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.POS_BANK'),
      dataIndex: 'sourceOfStatement',
      key: 'sourceOfStatement',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.PAYMENT_METHOD'),
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.PROVISION_NUMBERS'),
      dataIndex: 'provisionNumber',
      key: 'provisionNumber',
    },
  ];
};

export const excelFileName = `drive_reconciliation_report_${moment(new Date()).format('DD-MM-YYYY')}`;
