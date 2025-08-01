import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row } from 'antd';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { limitSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { COLUMN_TYPES, LIMIT_METRICS } from '@app/pages/MarketAutoGrowthOperations/constants';
import { TitleButtons } from '@app/pages/MarketAutoGrowthOperations/components/TitleButtons';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const TableTitle = (editMode, setEditMode, dispatch, setOpenDifference, setErrorMessage, setOpen, limitTableData, setSelectedReason) => {
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const updateLimitListAdd = useSelector(limitSelector.updateLimitListAdd);
  const updateLimitListDelete = useSelector(limitSelector.updateLimitListDelete);
  const updateLimitListUpdate = useSelector(limitSelector.updateLimitListUpdate);

  const handleCancel = () => {
    setEditMode(false);
    dispatch(Creators.setCancelLimitChanges({}));
  };

  const getFullHours = data => {
    const fullHours = {};
    if (data) {
      data?.forEach(element => {
        if (!Object.keys(fullHours)?.includes(element?.dayType)) Object.assign(fullHours, { [element?.dayType]: [] });
        const splittedData = element?.hourRange?.split('_');
        const endData = splittedData && parseFloat(splittedData[1]) === 0 ? 24 : parseFloat(splittedData[1]);
        for (let index = parseFloat(splittedData[0]); index < endData; index++) {
          fullHours[element?.dayType].push(index);
        }
      });
    }
    return { fullHours };
  };

  const handleSave = () => {
    setOpenDifference(true);
    setSelectedReason(null);
    setErrorMessage('');
    let error = false;
    limitTableData.forEach(element => {
      if (!element?.hourRange) {
        setErrorMessage(t('LIMIT_ERROR_MESSAGES.HOUR_RANGE_REQUIRED'));
        error = true;
      }
      if (!element?.promoType || element?.promoType?.length === 0 || element?.promoType === '') {
        setErrorMessage(t('LIMIT_ERROR_MESSAGES.PROMO_TYPE_REQUIRED'));
        error = true;
      }
      if (!element?.dayType || element?.dayType === '') {
        setErrorMessage(t('LIMIT_ERROR_MESSAGES.DAY_TYPE_REQUIRED'));
        error = true;
      }
      if (!element?.thresholdType || element?.thresholdType === '') {
        setErrorMessage(t('LIMIT_ERROR_MESSAGES.THRESHOLD_TYPE_REQUIRED'));
        error = true;
      }
      if (element[COLUMN_TYPES.LIMIT_METRIC] === LIMIT_METRICS.ORDERSHARE && element[COLUMN_TYPES.PROMO_TYPE].length > 3) {
        setErrorMessage(t('LIMIT_ERROR_MESSAGES.MAX_3_TAGS'));
        error = true;
      }
    });
    if (!error) {
      Object.values(LIMIT_METRICS).forEach(metric => {
        const data = limitTableData?.filter(element => element?.limitMetric === metric);
        const { fullHours } = getFullHours(data);
        const checkIfDuplicateExists = arr => new Set(arr)?.size !== arr?.length;
        if (fullHours) {
          Object.values(fullHours)?.map(hour => (checkIfDuplicateExists(hour) &&
          setErrorMessage(t('LIMIT_ERROR_MESSAGES.MUST_NOT_LIMIT_SAME_DAY_SAME_HOUR'))));
        }
      });
    }
  };

  const handleDelete = () => {
    dispatch(Creators.deleteAllLimits({}));
  };

  return (
    <Row className={classes.tableButtonContainer}>
      <TitleButtons
        hasAdd
        addButtonContent={t('ADD_LIMIT')}
        editMode={editMode}
        setOpen={setOpen}
        hasNoChange={updateLimitListAdd?.length <= 0 && updateLimitListDelete?.length <= 0 && updateLimitListUpdate?.length <= 0}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setEditMode={setEditMode}
        disabled={false}
        tableData={limitTableData}
        hasDeleteAll
        handleDelete={handleDelete}
        deleteContent={t('DELETE_ALL_LIMITS')}
      />
    </Row>

  );
};
export default TableTitle;
