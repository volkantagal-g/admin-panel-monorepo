import { Modal, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import DifferenceTableColumns from '@app/pages/MarketAutoGrowthOperations/components/DifferenceTableColumns';
import ChangeReason from '@app/pages/MarketAutoGrowthOperations/components/ChangeReason';
import { CHANGE_TYPE_NAME, PROMOSET_COLUMN_DETAIL, AGG_LIST, CHANGE_REASON_TITLES } from '@app/pages/MarketAutoGrowthOperations/constants';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { autoGrowthSelector, promoSetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';

const DifferenceModal = ({ openDifference, setOpenDifference, classes, selectedReason, setSelectedReason, setEditMode }) => {
  const { t } = useTranslation('marketAutoGrowthOperations');
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [tableData, setTableData] = useState([]);
  const tableColumns = DifferenceTableColumns(t, PROMOSET_COLUMN_DETAIL, false);

  const updateList = useSelector(promoSetSelector.updateList);
  const selectedDomain = useSelector(autoGrowthSelector.selectedDomain);
  const selectedPromo = useSelector(promoSetSelector.selectedPromo);
  const selectedWarehouse = useSelector(promoSetSelector.selectedWarehouse);
  const promosetConfigUpdateLoading = useSelector(promoSetSelector.promosetConfigUpdateLoading);
  const promosetConfigUpdateSuccess = useSelector(promoSetSelector.promosetConfigUpdateSuccess);
  const updateData = useSelector(promoSetSelector.promoSetTableData);

  const onFinish = () => {
    setConfirmLoading(true);
    if (selectedReason) {
      dispatch(Creators.promosetConfigUpdateRequest({
        promoObjectiveType: selectedPromo,
        warehouseType: selectedWarehouse,
        domainType: selectedDomain,
        updateData,
        changeReason: selectedReason,
      }));
    }
    else message.error({ content: t('PLEASE_SELECT_REASON') });
  };

  const handleModalCancel = () => {
    setOpenDifference(false);
  };

  useEffect(() => {
    if (promosetConfigUpdateSuccess === true && promosetConfigUpdateLoading === false) {
      message.success({ content: t('SUCCESS') });
      setOpenDifference(false);
      setEditMode(false);
    }
    else if (promosetConfigUpdateSuccess === false && promosetConfigUpdateLoading === false) {
      message.error({ content: t('FAIL_PLEASE_CHECK') });
      setOpenDifference(false);
      setEditMode(false);
    }
  }, [promosetConfigUpdateLoading, promosetConfigUpdateSuccess, setEditMode, setOpenDifference, t]);

  useEffect(() => {
    setTableData([]);
    const tempTable = [];
    if (Object.keys(updateList?.add).length > 0) {
      Object.values(updateList?.add).forEach(updatedElement => {
        tempTable.push({ ...updatedElement, changeType: CHANGE_TYPE_NAME.ADD, affected: updatedElement?.affected });
      });
    }
    if (Object.keys(updateList?.delete).length > 0) {
      Object.values(updateList?.delete).forEach(updatedElement => {
        tempTable.push({ ...updatedElement, changeType: CHANGE_TYPE_NAME.DELETE, affected: updatedElement?.affected });
      });
    }
    if (Object.keys(updateList?.update).length > 0) {
      Object.values(updateList?.update).forEach(updatedElement => {
        tempTable.push({ ...updatedElement, changeType: CHANGE_TYPE_NAME.UPDATE, affected: updatedElement?.affected });
      });
    }
    setTableData(tempTable);
  }, [updateList]);

  useEffect(() => {
    setErrorMessage('');
    const inputValues = {};
    const buckets = {};

    let hasEmpty = false;
    let lastElementNotZero = false;

    const isEmpty = element => (!!((element === null || element === '' || element === undefined)));
    const tempEmpty = object => {
      if (object && isEmpty(object?.agg1) && isEmpty(object?.agg2) && isEmpty(object?.agg3) && isEmpty(object?.agg4) && isEmpty(object?.agg5)) {
        return true;
      }
      return false;
    };

    updateData.forEach(bucket => {
      inputValues[bucket.bucketType] = [];
    });

    updateData.forEach(bucket => {
      return tableData.forEach(editedBucket => {
        if (bucket?.bucketType === editedBucket?.bucketType) {
          if (!inputValues[bucket.bucketType].includes(bucket.set)) inputValues[bucket.bucketType].push(bucket.set);
          inputValues[bucket.bucketType].sort();
          buckets[bucket?.set] = bucket;

          const tempProp = Object.keys(bucket)?.filter(key => key?.substring(3, 0) === 'agg');
          let tempHighAgg = AGG_LIST.AGG1;
          const tempRequiredIndex = [];
          Object.entries(bucket)?.forEach(element => {
            if (tempProp?.includes(element[0]) && !!element[1]) {
              tempHighAgg = element[0]?.substring(5, 3) > tempHighAgg?.substring(5, 3) ? element[0] : tempHighAgg;
            }
            for (let index = 1; index < tempHighAgg?.substring(5, 3); index++) {
              if (isEmpty(bucket[`agg${index}`])) {
                hasEmpty = true;
                if (!tempRequiredIndex?.includes(index)) tempRequiredIndex.push(index);
              }
            }
          });
          if (tempRequiredIndex?.length > 0) {
            tempRequiredIndex?.forEach(temp => setErrorMessage(`${bucket?.bucketType} ${t('SET')}:${bucket?.set} ${t('AGG')}${temp}${t('NOT_EMPTY')}`));
          }
        }
      });
    });

    Object.entries(inputValues).forEach(values => {
      let isBigger = true;
      values[1]?.sort((a, b) => a - b);
      values[1]?.forEach((inputNumber, indexInput) => {
        if ((values[1][indexInput - 1] !== undefined
              && inputNumber - values[1][indexInput - 1] !== 1
              && inputNumber - values[1][indexInput - 1] !== -1)) {
          isBigger = false;
          setErrorMessage([t('PROMOSET_ERROR_MESSAGES.ORDER_AND_UNIQUE')]);
        }
        if (tempEmpty(buckets[values[1][indexInput - 1]]) && !tempEmpty(buckets[values[1][indexInput]])) {
          hasEmpty = true;
          setErrorMessage([t('PROMOSET_ERROR_MESSAGES.ANY_PROMO')]);
        }
        if (values[1]?.length === 1 && values[1][0] !== 0) {
          lastElementNotZero = true;
          setErrorMessage([t('PROMOSET_ERROR_MESSAGES.LAST_ELEMENT_IS_NOT_ZERO')]);
        }
      });
      setHasError(new Set(values[1])?.size !== values[1]?.length || !isBigger || hasEmpty || lastElementNotZero);
    });
  }, [t, tableData, updateData]);

  return (
    <Modal
      title={t('SAVE_CHANGES')}
      visible={openDifference}
      confirmLoading={confirmLoading}
      onCancel={handleModalCancel}
      onOk={onFinish}
      okText={t('SAVE')}
      okButtonProps={{ disabled: hasError || !selectedReason, loading: promosetConfigUpdateLoading }}
      className={classes.differenceModal}
    >
      <div className={classes.saveWarningMessage}> {t('SAVE_WARNING')} </div>
      <ChangeReason setSelectedReason={setSelectedReason} reasonType={CHANGE_REASON_TITLES.PROMOSET} selectedReason={selectedReason} />
      {errorMessage && (
      <div className={classes.errorMessage}>
        {errorMessage}
      </div>
      )}
      <Table
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
        expandable={{ defaultExpandAllRows: true }}
        scroll={{ x: 1300, y: 800 }}
      />
    </Modal>
  );
};

export default DifferenceModal;
