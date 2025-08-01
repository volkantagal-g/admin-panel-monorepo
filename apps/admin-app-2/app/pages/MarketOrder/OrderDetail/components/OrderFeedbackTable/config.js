import { Button } from 'antd';

import { getLangKey } from '@shared/i18n';
import { feedbackSourceTypes } from '@shared/shared/constantValues';
import { formatDate } from '@shared/utils/dateHelper';

import { getFeedbackStatus } from '../utils';
import AgentActions from '../AgentActions';

export const getTableColumns = t => [
  {
    title: t('CLIENT_FEEDBACK_TABLE.DATE'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => formatDate(createdAt),
  },
  {
    title: t('CLIENT_FEEDBACK_TABLE.FEEDBACK_SOURCE'),
    dataIndex: 'source',
    key: 'source',
    render: source => feedbackSourceTypes?.[source]?.[getLangKey()],

  },
  {
    title: t('CLIENT_FEEDBACK_TABLE.FEEDBACK'),
    render: ({ type, feedback }) => getFeedbackStatus(type, feedback),
  },
  {
    title: t('CLIENT_FEEDBACK_TABLE.NOTE'),
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: t('ORDER_FEEDBACK_TABLE.SKT_DATE'),
    dataIndex: 'skt',
    key: 'skt',
    render: skt => formatDate(skt),

  },
  {
    title: t('CLIENT_FEEDBACK_TABLE.CREATED_BY'),
    dataIndex: 'interestedUser',
    key: 'interestedUser',
    render: interestedUser => interestedUser?.name,
  },
  {
    title: t('CLIENT_FEEDBACK_TABLE.DISCOUNT'),
    dataIndex: 'discountCode',
    key: 'discountCode',
    render: discountCode => (discountCode ? (
      <a
        target="_blank"
        href={`/personalPromo/detail/${discountCode}`}
        rel="noreferrer"
      >
        <Button type="button" size="small">
          {t('global:DISCOUNT')}
        </Button>
      </a>
    ) : null),
  },
  {
    title: t('global:ACTION'),
    render: feedback => (
      <AgentActions isFeedbackDetails feedback={feedback} />
    ),
  },
];
