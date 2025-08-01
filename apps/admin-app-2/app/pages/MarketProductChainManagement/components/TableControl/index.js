import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import cog6Tooth from '@app/pages/MarketProductChainManagement/assets/Icons/cog-6-tooth.svg';
import lockClosed from '@app/pages/MarketProductChainManagement/assets/Icons/lock-closed.svg';
import rectangleGroup from '@app/pages/MarketProductChainManagement/assets/Icons/rectangle-group.svg';

import useStyles from '@app/pages/MarketProductChainManagement/components/TableControl/styles';

const TableControl = React.memo(({ setOpenFreezeColumnsModal, setOpenManageColumnsModal }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketProductChainManagement');

  const menuItems = [
    {
      key: '0',
      label: t('FREEZE_COLUMNS'),
      icon: lockClosed,
      onClick: () => setOpenFreezeColumnsModal(true),
    },
    {
      key: '1',
      label: t('MANAGE_COLUMNS'),
      icon: rectangleGroup,
      onClick: () => setOpenManageColumnsModal(true),
      href: '',
    },
  ];

  const otherMenu = (
    <Menu className={classes.menu}>
      {menuItems.map(({ key, label, icon, href, onClick }) => (
        <Menu.Item key={key}>
          <Button
            type="link"
            className={classes.linkButton}
            icon={<img alt={label} src={icon} className={classes.image} />}
            href={href || null}
            onClick={onClick}
          >
            {label}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={otherMenu} trigger={['click']}>
      <Button
        type="text"
        className={classes.button}
        icon={<img src={cog6Tooth} alt="cog-6-tooth" />}
        onClick={event => event.preventDefault()}
      />
    </Dropdown>
  );
});

export default TableControl;
