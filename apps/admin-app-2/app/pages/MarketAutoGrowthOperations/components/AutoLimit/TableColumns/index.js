import { Button, InputNumber, Select, TimePicker } from 'antd';
import moment from 'moment';

import { COLUMN_TYPES, LIMIT_METRICS, UPPER_CASE_HOUR_FORMAT, UPPER_CASE_HOUR_MINUTE_FORMAT } from '@app/pages/MarketAutoGrowthOperations/constants';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';

const { Option } = Select;

const TableColumns = (
  t,
  dispatch,
  editMode,
  classes,
  limitMetricsList,
  limitMetricsListLoading,
  limitDayTypesList,
  limitDayTypesListLoading,
  thresholdTypeList,
  thresholdTypeListLoading,
  limitPromoTypesList,
  limitPromoTypesListLoading,
  setTriggerReason,
  dataChanged,
  setDataChanged,
  limitEffectList,
  limitEffectListLoading,
  limitWarehouseList,
  limitWarehouseListLoading,
) => {
  const handleChange = (value, record, type) => {
    if (type === COLUMN_TYPES.LIMIT_METRIC) {
      if (value !== null) {
        const data = {
          ...record,
          [type]: value,
          limitValue: 0,
          hourRange: '',
          promoType: '',
          thresholdType: '',
          dayType: '',
          is_updated: 1,
        };
        dispatch(Creators.updateLimitLine({ data, affected: type }));
      }
      else {
        const data = { ...record, [type]: '', is_updated: 1 };
        dispatch(Creators.updateLimitLine({ data, affected: type }));
      }
    }
    else if (value && type === COLUMN_TYPES.HOUR_RANGE) {
      let tempStartHour = null;
      let tempEndHour = null;
      if (parseFloat(moment(value[0])?.format(UPPER_CASE_HOUR_FORMAT), 1) > parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1)
            && parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1) !== 0) {
        tempStartHour = parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1);
        tempEndHour = parseFloat(moment(value[0])?.format(UPPER_CASE_HOUR_FORMAT), 1);
      }
      else {
        tempStartHour = parseFloat(moment(value[0])?.format(UPPER_CASE_HOUR_FORMAT), 1);
        tempEndHour = parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1) === 0
          ? 24 : parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1);
      }
      const tempLimitType = `${tempStartHour}_${tempEndHour}`;
      const data = {
        ...record,
        [type]: tempLimitType,
        is_updated: 1,
      };
      dispatch(Creators.updateLimitLine({ data, affected: type }));
    }
    else if (record?.limitMetric === LIMIT_METRICS.ORDERSHARE && type === COLUMN_TYPES.PROMO_TYPE) {
      const tempValue = [];
      value?.map(item => item && tempValue.push(item));
      const data = { ...record, [type]: tempValue, is_updated: 1 };
      dispatch(Creators.updateLimitLine({ data, affected: type }));
    }
    else {
      const data = { ...record, [type]: value?.toString(), is_updated: 1 };
      dispatch(Creators.updateLimitLine({ data, affected: type }));
    }
    setDataChanged(false);
    if (type === COLUMN_TYPES.LIMIT_METRIC) {
      setTriggerReason('changeLimitMetric');
      setDataChanged(record?.id);
    }
  };

  const handleDelete = record => {
    setTriggerReason('deleteActionLine');
    dispatch(Creators.deleteLimitLine({ data: record }));
  };

  const columns = [
    {
      title: t('LIMIT_METRIC'),
      dataIndex: 'limitMetric',
      key: 'limitMetric',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <Select
                allowClear={false}
                defaultValue={text || null}
                onChange={value => handleChange(value, record, COLUMN_TYPES.LIMIT_METRIC)}
                loading={limitMetricsListLoading}
                className={classes.selectItemPacket}
                notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
              >
                {limitMetricsList?.map(value => (
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
                defaultValue={dataChanged === record.id ? null : text || null}
                onChange={value => handleChange(value, record, COLUMN_TYPES.DAY_TYPE)}
                className={classes.selectItemPacket}
                loading={limitDayTypesListLoading}
                notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
              >
                {limitDayTypesList.map(value => (
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
      title: t('PROMO_TYPE'),
      dataIndex: 'promoType',
      key: 'promoType',
      align: 'center',
      render: (text, record) => {
        if (editMode) {
          return {
            children: (
              <Select
                mode={record?.limitMetric === LIMIT_METRICS.ORDERSHARE ? 'multiple' : 'default'}
                allowClear={false}
                defaultValue={dataChanged === record?.id ? null : text || null}
                onChange={value => handleChange(value, record, COLUMN_TYPES.PROMO_TYPE)}
                className={classes.selectItemPacket}
                loading={limitPromoTypesListLoading}
                notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
              >
                {Object.entries(limitPromoTypesList)?.map(element => element[0] === record?.limitMetric && element[1].map(value => (
                  <Option key={value} value={value} label={value}>{value}</Option>
                )))}
              </Select>
            ),
          };
        }
        return { children: (<div>{record?.limitMetric === LIMIT_METRICS.ORDERSHARE && text ? text?.join('-') : text }</div>) };
      },
    },
    {
      title: t('HOUR_RANGE'),
      dataIndex: 'hourRange',
      key: 'hourRange',
      align: 'center',
      render: (text, record) => {
        if (editMode) {
          const startTime = moment(`${record.hourRange?.split('_')[0]}:00`, UPPER_CASE_HOUR_MINUTE_FORMAT);
          const endTime = moment(`${record.hourRange?.split('_')[1]}:00`, UPPER_CASE_HOUR_MINUTE_FORMAT);
          return {
            children: (
              <TimePicker.RangePicker
                format={UPPER_CASE_HOUR_MINUTE_FORMAT}
                onChange={value => handleChange(value, record, COLUMN_TYPES.HOUR_RANGE)}
                showNow={false}
                minuteStep={60}
                value={[startTime, endTime]}
                order={false}
              />),
          };
        }
        return { children: (<div>{text}</div>) };
      },
    },
    {
      title: t('THRESHOLD_TYPE'),
      dataIndex: 'thresholdType',
      key: 'thresholdType',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <Select
                allowClear={false}
                defaultValue={dataChanged === record?.id ? null : text || null}
                onChange={value => handleChange(value, record, COLUMN_TYPES.THRESHOLD_TYPE)}
                className={classes.selectItemPacket}
                loading={thresholdTypeListLoading}
                notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
              >
                {Object.entries(thresholdTypeList)?.map(element => element[0] === record?.limitMetric && element[1]?.map(value => (
                  <Option key={value} value={value} label={value}>{value}</Option>
                )))}
              </Select>
            )
              : <div>{text}</div>
          ),
        };
      },
    },
    {
      title: t('LIMIT_VALUE'),
      dataIndex: 'limitValue',
      key: 'limitValue',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <InputNumber
                defaultValue={parseInt(dataChanged === record?.id ? 0 : text || 0, 10)}
                onChange={value => handleChange(value, record, COLUMN_TYPES.LIMIT_VALUE)}
                min={0}
                max={record?.limitMetric === LIMIT_METRICS.CP_PO || record?.limitMetric === LIMIT_METRICS.ORDERSHARE ? 100 : null}
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
              <Select
                allowClear={false}
                defaultValue={text || null}
                onChange={value => handleChange(value, record, COLUMN_TYPES.WAREHOUSE_TYPE)}
                className={classes.selectItemPacket}
                loading={limitWarehouseListLoading}
                notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
              >
                {limitWarehouseList?.map(value => (
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
      title: t('LIMIT_EFFECT_TYPE'),
      dataIndex: 'limitEffectType',
      key: 'limitEffectType',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <Select
                allowClear={false}
                defaultValue={text || null}
                onChange={value => handleChange(value, record, COLUMN_TYPES.LIMIT_EFFECT_TYPE)}
                className={classes.selectItemPacket}
                loading={limitEffectListLoading}
                notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
              >
                {limitEffectList?.map(value => (
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
