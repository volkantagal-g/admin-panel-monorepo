import { Button, Dropdown, Menu } from 'antd';
import { get } from 'lodash';
import { useState } from 'react';

import buildingOffice from '@app/pages/MarketProductChainManagement/assets/Icons/building-office.svg';
import ellipsisHorizontal from '@app/pages/MarketProductChainManagement/assets/Icons/ellipsis-horizontal.svg';
import grayEye from '@app/pages/MarketProductChainManagement/assets/Icons/gray-eye.svg';
import grayPencil from '@app/pages/MarketProductChainManagement/assets/Icons/gray-pencil.svg';
import trash from '@app/pages/MarketProductChainManagement/assets/Icons/trash.svg';

import { ROUTE } from '@app/routes';

const BUTTON_TYPES = {
  TEXT: 'text',
  LINK: 'link',
};

const getDetailLink = (record, key = 'id') => {
  const id = get(record, key, '');
  const warehouseDetailPath = ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_DETAIL.path.replace(':id', id);
  return warehouseDetailPath;
};

const getProductDetailLink = record => {
  const id = get(record, 'productId') || get(record, 'productVertexId') || get(record, 'id', '');
  const productDetailPath = ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_DETAIL.path.replace(':id', id);
  return productDetailPath;
};

const getProductConfigurationLink = record => {
  const id = get(record, 'productId') || get(record, 'productVertexId') || get(record, 'id', '');
  const productConfigurationPath = ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_CONFIGURATION.path.replace(':id', id);
  return productConfigurationPath;
};

const getDarkStoreDetailLink = (record, key = 'id') => {
  const id = get(record, key, '');
  const darkStoreDetailPath = ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_DARK_STORE_DETAIL.path.replace(':id', id);
  return darkStoreDetailPath;
};

const getMatchCWandDSLink = (record, key = 'id') => {
  const id = get(record, key, '');
  const matchCWandDSDetailPath = ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_CW_DS.path.replace(':id', id);
  return matchCWandDSDetailPath;
};

const createActionButton = ({
  type = BUTTON_TYPES.TEXT,
  className,
  icon,
  onClick = null,
  children = null,
}) => (
  <Button
    type={type}
    className={className}
    icon={icon && <img src={icon} alt={children || 'icon'} className="image" />}
    onClick={onClick}
  >
    {children}
  </Button>
);

const createMenuItem = ({
  key,
  label,
  icon,
  href = '',
  onClick = null,
  className = '',
}) => ({
  key,
  label,
  icon,
  href,
  onClick,
  className,
});

const createBaseMenuItems = (t, record) => [
  createMenuItem({
    key: '0',
    label: t('DETAILS'),
    icon: grayEye,
    href: getDetailLink(record),
  }),
];

const createDarkStoreMenuItems = (t, record) => [
  createMenuItem({
    key: '0',
    label: t('DETAILS'),
    icon: grayEye,
    href: getDarkStoreDetailLink(record),
  }),
  createMenuItem({
    key: '1',
    label: t('MATCH_WITH_CW'),
    icon: buildingOffice,
    href: getMatchCWandDSLink(record),
  }),
];

const createProductMenuItems = (t, record) => [
  createMenuItem({
    key: '0',
    label: t('DETAILS'),
    icon: grayEye,
    href: getProductDetailLink(record),
  }),
  createMenuItem({
    key: '1',
    label: t('BUTTONS.CONFIGURATION'),
    icon: grayPencil,
    href: getProductConfigurationLink(record),
  }),
];

const createPlatformMenuItems = (t, record, onDeletePlatform) => [
  ...createBaseMenuItems(t, record),
  createMenuItem({
    key: '1',
    label: t('DELETE'),
    icon: trash,
    className: 'redActionLine',
    onClick: () => onDeletePlatform(record),
  }),
];

const renderMenu = (items, classes, renderButton, onLinkClick) => {
  const view = (
    <Menu className={classes.menu}>
      {items.map(({ key, label, icon, href, onClick, className }) => (
        <Menu.Item key={key}>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onLinkClick?.()}
            >
              <Button
                type="text"
                size="small"
                className={`${classes.linkButton} ${classes[className] || ''}`}
              >
                <span className="image-wrapper">
                  <img src={icon} alt={label} className="image" />
                </span>
                {label}
              </Button>
            </a>
          ) : (
            renderButton({
              type: BUTTON_TYPES.LINK,
              className: `${classes.linkButton} ${classes[className] || ''}`,
              icon,
              onClick,
              children: label,
            })
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  return view;
};

export const DarkStoreActions = ({ t, record, classes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVisibleChange = visible => {
    setIsOpen(visible);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const view = renderMenu(createDarkStoreMenuItems(t, record), classes, createActionButton, handleLinkClick);

  return (
    <Dropdown
      overlay={view}
      trigger={['click']}
      onVisibleChange={handleVisibleChange}
      open={isOpen}
    >
      {createActionButton({
        type: BUTTON_TYPES.TEXT,
        className: `${classes.button} ${isOpen ? classes.rotateIcon : ''}`,
        icon: ellipsisHorizontal,
      })}
    </Dropdown>
  );
};

export const PlatformActions = ({ t, record, classes, onDeletePlatform }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVisibleChange = visible => {
    setIsOpen(visible);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const view = renderMenu(createPlatformMenuItems(t, record, onDeletePlatform), classes, createActionButton, handleLinkClick);

  return (
    <Dropdown
      overlay={view}
      trigger={['click']}
      onVisibleChange={handleVisibleChange}
      open={isOpen}
    >
      {createActionButton({
        type: BUTTON_TYPES.TEXT,
        className: `${classes.button} ${isOpen ? classes.rotateIcon : ''}`,
        icon: ellipsisHorizontal,
      })}
    </Dropdown>
  );
};

export const ProductActions = ({ t, record, classes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVisibleChange = visible => {
    setIsOpen(visible);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const view = renderMenu(createProductMenuItems(t, record), classes, createActionButton, handleLinkClick);

  return (
    <Dropdown
      overlay={view}
      trigger={['click']}
      onVisibleChange={handleVisibleChange}
      open={isOpen}
    >
      {createActionButton({
        type: BUTTON_TYPES.TEXT,
        className: `${classes.button} ${isOpen ? classes.rotateIcon : ''}`,
        icon: ellipsisHorizontal,
      })}
    </Dropdown>
  );
};
