import { Collapse, Typography } from 'antd';

import useStyles from './styles';
import RedirectText from '@shared/components/UI/RedirectText';
import permKey from '@shared/shared/permKey.json';

const { Text } = Typography;
const { Panel } = Collapse;

const ShopperDetails = ({ shopper, t }) => {
  const classes = useStyles();
  return (
    <Collapse defaultActiveKey={4}>
      <Panel header={t('paymentTransactionPage:SHOPPER_DETAILS')} key="4">
        <div className={classes.itemRow}>
          <Text type="secondary"> Id </Text>
          <RedirectText
            text={shopper?._id}
            to={`/client/detail/${shopper?._id}`}
            permKey={permKey.PAGE_CLIENT_DETAIL}
            target="_blank"
            isIconVisible
          />
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('global:NAME')} </Text>
          <Text> {shopper?.name} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('global:EMAIL')} </Text>
          <Text> {shopper?.email} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('global:PHONE_NUMBER')} </Text>
          <Text> {shopper?.phoneNumber} </Text>
        </div>
      </Panel>
    </Collapse>
  );
};

export default ShopperDetails;
