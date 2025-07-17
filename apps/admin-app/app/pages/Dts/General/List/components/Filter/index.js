import { useState } from 'react';
import { Row, Col, Typography, Collapse, DatePicker, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectWarehouse from '@shared/containers/Select/Warehouse';

import SelectReporters from '../../../components/Reporter';

import { getLocalDateFormat } from '@shared/utils/localization';
import { SelectWrapper } from '@shared/components/UI/Form';
import { DtsDecisionCodes, DtsStatusCodes } from '../../../constant';
import useStyles from './styles';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import SelectRule from '@app/pages/Dts/General/components/SelectRule';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const Filter = ({ filters, handleSubmit, isPending }) => {
  const { t } = useTranslation('dts');

  const classes = useStyles();

  const [dtsDate, setDtsDate] = useState(filters.dtsDate);
  const [warehouseIds, setWarehouseIds] = useState(filters.warehouseIds);
  const [status, setStatus] = useState(filters.statuses);
  const [decision, setDecision] = useState(filters.decision);
  const [reporter, setReporter] = useState(filters.reporter);
  const [ruleIds, setRuleIds] = useState(filters.ruleIds);

  const handleSubmitClick = () => {
    handleSubmit({
      dtsDate,
      warehouseIds,
      status,
      decision,
      reporter,
      ruleIds,
    });
  };

  const handleSelectWarehouse = value => {
    if (value !== undefined && value.length) {
      setWarehouseIds([value]);
    }
    else {
      setWarehouseIds([]);
    }
  };

  const handleSelectRuleNumber = value => {
    if (value !== undefined) {
      setRuleIds([value]);
    }
    else {
      setRuleIds([]);
    }
  };

  const handleSelectStatus = value => {
    if (value !== undefined) {
      setStatus([value]);
    }
    else {
      setStatus([]);
    }
  };

  const handleSelectDecision = value => {
    if (value !== undefined) {
      setDecision([value]);
    }
    else {
      setDecision([]);
    }
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Row gutter={[8, 8]}>
              <Col xs={12} sm={24} md={12}>
                <Text>{t('global:DATE')}</Text>
                <RangePicker
                  value={dtsDate}
                  className={classes.rangePicker}
                  onChange={value => setDtsDate(value)}
                  format={getLocalDateFormat()}
                  allowClear
                  disabled={isPending}
                />
              </Col>
              <Col xs={12} sm={24} md={12}>
                <Text>{t('REPORTER')}</Text>
                <SelectReporters
                  disabled={isPending}
                  onChange={value => setReporter(value)}
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col xs={12} sm={24} md={12}>
                <Text>{t('WAREHOUSE')}</Text>
                <SelectWarehouse
                  isDisabled={isPending}
                  onChange={handleSelectWarehouse}
                />
              </Col>
              <Col xs={12} sm={24} md={12}>
                <Text>{t('RULE_NUMBER')}</Text>
                <SelectRule
                  isDisabled={isPending}
                  onChangeCallback={handleSelectRuleNumber}
                  allowClear
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col xs={12} sm={24} md={12}>
                <Text>{t('global:STATUS')}</Text>
                <SelectWrapper
                  placeholder={t('FILTER')}
                  selectKey="status"
                  allowClear
                  optionsData={convertConstantValuesToSelectOptions(DtsStatusCodes)}
                  shouldMapOptionsData
                  onChangeCallback={handleSelectStatus}
                  disabled={isPending}
                />
              </Col>
              <Col xs={12} sm={24} md={12}>
                <Text>{t('DECISION')}</Text>
                <SelectWrapper
                  placeholder={t('FILTER')}
                  selectKey="decision"
                  allowClear
                  optionsData={convertConstantValuesToSelectOptions(DtsDecisionCodes)}
                  shouldMapOptionsData
                  onChangeCallback={handleSelectDecision}
                  disabled={isPending}
                />
              </Col>
            </Row>
            <Row>
              <Button
                type="primary"
                onClick={handleSubmitClick}
                disabled={isPending}
              >
                {t('BRING')}
              </Button>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
