import { Empty, Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { autoGrowthSelector, packetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import TableTitle from '@app/pages/MarketAutoGrowthOperations/components/AutoPacket/TableTitle';
import TableColumns from '@app/pages/MarketAutoGrowthOperations/components/AutoPacket/TableColumns';
import DifferenceModal from '@app/pages/MarketAutoGrowthOperations/components/AutoPacket/DifferenceModal';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const AutoPacket = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const [openDifference, setOpenDifference] = useState(false);

  const selectedDomain = useSelector(autoGrowthSelector.selectedDomain);

  const packetTableData = useSelector(packetSelector.packetTableData);
  const packetTableDataLoading = useSelector(packetSelector.packetTableDataLoading);
  const updatePacketList = useSelector(packetSelector.updatePacketList);
  const dayTypes = useSelector(autoGrowthSelector.dayTypes);
  const hourTypes = useSelector(autoGrowthSelector.hourTypes);
  const dayTypesLoading = useSelector(autoGrowthSelector.dayTypesLoading);
  const hourTypesLoading = useSelector(autoGrowthSelector.hourTypesLoading);

  const [selectedReason, setSelectedReason] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedDomain) {
      dispatch(Creators.getPacketRequest({ domainType: selectedDomain }));
      dispatch(Creators.getHourTypesRequest({ domainType: selectedDomain }));
      dispatch(Creators.getDayTypesRequest({ domainType: selectedDomain }));
    }
  }, [dispatch, selectedDomain]);

  const tableColumns = useMemo(
    () => {
      return TableColumns(t, editMode, classes, dayTypes, dayTypesLoading, hourTypes, hourTypesLoading, dispatch);
    },
    [t, editMode, classes, dayTypes, dayTypesLoading, hourTypes, hourTypesLoading, dispatch],
  );

  return (
    <div className={classes.page}>
      <DifferenceModal
        setOpenDifference={setOpenDifference}
        openDifference={openDifference}
        classes={classes}
        selectedDomain={selectedDomain}
        errorMessage={errorMessage}
        setEditMode={setEditMode}
        setSelectedReason={setSelectedReason}
        selectedReason={selectedReason}
      />
      <Table
        title={() => TableTitle(editMode, setEditMode, dispatch, updatePacketList, setOpenDifference, setErrorMessage, packetTableData, setSelectedReason)}
        dataSource={packetTableData}
        columns={tableColumns}
        loading={packetTableDataLoading}
        bordered
        pagination={false}
        locale={{ emptyText: <Empty /> }}
      />
    </div>
  );
};
export default AutoPacket;
