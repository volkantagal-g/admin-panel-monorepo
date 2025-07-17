import { Col } from 'antd';
import { useSelector } from 'react-redux';
import get from 'lodash/get';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import useStyles from './styles';
import FraudOrderActions from '../FraudOrderActions';
import AgentActions from '../AgentActions';
import ActionsMenu from '../ActionsMenu';
import { orderDetailSelector } from '../../redux/selectors';
import { INTEGRATION_TYPES, MARKET_ORDER_STATUS } from '@shared/shared/constants';

const OrderActionButtons = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const { Can } = usePermission();
  const classes = useStyles();
  const [integrationType] = get(orderDetail, 'integrations.types', []);
  const integrationTitle = integrationType?.toUpperCase();
  const isN11Order = integrationTitle === INTEGRATION_TYPES.N11;

  const isOrderDeliveredOrCancelled = orderDetail?.status >= MARKET_ORDER_STATUS.DELIVERED;
  return (
    <Col className={classes.actionButtonContainer}>
      {!isN11Order && (
        <>
          <Col className={classes.actionButton}>
            <FraudOrderActions />
          </Col>
          <Col className={classes.actionButton}>
            <AgentActions />
          </Col>
          {!isOrderDeliveredOrCancelled && (
          <Col className={classes.actionButton}>
            <Can permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS}>
              <ActionsMenu />
            </Can>
          </Col>
          )}
        </>
      )}
    </Col>
  );
};

export default OrderActionButtons;
