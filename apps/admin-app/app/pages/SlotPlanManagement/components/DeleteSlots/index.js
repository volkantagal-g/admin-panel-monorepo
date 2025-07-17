import { Button, Card, Col, Collapse, DatePicker, Row, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import SelectCity from '@shared/containers/Select/City';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import SelectFranchise from '@shared/containers/Select/Franchise';
import { getWarehousesSelector } from '@shared/containers/Select/Warehouse/redux/selectors';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '../../redux/actions';
import { deleteSlotPlansSelector } from '../../redux/selectors';
import useStyles from './styles';
import { workerTypeOptions } from '../../constants';
import SelectFranchisesAreas from '@shared/containers/Select/FranchiseAreas';
import SelectDomainType from '@shared/containers/Select/DomainType';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

const { Panel } = Collapse;

const DeleteSlots = () => {
  const { t } = useTranslation(['global', 'slotPlanManagement']);
  const classes = useStyles();
  const dispatch = useDispatch();

  const warehouses = useSelector(getWarehousesSelector.getData);
  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const deleteSlotsPending = useSelector(deleteSlotPlansSelector.getIsPending);

  const [date, setDate] = useState([]);
  const [cityIds, setCityIds] = useState([]);
  const [domainTypes, setDomainTypes] = useState([GETIR_DOMAIN_TYPES.FOOD, GETIR_DOMAIN_TYPES.LOCALS]);
  const [warehouseIds, setWarehouseIds] = useState([]);
  const [franchiseIds, setFranchiseIds] = useState([]);
  const [franchiseAreasIds, setFranchiseAreasIds] = useState([]);
  const [employeeType, setEmployeeType] = useState();

  useEffect(() => setCityIds(cities.map(item => item._id)), [cities]);
  useEffect(() => {
    const selectedCitiesWarehouses = cityIds.length ? warehouses.filter(wh => cityIds.includes(wh.city._id)).map(item => item._id) : [];
    setWarehouseIds(selectedCitiesWarehouses);
  }, [cityIds, warehouses]);
  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  const handleDeleteSlotPlans = () => {
    const minDate = date[0].startOf('day').utcOffset(0, true).toISOString();
    const maxDate = date[1].endOf('day').utcOffset(0, true).toISOString();

    dispatch(Creators.deleteSlotPlansRequest({
      minDate,
      maxDate,
      employeeType,
      warehouseIds,
    }));
  };

  return (
    <Card>
      <Row gutter={[8, 8]}>
        <Col md={12}>
          <Text>{t('global:DATE')}</Text>
          <DatePicker.RangePicker
            value={date}
            onChange={setDate}
            allowClear={false}
            className={classes.fullWidth}
            disabled={deleteSlotsPending}
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
            disabled={deleteSlotsPending}
          />
        </Col>
        <Col span={24}>
          <Text>{t('global:WAREHOUSE')}</Text>
          <Collapse
            bordered={false}
            defaultActiveKey={[1]}
          >
            <Panel header={t('slotPlanManagement:FILTER_WAREHOUSES')} key="1">
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Text>{t('DOMAIN_TYPE')}</Text>
                  <SelectDomainType
                    mode="multiple"
                    value={domainTypes}
                    isDisabled={deleteSlotsPending}
                    onChange={setDomainTypes}
                    showArrow
                  />
                </Col>
                <Col span={24}>
                  <Text>{t('global:CITIES')}</Text>
                  <SelectCity
                    onChange={setCityIds}
                    defaultValue={cityIds}
                    className={classes.selectHeight}
                    loading={isCitiesPending || deleteSlotsPending}
                    isDisabled={isCitiesPending || deleteSlotsPending}
                    showArrow
                    allowClear
                    isMultiple
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('global:FRANCHISE')}</Text>
                  <SelectFranchise
                    value={franchiseIds}
                    onChange={setFranchiseIds}
                    disabled={deleteSlotsPending}
                    cityIds={cityIds?.length ? cityIds : undefined}
                    className={classes.selectHeight}
                    showAllOption
                    isMultiple
                    allowClear
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('slotPlanManagement:FRANCHISE_AREAS')}</Text>
                  <SelectFranchisesAreas
                    mode="multiple"
                    className={`${classes.fullWidth} ${classes.selectHeight}`}
                    onChange={setFranchiseAreasIds}
                    disabled={deleteSlotsPending}
                    franchiseIds={franchiseIds}
                  />
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <SelectWarehouse
            isMultiple
            onChange={setWarehouseIds}
            className={classes.selectHeight}
            isDisabled={deleteSlotsPending}
            cityIds={cityIds}
            franchiseIds={franchiseIds}
            franchiseAreasIds={franchiseAreasIds}
            domainTypes={domainTypes}
            placeholder={t('global:SELECT.WAREHOUSE')}
          />
        </Col>
        <Col span={24} className={classes.justifyEnd}>
          <Button
            disabled={!date.length || !employeeType || !warehouseIds?.length || deleteSlotsPending}
            type="primary"
            loading={deleteSlotsPending}
            onClick={handleDeleteSlotPlans}
          >
            {t('slotPlanManagement:DELETE_SLOT_PLANS')}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default DeleteSlots;
