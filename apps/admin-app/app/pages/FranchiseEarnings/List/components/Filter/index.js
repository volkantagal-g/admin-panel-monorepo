import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row, DatePicker, Button, Typography, Collapse, Space, Radio } from 'antd';
import { get, isEmpty } from 'lodash';

import { earningsSelector, voyagerEarningsSelector } from '@app/pages/FranchiseEarnings/List/redux/selectors';
import { getLocalDateFormat } from '@shared/utils/localization';
import { TAX_TYPE } from '@shared/shared/constants';
import { taxType } from '@shared/shared/constantValues';
import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { getSelectedMonthKeys } from '../../utils';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Filter = ({
  filters,
  handleSelectedFranchise,
  handleSelectedWarehouse,
  handleSelectedTaxType,
  handleSelectedRequestTimeRange,
}) => {
  const { t } = useTranslation('franchiseEarningsPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const earningsIsPending = useSelector(earningsSelector.getIsPending);
  const voyagerIsPending = useSelector(voyagerEarningsSelector.getIsPending);
  const { selectedFranchises, selectedWarehouses, selectedTaxType, selectedRequestTimeRange } = filters;

  const handleSubmit = () => {
    const monthKeys = getSelectedMonthKeys(selectedRequestTimeRange);
    if (isEmpty(selectedWarehouses)) {
      return;
    }
    dispatch(Creators.getEarningsRequest({
      financialMonths: monthKeys,
      franchises: selectedFranchises,
      warehouses: selectedWarehouses,
    }));
    dispatch(Creators.getVoyagerEarningsRequest({
      financialMonths: monthKeys,
      franchises: selectedFranchises,
      warehouses: selectedWarehouses,
    }));
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:DATE')}</Text>
                  <RangePicker
                    picker="month"
                    className={classes.rangePicker}
                    value={selectedRequestTimeRange}
                    onChange={handleSelectedRequestTimeRange}
                    format={getLocalDateFormat()}
                    allowClear={false}
                    disabled={earningsIsPending || voyagerIsPending}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('franchiseEarningsPage:LIST.FRANCHISE')}</Text>
                  <SelectFranchise
                    isFirstOptionSelected
                    allowClear={false}
                    disabled={earningsIsPending || voyagerIsPending}
                    value={selectedFranchises}
                    onChange={handleSelectedFranchise}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('franchiseEarningsPage:LIST.WAREHOUSE')}</Text>
                  <SelectWarehouse
                    isMultiple
                    franchiseIds={selectedFranchises}
                    isDisabled={earningsIsPending || voyagerIsPending}
                    value={selectedWarehouses}
                    onChange={handleSelectedWarehouse}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('franchiseEarningsPage:LIST.TAX')}</Text>
                  <div>
                    <Radio.Group
                      disabled={earningsIsPending || voyagerIsPending}
                      onChange={handleSelectedTaxType}
                      value={selectedTaxType}
                    >
                      <Radio.Button value={TAX_TYPE.INCLUDED}> {get(taxType, [TAX_TYPE.INCLUDED, getLangKey()], '-')}</Radio.Button>
                      <Radio.Button value={TAX_TYPE.EXCLUDED}>{get(taxType, [TAX_TYPE.EXCLUDED, getLangKey()], '-')}</Radio.Button>
                    </Radio.Group>
                  </div>
                </Col>
              </Row>
              <Row>
                <Button type="primary" onClick={handleSubmit}>
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
