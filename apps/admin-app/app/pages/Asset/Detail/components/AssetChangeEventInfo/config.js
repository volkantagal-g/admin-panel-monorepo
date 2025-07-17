import moment from 'moment';
import { Tag } from 'antd';

export const tableColumns = ({ t }) => {
  return [
    {
      title: t('assetPage:ASSET_CHANGE_EVENT_TABLE_COLUMNS.DATE'),
      dataIndex: 'date',
      key: 'date',
      width: 80,
      render: date => (date ? moment(date).format('YYYY.MM.DD') : ''),
    },
    {
      title: t('assetPage:ASSET_CHANGE_EVENT_TABLE_COLUMNS.EVENT'),
      dataIndex: 'eventType',
      key: 'eventType',
      width: 150,
      render: eventType => t(`assetPage:ASSET_CHANGE_EVENTS_FIELDS.${eventType?.toString()}`),
    },
    {
      title: t('assetPage:ASSET_CHANGE_EVENT_TABLE_COLUMNS.BEFORE'),
      width: 250,
      render: ({ from }) => (
        <Tag color="error">
          {from}
        </Tag>
      ),
    },
    {
      title: t('assetPage:ASSET_CHANGE_EVENT_TABLE_COLUMNS.AFTER'),
      width: 250,
      render: ({ to }) => (
        <Tag color="success">
          {to}
        </Tag>
      ),
    },
    {
      title: t('assetPage:ASSET_CHANGE_EVENT_TABLE_COLUMNS.CHANGED_BY'),
      dataIndex: 'actionBy',
      key: 'actionBy',
      width: 100,
      render: actionBy => actionBy?.name,
    },
  ];
};
