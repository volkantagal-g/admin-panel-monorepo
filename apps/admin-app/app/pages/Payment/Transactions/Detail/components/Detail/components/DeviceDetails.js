import { Collapse, Typography } from 'antd';

import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;

const DeviceDetails = ({ device, t }) => {
  const classes = useStyles();
  return (
    <Collapse defaultActiveKey={5}>
      <Panel header={t('paymentTransactionPage:DEVICE_DETAILS')} key="5">
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('paymentTransactionPage:BUILD_NUMBER')} </Text>
          <Text> {device?.buildNumber} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('paymentTransactionPage:DEVICE_ID')} </Text>
          <Text> {device?.deviceId} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('paymentTransactionPage:DEVICE_TYPE')} </Text>
          <Text> {device?.deviceType} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> SDK </Text>
          <Text> {device?.sdk} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('paymentTransactionPage:VERSION')} </Text>
          <Text> {device?.version} </Text>
        </div>
      </Panel>
    </Collapse>
  );
};

export default DeviceDetails;
