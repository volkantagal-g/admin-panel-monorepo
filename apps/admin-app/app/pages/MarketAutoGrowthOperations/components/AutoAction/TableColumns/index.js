import { Button, InputNumber } from 'antd';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import SelectOption from '@app/pages/MarketAutoGrowthOperations/components/SelectOption';
import { COLUMN_TYPES } from '@app/pages/MarketAutoGrowthOperations/constants';

const TableColumns = (
  t,
  editMode,
  classes,
  dayTypes,
  dayTypesLoading,
  hourTypes,
  hourTypesLoading,
  actionPacketList,
  actionPacketListLoading,
  actionWarehouseList,
  actionWarehouseListLoading,
  setTriggerReason,
  dispatch,
) => {
  const handleDelete = record => {
    setTriggerReason('deleteActionLine');
    dispatch(Creators.deleteActionLine({ data: record }));
    dispatch(Creators.setActionUpdateList({}));
  };

  const handleChange = (value, record, type) => {
    const currentFormattedValue = (type === COLUMN_TYPES.ACTION || type === COLUMN_TYPES.PACKET) ? parseInt(value, 10) : value.toString();
    const data = { ...record, [type]: currentFormattedValue, is_updated: 1 };
    dispatch(Creators.updateActionLine({ data, affected: type }));
    dispatch(Creators.setActionUpdateList({}));
  };

  const columns = [
    {
      title: t('ACTION'),
      dataIndex: 'action',
      key: 'id',
      align: 'center',
      defaultSortOrder: 'ascend',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <InputNumber
                defaultValue={parseInt(text, 10)}
                onChange={value => handleChange(value, record, COLUMN_TYPES.ACTION)}
                min={0}
              />
            )
              : <div>{text}</div>
          ),
        };
      },
    },
    {
      title: t('PACKET'),
      dataIndex: 'packet',
      key: 'packet',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SelectOption
                handleChange={handleChange}
                record={record}
                text={text}
                loading={actionPacketListLoading}
                data={actionPacketList}
                type={COLUMN_TYPES.PACKET}
              />
            )
              : <div>{text}</div>
          ),
        };
      },
    },
    {
      title: t('WAREHOUSE_TYPE'),
      dataIndex: 'warehouseType',
      key: 'warehouseType',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SelectOption
                handleChange={handleChange}
                record={record}
                text={text}
                loading={actionWarehouseListLoading}
                data={actionWarehouseList}
                type={COLUMN_TYPES.WAREHOUSE_TYPE}
              />
            )
              : <div>{text}</div>
          ),
        };
      },
    },
    {
      title: t('DAY_TYPE'),
      dataIndex: 'dayType',
      key: 'dayType',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SelectOption
                handleChange={handleChange}
                record={record}
                text={text}
                loading={dayTypesLoading}
                data={dayTypes}
                type={COLUMN_TYPES.DAY_TYPE}
              />
            )
              : <div>{text}</div>
          ),
        };
      },
    },
    {
      title: t('HOUR_TYPE'),
      dataIndex: 'hourType',
      key: 'hourType',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SelectOption
                handleChange={handleChange}
                record={record}
                text={text}
                loading={hourTypesLoading}
                data={hourTypes}
                type={COLUMN_TYPES.HOUR_TYPE}
              />
            )
              : <div>{text}</div>
          ),
        };
      },
    },
    {
      title: '',
      key: 'delete',
      render: record => {
        return {
          children: (
            editMode && (
              <Button
                type="text"
                onClick={() => handleDelete(record)}
                className={classes.yellowGetirColor}
              >
                {t('DELETE_LINE')}
              </Button>
            )
          ),
        };
      },
    },
  ];
  return editMode ? columns : columns?.filter(col => col.title !== '');
};

export default TableColumns;
