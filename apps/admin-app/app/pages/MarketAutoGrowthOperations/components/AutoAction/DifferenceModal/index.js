import { message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { actionSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { ACTION_COLUMN_DETAIL, CHANGE_TYPE_NAME, CHANGE_REASON_TITLES } from '@app/pages/MarketAutoGrowthOperations/constants';
import DifferenceTableColumns from '@app/pages/MarketAutoGrowthOperations/components/DifferenceTableColumns';
import ChangeReason from '@app/pages/MarketAutoGrowthOperations/components/ChangeReason';

const DifferenceModal = ({
  openDifference,
  setOpenDifference,
  classes,
  errorMessage,
  setEditMode,
  actionTableData,
  selectedDomain,
  selectedReason,
  setSelectedReason,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const updateActionList = useSelector(actionSelector.updateActionList);
  const updateActionLoading = useSelector(actionSelector.updateActionLoading);
  const updateActionSuccess = useSelector(actionSelector.updateActionSuccess);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const tableColumns = DifferenceTableColumns(t, ACTION_COLUMN_DETAIL, false);
  const [tableData, setTableData] = useState([]);

  const onFinish = () => {
    setConfirmLoading(true);
    if (!errorMessage && selectedReason) {
      const result = actionTableData.map(({ id, ...rest }) => ({ ...rest }));
      dispatch(Creators.actionConfigUpdateRequest({ domainType: selectedDomain, updateData: result, changeReason: selectedReason }));
    }
    else message.error({ content: t('FAIL_PLEASE_CHECK') });
  };
  const onCancel = () => {
    setOpenDifference(false);
  };

  useEffect(() => {
    if (updateActionSuccess === true && updateActionLoading === false) {
      message.success({ content: t('SUCCESS') });
      setOpenDifference(false);
      setEditMode(false);
    }
    else if (updateActionSuccess === false && updateActionLoading === false) {
      message.error({ content: t('FAIL_PLEASE_CHECK') });
      setOpenDifference(false);
      setEditMode(false);
    }
  }, [updateActionLoading, updateActionSuccess, setOpenDifference, setEditMode, t]);

  useEffect(() => {
    setTableData([]);
    const tempTable = [];
    if (Object.keys(updateActionList?.add)?.length > 0) {
      Object.values(updateActionList?.add)?.forEach(updatedElement => {
        tempTable.push({ ...updatedElement, changeType: CHANGE_TYPE_NAME.ADD, affected: updatedElement?.affected });
      });
    }
    if (Object.keys(updateActionList?.delete)?.length > 0) {
      Object.values(updateActionList?.delete)?.forEach(updatedElement => {
        tempTable.push({ ...updatedElement, changeType: CHANGE_TYPE_NAME.DELETE, affected: updatedElement?.affected });
      });
    }
    if (Object.keys(updateActionList?.update)?.length > 0) {
      Object.values(updateActionList?.update)?.forEach(updatedElement => {
        tempTable.push({ ...updatedElement, changeType: CHANGE_TYPE_NAME.UPDATE, affected: updatedElement?.affected });
      });
    }
    setTableData(tempTable);
  }, [updateActionList]);

  return (
    <Modal
      title={t('SAVE_CHANGES')}
      visible={openDifference}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onFinish}
      okText={t('SAVE')}
      okButtonProps={{ disabled: errorMessage || !selectedReason, loading: updateActionLoading || false }}
      className={classes.differenceModal}
    >
      <div className={classes.saveWarningMessage}>{t('SAVE_WARNING')}</div>
      <ChangeReason setSelectedReason={setSelectedReason} reasonType={CHANGE_REASON_TITLES.ACTION} selectedReason={selectedReason} />
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
