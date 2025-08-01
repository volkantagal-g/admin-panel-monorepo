import { message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';

import { limitSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import DifferenceTableColumns from '@app/pages/MarketAutoGrowthOperations/components/DifferenceTableColumns';
import ChangeReason from '@app/pages/MarketAutoGrowthOperations/components/ChangeReason';
import { CHANGE_REASON_TITLES, CHANGE_TYPE_NAME, LIMIT_COLUMN_DETAIL } from '@app/pages/MarketAutoGrowthOperations/constants';

const DifferenceModal = ({
  openDifference,
  setOpenDifference,
  classes,
  errorMessage,
  setEditMode,
  limitTableData,
  selectedDomain,
  selectedReason,
  setSelectedReason,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const updateLimitList = useSelector(limitSelector.updateLimitList);
  const updateLimitLoading = useSelector(limitSelector.updateLimitLoading);
  const updateLimitSuccess = useSelector(limitSelector.updateLimitSuccess);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const tableColumns = DifferenceTableColumns(t, LIMIT_COLUMN_DETAIL, false);
  const [tableData, setTableData] = useState([]);
  const onFinish = () => {
    setConfirmLoading(true);
    if (!errorMessage && selectedReason) {
      const result = limitTableData.map(({ id, ...rest }) => ({ ...rest }));
      dispatch(Creators.limitConfigUpdateRequest({ domainType: selectedDomain, updateData: result, changeReason: selectedReason }));
    }
    else message.error({ content: t('FAIL_PLEASE_CHECK') });
  };
  const onCancel = () => {
    setOpenDifference(false);
  };

  useEffect(() => {
    if (updateLimitSuccess === true && updateLimitLoading === false) {
      message.success({ content: t('SUCCESS') });
      setOpenDifference(false);
      setEditMode(false);
    }
    else if (updateLimitSuccess === false && updateLimitLoading === false) {
      message.error({ content: t('FAIL_PLEASE_CHECK') });
      setOpenDifference(false);
      setEditMode(false);
    }
  }, [updateLimitLoading, updateLimitSuccess, setOpenDifference, setEditMode, t]);

  useEffect(() => {
    setTableData([]);
    const tempTable = [];
    if (Object.keys(updateLimitList?.add)?.length > 0) {
      Object.values(updateLimitList?.add)?.forEach(updatedElement => {
        tempTable.push({ ...updatedElement, changeType: CHANGE_TYPE_NAME.ADD, affected: updatedElement?.affected });
      });
    }
    if (Object.keys(updateLimitList?.delete)?.length > 0) {
      Object.values(updateLimitList?.delete)?.forEach(updatedElement => {
        tempTable.push({ ...updatedElement, changeType: CHANGE_TYPE_NAME.DELETE, affected: updatedElement?.affected });
      });
    }
    if (Object.keys(updateLimitList?.update)?.length > 0) {
      Object.values(updateLimitList?.update)?.forEach(updatedElement => {
        tempTable.push({ ...updatedElement, changeType: CHANGE_TYPE_NAME.UPDATE, affected: updatedElement?.affected });
      });
    }
    setTableData(tempTable);
  }, [updateLimitList]);

  return (
    <Modal
      title={t('SAVE_CHANGES')}
      visible={openDifference}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onFinish}
      okText={t('SAVE')}
      okButtonProps={{ disabled: errorMessage || !selectedReason, loading: updateLimitLoading || false }}
      className={classes.differenceModal}
    >
      <div className={classes.saveWarningMessage}> {t('SAVE_WARNING')} </div>
      <ChangeReason setSelectedReason={setSelectedReason} reasonType={CHANGE_REASON_TITLES.LIMIT} selectedReason={selectedReason} />
      {errorMessage && (
      <div className={classes.errorMessage}>
        {errorMessage}
      </div>
      )}
      <Table
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
      />
    </Modal>
  );
};
export default DifferenceModal;
