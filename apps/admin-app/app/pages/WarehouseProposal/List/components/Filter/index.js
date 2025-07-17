import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, DatePicker, Button, Typography, Collapse, Space, Checkbox, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat } from '@shared/utils/localization';
import MinMaxInput from '@shared/components/UI/MinMaxInput';
import { Creators } from '../../redux/actions';
import { warehouseProposalsSelector, filtersSelector, warehouseProposalsReportSelector } from '../../redux/selectors';
import useStyles from './styles';
import SelectStatus from './selectStatus';
import SelectCity from './selectCity';
import SelectDistrict from './selectDistrict';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Filter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('warehouseProposalPage');
  const warehouseProposalsIsPending = useSelector(warehouseProposalsSelector.getIsPending);
  const warehouseProposalsReportIsPending = useSelector(warehouseProposalsReportSelector.getIsPending);
  const filters = useSelector(filtersSelector.getFilters);

  const handleFilterChange = useCallback((key, value) => {
    dispatch(Creators.setFilters({ filters: { [key]: value ?? undefined } }));
  }, [dispatch]);

  const handleSelectDateRange = ([startDate, endDate]) => {
    handleFilterChange('startDate', startDate);
    handleFilterChange('endDate', endDate);
  };

  const handleMinMaxTotalNetSizeChange = ({ minValue, maxValue }) => {
    handleFilterChange('minNetTotalSize', minValue);
    handleFilterChange('maxNetTotalSize', maxValue);
  };

  const handleSubmit = useCallback(() => {
    handleFilterChange('currentPage', 1);
    dispatch(Creators.getWarehouseProposalsRequest({}));
  }, [dispatch, handleFilterChange]);

  useEffect(() => {
    dispatch(Creators.getCitiesRequest());
  }, [dispatch]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey="1">
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('warehouseProposalPage:PROPOSAL_DATE')}</Text>
                  <RangePicker
                    className={classes.rangePicker}
                    value={[filters.startDate, filters.endDate]}
                    onChange={handleSelectDateRange}
                    format={getLocalDateFormat()}
                    allowClear={false}
                    disabled={warehouseProposalsIsPending || warehouseProposalsReportIsPending}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('global:STATUS')}</Text>
                  <SelectStatus
                    className={classes.filterWrapper}
                    value={filters.status}
                    onChange={value => handleFilterChange('status', value)}
                    isDisabled={warehouseProposalsIsPending || warehouseProposalsReportIsPending}
                    allowClear
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:CITY')}</Text>
                  <SelectCity
                    className={classes.filterWrapper}
                    value={filters.city}
                    onChange={value => handleFilterChange('city', value)}
                    isDisabled={warehouseProposalsIsPending || warehouseProposalsReportIsPending}
                    allowClear
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('global:DISTRICT')}</Text>
                  <SelectDistrict
                    className={classes.filterWrapper}
                    value={filters.district}
                    city={filters.city}
                    onChange={value => handleFilterChange('district', value)}
                    isDisabled={warehouseProposalsIsPending || warehouseProposalsReportIsPending}
                    allowClear
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('warehouseProposalPage:TOTAL_NET_SQUARE_METER')}</Text>
                  <MinMaxInput
                    onChange={handleMinMaxTotalNetSizeChange}
                    isDisabled={warehouseProposalsIsPending || warehouseProposalsReportIsPending}
                  />
                </Col>
                <Col span={12}>
                  <Checkbox
                    disabled={warehouseProposalsIsPending || warehouseProposalsReportIsPending}
                    checked={filters?.isCreatedByAdmin}
                    onChange={val => {
                      handleFilterChange('isCreatedByAdmin', val.target.checked);
                    }}
                  >
                    <Text>{t('warehouseProposalPage:IS_CREATED_BY_ADMIN')}</Text>

                  </Checkbox>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Text>{t('warehouseProposalPage:PROPOSAL_NAME')}</Text>
                  <Input
                    placeholder={t('warehouseProposalPage:ENTER_PROPOSAL_NAME')}
                    value={filters.proposalName}
                    onChange={e => handleFilterChange('proposalName', e.target.value)}
                    disabled={warehouseProposalsIsPending || warehouseProposalsReportIsPending}
                    allowClear
                  />
                </Col>
              </Row>
              <Row>
                <Button type="primary" className={classes.submitButton} onClick={handleSubmit}>
                  {t('global:BRING')}
                </Button>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
