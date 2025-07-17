import { t } from '@shared/i18n';

export const tableColumns = () => {
  return [
    {
      title: t('global:ID'),
      dataIndex: '_id',
      key: '_id',
      width: '200px',
    },
    {
      title: t('global:NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },  
  ];
};
