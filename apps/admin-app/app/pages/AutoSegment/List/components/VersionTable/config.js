import moment from 'moment';
import { Button, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import get from 'lodash/get';

import { getLocalDateTimeFormat } from '@shared/utils/localization';

export const tableColumns = ({ t, activeVersion, handleOnActivateClick }) => [
  {
    title: t('VERSION'),
    dataIndex: 'version',
    align: 'left',
    width: '12%',
  },
  {
    title: t('USER'),
    dataIndex: 'actionUser',
    width: '40%',
  },
  {
    title: t('DATE'),
    dataIndex: 'actionDate',
    width: '27%',
    render: actionDate => <span>{moment(actionDate).format(getLocalDateTimeFormat())}</span>,
  },
  {
    title: '#',
    key: 'info',
    width: '5%',
    render: ({ clientList }) => {
      const title = get(clientList, 'name', '');
      return (
        <Tooltip title={title}>
          <InfoCircleOutlined />
        </Tooltip>
      );
    },
  },
  {
    title: t('ACTIONS'),
    key: 'actions',
    render: record => (
      activeVersion === record.version ? (
        <Tag color="green">{t('ACTIVE')}</Tag>
      ) : (
        <Button size="small" onClick={() => handleOnActivateClick(record)}>{t('ACTIVATE')}</Button>
      )
    ),
  },
];
