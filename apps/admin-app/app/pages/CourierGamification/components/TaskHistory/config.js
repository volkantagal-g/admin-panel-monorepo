import { Button, Typography } from 'antd';

import { getLangKey } from '@shared/i18n';
import { DATE_TEXT_OPTIONS } from '@app/pages/CourierGamification/constant';

const { Text } = Typography;
export const getTableColumns = ({ t, onClickShowJSONModal }) => {
  return [
    {
      title: t('ACTION_TYPE'),
      dataIndex: 'actionType',
      key: 'actionType',
      render: actionType => (
        <Text>
          {t(`TASK_HISTORY.ACTION_TYPES.${actionType?.toUpperCase()}`)}
        </Text>
      ),
    },
    {
      title: t('VALUE'),
      render: (_, config) => (
        <Button
          size="small"
          onClick={() => onClickShowJSONModal(config)}
          disabled={config.actionType === 'delete'}
        >
          {t('global:SHOW_AS_JSON')}
        </Button>
      ),
    },
    {
      title: t('ACTION_TIME'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => (
        <Text>
          {new Date(createdAt).toLocaleString(getLangKey(), DATE_TEXT_OPTIONS)}
        </Text>
      ),
    },
    {
      title: t('ACTION_TAKEN_BY'),
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
  ];
};
