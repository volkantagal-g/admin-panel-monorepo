import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { getLangKey } from '@shared/i18n';
import {
  feedbackSourceTypes,
  feedbackStatuses,
} from '@shared/shared/constantValues';
import { formatDate } from '@shared/utils/dateHelper';
import { getFeedbackStatus } from '../utils';

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
    title: t('CLIENT_FEEDBACK_TABLE.STATUS'),
    dataIndex: 'status',
    key: 'status',
    render: status => feedbackStatuses?.[status]?.[getLangKey()],
  },
  {
    title: t('CLIENT_FEEDBACK_TABLE.ORDER'),
    render: ({ order, domainType }) => {
      const link = `/marketOrder/detail/${order}?domainType=${domainType}`;
      return (
        order ? (
          <Button size="small">
            <Link to={link}>
              {t('global:ORDER')}
            </Link>
          </Button>
        ) : null
      );
    },
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
];
