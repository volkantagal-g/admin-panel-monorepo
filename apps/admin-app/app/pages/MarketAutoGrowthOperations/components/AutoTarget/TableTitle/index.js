import { Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { targetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { REGEX_CP_TARGET, REGEX_ORDER_TARGET, COLUMN_TYPES } from '@app/pages/MarketAutoGrowthOperations/constants';
import { TitleButtons } from '@app/pages/MarketAutoGrowthOperations/components/TitleButtons';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const TableTitle = (editMode, setEditMode, disableMode, setOpenDifference, setErrorMessage, targetTableData, day, setSelectedReason, options = {}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const { handleImport, handleExport, handleExample } = options;

  const updateTargetList = useSelector(targetSelector.updateTargetList);

  const handleSave = () => {
    setOpenDifference(true);
    setErrorMessage('');
    setSelectedReason(null);
    targetTableData.forEach(target => Object.entries(target).forEach(element => {
      if ((element[0] !== COLUMN_TYPES.IS_UPDATED && (parseInt(element[1], 10) === 0 || element[1] === undefined || element[1] === ''))
      && parseFloat(target?.date?.substring(8, 11), 1) >= day) {
        setErrorMessage(t('TARGET_ERROR_MESSAGES.FILL_ALL_TARGET'));
      }
    }));

    targetTableData?.forEach(record => {
      if (REGEX_CP_TARGET.test(record?.cpTarget) === false || REGEX_ORDER_TARGET.test(record.orderTarget) === false) {
        setErrorMessage(t('TARGET_ERROR_MESSAGES.CHECK_FORMAT'));
      }
    });
    const uniqueDates = [...new Set(targetTableData?.map(obj => obj.date))];
    if (targetTableData?.length !== uniqueDates?.length) {
      setErrorMessage(t('TARGET_ERROR_MESSAGES.TARGET_MUST_NOT_SAME_DATE'));
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    dispatch(Creators.setCancelTargetChanges());
  };

  return (disableMode === false && (
  <Row className={classes.tableButtonContainer}>
    <TitleButtons
      hasAdd={false}
      editMode={editMode}
      hasNoChange={updateTargetList?.length <= 0}
      handleSave={handleSave}
      handleCancel={handleCancel}
      setEditMode={setEditMode}
      disabled={false}
      tableData={targetTableData}
      hasDeleteAll={false}
      handleImport={handleImport}
      handleExport={handleExport}
      handleExample={handleExample}
    />
  </Row>
  )
  );
};
export default TableTitle;
