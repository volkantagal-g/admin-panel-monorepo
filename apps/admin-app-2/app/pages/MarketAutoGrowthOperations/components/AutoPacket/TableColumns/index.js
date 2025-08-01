import { InputNumber, Select, Switch } from 'antd';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { COLUMN_TYPES, STATUS } from '@app/pages/MarketAutoGrowthOperations/constants';

const { Option } = Select;

const TableColumns = (t, editMode, classes, dayTypes, dayTypesLoading, hourTypes, hourTypesLoading, dispatch) => {
  const handleChange = (value, record, type) => {
    const data = { ...record, [type]: value, is_updated: 1 };
    dispatch(Creators.updatePacketData({ data, affected: type }));
  };

  const columns = [
    {
      title: t('PACKET'),
      dataIndex: 'packet',
      key: 'packet',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <InputNumber
                defaultValue={parseInt(text, 10)}
                onChange={value => handleChange(value.toString(), record, COLUMN_TYPES.PACKET)}
              />
            )
              : <div>{text}</div>
          ),
        };
      },
    },
    {
      title: t('AFFECTED_BUCKET'),
      dataIndex: 'affectedBucket',
      key: 'affectedBucket',
      align: 'center',
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
              <Select
                allowClear={false}
                defaultValue={text || null}
                onChange={value => handleChange(value, record, COLUMN_TYPES.DAY_TYPE)}
                className={classes.selectItemPacket}
                loading={dayTypesLoading}
                notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
              >
                {dayTypes?.map(value => (
                  <Option key={value} value={value} label={value}>{value}</Option>
                ))}
              </Select>
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
              <Select
                allowClear={false}
                defaultValue={text || null}
                onChange={value => handleChange(value, record, COLUMN_TYPES.HOUR_TYPE)}
                loading={hourTypesLoading}
                className={classes.selectItemPacket}
                notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
              >
                {hourTypes?.map(value => (
                  <Option key={value} value={value} label={value}>{value}</Option>
                ))}
              </Select>
            )
              : <div>{text}</div>
          ),
        };
      },
    },
    {
      title: t('ACTIVE'),
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      render: text => {
        return {
          children: (
            <Switch
              disabled
              checkedChildren={STATUS.ACTIVE}
              unCheckedChildren={STATUS.PASSIVE}
              checked={text}
            />
          ),
        };
      },
    },
  ];
  return columns;
};

export default TableColumns;
