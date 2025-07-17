import ConfigEditingModal from '../components/configEditingModal';

export const getTableColumns = ({ t }) => {
  return [
    {
      title: t('TABLE.TYPE'),
      dataIndex: 'key',
      key: 'key',
      width: 400,
      render: key => {
        return key;
      },
    },
    {
      title: t('TABLE.DESCRIPTION'),
      dataIndex: 'value',
      key: 'value',
      width: 600,
      render: value => {
        const descriptionValue = value?.map(item => item?.description);
        return descriptionValue?.[0];
      },
    },
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      align: 'right',
      render: key => (
        <ConfigEditingModal type={key} title={key} />
      ),
    },
  ];
};
