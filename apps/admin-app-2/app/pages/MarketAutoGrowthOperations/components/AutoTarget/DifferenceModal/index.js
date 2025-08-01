import { message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { autoGrowthSelector, targetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { CHANGE_REASON_TITLES, TARGET_COLUMN_DETAIL } from '@app/pages/MarketAutoGrowthOperations/constants';
import DifferenceTableColumns from '@app/pages/MarketAutoGrowthOperations/components/DifferenceTableColumns';
import ChangeReason from '@app/pages/MarketAutoGrowthOperations/components/ChangeReason';

const DifferenceModal = ({
  openDifference,
  setOpenDifference,
  classes,
  errorMessage,
  setEditMode,
  selectedReason,
  setSelectedReason,
  warningMessage,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const updateTargetList = useSelector(targetSelector.updateTargetList);
  const targetTableData = useSelector(targetSelector.targetTableData);
  const insertTargetLoading = useSelector(targetSelector.insertTargetLoading);
  const insertTargetSuccess = useSelector(targetSelector.insertTargetSuccess);
  const year = useSelector(targetSelector.year);
  const month = useSelector(targetSelector.month);
  const selectedTargetWarehouse = useSelector(targetSelector.selectedTargetWarehouse);

  const selectedDomain = useSelector(autoGrowthSelector.selectedDomain);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const tableColumns = DifferenceTableColumns(t, TARGET_COLUMN_DETAIL, true);

  const onFinish = () => {
    setConfirmLoading(true);
    if (!errorMessage && selectedReason) {
      dispatch(Creators.insertTargetConfigRequest({
        year,
        month,
        domainType: selectedDomain,
        updateData: targetTableData,
        changeReason: selectedReason,
        warehouseType: selectedTargetWarehouse,
      }));
    }
  };

  const onCancel = () => {
    setOpenDifference(false);
  };

  useEffect(() => {
    if (insertTargetSuccess === true && insertTargetLoading === false) {
      message.success({ content: t('SUCCESS') });
      setOpenDifference(false);
      setEditMode(false);
    }
    else if (insertTargetSuccess === false && insertTargetLoading === false) {
      message.error({ content: t('FAIL_PLEASE_CHECK') });
      setOpenDifference(false);
      setEditMode(false);
    }
  }, [insertTargetLoading, insertTargetSuccess, setOpenDifference, setEditMode, t]);

  return (
    <Modal
      title={t('SAVE_CHANGES')}
      visible={openDifference}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onFinish}
      okText={t('SAVE')}
      okButtonProps={{ disabled: errorMessage || !selectedReason, loading: insertTargetLoading || false }}
      className={classes.differenceModal}
    >
      <div className={classes.saveWarningMessage}> {t('SAVE_WARNING')} </div>
      <ChangeReason setSelectedReason={setSelectedReason} reasonType={CHANGE_REASON_TITLES.TARGET} selectedReason={selectedReason} />
      {errorMessage && (<div className={classes.errorMessage}> {errorMessage} </div>)}
      {warningMessage && (<div className={classes.warningMessage}> {warningMessage} </div>)}
      <Table
        columns={tableColumns}
        dataSource={updateTargetList}
        pagination={false}
      />
    </Modal>
  );
};
export default DifferenceModal;
