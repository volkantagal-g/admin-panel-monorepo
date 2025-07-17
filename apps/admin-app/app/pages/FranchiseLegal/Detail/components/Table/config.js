import { Tag } from 'antd';

import moment from 'moment';

import { t } from '@shared/i18n';
import { getLocalDateFormat } from '@shared/utils/localization';

export const tableColumns = () => {
  const columns = [
    {
      title: t('global:FRANCHISE'),
      dataIndex: 'franchise',
      key: 'franchise',
      width: 200,
    },
    {
      title: t('global:STATUS'),
      dataIndex: 'acceptanceStatus',
      key: 'acceptanceStatus',
      width: 100,
      render: acceptanceStatus => {
        const color = acceptanceStatus === 1 ? 'success' : 'error';
        const text = acceptanceStatus === 1 ? t('franchiseLegalPage:DETAIL.APPROVED') : t('franchiseLegalPage:DETAIL.NOT_APPROVED');
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: t('franchiseLegalPage:DETAIL.APPROVAL_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: createdAt => (createdAt ? moment(createdAt).format(getLocalDateFormat()) : t('franchiseLegalPage:DETAIL.NO_DATE')),
    },
  ];

  return columns;
};
