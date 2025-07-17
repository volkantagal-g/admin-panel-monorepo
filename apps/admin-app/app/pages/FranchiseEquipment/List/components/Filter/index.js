import { useState } from 'react';
import { Col, Row, Button, Typography, Collapse, Space } from 'antd';

import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import SelectStatus from '../SelectStatus';
import { t } from '@shared/i18n';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({
  filters,
  handleSubmit,
}) => {
  const { selectedWarehouses, selectedFranchises, isPending } = filters;
  const classes = useStyles();

  const [warehouses, setWarehouses] = useState(selectedWarehouses);
  const [franchises, setFranchises] = useState(selectedFranchises);
  const [status, setStatus] = useState('all');

  const submitButtonClick = () => {
    handleSubmit({ selectedWarehouses: warehouses, selectedFranchises: franchises, status });
  };

  const handleStatusChange = value => {
    if (value === '') {
      setStatus(null);
      return;
    }
    setStatus(value);
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel key="1" header={t('global:FILTER')}>
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:FRANCHISE')}</Text>
                  <SelectFranchise
                    allowClear={false}
                    disabled={isPending}
                    value={franchises}
                    onChange={franchise => setFranchises(franchise)}
                    isMultiple
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('global:WAREHOUSE')}</Text>
                  <SelectWarehouse
                    isMultiple
                    value={warehouses}
                    isDisabled={isPending}
                    onChange={warehouse => setWarehouses(warehouse)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text>{t('global:STATUS')}</Text>
                  <SelectStatus value={status} onChange={handleStatusChange} />
                </Col>
              </Row>
              <Row>
                <div className={classes.buttonWrapper}>
                  <Button
                    type="primary"
                    onClick={submitButtonClick}
                    disabled={isPending}
                  >
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
