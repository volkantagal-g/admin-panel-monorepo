import { Button } from 'antd';
import { uniqueId } from 'lodash';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { highLowSet } from '@app/pages/MarketAutoGrowthOperations/util';
import { COLUMN_TYPES, AGG_LIST, SPECIFIC_AFFECTED, SET_DIRECTIONS } from '@app/pages/MarketAutoGrowthOperations/constants';

import SelectFilter from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet/SelectFilter';
import SetLine from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet/SetLine';

const TableColumns = (t, editMode, bucketGroups, classes, dispatch, setTriggerReason, setNewColumn) => {
  const handleDelete = record => {
    dispatch(Creators.deleteBucketLine({ data: record }));
    dispatch(Creators.setUpdateList({}));
    setTriggerReason('deleteBucketLine');
  };

  const handleAdd = (record, status) => {
    Object.entries(bucketGroups).forEach(bucket => {
      if (bucket[0] === record.bucketType) {
        const newObject = {
          ...record,
          set: (status === '+' ? parseFloat(record.set) + 1 : parseFloat(record.set) - 1),
          agg1: '',
          agg2: '',
          agg3: '',
          agg4: '',
          agg5: '',
          is_updated: 1,
          _id: uniqueId(),
        };
        setNewColumn(newObject);
        dispatch(Creators.addBucketLine({ data: newObject }));
        dispatch(Creators.setUpdateList({}));
        setTriggerReason('addBucketLine');
      }
    });
  };

  const handleStepChange = (type, record, value) => {
    const currentValue = type && type === SET_DIRECTIONS.TOP ? value - 1 : value + 1;
    if (currentValue || currentValue === 0) {
      Object.entries(bucketGroups).forEach(bucket => {
        if (bucket[0] === record.bucketType) {
          const tempBucketGroup = bucket[1].map(item => ({ ...item }));
          let tempNewObject = null;
          bucket[1].forEach((element, elementIndex) => {
            if (element.set === currentValue) {
              tempNewObject = { ...tempBucketGroup[elementIndex], set: record.set, is_updated: 1 };
              dispatch(Creators.updatePromoSetTableData({ data: [tempNewObject], affected: SPECIFIC_AFFECTED.SET }));
              dispatch(Creators.setUpdateList({}));
            }
            if (element.set === record.set) {
              tempNewObject = { ...tempBucketGroup[elementIndex], set: currentValue, is_updated: 1 };
              setNewColumn(tempNewObject);
              dispatch(Creators.updatePromoSetTableData({ data: [tempNewObject], affected: SPECIFIC_AFFECTED.SET }));
              dispatch(Creators.setUpdateList({}));
            }
          });
        }
      });
      setTriggerReason('changeStepNumber');
    }
  };

  const columns = [
    {
      title: '',
      key: 'add',
      width: '12%',
      render: record => {
        let bucketGroup = [];
        Object.values(bucketGroups).map(bucket => {
          if (record?.bucketType === bucket[0]?.bucketType) bucketGroup = bucket;
          return bucketGroup;
        });
        const { highSet, lowSet } = highLowSet(bucketGroup) || { highSet: 0, lowSet: 0 };
        return {
          children: (
            editMode && (
              <>
                {record?.set?.toString() === lowSet.toString() && (
                  <Button
                    type="text"
                    onClick={() => handleAdd(record, COLUMN_TYPES.NEGATIVE)}
                    className={classes.yellowGetirColor}
                  >
                    {t('ADD_NEGATIVE_SET')}
                  </Button>
                )}
                {record?.set?.toString() === highSet.toString() && (
                  <Button
                    type="text"
                    onClick={() => handleAdd(record, COLUMN_TYPES.POSITIVE)}
                    className={classes.yellowGetirColor}
                  >
                    {t('ADD_POSITIVE_SET')}
                  </Button>
                )}
              </>
            )
          ),
        };
      },
    },
    {
      title: t('SET'),
      dataIndex: 'set',
      key: 'set',
      defaultSortOrder: 'ascend',
      width: '15%',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SetLine
                text={text}
                t={t}
                classes={classes}
                handleStepChange={handleStepChange}
                record={record}
              />
            )
              : <div className={classes.selectItemText}>{text}</div>
          ),
        };
      },
    },
    {
      title: t('AGG1'),
      dataIndex: 'agg1',
      key: 'agg1',
      width: '13%',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SelectFilter
                record={record}
                type={AGG_LIST.AGG1}
                text={text}
                setTriggerReason={setTriggerReason}
              />
            )
              : <div className={classes.selectItemText}>{text}</div>
          ),
        };
      },
    },
    {
      title: t('AGG2'),
      dataIndex: 'agg2',
      key: 'agg2',
      width: '13%',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SelectFilter
                record={record}
                type={AGG_LIST.AGG2}
                text={text}
                setTriggerReason={setTriggerReason}
              />
            )
              : <div className={classes.selectItemText}>{text}</div>
          ),
        };
      },
    },
    {
      title: t('AGG3'),
      dataIndex: 'agg3',
      key: 'agg3',
      width: '13%',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SelectFilter
                record={record}
                type={AGG_LIST.AGG3}
                text={text}
                setTriggerReason={setTriggerReason}
              />
            )
              : <div className={classes.selectItemText}>{text}</div>
          ),
        };
      },
    },
    {
      title: t('AGG4'),
      dataIndex: 'agg4',
      key: 'agg4',
      width: '13%',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SelectFilter
                record={record}
                type={AGG_LIST.AGG4}
                text={text}
                setTriggerReason={setTriggerReason}
              />
            )
              : <div className={classes.selectItemText}>{text}</div>
          ),
        };
      },
    },
    {
      title: t('AGG5'),
      dataIndex: 'agg5',
      key: 'agg5',
      width: '13%',
      render: (text, record) => {
        return {
          children: (
            editMode ? (
              <SelectFilter
                record={record}
                type={AGG_LIST.AGG5}
                text={text}
                setTriggerReason={setTriggerReason}
              />
            )
              : <div className={classes.selectItemText}>{text}</div>
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
            editMode && record?.set !== 0 && (
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
  return editMode ? columns : columns.filter(col => col.title !== '');
};

export default TableColumns;
