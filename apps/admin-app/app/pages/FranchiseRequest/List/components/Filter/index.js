import { useState } from 'react';
import { Col, Row, DatePicker, Button, Typography, Collapse, Space } from 'antd';
import moment from 'moment';

import { getLocalDateFormat } from '@shared/utils/localization';
import { t } from '@shared/i18n';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Filter = ({ filters, isPending, handleSubmit }) => {
  const classes = useStyles();

  const { selectedRequestTimeRange } = filters;

  const [timeRange, setTimeRange] = useState(selectedRequestTimeRange);

  const handleSelectedRequestTimeRange = timeRange => {
    setTimeRange(timeRange);
  };

  const submitButtonClick = () => {
    handleSubmit({ selectedRequestTimeRange: timeRange });
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
              </Row>
              <Row>
                <div className={classes.buttonWrapper}>
                  <Button type="primary" onClick={submitButtonClick}>
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
