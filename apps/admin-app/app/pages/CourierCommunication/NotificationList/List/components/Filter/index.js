import { useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Typography, Button,
  Select,
  DatePicker,
} from 'antd';

import { useTranslation } from 'react-i18next';

import { statusOptions, priorityOptions } from '@app/pages/CourierCommunication/NotificationList/New/constants';

import useStyles from './styles';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

const { Panel } = Collapse;
const { Text } = Typography;
const { RangePicker } = DatePicker;

function Filter({ handleSubmit }) {
  const [notificationID, setNotificationID] = useState('');
  const [notificationName, setNotificationName] = useState('');
  const [priority, setPriority] = useState('');
  const [selectedStatus, setselectedStatus] = useState(null);
  const [creationDateTime, setCreationDateTime] = useState([]);
  const [sendingDateTime, setSendingDateTime] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation(['courierCommunication']);

  const handleNotificationId = event => {
    setNotificationID(event.target.value);
  };

  const handleNotificationName = event => {
    setNotificationName(event.target.value);
  };

  const submitButtonClick = () => {
    handleSubmit({
      notificationID,
      notificationName,
      priority,
      selectedStatus,
      creationDateTime,
      sendingDateTime,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('courierCommunication:COURIER_COMMUNICATION_FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierCommunication:NOTIFICATION_FILTER_ID')}</Text>
                  <Input
                    data-testid="notificationID"
                    value={notificationID}
                    onChange={handleNotificationId}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierCommunication:NOTIFICATION_FILTER_NAME')}</Text>
                  <Input
                    data-testid="notificationName"
                    value={notificationName}
                    onChange={handleNotificationName}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierCommunication:PRIORITY')}</Text>
                  <Select
                    className={classes.filterWrapper}
                    data-testid="priority"
                    showArrow
                    allowClear
                    options={convertConstantValuesToSelectOptions(priorityOptions)}
                    placeholder={t('PRIORITY')}
                    onChange={value => setPriority(value)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierCommunication:STATUS')}</Text>
                  <Select
                    className={classes.filterWrapper}
                    data-testid="priority"
                    showArrow
                    allowClear
                    options={convertConstantValuesToSelectOptions(statusOptions)}
                    placeholder={t('STATUS')}
                    onChange={value => setselectedStatus(value)}
                  />
                </Col>
              </Row>
              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierCommunication:CREATION_DATE')}</Text>
                  <RangePicker
                    className={classes.filterWrapper}
                    onChange={value => setCreationDateTime(value)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Text>{t('courierCommunication:SCHEDULED_DATE')}</Text>
                  <RangePicker
                    className={classes.filterWrapper}
                    onChange={value => setSendingDateTime(value)}
                  />
                </Col>
              </Row>
              <Col>
                <div className={classes.submitButtonContainer}>
                  <Button
                    data-testid="bringVehicle"
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
