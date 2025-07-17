import { useState } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { CancelShopOrderModal, ShopPaybackModal, ShopPaymentModal } from './modals';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { orderDetailSelector, returnsAvailabilitySelector } from '@app/pages/ArtisanOrder/Detail/redux/selectors';
import { Creators } from '@app/pages/ArtisanOrder/Detail/redux/actions';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/actionsMenu/styles';
import RefundModal from './modals/RefundModal';

const ActionsMenu = ({ visibleChange, isActionMenuVisible }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('artisanOrderPage');
  const [isPartialRefundModalOpen, setIsPartialRefundModalOpen] = useState(false);
  const [isFullRefundModalOpen, setIsFullRefundModalOpen] = useState(false);
  const orderDetail = useSelector(orderDetailSelector.getData);
  const returnsAvailability = useSelector(returnsAvailabilitySelector.getData);
  const isAvailableForReturn = returnsAvailability?.availability;
  const { Item } = Menu;

  const handleExportFinancialInfo = () => {
    if (!orderDetail || !orderDetail.financial) return;
    const fields = Object.keys(orderDetail.financial).map(key => {
      return { key, title: key, default: '' };
    });
    const content = [orderDetail.financial];
    const financialInfo = { fields, content };
    dispatch(Creators.exportFinancialInfoRequest({ financialInfo }));
  };

  const { Can } = usePermission();

  const actionMenuItem = (
    <Menu>
      <Item key={permKey.PAGE_ARTISAN_ORDER_DETAIL_CANCEL_SHOP_ORDER_MODAL} className={classes.menuItem}>
        <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_CANCEL_SHOP_ORDER_MODAL}>
          <CancelShopOrderModal />
        </Can>
      </Item>

      <Item className={classes.menuItem}>
        <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_REFUND_SHOP_ORDER_MODAL}>
          <RefundModal
            title={t('REFUND_MODAL.FULL_RETURN')}
            isOpen={isFullRefundModalOpen}
            type="full_refund"
            onClose={() => setIsFullRefundModalOpen(false)}
          />
          <Button className={classes.dangerButton} onClick={() => setIsFullRefundModalOpen(true)} disabled={!isAvailableForReturn}>
            {t('ACTION.REFUND_FOOD_ORDER')}
          </Button>
        </Can>
      </Item>

      <Item className={classes.menuItem}>
        <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_PARTIAL_REFUND_SHOP_ORDER_MODAL}>
          <RefundModal
            title={t('REFUND_MODAL.PARTIAL_RETURN')}
            isOpen={isPartialRefundModalOpen}
            type="partial_refund"
            onClose={() => setIsPartialRefundModalOpen(false)}
          />
          <Button className={classes.dangerButton} onClick={() => setIsPartialRefundModalOpen(true)} disabled={!isAvailableForReturn}>
            {t('ACTION.PARTIAL_REFUND')}
          </Button>
        </Can>
      </Item>

      <Item key={permKey.PAGE_ARTISAN_ORDER_DETAIL_SHOP_PAYBACK_ORDER_MODAL} className={classes.menuItem}>
        <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_SHOP_PAYBACK_ORDER_MODAL}>
          <ShopPaybackModal />
        </Can>
      </Item>
      <Item key={permKey.PAGE_ARTISAN_ORDER_DETAIL_SHOP_PAYMENT_ORDER_MODAL} className={classes.menuItem}>
        <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_SHOP_PAYMENT_ORDER_MODAL}>
          <ShopPaymentModal />
        </Can>
      </Item>
      <Item key={permKey.PAGE_ARTISAN_ORDER_DETAIL_FINANCIAL_ORDER_MODAL} className={classes.menuItem} onClick={handleExportFinancialInfo}>
        <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_FINANCIAL_ORDER_MODAL}>
          <Button className={classes.buttonStyle}>{t('ACTION.EXPORT_FINANCIAL_INFO_TO_EXCEL')}</Button>
        </Can>
      </Item>
      {/* @:TODO this area will be looked after* /}
      {/ *<Menu.Item key="7" onClick={openAddOrderExchangeStatus}>* /}
      {/*  <AddOrderExchangeStatus /> */}
      {/* </Menu.Item> */}
    </Menu>
  );

  const _onClick = event => {
    visibleChange(event);
  };

  return (
    <Dropdown key="item-dropdown" overlay={actionMenuItem} trigger={['click']} onVisibleChange={_onClick} visible={isActionMenuVisible}>
      <Button>
        {t('ACTION.TITLE')} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ActionsMenu;
