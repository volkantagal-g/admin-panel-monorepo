import { Button, Space, Tag } from 'antd';

import moment from 'moment';

import { t } from '@shared/i18n';
import { getLocalDateFormat } from '@shared/utils/localization';
import { DetailButton } from '@shared/components/UI/List';
import { ROUTE } from '@app/routes';

export const tableColumns = handleStatusChange => {
  const columns = [
    {
      title: t('global:ACTIVENESS'),
      dataIndex: 'isEnable',
      key: 'isEnable',
      width: 100,
      render: isEnable => {
        const color = isEnable ? 'success' : 'error';
        const text = isEnable ? t('global:ACTIVE') : t('global:INACTIVE');
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: t('global:FILE_NAME'),
      dataIndex: 'fileName',
      key: 'fileName',
      width: 200,
    },
    {
      title: t('global:CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: createdAt => moment(createdAt).format(getLocalDateFormat()),
    },
    {
      title: t('global:CREATED_BY'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 200,
      render: createdBy => createdBy ?? '-',
    },
    {
      title: t('global:ACTION'),
      dataIndex: '_id',
      key: '_id',
      width: '200px',
      align: 'right',
      render: (_id, record) => {
        const id = _id || '';
        const path = ROUTE.FRANCHISE_LEGAL_DETAIL.path.replace(':agreementId', '');
        return (
          <Space>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleStatusChange({ id: _id, status: record.isEnable })}
              style={{ width: '85px' }}
            >
              {record.isEnable ? t('franchiseLegalPage:LIST.MAKE_IT_INACTIVE') : t('franchiseLegalPage:LIST.MAKE_IT_ACTIVE')}
            </Button>
            <DetailButton _id={id} urlPath={path} />
          </Space>

        );
      },

    },
  ];

  return columns;
};
