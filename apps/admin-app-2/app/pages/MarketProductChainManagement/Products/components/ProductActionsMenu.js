import { Button, Dropdown, Menu, Space } from 'antd';
import { useState } from 'react';
import { get } from 'lodash';

// İkon importları
import ellipsisHorizontal from '@app/pages/MarketProductChainManagement/assets/Icons/ellipsis-horizontal.svg';
import grayEye from '@app/pages/MarketProductChainManagement/assets/Icons/gray-eye.svg';
import grayPencil from '@app/pages/MarketProductChainManagement/assets/Icons/gray-pencil.svg';

import { ROUTE } from '@app/routes';

// Detay sayfası için link oluşturma fonksiyonu
const getProductDetailLink = record => {
  const id = get(record, 'productId') || get(record, 'productVertexId') || get(record, 'id', '');
  return ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_DETAIL.path.replace(':id', id);
};

// Konfigürasyon sayfası için link oluşturma fonksiyonu
const getProductConfigurationLink = record => {
  const id = get(record, 'productId') || get(record, 'productVertexId') || get(record, 'id', '');
  return ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_CONFIGURATION.path.replace(':id', id);
};

// Aksiyon butonları bileşeni
const ProductActionsMenu = ({ record, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVisibleChange = visible => {
    setIsOpen(visible);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Menü elemanları
  const menuItems = [
    {
      key: 'details',
      label: t('DETAILS'),
      icon: grayEye,
      href: getProductDetailLink(record),
    },
    {
      key: 'configuration',
      label: t('BUTTONS.CONFIGURATION'),
      icon: grayPencil,
      href: getProductConfigurationLink(record),
    },
  ];

  // Menü render
  const menu = (
    <Menu>
      {menuItems.map(({ key, label, icon, href }) => (
        <Menu.Item key={key}>
          <a href={href} onClick={handleLinkClick}>
            <Space>
              <img src={icon} alt={label} style={{ width: 16, height: 16 }} />
              {label}
            </Space>
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      onVisibleChange={handleVisibleChange}
      open={isOpen}
    >
      <Button
        type="text"
        icon={<img src={ellipsisHorizontal} alt="actions" style={{ width: 16, height: 16 }} />}
      />
    </Dropdown>
  );
};

export default ProductActionsMenu;
