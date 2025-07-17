import { Button, Card, Col, Collapse, DatePicker, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';

import SelectCity from '@shared/containers/Select/City';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import SelectFranchise from '@shared/containers/Select/Franchise';
import { getWarehousesSelector } from '@shared/containers/Select/Warehouse/redux/selectors';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import useStyles from '../../styles';
import SelectFranchisesAreas from '@shared/containers/Select/FranchiseAreas';
import SelectDomainType from '@shared/containers/Select/DomainType';
import { GETIR_DOMAIN_TYPES, WAREHOUSE_ACTIVE_STATE } from '@shared/shared/constants';
import SelectWarehouseType from '@shared/components/Select/WarehouseType';
import { getLangKey } from '@shared/i18n';

const { Panel } = Collapse;

const SlotReportsFilter = ({ onReportDownload, isReportPending }) => {
  const { t } = useTranslation(['global', 'workforceReports']);
  const classes = useStyles();
  const dispatch = useDispatch();

  const warehouses = useSelector(getWarehousesSelector.getData);
  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);

  const [date, setDate] = useState([]);
  const [cityIds, setCityIds] = useState([]);
  const [domainTypes, setDomainTypes] = useState([GETIR_DOMAIN_TYPES.FOOD, GETIR_DOMAIN_TYPES.LOCALS]);
  const [warehouseIds, setWarehouseIds] = useState([]);
  const [franchiseIds, setFranchiseIds] = useState([]);
  const [franchiseAreasIds, setFranchiseAreasIds] = useState([]);
  const [selectedWarehouseTypes, setSelectedWarehouseTypes] = useState([]);
  const [selectedWarehouseStates, setSelectedWarehouseStates] = useState([]);

  useEffect(() => setCityIds(cities.map(item => item._id)), [cities]);
  useEffect(() => {
    const selectedCitiesWarehouses = cityIds.length ? warehouses.filter(wh => cityIds.includes(wh.city._id)).map(item => item._id) : [];
    setWarehouseIds(selectedCitiesWarehouses);
    if (warehouses?.length) {
      setSelectedWarehouseStates([WAREHOUSE_ACTIVE_STATE]);
    }
  }, [cityIds, warehouses]);
  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  const handleDownloadSlotPerformanceReports = () => {
    const startDate = moment(date[0]).toISOString();
    const endDate = moment(date[1]).toISOString();

    onReportDownload(startDate, endDate, warehouseIds);
  };

  const handleWarehouseTypeChange = type => {
    setSelectedWarehouseTypes(type);
  };

  const handleSelectAll = () => {
    const cityOptions = cities.map(city => {
      return { value: city._id, label: city.name[getLangKey()] };
    });
    setCityIds(cityOptions.map(item => item.value));
  };

  return (
    <Card>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Text>{t('global:DATE')}</Text>
          <DatePicker.RangePicker
            value={date}
            onChange={setDate}
            allowClear={false}
            className={classes.fullWidth}
            disabled={isReportPending}
          />
        </Col>
        <Col span={24}>
          <Text>{t('global:WAREHOUSE')}</Text>
          <Collapse
            bordered={false}
            defaultActiveKey={[1]}
          >
            <Panel header={t('workforceReports:FILTER_WAREHOUSES')} key="1">
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Text>{t('DOMAIN_TYPE')}</Text>
                  <SelectDomainType
                    mode="multiple"
                    value={domainTypes}
                    isDisabled={isReportPending}
                    onChange={setDomainTypes}
                    showArrow
                  />
                </Col>
                <Col span={24}>
                  <Row gutter={24}>
                    <Col span={20}>
                      <Text>{t('global:CITIES')}</Text>
                      <SelectCity
                        onChange={setCityIds}
                        value={cityIds}
                        className={classes.selectHeight}
                        loading={isCitiesPending || isReportPending}
                        isDisabled={isCitiesPending || isReportPending}
                        showArrow
                        allowClear
                        isMultiple
                      />
                    </Col>
                    <Col span={4} className={classes.alignEnd}>
                      <Button
                        type="default"
                        loading={isReportPending}
                        onClick={handleSelectAll}
                      >
                        {t('workforceReports:SELECT_ALL')}
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Text>{t('global:FRANCHISE')}</Text>
                  <SelectFranchise
                    value={franchiseIds}
                    onChange={setFranchiseIds}
                    disabled={isReportPending}
                    cityIds={cityIds?.length ? cityIds : undefined}
                    className={classes.selectHeight}
                    showAllOption
                    isMultiple
                    allowClear
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('workforceReports:FRANCHISE_AREAS')}</Text>
                  <SelectFranchisesAreas
                    mode="multiple"
                    className={`${classes.fullWidth} ${classes.selectHeight}`}
                    onChange={setFranchiseAreasIds}
                    disabled={isReportPending}
                    franchiseIds={franchiseIds}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('workforceReports:WAREHOUSE_TYPES')}</Text>
                  <SelectWarehouseType
                    value={selectedWarehouseTypes}
                    mode="multiple"
                    showArrow
                    onChange={handleWarehouseTypeChange}
                    className={`${classes.fullWidth} ${classes.selectHeight}`}
                  />
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <SelectWarehouse
            isMultiple
            onChange={setWarehouseIds}
            className={classes.selectHeight}
            isDisabled={isReportPending}
            cityIds={cityIds}
            franchiseIds={franchiseIds}
            franchiseAreasIds={franchiseAreasIds}
            domainTypes={domainTypes}
            placeholder={t('global:SELECT.WAREHOUSE')}
            warehouseTypes={selectedWarehouseTypes}
            states={selectedWarehouseStates}
          />
        </Col>
        <Col span={24} className={classes.justifyEnd}>
          <Button
            disabled={!date.length || !warehouseIds?.length || isReportPending}
            type="primary"
            loading={isReportPending}
            onClick={handleDownloadSlotPerformanceReports}
          >
            {t('workforceReports:DOWNLOAD_REPORT')}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default SlotReportsFilter;
