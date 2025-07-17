import { Typography } from 'antd';
import { get } from 'lodash';

import { FOOD_PROMO_DISCOUNT_REASON, FOOD_DELIVERY_FEE_DISCOUNT_REASON } from '@shared/shared/constants';
import { currency } from '@shared/utils/common';

const { Text } = Typography;

export const tableColumns = ({ t }) => [
  {
    title: <Text strong>{t('GETIR_SUBS_TABLE.AVANTAGE_USED')}</Text>,
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: <Text strong>{t('GETIR_SUBS_TABLE.AVANTAGE_AMOUNT')}</Text>,
    dataIndex: 'render',
    key: 'value',
    align: 'right',
    render: rb => rb(),
  },
];

export const subsTableData = ({ t, order }) => {
  let tableData = [];
  const deliveryFee = get(order, 'deliveryFee', 0);
  const appliedDeliveryFee = get(order, 'appliedDeliveryFee', 0);
  const deliveryFeeDiscount = get(order, 'deliveryFeeDiscount', 0);
  const promoDiscountAmount = get(order, 'totalDiscountAmount', 0);
  const deliveryFeeDiscountReason = get(order, 'deliveryFeeDiscountReason', null);
  const promo = get(order, 'promo', null);
  const promoDiscountReason = get(promo, 'discountReason', null);

  if (!!deliveryFeeDiscount && deliveryFeeDiscountReason === FOOD_DELIVERY_FEE_DISCOUNT_REASON.SUBS) {
    tableData = [...tableData,
      {
        key: 'deliveryFee',
        title: t('GETIR_SUBS_TABLE.FREE_DELIVERY'),
        render: () => (
          <>
            <Text style={{ marginRight: '10px' }} type="secondary" delete>
              {deliveryFee}
            </Text>
            <Text>
              {appliedDeliveryFee} {currency()}
            </Text>
          </>
        ),
      },
    ];
  }
  if (!!promoDiscountAmount && promo && promoDiscountReason === FOOD_PROMO_DISCOUNT_REASON.SUBS) {
    tableData = [...tableData,
      {
        key: 'subsPromo',
        title: t('GETIR_SUBS_TABLE.GETIR_SUBS_PROMO'),
        render: () => (
          <>
            <Text style={{ marginRight: '10px' }} type="secondary" delete>
              {promoDiscountAmount}
            </Text>
            <Text>
              0 {currency()}
            </Text>
          </>
        ),
      },
    ];
  }
  return tableData;
};
