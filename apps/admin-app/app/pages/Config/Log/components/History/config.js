import { Button } from 'antd';

export const getTableColumns = ({ t, onClickShowJSONModal }) => {
  return [
    {
      title: t('ACTION_TYPE'),
      dataIndex: 'actionType',
      key: 'actionType',
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
      title: t('TIMESTAMP_UTC'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: t('ACTION_TAKEN_BY'),
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
  ];
};
