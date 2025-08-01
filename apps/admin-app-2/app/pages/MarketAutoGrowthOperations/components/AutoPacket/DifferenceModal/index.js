import { message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { packetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import DifferenceTableColumns from '@app/pages/MarketAutoGrowthOperations/components/DifferenceTableColumns';
import { CHANGE_REASON_TITLES, PACKET_COLUMN_DETAIL } from '@app/pages/MarketAutoGrowthOperations/constants';
import ChangeReason from '@app/pages/MarketAutoGrowthOperations/components/ChangeReason';

const DifferenceModal = ({ openDifference, setOpenDifference, classes, selectedDomain, errorMessage, setEditMode, setSelectedReason, selectedReason }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const packetTableData = useSelector(packetSelector.packetTableData);

  const updatePacketLoading = useSelector(packetSelector.updatePacketLoading);
  const updatePacketSuccess = useSelector(packetSelector.updatePacketSuccess);
  const updatePacketList = useSelector(packetSelector.updatePacketList);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const tableColumns = DifferenceTableColumns(t, PACKET_COLUMN_DETAIL, true);

  const onFinish = () => {
    setConfirmLoading(true);
    if (!errorMessage && selectedReason) {
      const result = packetTableData.map(({ id, ...rest }) => ({ ...rest }));
      dispatch(Creators.updatePacketConfigRequest({ domainType: selectedDomain, updateData: result, changeReason: selectedReason }));
    }
    else message.error({ content: t('FAIL_PLEASE_CHECK') });
  };
  const onCancel = () => {
    setOpenDifference(false);
  };
  useEffect(() => {
    if (updatePacketSuccess === true && updatePacketLoading === false) {
      message.success({ content: t('SUCCESS') });
      setOpenDifference(false);
      setEditMode(false);
    }
    else if (updatePacketSuccess === false && updatePacketLoading === false) {
      message.error({ content: t('FAIL_PLEASE_CHECK') });
      setOpenDifference(false);
      setEditMode(false);
    }
  }, [updatePacketLoading, updatePacketSuccess, setOpenDifference, setEditMode, t]);

  return (
    <Modal
      title={t('SAVE_CHANGES')}
      visible={openDifference}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onFinish}
      okText={t('SAVE')}
      okButtonProps={{ disabled: errorMessage || !selectedReason, loading: updatePacketLoading || false }}
      className={classes.differenceModal}
    >
      <div className={classes.saveWarningMessage}> {t('SAVE_WARNING')} </div>
      <ChangeReason setSelectedReason={setSelectedReason} reasonType={CHANGE_REASON_TITLES.PACKET} selectedReason={selectedReason} />
      {errorMessage && (
      <div className={classes.errorMessage}>
        {errorMessage}
      </div>
      )}
      <Table
        columns={tableColumns}
        dataSource={updatePacketList}
        pagination={false}
      />
    </Modal>
  );
};
export default DifferenceModal;
