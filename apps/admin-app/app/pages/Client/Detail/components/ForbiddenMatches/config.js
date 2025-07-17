import moment from 'moment';
import { Button } from 'antd';

import { getLocalDateTimeFormat } from '@shared/utils/localization';

export const tableColumns = (handleActivenessButtonClick, t) => ([
  {
    title: t('clientDetail:FORBIDDEN_MATCHES.TABLE.COLUMNS.DATE'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => (
      moment(createdAt).format(getLocalDateTimeFormat())
    ),
  },
  {
    title: t('clientDetail:FORBIDDEN_MATCHES.TABLE.COLUMNS.COURIER'),
    dataIndex: 'person',
    key: 'person',
    render: ({ name }) => (<>{name}</>),
  },
  {
    title: t('clientDetail:FORBIDDEN_MATCHES.TABLE.COLUMNS.DESCRIPTION'),
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: t('clientDetail:FORBIDDEN_MATCHES.TABLE.COLUMNS.CREATED_BY'),
    dataIndex: 'createdBy',
    key: 'createdBy',
    render: ({ name } = { name: '' }) => (<>{name}</>),
  },
  {
    title: t('clientDetail:FORBIDDEN_MATCHES.TABLE.COLUMNS.ACTIVENESS'),
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive, forbiddenMatch) => (
      <>
        <Button
          size="small"
          onClick={() => handleActivenessButtonClick(forbiddenMatch) }
          danger={isActive}
        >
          {isActive ? t('button:INACTIVATE') : t('button:ACTIVATE')}
        </Button>
      </>
    ),
  },
]);
