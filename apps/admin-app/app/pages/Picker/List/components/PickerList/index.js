import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Tag, Table } from 'antd';

import { DetailButton } from '@shared/components/UI/List';

import { pickerListSelector } from '../../redux/selectors';

const PickerList = ({ pickers, pagination, setPagination }) => {
  const { t } = useTranslation(['global']);
  const pickerListIsPending = useSelector(pickerListSelector.getIsPending);
  const columns = [
    {
      title: '#',
      dataIndex: 'isActivated',
      render: isActivated => (isActivated ? (
        <Tag color="green">{t('ACTIVE')}</Tag>
      ) : (
        <Tag color="red">{t('INACTIVE')}</Tag>
      )),
    },
    {
      title: t('NAME'),
      dataIndex: 'name',
    },
    {
      title: t('WAREHOUSE'),
      dataIndex: 'warehouse',
    },
    {
      title: t('GSM'),
      dataIndex: 'personalGsm',
    },
    {
      title: t('ACTIVENESS'),
      dataIndex: 'isLoggedIn',
      render: isLoggedIn => (isLoggedIn ? (
        <Tag color="green">{t('OPEN')}</Tag>
      ) : (
        <Tag color="red">{t('CLOSED')}</Tag>
      )),
      sorter: a => (a.isLoggedIn ? 1 : -1),
    },
    {
      title: t('DETAIL'),
      dataIndex: '_id',
      render: id => DetailButton({
        _id: id,
        urlPath: '/picker/detail/',
      }),
    },
  ];

  return (
    <Table
      rowKey={row => row._id}
      dataSource={pickers}
      columns={columns}
      loading={pickerListIsPending}
      pagination={pagination}
      onChange={setPagination}
      total={pickers?.length}
      size="small"
    />
  );
};

export default PickerList;
