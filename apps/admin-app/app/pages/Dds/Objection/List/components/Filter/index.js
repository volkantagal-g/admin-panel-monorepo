import { useCallback, useState } from 'react';
import { Col, Row, DatePicker, Select, Button, Typography, Collapse, Space } from 'antd';
import moment from 'moment';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { ddsObjectionStatuses } from '@shared/shared/constantValues';
import { getLocalDateFormat } from '@shared/utils/localization';
import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectDdsCriteria from '@shared/containers/Select/DdsCriteria';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import { t } from '@shared/i18n';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Filter = ({ filters, isPending, handleSubmit }) => {
  const classes = useStyles();

  const { selectedFranchiseId, selectedWarehouseIds, selectedRequestTimeRange, selectedStatuses, selectedCriterionNames } = filters;

  const [franchiseId, setFranchiseId] = useState(selectedFranchiseId);
  const [warehouseIds, setWarehouseIds] = useState(selectedWarehouseIds);
  const [timeRange, setTimeRange] = useState(selectedRequestTimeRange);
  const [statuses, setStatuses] = useState(selectedStatuses);
  const [criterionIds, setCriterionIds] = useState([]);
  const [criterionNames, setCriterionNames] = useState(selectedCriterionNames);
  const ddsObjectionStatusSelectOptions = convertConstantValuesToSelectOptions(ddsObjectionStatuses);

  const handleSelectedFranchise = franchise => {
    setFranchiseId(franchise);
  };

  const handleSelectedWarehouse = warehouse => {
    setWarehouseIds(warehouse);
  };

  const handleSelectedRequestTimeRange = requestedTimeRange => {
    setTimeRange(requestedTimeRange);
  };

  const handleSelectedStatus = status => {
    setStatuses(status);
  };

  const handleSelectedCriterionId = useCallback((criterionId, data) => {
    if (criterionId) {
      setCriterionIds([criterionId]);
      setCriterionNames([data.data.name.en]);
    }
    else {
      setCriterionIds([]);
      setCriterionNames([]);
    }
  }, []);

  const submitButtonClick = () => {
    handleSubmit({
      selectedFranchiseId: franchiseId,
      selectedWarehouseIds: warehouseIds,
      selectedRequestTimeRange: timeRange,
      selectedStatuses: statuses,
      selectedCriterionNames: criterionNames,
    });
  };

  const disabledDateAfterToday = current => {
    return current && current.valueOf() > moment();
  };
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.wrapper}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:DATE')}</Text>
                  <RangePicker
                    className={classes.wrapper}
                    value={timeRange}
                    disabledDate={disabledDateAfterToday}
                    onChange={handleSelectedRequestTimeRange}
                    format={getLocalDateFormat()}
                    allowClear={false}
                    disabled={isPending}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('global:FRANCHISE')}</Text>
                  <SelectFranchise
                    disabled={isPending}
                    value={franchiseId}
                    onChange={handleSelectedFranchise}
                    allowClear
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:WAREHOUSE')}</Text>
                  <SelectWarehouse
                    isMultiple
                    franchiseIds={franchiseId?.length && [franchiseId]}
                    isDisabled={isPending}
                    value={warehouseIds}
                    onChange={handleSelectedWarehouse}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('global:STATUS')}</Text>
                  <Select
                    mode="multiple"
                    disabled={isPending}
                    showArrow
                    allowClear
                    value={statuses}
                    options={ddsObjectionStatusSelectOptions}
                    placeholder={t('global:FILTER')}
                    onChange={handleSelectedStatus}
                    className={classes.wrapper}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:CRITERIA')}</Text>
                  <SelectDdsCriteria
                    allowClear
                    disabled={isPending}
                    value={criterionIds}
                    onChange={handleSelectedCriterionId}
                  />
                </Col>
              </Row>
              <Row>
                <div className={classes.buttonWrapper}>
                  <Button type="primary" onClick={submitButtonClick} disabled={isPending}>
                    {t('global:BRING')}
                  </Button>
                </div>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
