import { Empty, Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { autoGrowthSelector, limitSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import TableTitle from '@app/pages/MarketAutoGrowthOperations/components/AutoLimit/TableTitle';
import AddLimitModal from '@app/pages/MarketAutoGrowthOperations/components/AutoLimit/AddLimitModal';
import TableColumns from '@app/pages/MarketAutoGrowthOperations/components/AutoLimit/TableColumns';
import DifferenceModal from '@app/pages/MarketAutoGrowthOperations/components/AutoLimit/DifferenceModal';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const AutoLimit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const [openDifference, setOpenDifference] = useState(false);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [willTrigger, setTriggerReason] = useState(false);
  const [updateBucketLine, setUpdateBucketLine] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);

  const selectedDomain = useSelector(autoGrowthSelector.selectedDomain);
  const limitTableData = useSelector(limitSelector.limitTableData);
  const limitTableDataLoading = useSelector(limitSelector.limitTableDataLoading);

  const limitMetricsList = useSelector(limitSelector.limitMetricsList);
  const limitMetricsListLoading = useSelector(limitSelector.limitMetricsListLoading);
  const limitDayTypesList = useSelector(limitSelector.limitDayTypesList);
  const limitDayTypesListLoading = useSelector(limitSelector.limitDayTypesListLoading);
  const limitPromoTypesList = useSelector(limitSelector.limitPromoTypesList);
  const limitPromoTypesListLoading = useSelector(limitSelector.limitPromoTypesListLoading);
  const thresholdTypeList = useSelector(limitSelector.thresholdTypeList);
  const thresholdTypeListLoading = useSelector(limitSelector.thresholdTypeListLoading);
  const limitEffectList = useSelector(limitSelector.limitEffectList);
  const limitEffectListLoading = useSelector(limitSelector.limitEffectListLoading);
  const limitWarehouseList = useSelector(limitSelector.limitWarehouseList);
  const limitWarehouseListLoading = useSelector(limitSelector.limitWarehouseListLoading);

  useEffect(() => {
    setUpdateBucketLine(false);
    setTimeout(() => {
      setUpdateBucketLine(true);
    }, 1);
    setTriggerReason('');
  }, [willTrigger]);

  useEffect(() => {
    if (selectedDomain) {
      dispatch(Creators.getLimitsRequest({ domainType: selectedDomain }));
      dispatch(Creators.getLimitDayTypesRequest({ domainType: selectedDomain }));
      dispatch(Creators.getLimitMetricsRequest({ domainType: selectedDomain }));
      dispatch(Creators.getLimitPromoTypesRequest({ domainType: selectedDomain }));
      dispatch(Creators.getTresholdTypesRequest({ domainType: selectedDomain }));
      dispatch(Creators.getLimitWarehouseListRequest({ domainType: selectedDomain }));
      dispatch(Creators.getLimitEffectListRequest({ domainType: selectedDomain }));
    }
  }, [dispatch, selectedDomain]);

  const tableColumns = useMemo(
    () => {
      return TableColumns(
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
      );
    },
    [classes,
      t,
      dispatch,
      editMode,
      limitDayTypesList,
      limitDayTypesListLoading,
      limitMetricsList,
      limitMetricsListLoading,
      limitPromoTypesList,
      limitPromoTypesListLoading,
      thresholdTypeList,
      thresholdTypeListLoading,
      dataChanged,
      limitEffectList,
      limitEffectListLoading,
      limitWarehouseList,
      limitWarehouseListLoading],
  );

  return (
    <div className={classes.page}>
      <AddLimitModal
        open={open}
        setOpen={setOpen}
        limitMetricsList={limitMetricsList}
        limitMetricsListLoading={limitMetricsListLoading}
        limitDayTypesList={limitDayTypesList}
        limitDayTypesListLoading={limitDayTypesListLoading}
        thresholdTypeList={thresholdTypeList}
        thresholdTypeListLoading={thresholdTypeListLoading}
        limitPromoTypesListLoading={limitPromoTypesListLoading}
        limitPromoTypesList={limitPromoTypesList}
        selectedDomain={selectedDomain}
        limitWarehouseList={limitWarehouseList}
        limitWarehouseListLoading={limitWarehouseListLoading}
        limitEffectList={limitEffectList}
        limitEffectListLoading={limitEffectListLoading}
      />
      <DifferenceModal
        setOpenDifference={setOpenDifference}
        openDifference={openDifference}
        classes={classes}
        selectedDomain={selectedDomain}
        errorMessage={errorMessage}
        setEditMode={setEditMode}
        limitTableData={limitTableData}
        selectedReason={selectedReason}
        setSelectedReason={setSelectedReason}
      />
      {updateBucketLine && (
      <Table
        title={() => TableTitle(editMode, setEditMode, dispatch, setOpenDifference, setErrorMessage, setOpen, limitTableData, setSelectedReason)}
        dataSource={limitTableData || []}
        columns={tableColumns}
        loading={limitTableDataLoading}
        bordered
        pagination={false}
        locale={{ emptyText: <Empty /> }}
      />
      ) }
    </div>
  );
};
export default AutoLimit;
