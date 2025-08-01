import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Space, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { useEffect, useState } from 'react';

import { orderDetailSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import {
  CALLER_TYPES,
  FRAUD_ORDER_STATUS,
  MARKET_ORDER_STATUS,
} from '@shared/shared/constants';
import useQuery from '@shared/shared/hooks/useQuery';
import { getCancelFraudOrderReasonId } from '../utils';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ORDER_CANCEL_SOURCES } from '../CancelMarketOrderModal/constants';

const { Item } = Menu;

const FraudOrderActions = () => {
  const { Can } = usePermission();
  const [selectedFraudStatus, setSelectedFraudStatus] = useState({});
  const query = useQuery();
  const domainType = query.get('domainType');
  const dispatch = useDispatch();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const { t } = useTranslation('marketOrderPage');
  const classes = useStyles();

  const isFraudSuspicionOrder = get(
    orderDetail,
    'fraudSuspicionRecord.isFraudSuspicion',
    false,
  );
  const status = get(orderDetail, 'status', '');
  const isOrderDelivered = status >= MARKET_ORDER_STATUS.DELIVERED;

  const onSelectFraudStatus = event => {
    const { _id: id } = orderDetail;
    const { key } = event || {};
    const fraudStatus = Number(key);
    setSelectedFraudStatus(fraudStatus);
    if (fraudStatus === FRAUD_ORDER_STATUS.FRAUD_ORDER) {
      dispatch(
        Creators.cancelOrderRequest({
          domainType,
          id,
          status: fraudStatus,
          callerType: CALLER_TYPES.ADMIN,
          reasonId: getCancelFraudOrderReasonId(),
          note: 'Fraud order has been cancelled',
          source: ORDER_CANCEL_SOURCES.CUSTOMER,
        }),
      );
    }
    else {
      dispatch(
        Creators.updateFraudOrderRequest({
          domainType,
          id,
          status: fraudStatus,
        }),
      );
    }
  };

  useEffect(() => {
    setSelectedFraudStatus(orderDetail?.fraudSuspicionRecord?.status);
  }, [orderDetail?.fraudSuspicionRecord?.status]);

  const menu = (
    <Menu onClick={onSelectFraudStatus}>
      <Item
        className={
          selectedFraudStatus === FRAUD_ORDER_STATUS.LEGITIMATE_ORDER
            ? classes.activeStatus
            : ''
        }
        key={FRAUD_ORDER_STATUS.LEGITIMATE_ORDER}
      >
        {t('FRAUD_ORDER_STATUS.LEGITIMATE_ORDER')}
      </Item>
      <Item
        className={
          selectedFraudStatus === FRAUD_ORDER_STATUS.FRAUD_ORDER
            ? classes.activeStatus
            : ''
        }
        key={FRAUD_ORDER_STATUS.FRAUD_ORDER}
      >
        {t('FRAUD_ORDER_STATUS.FRAUD_ORDER')}
      </Item>
      <Item
        className={
          selectedFraudStatus === FRAUD_ORDER_STATUS.UNDETERMINED
            ? classes.activeStatus
            : ''
        }
        key={FRAUD_ORDER_STATUS.UNDETERMINED}
      >
        {t('FRAUD_ORDER_STATUS.UNDETERMINED')}
      </Item>
      <Item
        className={
          selectedFraudStatus === FRAUD_ORDER_STATUS.UNDER_REVIEW
            ? classes.activeStatus
            : ''
        }
        key={FRAUD_ORDER_STATUS.UNDER_REVIEW}
      >
        {t('FRAUD_ORDER_STATUS.UNDER_REVIEW')}
      </Item>
    </Menu>
  );

  return (
    <Can permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_FRAUD_ACTIONS}>
      <div className={classes.button}>
        {isFraudSuspicionOrder && !isOrderDelivered ? (
          <Dropdown overlay={menu} trigger="click">
            <Button>
              <Space>
                {t('FRAUD_ORDER_STATUS.TITLE')}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        ) : null}
      </div>
    </Can>
  );
};

export default FraudOrderActions;
