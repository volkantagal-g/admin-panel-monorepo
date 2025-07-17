import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import defaultOptions from '@shared/components/UI/AntTable/defaultOptions';

export const INIT_FILTERS_ORDER = {
  page: 1,
  pageSize: 25,
  orderIds: [],
  transactionIds: [],
  externalPaymentTokens: [],
  startCheckoutDate: null,
  endCheckoutDate: null,
  reconciliationCheckEndDate: moment().format(DEFAULT_DATE_FORMAT),
  reconciliationCheckStartDate: moment().subtract(1, 'days').format(DEFAULT_DATE_FORMAT),
  checkoutDate: null,
  reconciliationCheckDate: [moment().subtract(1, 'days'), moment()],
  domainTypes: [],
  sourceOfStatements: [],
  isRefundable: true,
  refundStatus: [],
  orderStatus: [],
  basketIds: [],
};

export const INIT_FILTERS_TRANSACTION = {
  page: 1,
  pageSize: 25,
  rentId: null,
  originalTransactionId: null,
  checkDate: [moment().subtract(1, 'days'), moment()],
  checkStartDate: moment().subtract(1, 'days').format(DEFAULT_DATE_FORMAT),
  checkEndDate: moment().format(DEFAULT_DATE_FORMAT),
  transactionDate: null,
  transactionStartDate: null,
  transactionEndDate: null,
  isReconciled: false,
};

export const REFUND_STATUS_OPTIONS = t => [
  {
    label: t('bankReconciliationReportPage:REFUND_STATUS_TYPES.None'),
    value: 0,
  },
  {
    label: t('bankReconciliationReportPage:REFUND_STATUS_TYPES.Processing'),
    value: 1,
  },
  {
    label: t('bankReconciliationReportPage:REFUND_STATUS_TYPES.Completed'),
    value: 2,
  },
  {
    label: t('bankReconciliationReportPage:REFUND_STATUS_TYPES.Failed'),
    value: 3,
  },
  {
    label: t('bankReconciliationReportPage:REFUND_STATUS_TYPES.AlreadyRefunded'),
    value: 4,
  },
];

export const STATUS_TAG_COLOR_MAP = {
  None: 'grey',
  Processing: 'yellow',
  Completed: 'green',
  Failed: 'red',
  Pending: 'blue',
  AlreadyRefunded: 'yellow',
};

export const ORDER_STATUS_OPTIONS = t => [
  {
    label: t('global:POS_REPORT_ORDER_STATUS.CREATED_OR_PAYMENT_FAILED'),
    value: 10,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.PAID_OR_PAYMENT_SUCCESS'),
    value: 20,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.WAITING_REFUND'),
    value: 30,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.REFUNDED'),
    value: 40,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.REFUND_FAILED'),
    value: 50,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Incomplete'),
    value: 100,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Aborted'),
    value: 200,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Browsing'),
    value: 300,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Reserved / Scheduled'),
    value: 350,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.WaitingForPicker'),
    value: 375,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Verifying'),
    value: 400,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Preparing'),
    value: 500,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Prepared'),
    value: 550,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Handover'),
    value: 600,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Onway'),
    value: 700,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Reached'),
    value: 800,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Delivered'),
    value: 900,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Rated'),
    value: 1000,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.CanceledByCourier'),
    value: 1100,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.CanceledByClient'),
    value: 1200,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.CanceledByStaff'),
    value: 1300,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.CanceledBySystem'),
    value: 1400,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.CanceledByAdmin'),
    value: 1500,
  },
  {
    label: t('global:POS_REPORT_ORDER_STATUS.Canceled by Restaurant / Vendor'),
    value: 1600,
  },
];

export const TRANSACTION_BEHAVIOUR_TYPES_COLOR_MAP = {
  None: 'grey',
  Sales: 'green',
  Refund: 'yellow',
  PreProvisionClosing: 'orange',
  ChargeBack: 'wheat',
  RefundScheduled: 'green',
  PreProvision: 'coral',
  RewardPoint: 'teal',
  Earn: 'coral',
};

export const PAYMENT_METHODS_COLOR_MAP = {
  MasterPass: 'green',
  IstanbulCard: 'brown',
  BKM: 'blue',
  Adyen: 'orange',
  MobilExpress: 'teal',
};

export const TABLE_PAGE_SIZE_OPTIONS = [...defaultOptions.pageSizeOptions, 200];
