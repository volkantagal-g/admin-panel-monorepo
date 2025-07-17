import { Collapse, Typography } from 'antd';
import PropTypes from 'prop-types';

import useStyles from './styles';
import RedirectText from '@shared/components/UI/RedirectText';
import permKey from '@shared/shared/permKey.json';

const { Panel } = Collapse;
const { Text } = Typography;
const Merchant = ({ merchant }) => {
  const classes = useStyles();
  return (
    <Collapse defaultActiveKey={2}>
      <Panel header="Merchant" key="2">
        <div className={classes.itemRow}>
          <Text type="secondary"> Key </Text>
          <Text> {merchant?.key} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> Id </Text>
          <RedirectText
            text={merchant?._id}
            to={`/payment/merchants/detail/${merchant?._id}`}
            permKey={permKey.PAGE_PAYMENT_MERCHANT_DETAIL}
            target="_blank"
            isIconVisible
          />
        </div>
      </Panel>
    </Collapse>
  );
};

Merchant.prototype = {
  merchant: PropTypes.shape({
    key: PropTypes.string,
    _id: PropTypes.string,
  }),
};
PropTypes.defaultProps = { merchant: {} };
export default Merchant;
