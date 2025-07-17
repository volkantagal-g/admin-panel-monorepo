import { Empty, Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { autoGrowthSelector, actionSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import TableColumns from '@app/pages/MarketAutoGrowthOperations/components/AutoAction/TableColumns';
import TableTitle from '@app/pages/MarketAutoGrowthOperations/components/AutoAction/TableTitle';
import AddActionModal from '@app/pages/MarketAutoGrowthOperations/components/AutoAction/AddActionModal';
import DifferenceModal from '@app/pages/MarketAutoGrowthOperations/components/AutoAction/DifferenceModal';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const AutoAction = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const [openDifference, setOpenDifference] = useState(false);
  const [open, setOpen] = useState(false);

  const selectedDomain = useSelector(autoGrowthSelector.selectedDomain);
  const dayTypes = useSelector(autoGrowthSelector.dayTypes);
  const dayTypesLoading = useSelector(autoGrowthSelector.dayTypesLoading);
  const hourTypes = useSelector(autoGrowthSelector.hourTypes);
  const hourTypesLoading = useSelector(autoGrowthSelector.hourTypesLoading);

  const actionTableData = useSelector(actionSelector.actionTableData);
  const actionTableDataLoading = useSelector(actionSelector.actionTableDataLoading);

  const actionWarehouseList = useSelector(actionSelector.actionWarehouseList);
  const actionWarehouseListLoading = useSelector(actionSelector.actionWarehouseListLoading);
  const actionPacketList = useSelector(actionSelector.actionPacketList);
  const actionPacketListLoading = useSelector(actionSelector.actionPacketListLoading);

  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updateBucketLine, setUpdateBucketLine] = useState(true);
  const [willTrigger, setTriggerReason] = useState('');
  const [highestAction, setHighestAction] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');

  useEffect(() => {
    if (actionTableData?.length > 0) {
      const max = Math.max(...actionTableData.map(item => item.action));
      setHighestAction(max);
    }
  }, [actionTableData]);

  useEffect(() => {
    if (selectedDomain) {
      dispatch(Creators.getActionRequest({ domainType: selectedDomain }));
      dispatch(Creators.getHourTypesRequest({ domainType: selectedDomain }));
      dispatch(Creators.getDayTypesRequest({ domainType: selectedDomain }));
      dispatch(Creators.getWarehouseListRequest({ domainType: selectedDomain }));
      dispatch(Creators.getPacketListRequest({ domainType: selectedDomain }));
    }
  }, [dispatch, selectedDomain]);

  useEffect(() => {
    setUpdateBucketLine(false);
    setTimeout(() => {
      setUpdateBucketLine(true);
    }, 1);
    setTriggerReason('');
  }, [willTrigger]);

  const tableColumns = useMemo(
    () => {
      return TableColumns(
        t,
        editMode,
        classes,
        dayTypes,
        dayTypesLoading,
        hourTypes,
        hourTypesLoading,
        actionPacketList,
        actionPacketListLoading,
        actionWarehouseList,
        actionWarehouseListLoading,
        setTriggerReason,
        dispatch,
      );
    },
    [
      actionPacketList,
      actionPacketListLoading,
      actionWarehouseList,
      actionWarehouseListLoading,
      classes,
      dayTypes,
      dayTypesLoading,
      dispatch,
      editMode,
      hourTypes,
      hourTypesLoading,
      t],
  );
  return (
    <div className={classes.page}>
      <AddActionModal
        open={open}
        setOpen={setOpen}
        actionWarehouseList={actionWarehouseList}
        actionPacketList={actionPacketList}
        dayTypes={dayTypes}
        hourTypes={hourTypes}
        selectedDomain={selectedDomain}
        setTriggerReason={setTriggerReason}
        highestAction={highestAction}
        actionTableData={actionTableData}
        t={t}
      />
      <DifferenceModal
        setOpenDifference={setOpenDifference}
        openDifference={openDifference}
        classes={classes}
        errorMessage={errorMessage}
        setEditMode={setEditMode}
        actionTableData={actionTableData}
        selectedDomain={selectedDomain}
        selectedReason={selectedReason}
        setSelectedReason={setSelectedReason}
      />
      {updateBucketLine && (
      <Table
        title={() => TableTitle(
          editMode,
          setEditMode,
          dispatch,
          setOpenDifference,
          setErrorMessage,
          setOpen,
          actionTableData,
          actionWarehouseList,
          setSelectedReason,
        )}
        dataSource={actionTableData}
        columns={tableColumns}
        loading={actionTableDataLoading}
        bordered
        pagination={false}
        locale={{ emptyText: <Empty /> }}
      />
      )}
    </div>
  );
};
export default AutoAction;
