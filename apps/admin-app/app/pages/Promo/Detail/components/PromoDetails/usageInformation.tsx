import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Descriptions, Space } from 'antd';

import { memo } from 'react';

import { priceFormatter } from '@shared/utils/price';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

export const UsageInformation = memo(function UsageInformation() {
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const { t } = useTranslation('promoPage');

  return (
    <Descriptions
      bordered
      // column={promo.isParentPromo ? 1 : { xs: 1, sm: 1, md: 2 }}
      column={1}
      size="small"
      title={t('USAGE_INFORMATION.HEADER_TITLE')}
    >
      <Descriptions.Item label={t('USAGE_INFORMATION.USED_COUNT')}>
        {promo?.usedOrderCount}
      </Descriptions.Item>
      {
        !promo.isParentPromo && (
          <>
            <Descriptions.Item label={t('USAGE_INFORMATION.UNIQUE_CLIENT_COUNT')}>
              {promo?.uniqueClientCount}
            </Descriptions.Item>
            <Descriptions.Item label={t('USAGE_INFORMATION.TOTAL_PRICE')}>
              <Space>
                <span>
                  {priceFormatter(promo?.usedTotalPrice, true)}
                </span>
                <span>
                  ({priceFormatter(promo.usedTotalPrice / promo.usedOrderCount, true)})
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={t('USAGE_INFORMATION.TOTAL_PURCHASING_PRICE')}>
              <Space>
                <span>
                  {priceFormatter(promo.usedTotalWholesalePrice, true)}
                </span>
                <span>
                  ({priceFormatter(promo.usedTotalWholesalePrice / promo.usedOrderCount, true)})
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={t('USAGE_INFORMATION.TOTAL_VAT_VALUE')}>
              <Space>
                <span>
                  {priceFormatter(promo.usedTotalVatValue, true)}
                </span>
                <span>
                  ({priceFormatter(promo.usedTotalVatValue / promo.usedOrderCount, true)})
                </span>
              </Space>
            </Descriptions.Item>
          </>
        )
      }
      <Descriptions.Item label={t('USAGE_INFORMATION.TOTAL_DISCOUNT_AMOUNT')}>
        <Space>
          <span>
            {priceFormatter(promo.usedTotalDiscountAmount, true)}
          </span>
          <span>
            ({priceFormatter(promo.usedTotalDiscountAmount / promo.usedOrderCount, true)})
          </span>
        </Space>
      </Descriptions.Item>
    </Descriptions>
  );
});
