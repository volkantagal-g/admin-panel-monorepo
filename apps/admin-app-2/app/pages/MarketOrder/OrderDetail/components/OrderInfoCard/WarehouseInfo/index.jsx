import { Space as AntSpace } from 'antd';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import permKeys from '@shared/shared/permKey.json';
import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { warehouseTypes } from '@shared/shared/constantValues';
import { Space } from '@shared/components/GUI';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import useStyles from '../styles';

const WarehouseInfo = ({ warehouse = {}, picker = {} }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketOrderPage');
  const { _id, name, warehouseType } = warehouse;
  const { name: pickerName, gsm, personalGsm } = picker;
  const type = warehouseTypes?.[warehouseType]?.[getLangKey()] || '';
  const feeDetailsUrl = ROUTE.MARKET_FEES_DETAILS.path.replace(
    ':warehouseId',
    _id,
  );
  const basketAmountDetailsUrl =
    ROUTE.GETIR_MARKET_BASKET_CONFIG_DETAILS.path.replace(':warehouseId', _id);
  const warehouseDetailsUrl = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', _id);

  const storeLinks = [
    {
      id: 'market-fee-detail-link',
      text: t('global:FEE'),
      to: feeDetailsUrl,
      permKey: permKeys.PAGE_MARKET_FEES_DETAILS,
    },
    {
      id: 'market-basket-detail-link',
      text: t('global:BASKET'),
      to: basketAmountDetailsUrl,
      permKey: permKeys.PAGE_GETIR_MARKET_BASKET_CONFIG_DETAILS,
    },
    {
      id: 'warehouse-detail-link',
      text: t('global:DETAIL'),
      to: warehouseDetailsUrl,
      permKey: permKeys.PAGE_WAREHOUSE_DETAIL,
    },
  ];

  const warehouseInfoArr = [
    {
      label: t('CARD_INFO.VENDOR.NAME'),
      value: name,
    },
    {
      label: t('CARD_INFO.VENDOR.TYPE'),
      value: type,
    },
    {
      label: t('CARD_INFO.VENDOR.PICKER'),
      value: pickerName,
    },
    {
      label: t('CARD_INFO.VENDOR.GSM'),
      value: gsm,
    },
    {
      label: t('CARD_INFO.VENDOR.PERSONAL_GSM'),
      value: personalGsm,
    },
  ];
  return (
    <Space
      className="p-2"
      title={t('CARD_INFO.VENDOR.TITLE')}
      extra={(
        <AntSpace>
          {storeLinks.map(({ id, text, to, permKey }) => (
            <RedirectButtonV2
              key={id}
              text={text}
              to={to}
              permKey={permKey}
              target="_blank"
              size="small"
              type="default"
              data-testid={id}
            />
          ))}
        </AntSpace>
      )}
    >
      <div className={classes.orderInfoCard} data-testid="warehouse-info-card">
        {warehouseInfoArr?.map(({ label, value }) => (
          <div key={label} className={classes.orderInfoCardLabel}>
            <strong>{label}</strong>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </Space>
  );
};
export default memo(WarehouseInfo);
