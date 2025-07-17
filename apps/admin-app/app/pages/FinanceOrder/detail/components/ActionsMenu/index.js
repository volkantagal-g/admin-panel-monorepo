import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import _ from 'lodash';

import { financeOrderDetailSelector } from '../../redux/selectors';
import { getIsOrderActive } from '../../util';
import { CancelOrderModal } from './modals';
import useStyles from './styles';

const ActionsMenu = () => {
  const classes = useStyles();
  const { t } = useTranslation('financeOrderDetailPage');
  const [cancelOrderModalVisible, setCancelOrderModalVisible] = useState(false);
  const orderDetail = useSelector(financeOrderDetailSelector.getData);

  const orderStatus = _.get(orderDetail, 'status');
  const isOrderActive = getIsOrderActive(orderStatus);

  const menu = (
    <Menu>
      <Menu.Item
        key="CANCEL_LOCALS_ORDER"
        onClick={() => setCancelOrderModalVisible(true)}
        disabled={!isOrderActive}
        className={classes.menuItem}
      >
        {t('ACTION.CANCEL_LOCALS_ORDER')}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          {t('ACTION.TITLE')} <DownOutlined />
        </Button>
      </Dropdown>
      <CancelOrderModal visible={cancelOrderModalVisible} onClose={() => setCancelOrderModalVisible(false)} />
    </>
  );
};

export { ActionsMenu };
