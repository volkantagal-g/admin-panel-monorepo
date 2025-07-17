import moment from 'moment';
import { Button } from 'antd';

import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { getLangKey } from '@shared/i18n';
import { FEEDBACK_STATUSES, FEEDBACK_TYPES } from '@shared/shared/constants';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import {
  clientFeedbackTypes,
  feedbackSourceTypes,
  feedbackStatuses,
  orderFeedbackTypes,
  testDriveFeedbackTypes,
} from '@shared/shared/constantValues';
import permKeys from '@shared/shared/permKey.json';

const getFeedback = (type, feedback) => {
  switch (type) {
    case FEEDBACK_TYPES.CLIENT:
      return clientFeedbackTypes[feedback]?.[getLangKey()];
    case FEEDBACK_TYPES.MARKET_ORDER || FEEDBACK_TYPES.ORDER:
      return orderFeedbackTypes[feedback]?.[getLangKey()];
    case FEEDBACK_TYPES.TEST_DRIVE:
      return testDriveFeedbackTypes[feedback]?.[getLangKey()];
    default:
      return '';
  }
};

const getOrderButton = ({ order, type, domainType, t }) => {
  if (order && type === FEEDBACK_TYPES.MARKET_ORDER) {
    return (
      <RedirectButtonV2
        text={t('global:ORDER')}
        to={`/marketOrder/detail/${order}?domainType=${domainType}`}
        permKey={permKeys.PAGE_GETIR_MARKET_ORDER_DETAIL}
        target="_blank"
        size="small"
      />
    );
  }

  if (order && type === FEEDBACK_TYPES.ORDER) {
    return (
      <Button
        disabled
        title={t('clientDetail:WARNING.OLD_VERSION_GETIR_ORDER')}
        size="small"
      >
        {t('global:ORDER')}
      </Button>
    );
  }

  return null;
};

const getDiscountButton = ({ discountCode, t }) => {
  if (!discountCode) {
    return null;
  }

  return (
    <Button
      href={`/personalPromo/detail/${discountCode}`}
      target="_blank"
      size="small"
    >
      {t('global:DISCOUNT')}
    </Button>
  );
};

export const tableColumns = (toggleUpdateModal, hasCSAgentPermission, t) => ([
  {
    title: t('clientDetail:FEEDBACKS.TABLE.COLUMNS.DATE'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => (
      moment(createdAt).format(getLocalDateTimeFormat())
    ),
  },
  {
    title: t('clientDetail:FEEDBACKS.TABLE.COLUMNS.SOURCE'),
    dataIndex: 'source',
    key: 'source',
    render: source => (
      feedbackSourceTypes[source][getLangKey()]
    ),
  },
  {
    title: t('clientDetail:FEEDBACKS.TABLE.COLUMNS.FEEDBACK'),
    dataIndex: 'feedback',
    key: 'feedback',
    render: (feedback, { type }) => (
      getFeedback(type, feedback)
    ),
  },
  {
    title: t('clientDetail:FEEDBACKS.TABLE.COLUMNS.NOTE'),
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: t('clientDetail:FEEDBACKS.TABLE.COLUMNS.STATUS'),
    dataIndex: 'status',
    key: 'status',
    render: status => (
      feedbackStatuses[status][getLangKey()]
    ),
  },
  {
    title: t('clientDetail:FEEDBACKS.TABLE.COLUMNS.ORDER'),
    dataIndex: 'order',
    key: 'order',
    render: (order, { type, domainType }) => (
      getOrderButton({ order, type, domainType, t })
    ),
  },
  {
    title: t('clientDetail:FEEDBACKS.TABLE.COLUMNS.DISCOUNT'),
    dataIndex: 'discountCode',
    key: 'discountCode',
    render: discountCode => (
      getDiscountButton({ discountCode, t })
    ),
  },
  {
    title: t('clientDetail:FEEDBACKS.TABLE.COLUMNS.ACTION'),
    dataIndex: 'status',
    key: 'status',
    render: (status, feedback) => {
      const isFeedbackResolved = (status === FEEDBACK_STATUSES.RESOLVED);

      if (!(isFeedbackResolved || hasCSAgentPermission)) return null;

      return (
        <Button
          size="small"
          onClick={() => toggleUpdateModal(feedback)}
        >
          {isFeedbackResolved ? t('global:DETAIL') : t('global:RESOLVE')}
        </Button>
      );
    },
  },
]);
