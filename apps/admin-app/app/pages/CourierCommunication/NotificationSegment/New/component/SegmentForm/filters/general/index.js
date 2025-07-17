import { Collapse, DatePicker, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';

import SelectCity from '@shared/containers/Select/City/index';
import SelectWarehouses from '@shared/containers/Select/Warehouse/index';
import useStyles from '../styles';

const { RangePicker } = DatePicker;

const GeneralFilter = ({ getGeneralFilter, prevData }) => {
  const classes = useStyles();
  const { t } = useTranslation(['courierSegment', 'global']);
  const [currentCityId, setCurrentCityId] = useState(prevData?.city || []);
  const [warehouseIds, setWarehouseIds] = useState(prevData?.warehouse || []);
  const [startEndDate, setStartEndDate] = useState(prevData?.date ? [prevData?.date[0], prevData?.date[1]] : []);

  const handleCityChange = selectedCityId => {
    setCurrentCityId(selectedCityId);
  };

  const handleWarehouseChange = selectedWarehouseId => {
    setWarehouseIds(selectedWarehouseId);
  };

  const handleStartAndEndDate = value => {
    setStartEndDate(value);
  };

  useMemo(() => {
    getGeneralFilter({
      general: {
        city: currentCityId,
        warehouse: warehouseIds,
        date: startEndDate,
      },
    });
  }, [getGeneralFilter, currentCityId, warehouseIds, startEndDate]);

  return (
    <Collapse>
      <Collapse.Panel header={t('courierSegment:GENERAL')}>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12}>
            <SelectCity
              value={currentCityId}
              onChange={handleCityChange}
              showArrow
              allowClear
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <SelectWarehouses
              onChange={handleWarehouseChange}
              isMultiple
              placeholder={t('WAREHOUSE')}
              value={warehouseIds}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <RangePicker
              allowClear={() => setStartEndDate([])}
              defaultValue={startEndDate}
              className={classes.filterWrapper}
              onChange={value => handleStartAndEndDate(value)}
            />
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
};

export default GeneralFilter;
