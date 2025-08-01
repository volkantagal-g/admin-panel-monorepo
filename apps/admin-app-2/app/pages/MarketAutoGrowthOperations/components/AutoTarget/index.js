import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Empty, Row, Table } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import {
  autoGrowthSelector,
  promoSetSelector,
  targetSelector,
} from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import TableColumns from '@app/pages/MarketAutoGrowthOperations/components/AutoTarget/TableColumns';
import TableTitle from '@app/pages/MarketAutoGrowthOperations/components/AutoTarget/TableTitle';
import MonthFilter from '@app/pages/MarketAutoGrowthOperations/components/AutoTarget/MonthFilter';
import YearFilter from '@app/pages/MarketAutoGrowthOperations/components/AutoTarget/YearFilter';
import DifferenceModal from './DifferenceModal';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';
import { UPPER_CASE_DAY_FORMAT, UPPER_CASE_MONTH_FORMAT, UPPER_CASE_YEAR_FORMAT } from '../../constants';
import WarehouseTypeFilter from '@app/pages/MarketAutoGrowthOperations/components/AutoPromoSet/WarehouseTypeFilter';
import { TargetImportModal } from '@app/pages/MarketAutoGrowthOperations/components/AutoTarget/TargetImportModal';
import { ExampleCSVModal } from '@app/pages/MarketAutoGrowthOperations/components/AutoTarget/ExampleCSVModal';

const AutoTarget = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const [openDifference, setOpenDifference] = useState(false);

  const selectedDomain = useSelector(autoGrowthSelector.selectedDomain);
  const targetTableData = useSelector(targetSelector.targetTableData);
  const targetTableDataLoading = useSelector(targetSelector.targetTableDataLoading);
  const updateTargetList = useSelector(targetSelector.updateTargetList);
  const domainError = useSelector(autoGrowthSelector.domainError);
  const warehouseTypeList = useSelector(promoSetSelector.warehouseTypeList);
  const selectedTargetWarehouse = useSelector(targetSelector.selectedTargetWarehouse);

  const monthList = moment.months();
  const currentYear = parseFloat(moment().format(UPPER_CASE_YEAR_FORMAT), 1);
  const currentMonth = parseFloat(moment().format(UPPER_CASE_MONTH_FORMAT), 1);
  const day = parseFloat(moment().format(UPPER_CASE_DAY_FORMAT), 1);

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [editMode, setEditMode] = useState(false);
  const [disableMode, setDisableMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [isTargetImportModalOpen, setIsTargetImportModalOpen] = useState(false);
  const [
    isExampleCSVModalOpen,
    setIsExampleCSVModalOpen,
  ] = useState(false);

  const nextMonth = (parseFloat(currentMonth, 1) + 1) === 13 ? 1 : (parseFloat(currentMonth, 1) + 1);

  const selectedCountry = getSelectedCountry();
  const countryCode = _.get(selectedCountry, 'code.alpha2', '');

  useEffect(() => {
    setDisableMode(true);
    const endOfMonth = new Date(currentYear, month, 0).getDate();

    if (currentMonth === month && currentYear === year && day > 20) {
      setWarningMessage(t('FILL_NEXT_MONTH_WARNING'));
    }
    if (currentYear === year && currentMonth !== 12 && (currentMonth === month || nextMonth === month)) {
      setDisableMode(false);
    }
    if (currentMonth === 12 && ((year === currentYear && currentMonth === month) || (year === currentYear + 1 && nextMonth === month))) {
      setDisableMode(false);
    }
    if (selectedDomain && month && year && selectedTargetWarehouse) {
      dispatch(Creators.getTargetRequest({
        domainType: selectedDomain,
        month,
        year,
        endOfMonth,
        countryCode,
        warehouseType: selectedTargetWarehouse,
      }));
    }
  }, [countryCode, currentMonth, currentYear, day, dispatch, month, nextMonth, selectedDomain, t, year, selectedTargetWarehouse]);

  const tableColumns = useMemo(
    () => {
      return TableColumns(t, editMode, dispatch, day, month === currentMonth);
    },
    [t, editMode, dispatch, day, month, currentMonth],
  );

  const handleWarehouseChange = value => dispatch(Creators.setSelectedTargetWarehouse({ data: value }));

  const handleImportClick = () => {
    setIsTargetImportModalOpen(true);
  };

  const handleExampleCSVClick = () => {
    setIsExampleCSVModalOpen(true);
  };

  const handleCSVImportSubmit = ({ data, selectedReason: reason }) => {
    dispatch(Creators.importTargetsCSVRequest({
      domainType: selectedDomain,
      year,
      month,
      updateData: data,
      selectedReason: reason,
      warehouseType: selectedTargetWarehouse,
    }));
  };

  const handleExportClick = () => {
    dispatch(Creators.exportTargetsCSVRequest({
      domainType: selectedDomain,
      year,
      month,
    }));
  };

  return (
    <div className={classes.page}>
      <DifferenceModal
        setOpenDifference={setOpenDifference}
        openDifference={openDifference}
        classes={classes}
        errorMessage={errorMessage}
        setEditMode={setEditMode}
        setSelectedReason={setSelectedReason}
        selectedReason={selectedReason}
        warningMessage={warningMessage}
      />
      <TargetImportModal
        open={isTargetImportModalOpen}
        setOpen={setIsTargetImportModalOpen}
        onSubmit={handleCSVImportSubmit}
      />
      <ExampleCSVModal open={isExampleCSVModalOpen} setOpen={setIsExampleCSVModalOpen} />
      <Row className={classes.pageFilter}>
        <Col sm={4}>
          <WarehouseTypeFilter
            warehouseTypeList={warehouseTypeList}
            value={selectedTargetWarehouse}
            onChange={handleWarehouseChange}
            disabled={domainError || editMode || updateTargetList?.length > 0}
            loading={targetTableDataLoading}
            hasAllWarehousesOption
          />
        </Col>
        <Col sm={4}>
          <YearFilter
            year={year}
            setYear={setYear}
            currentYear={currentYear}
            disabled={domainError || editMode || updateTargetList?.length > 0}
            loading={targetTableDataLoading}
          />
        </Col>
        <Col sm={4}>
          <MonthFilter
            month={month}
            setMonth={setMonth}
            monthList={monthList}
            disabled={domainError || editMode || updateTargetList?.length > 0}
            loading={targetTableDataLoading}
          />
        </Col>
      </Row>
      <Table
        title={() => TableTitle(
          editMode,
          setEditMode,
          disableMode,
          setOpenDifference,
          setErrorMessage,
          targetTableData,
          day,
          setSelectedReason,
          { handleImport: handleImportClick, handleExport: handleExportClick, handleExample: handleExampleCSVClick },
        )}
        dataSource={targetTableData}
        columns={tableColumns}
        loading={targetTableDataLoading}
        bordered
        pagination={false}
        size="small"
        locale={{ emptyText: <Empty /> }}
      />
    </div>
  );
};
export default AutoTarget;
