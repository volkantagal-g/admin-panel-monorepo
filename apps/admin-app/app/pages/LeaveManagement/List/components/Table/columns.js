import { get } from 'lodash';
import { Button, Popconfirm } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

import Image from '@shared/components/UI/Image';

export const getTableColumns = ({ t, isRemovable, handleRemove, leaveTranslations }) => [
  {
    title: '',
    width: 60,
    hidden: !isRemovable,
    render: (_, { id }) => (
      <Popconfirm
        placement="topRight"
        title={t('COMMON_CONFIRM_TEXT')}
        okText={t('OK')}
        cancelText={t('CANCEL')}
        onConfirm={() => handleRemove(id)}
      >
        <Button name="delete" type="link" icon={<DeleteFilled />} />
      </Popconfirm>
    ),
  },
  {
    title: t('leaveManagement:COLUMNS.PICTURE'),
    dataIndex: 'person',
    key: 'person',
    width: 80,
    render: src => <Image src={src.picURL} />,
  },
  {
    title: t('leaveManagement:COLUMNS.NAME'),
    dataIndex: 'person',
    key: 'person',
    render: (person, { id }) => (
      <Button
        type="text"
        onClick={() => window.open(`/leaveRequest/${id}`)}
      >
        {get(person, 'name', '-')}
      </Button>
    ),
  },
  {
    title: t('leaveManagement:COLUMNS.LEAVE_TYPE'),
    dataIndex: 'type',
    key: 'type',
    render: type => leaveTranslations[type],
  },
  {
    title: t('leaveManagement:COLUMNS.DATES_REQUESTED'),
    dataIndex: 'datesRequested',
    key: 'datesRequested',
  },
  {
    title: t('leaveManagement:COLUMNS.DAY_REQUESTED'),
    dataIndex: 'dayRequested',
    key: 'dayRequested',
  },
].filter(item => !item.hidden);
