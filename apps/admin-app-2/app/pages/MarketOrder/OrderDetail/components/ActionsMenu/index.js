import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import permKey from '@shared/shared/permKey.json';

import { CancelMarketOrderButton, ChangeDeliverySlotButton } from './modals';

import useStyles from './styles';

const ActionsMenu = () => {
  const classes = useStyles();
  const { t } = useTranslation('marketOrderPage');
  const { Item } = Menu;

  const actionMenus = [
    {
      permissionKey: `${permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS}_cancel`,
      className: classes.menuItem,
      testId: 'action-menu-list-item-cancel',
      component: <CancelMarketOrderButton />,
    },
    {
      permissionKey: `${permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS}_change_slot`,
      className: classes.menuItem,
      testId: 'action-menu-list-item-slot-order',
      component: <ChangeDeliverySlotButton />,
    },
  ];

  const actionMenuItems = (
    <Menu data-testid="action-menu-list">
      {actionMenus.map(menu => (
        <Item
          key={menu.permissionKey}
          data-testid={menu.testId}
          className={menu.className}
        >
          {menu.component}
        </Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      key="item-dropdown"
      overlay={actionMenuItems}
      trigger={['click']}
    >
      <Button data-testid="action-menu-dropdown-button">
        {t('ACTION.TITLE')}{' '}
        <DownOutlined data-testid="action-menu-dropdown-svg" />
      </Button>
    </Dropdown>
  );
};

export default ActionsMenu;
