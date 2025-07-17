import { object, string } from 'yup';

export const validationScheme = object({
  deliveryType: string().required(),
  pickupDate: string().when('deliveryType', {
    is: 'courier_retrieves',
    then: string().required(),
  }),
  timeSlot: string().when('deliveryType', {
    is: 'courier_retrieves',
    then: string().required(),
  }),
});

export const DELIVERY_TYPES = {
  COURIER_RETRIEVES: 1,
  CUSTOMER_DELIVERS: 2,
  INSTANT_MONEY_REFUND: 3,
};

export const GETIR_SOURCED_DEFECTED_PRODUCT_REASON = {
  id: '5d35c8fd7b3aec30dfe5897f',
  name: 'Getir Kaynaklı- Kusurlu Ürün',
};

export const onlyInstantMoneyRefundReasons = [
  {
    id: '5d35c8f17b3aec30dfe5897e',
    name: 'Getir Kaynaklı-Eksik ürün',
  },
  {
    id: '5d35c9207b3aec30dfe58980',
    name: 'İşletme Kaynaklı-Eksik ürün',
  },
  {
    id: '628ab5f01f2fa39d4892ca41',
    name: 'İşletme Kaynaklı- Teslim görünüyor ancak teslim edilmedi',
  },
  {
    id: '628ab5f01f2fa39d4892ca42',
    name: 'Getir Kaynaklı- Teslim görünüyor ancak teslim edilmedi',
  },
  GETIR_SOURCED_DEFECTED_PRODUCT_REASON,
];
