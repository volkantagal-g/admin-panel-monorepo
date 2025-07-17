import { useState } from 'react';
import { Row, Col, Collapse, Space, Typography, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import useStyles from './styles';
import WarehousesSelect from '../../../components/WarehousesSelect';

const { Text } = Typography;
const { Panel } = Collapse;

function Filter({ filters, handleSubmit }) {
  const [warehouses, setWarehouses] = useState(filters.warehouses);
  const { _id: selectedCountryId } = getSelectedCountry();

  const { t } = useTranslation();
  const classes = useStyles();

  const submitButtonClick = () => {
    handleSubmit({ warehouses });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Text>{t('WAREHOUSE')}</Text>
              <WarehousesSelect value={warehouses} onChange={setWarehouses} country={selectedCountryId} disabled={!selectedCountryId} />

              <div className={classes.buttonContainer}>
                <Button type="primary" onClick={submitButtonClick}>
                  {t('BRING')}
                </Button>
              </div>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

export default Filter;
