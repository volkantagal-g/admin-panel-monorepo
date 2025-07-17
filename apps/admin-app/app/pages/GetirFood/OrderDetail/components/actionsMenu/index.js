import { useDispatch, useSelector } from 'react-redux';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
  CancelFoodOrderModal,
  AddOrderExchangeStatusModal,
  ComplaintRefundModal,
  SalesAgreement,
} from '@app/pages/GetirFood/OrderDetail/components/actionsMenu/modals';

import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/actionsMenu/styles';
import { getLangKey } from '@shared/i18n';
import { Creators as LanguageSelectionCreators } from '@shared/redux/actions/languageSelection';

const { Item } = Menu;

const ActionsMenu = ({ onIsVisibleChange, isActionMenuVisible }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('foodOrderPage');
  const [params] = useSearchParams();
  const orderDetail = useSelector(orderDetailSelector.getData);

  const handleExportFinancialInfo = () => {
    if (!orderDetail || !orderDetail.financial) return;
    const fields = Object.keys(orderDetail.financial).map(key => {
      return ({ key, title: key, default: '' });
    });
    const content = [orderDetail.financial];
    const financialInfo = { fields, content };
    dispatch(Creators.exportFinancialInfoRequest({ financialInfo }));
  };

  useEffect(() => {
    if (['refund', 'cancel'].includes(params.get('action')) && getLangKey() !== 'tr') {
      dispatch(LanguageSelectionCreators.startLanguageSelectionFlow({ selectedLanguage: 'tr' }));
    }
  }, [dispatch, params]);

  const { Can } = usePermission();

  const actionMenuItem = (
    <Menu>
      <Item
        key={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_CANCEL_RESTAURANT_ORDER_MODAL}
        className={classes.menuItem}
      >
        <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_CANCEL_RESTAURANT_ORDER_MODAL}>
          <CancelFoodOrderModal />
        </Can>
      </Item>
      <Item
        key={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_COMPLAINT_REFUND_MODAL}
        className={classes.menuItem}
      >
        <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_COMPLAINT_REFUND_MODAL}>
          <ComplaintRefundModal />
        </Can>
      </Item>
      <Item
        key={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_FINANCIAL_ORDER_MODAL}
        className={classes.menuItem}
        onClick={handleExportFinancialInfo}
      >
        <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_FINANCIAL_ORDER_MODAL}>
          <Button className={classes.buttonStyle}>
            {t('ACTION.EXPORT_FINANCIAL_INFO_TO_EXCEL')}
          </Button>
        </Can>
      </Item>
      <Item
        key={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_ADD_ORDER_EXCHANGE_STATUS_MODAL}
        className={classes.menuItem}
      >
        <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_ADD_ORDER_EXCHANGE_STATUS_MODAL}>
          <AddOrderExchangeStatusModal />
        </Can>
      </Item>
      <Item
        key={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_PRINT_CONTRACT}
        className={classes.menuItem}
      >
        <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_PRINT_CONTRACT}>
          <SalesAgreement />
        </Can>
      </Item>
    </Menu>
  );

  return (
    <Dropdown
      key="item-dropdown"
      overlay={actionMenuItem}
      trigger={['click']}
      onVisibleChange={onIsVisibleChange}
      visible={isActionMenuVisible}
      forceRender
    >
      <Button>
        {t('ACTION.TITLE')} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default React.memo(ActionsMenu);
