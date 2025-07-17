import { Button, Popconfirm, Space } from 'antd';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';

import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { WorkspaceDMConfigPair } from '@app/pages/InternalAuthentication/types';
import { getUser } from '@shared/redux/selectors/auth';

type TranslationFn = (s: string) => string;
type ColumnParameters = {
  t: TranslationFn;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onTestClick: ({ channelName, dm, workspaceName }: { channelName?: string, dm?: string, workspaceName: string }) => void;
};
export const tableColumns = ({ t, onEdit, onDelete, onTestClick }: ColumnParameters) => [
  {
    title: t('WORKSPACE_NAME'),
    dataIndex: 'workspaceName',
    width: 100,
    key: 'workspaceName',
  },
  {
    title: t('CHANNEL_NAME'),
    dataIndex: 'channelName',
    width: 150,
    key: 'channelName',
  },
  {
    title: `${t('CREATED_AT')} (UTC)`,
    dataIndex: 'createdAt',
    width: 100,
    key: 'createdAt',
    render: (createdAt: string) => {
      if (!createdAt) return 'N/A';
      return moment.utc(createdAt).format(getLocalDateTimeFormat());
    },
  },
  {
    title: t('ACTION'),
    align: 'right',
    key: 'action',
    width: 200,
    render: (_: any, { channelName, workspaceName }: { channelName: string, workspaceName: string }, index: number) => {
      return (
        <Space size={8}>
          <Button type="default" size="small" onClick={() => onTestClick({ channelName, workspaceName })}>
            {t('internalAuthentication:BUTTON_TEST_SLACK_MESSAGE')}
          </Button>
          <Button type="default" size="small" onClick={() => onEdit(index)}>
            {t('EDIT')}
          </Button>
          <Popconfirm
            title={t('COMMON_CONFIRM_TEXT')}
            onConfirm={() => {
              onDelete(index);
            }}
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              {t('DELETE')}
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
];

export const getDMtableColumns = ({ t, onEdit, onDelete, onTestClick }: ColumnParameters) => [
  {
    title: t('WORKSPACE_NAME'),
    dataIndex: 'workspaceName',
    width: 100,
    key: 'workspaceName',
  },
  {
    title: t('IS_DM_ENABLED'),
    dataIndex: 'isDMEnabled',
    width: 150,
    key: 'isDMEnabled',
    render: (isDMEnabled: boolean) => (isDMEnabled ? t('ACTIVE') : t('INACTIVE')),
  },
  {
    title: `${t('CREATED_AT')} (UTC)`,
    dataIndex: 'createdAt',
    width: 100,
    key: 'createdAt',
    render: (createdAt: string) => {
      if (!createdAt) return 'N/A';
      return moment.utc(createdAt).format(getLocalDateTimeFormat());
    },
  },
  {
    title: t('ACTION'),
    align: 'right',
    key: 'action',
    width: 200,
    render: (_: any, { workspaceName }: WorkspaceDMConfigPair, index: number) => {
      return (
        <Space size={8}>
          <Button type="default" size="small" onClick={() => onTestClick({ dm: getUser()?.email, workspaceName })}>
            {t('internalAuthentication:BUTTON_TEST_SLACK_MESSAGE')}
          </Button>
          <Button type="default" size="small" onClick={() => onEdit(index)}>
            {t('EDIT')}
          </Button>
          <Popconfirm
            title={t('COMMON_CONFIRM_TEXT')}
            onConfirm={() => {
              onDelete(index);
            }}
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              {t('DELETE')}
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
];
