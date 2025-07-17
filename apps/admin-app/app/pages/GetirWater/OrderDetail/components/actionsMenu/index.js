import { useState } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import {
  CancelShopOrderModal,
  PartialRefundModal,
  ShopRefundModal,
} from './modals';
import useStyles from './styles';

const ActionsMenu = () => {
  const classes = useStyles();
  const { t } = useTranslation('waterOrderDetailModal');
  const { Item } = Menu;
  const [isActionMenuVisible, setIsActionMenuVisible] = useState(false);

  const { Can } = usePermission();

  const actionMenuItem = (
    <Menu>
      <Item className={classes.menuItem}>
        <Can permKey={permKey.PAGE_WATER_ORDER_DETAIL_CANCEL_SHOP_ORDER_MODAL}>
          <CancelShopOrderModal />
        </Can>
      </Item>
      <Item className={classes.menuItem}>
        <Can
          permKey={
            permKey.PAGE_WATER_ORDER_DETAIL_PARTIAL_REFUND_SHOP_ORDER_MODAL
          }
        >
          <PartialRefundModal />
        </Can>
      </Item>
      <Item className={classes.menuItem}>
        <Can permKey={permKey.PAGE_WATER_ORDER_DETAIL_REFUND_SHOP_ORDER_MODAL}>
          <ShopRefundModal />
        </Can>
      </Item>
    </Menu>
  );

  const onClick = event => {
    setIsActionMenuVisible(event);
  };

  return (
    <div className={classes.menuWrapper}>
      <Dropdown
        key="item-dropdown"
        overlay={actionMenuItem}
        trigger={['click']}
        onVisibleChange={onClick}
        visible={isActionMenuVisible}
        forceRender
      >
        <Button>
          {t('ACTION.TITLE')} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ActionsMenu;
