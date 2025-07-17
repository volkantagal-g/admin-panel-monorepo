import { useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Typography, Button,
  DatePicker,
} from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const { Panel } = Collapse;
const { Text } = Typography;
const { RangePicker } = DatePicker;

function Filter({ handleSubmit }) {
  const [segmentName, setSegmentName] = useState('');
  const [creationDateTime, setCreationDateTime] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation(['courierSegment']);

  const handleSegmentName = event => {
    setSegmentName(event.target.value);
  };

  const submitButtonClick = () => {
    handleSubmit({
      segmentName,
      creationDateTime,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('courierSegment:SEGMENT_LIST_FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierSegment:SEGMENT_NAME')}</Text>
                  <Input
                    value={segmentName}
                    onChange={handleSegmentName}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierSegment:CREATION_DATE')}</Text>
                  <RangePicker
                    className={classes.filterWrapper}
                    onChange={value => setCreationDateTime(value)}
                  />
                </Col>
              </Row>
              <Col>
                <div className={classes.submitButtonContainer}>
                  <Button
                    size="medium"
                    variant="contained"
                    type="primary"
                    onClick={submitButtonClick}
                  > {t('global:BRING')}
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

export default Filter;
