import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Input,
  Row,
  Space,
  Typography,
} from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat } from '@shared/utils/localization';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export default function Filter({ filters, handleSubmit, isPending }) {
  const [planDate, setPlanDate] = useState(filters.planDate);
  const [name, setName] = useState(filters.name);

  const { t } = useTranslation('courierPlanPage');

  const classes = useStyles();

  const handlePlanDateChange = date => {
    setPlanDate(date);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const submitButtonClick = () => {
    handleSubmit({
      planDate,
      name,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.fullWidth}>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={12}>
                  <Text>{t('PLAN_DATE')}</Text>
                  <RangePicker
                    className={classes.fullWidth}
                    value={planDate}
                    onChange={handlePlanDateChange}
                    format={getLocalDateFormat()}
                    allowClear
                    disabled={isPending}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <Text>{t('PLAN_NAME')}</Text>
                  <Input
                    value={name}
                    onChange={handleNameChange}
                    disabled={isPending}
                    placeholder={t('PLAN_NAME')}
                  />
                </Col>
              </Row>

              <Col>
                <div className={classes.submitButtonContainer}>
                  <Button
                    size="medium"
                    variant="contained"
                    type="primary"
                    disabled={isPending}
                    onClick={submitButtonClick}
                  >
                    {t('global:BRING')}
                  </Button>
                </div>
              </Col>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}
