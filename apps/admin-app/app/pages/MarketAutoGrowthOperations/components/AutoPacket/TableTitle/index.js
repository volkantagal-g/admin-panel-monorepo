import { Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { TitleButtons } from '@app/pages/MarketAutoGrowthOperations/components/TitleButtons';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const TableTitle = (
  editMode,
  setEditMode,
  dispatch,
  updatePacketList,
  setOpenDifference,
  setErrorMessage,
  packetTableData,
  setSelectedReason,
) => {
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const handleCancel = () => {
    setEditMode(false);
    dispatch(Creators.setCancelPacketChanges({}));
  };

  const handleSave = () => {
    setOpenDifference(true);
    setErrorMessage('');
    setSelectedReason(null);
    updatePacketList.forEach(record => {
      if (record?.packet?.toString() === '0') {
        setErrorMessage(
          t('PACKET_ERROR_MESSAGES.PACKET_CANT_SAVE_ZERO_AGGRESSION'),
        );
      }
    });
  };

  return (
    <Row className={classes.tableButtonContainer}>
      <TitleButtons
        hasAdd={false}
        editMode={editMode}
        hasNoChange={updatePacketList?.length <= 0}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setEditMode={setEditMode}
        disabled={false}
        tableData={packetTableData}
        hasDeleteAll={false}
      />
    </Row>
  );
};
export default TableTitle;
