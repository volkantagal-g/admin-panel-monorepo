import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Text from 'antd/lib/typography/Text';
import { Button, Col, DatePicker, Row, Select } from 'antd';

import { WAREHOUSE_ACTIVE_STATE } from '@shared/shared/constants';

import SelectWarehouseType from '@shared/components/Select/WarehouseType';

import useStyles from '../../styles';
import { Creators } from '../../redux/actions';
import SelectCity from '@shared/containers/Select/City';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import { shiftPlanReportSelector } from '../../redux/selectors';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { workerTypeOptions, customWeekStartEndFormat } from '../../constants';
import { getWarehousesSelector } from '@shared/containers/Select/Warehouse/redux/selectors';
import { customizeLocale } from '../../utils';

const ShiftPlanReportFilter = () => {
  const { t } = useTranslation(['global', 'workforceReports']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const lang = useSelector(getSelectedLanguage);

  const [selectedWarehouseStates, setSelectedWarehouseStates] = useState([]);
  const [selectedWarehouseTypes, setSelectedWarehouseTypes] = useState([]);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const cities = useSelector(getCitiesSelector.getData);
  const citiesPending = useSelector(getCitiesSelector.getIsPending);
  const reportDownloadPending = useSelector(shiftPlanReportSelector.getIsPending);

  const [date, setDate] = useState();
  const [cityIds, setCityIds] = useState([]);
  const [warehouseIds, setWarehouseIds] = useState([]);
  const [employeeType, setEmployeeType] = useState();

  useEffect(() => setCityIds(cities.map(item => item._id)), [cities]);
  useEffect(() => {
    setWarehouseIds([]);
    if (warehouses?.length) {
      setSelectedWarehouseStates([WAREHOUSE_ACTIVE_STATE]);
    }
  }, [cityIds, warehouses]);
  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  const downloadReport = () => {
    dispatch(Creators.getShiftPlanReportRequest({
      startDate: date.startOf('week').toISOString(),
      endDate: date.endOf('week').toISOString(),
      employeeType,
      warehouseIds,
    }));
  };

  const handleWarehouseTypeChange = type => {
    setSelectedWarehouseTypes(type);
  };

  return (
    <Row gutter={[8, 8]}>
      <Col md={12}>
        <Text>{t('global:DATE')}</Text>
        <DatePicker
          picker="week"
          value={date}
          onChange={setDate}
          format={customWeekStartEndFormat}
          allowClear={false}
          className={classes.fullWidth}
          // Shift plans are weekly which the first day must be Monday and the last day must be Sunday.
          locale={customizeLocale(lang)}
          disabled={reportDownloadPending}
        />
      </Col>
      <Col md={12}>
        <Text>{t('global:WORKER_TYPE')}</Text>
        <Select
          className={classes.fullWidth}
          options={workerTypeOptions}
          onChange={setEmployeeType}
          value={employeeType}
          placeholder={t('global:SELECT_CATEGORY')}
          disabled={reportDownloadPending}
        />
      </Col>
      <Col md={12}>
        <Text>{t('global:CITIES')}</Text>
        <SelectCity
          value={cityIds}
          onChange={setCityIds}
          defaultValue={cityIds}
          className={classes.selectHeight}
          loading={citiesPending || reportDownloadPending}
          isDisabled={citiesPending || reportDownloadPending}
          showArrow
          allowClear
          isMultiple
        />
      </Col>
      <Col md={12}>
        <Text>{t('workforceReports:WAREHOUSE_TYPES')}</Text>
        <SelectWarehouseType
          value={selectedWarehouseTypes}
          mode="multiple"
          showArrow
          onChange={handleWarehouseTypeChange}
          className={`${classes.fullWidth} ${classes.selectHeight}`}
        />
      </Col>
      <Col span={12}>
        <Text>{t('global:WAREHOUSE')}</Text>
        <SelectWarehouse
          isMultiple
          value={warehouseIds}
          onChange={setWarehouseIds}
          cityIds={cityIds}
          warehouseTypes={selectedWarehouseTypes}
          className={classes.selectHeight}
          isDisabled={reportDownloadPending}
          states={selectedWarehouseStates}
          placeholder={t('global:SELECT.WAREHOUSE')}
        />
      </Col>
      <Col span={24} className={classes.justifyEnd}>
        <Button disabled={!date || !employeeType || !warehouseIds?.length || reportDownloadPending} type="primary" onClick={downloadReport}>
          {t('workforceReports:DOWNLOAD_REPORT')}
        </Button>
      </Col>
    </Row>
  );
};

export default ShiftPlanReportFilter;
