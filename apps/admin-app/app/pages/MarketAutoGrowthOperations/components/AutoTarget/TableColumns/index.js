import { Input } from 'antd';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { COLUMN_TYPES } from '@app/pages/MarketAutoGrowthOperations/constants';

const TableColumns = (t, editMode, dispatch, day, isCurrentMonth) => {
  const handleChange = (event, record, type) => {
    const { value } = event.target;
    const data = { ...record, [type]: value, is_updated: 1 };
    dispatch(Creators.updateTargetData({ data, affected: type }));
  };

  const columns = [
    {
      title: t('TARGET_DATE'),
      dataIndex: 'date',
      key: 'date',
      align: 'center',
    },
    {
      title: t('DAILY_ORDER_TARGET'),
      dataIndex: 'orderTarget',
      key: 'orderTarget',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <Input
                defaultValue={text}
                disabled={isCurrentMonth && parseFloat(record?.date?.substring(8, 11), 1) < day}
                onChange={event => handleChange(event, record, COLUMN_TYPES.ORDER_TARGET)}
              />
            )
              : <div>{text}</div>
          ),
        };
      },
    },
    {
      title: t('DAILY_CMX_TARGET'),
      dataIndex: 'cpTarget',
      key: 'cpTarget',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <Input
                defaultValue={text}
                disabled={isCurrentMonth && parseFloat(record?.date?.substring(8, 11), 1) < day}
                onChange={event => handleChange(event, record, COLUMN_TYPES.CP_TARGET)}
              />
            )
              : <div>{text}</div>
          ),
        };
      },
    },
  ];
  return columns;
};

export default TableColumns;
