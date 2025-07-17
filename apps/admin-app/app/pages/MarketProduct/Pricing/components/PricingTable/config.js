import { Col, Row } from 'antd';

import { Link } from 'react-router-dom';

import moment from 'moment';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import useStyles from './styles';

import { ROUTE } from '@app/routes';
import { getLangKey } from '@shared/i18n';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { SELLING_PRICE_TYPE_NAMES } from '@app/pages/MarketProduct/Pricing/constants';
import { Tag, Button } from '@shared/components/GUI';
import { priceFormatter } from '@app/pages/MarketProduct/utils';
import { getCountryTimeZoneFormatter } from '@app/pages/MarketProduct/Pricing/utils';

export const TableColumns = (t, handleDelete) => {
  const classes = useStyles();
  return [
    {
      title: t('TITLES.TABLE.PRODUCT_NAME'),
      key: 'product',
      render: ({ productName }) => productName ?? '-',
    },
    {
      title: t('TITLES.TABLE.DATE_RANGES'),
      key: 'dateRanges',
      render: ({ startDate, endDate }) => startDate && endDate &&
        `${moment(startDate).format(getLocalDateTimeFormat())} - ${moment(endDate).format(getLocalDateTimeFormat())}`,
    },
    {
      title: t('TITLES.TABLE.PRICE'),
      render: record => (priceFormatter((record?.price))),
      key: 'price',
    },
    {
      title: t('TITLES.TABLE.WAREHOUSE'),
      key: 'warehouseId',
      render: ({ warehouseName }) => (warehouseName ?? '-'),
    },
    {
      title: t('TITLES.TABLE.DOMAIN'),
      key: 'domainType',
      render: ({ domainType }) => domainType && <Tag color="secondary">{getirMarketDomainTypes[domainType]?.[getLangKey()]}</Tag>,
    },
    {
      title: t('TITLES.TABLE.PRICE_TYPE'),
      key: 'priceType',
      render: ({ priceTypeId }) => priceTypeId && (SELLING_PRICE_TYPE_NAMES[priceTypeId]?.[getLangKey()]),
    },
    {
      title: t('TITLES.TABLE.DISCOUNTED'),
      key: 'isDiscounted',
      render: record => (record?.isDiscounted ? t('YES') : t('NO')),
    },
    {
      title: t('TITLES.TABLE.ACTIONS'),
      key: 'action',
      fixed: 'right',
      render: record => {
        const { id } = record;
        const path = record?.isDiscounted ?
          ROUTE.MARKET_PRODUCT_PRICING_DISCOUNTED_DETAIL.path.replace(':id', id) : ROUTE.MARKET_PRODUCT_PRICING_DETAIL.path.replace(':id', id);
        return (
          <Row gutter={[8, 8]}>
            <Col>
              <div className={classes.iconButtonGroup}>
                <Link to={path} target="_blank">
                  <Button
                    color="secondary"
                    size="small"
                    icon={<EditOutlined />}
                  />
                </Link>
                {record?.isDiscounted ? (
                  <Button
                    color="danger"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record)}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
        );
      },
    },
  ];
};

export const exampleDomainCsv = {
  _id: '644e5bbea2464c601365b0a7',
  product: '644e5bbea2464c601365b0a7',
  startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
  endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
  price: 50,
  domainType: 1,
  isDiscounted: false,
  'discounted.isShownUnderSpecialOffers': true,
  'discounted.financial.isAmount': false,
  'discounted.financial.supplierSupportRate': 0.5,
  'discounted.financial.thirdPartySupportRate': 0,
  'discounted.financial.supplierSupportAmount': 0,
  'discounted.financial.thirdPartySupportAmount': 0,
  'discounted.financial.isFreeProduct': false,
  'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
  isEnabled: true,
};

export const exampleWarehouseCsv = {
  _id: '644e5bbea2464c601365b0a7',
  product: '644e5bbea2464c601365b0a7',
  warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
  startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
  endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
  price: 50,
  domainType: 1,
  isDiscounted: true,
  'discounted.isShownUnderSpecialOffers': true,
  'discounted.financial.isAmount': true,
  'discounted.financial.supplierSupportRate': 0,
  'discounted.financial.thirdPartySupportRate': 0,
  'discounted.financial.supplierSupportAmount': 0,
  'discounted.financial.thirdPartySupportAmount': 0,
  'discounted.financial.isFreeProduct': false,
  'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
  isEnabled: true,
};

export const exampleWasteCsv = {
  _id: '644e5bbea2464c601365b0a7',
  product: '644e5bbea2464c601365b0a7',
  warehouseIds: '[644e5bbea2464c601365b0a7:4, 144e5bbea2464c601365b0b8:11]',
  startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
  endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
  price: 50,
  domainType: 1,
  'discounted.isShownUnderSpecialOffers': true,
  'discounted.financial.isAmount': false,
  'discounted.financial.supplierSupportRate': 0.5,
  'discounted.financial.thirdPartySupportRate': 0,
  'discounted.financial.supplierSupportAmount': 0,
  'discounted.financial.thirdPartySupportAmount': 0,
  'discounted.financial.isFreeProduct': false,
  'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
  badgeId: '644e5bbea2464c601365b0a7',
  isDiscounted: true,
  isEnabled: true,
};

export const exampleBuyingPricesJson = [{
  productId: '65853994a88e32e9af0111cd',
  supplierId: '644e5bbea2464c601365b0a7',
  supplierAccountCodes: '[644e5bbea2464c601365b0a7]',
  listPrice: 100,
  totalPriceReduction: 50,
  wholesaleVat: 1,
  paymentDueDay: 2,
  isPreferred: false,
  monthlyLevelBonus: 3,
  logisticBonus: 2,
  marketingActivityLogic: '5%',
  nonReturnBonus: '5%',
  monthlyFreeProductBonus: 1,
  handlingBonus: 2,
  vendorPanelUserBonus: 3,
  earlyPaymentBonus: 4,
}];

export const exampleDomainJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    price: '12,99',
    domainType: 1,
    isDiscounted: false,
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    price: '11,99',
    domainType: 3,
    isDiscounted: false,
    isEnabled: true,
  },
];

export const exampleDomainAmountThirdPartyJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': true,
    'discounted.financial.supplierSupportAmount': 0,
    'discounted.financial.thirdPartySupportAmount': 0,
    'discounted.financial.isFreeProduct': false,
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '11,99',
    domainType: 3,
    isDiscounted: true,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': true,
    'discounted.financial.supplierSupportAmount': 0,
    'discounted.financial.thirdPartySupportAmount': 0,
    'discounted.financial.isFreeProduct': false,
    isEnabled: true,
  },
];

export const exampleDomainAmountGetirJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': true,
    'discounted.financial.supplierSupportAmount': 0,
    'discounted.financial.thirdPartySupportAmount': 0,
    'discounted.financial.isFreeProduct': false,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '11,99',
    domainType: 3,
    isDiscounted: true,
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': true,
    'discounted.financial.supplierSupportAmount': 0,
    'discounted.financial.thirdPartySupportAmount': 0,
    'discounted.financial.isFreeProduct': false,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    isEnabled: true,
  },
];

export const exampleDomainPercentThirdPartyJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': false,
    'discounted.financial.supplierSupportRate': 0,
    'discounted.financial.thirdPartySupportRate': 0,
    'discounted.financial.isFreeProduct': false,
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '11,99',
    domainType: 3,
    isDiscounted: true,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': false,
    'discounted.financial.supplierSupportRate': 0,
    'discounted.financial.thirdPartySupportRate': 0,
    'discounted.financial.isFreeProduct': false,
    isEnabled: true,
  },
];

export const exampleDomainPercentGetirJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': false,
    'discounted.financial.supplierSupportRate': 0,
    'discounted.financial.thirdPartySupportRate': 0,
    'discounted.financial.isFreeProduct': false,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '11,99',
    domainType: 3,
    isDiscounted: true,
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': false,
    'discounted.financial.supplierSupportRate': 0,
    'discounted.financial.thirdPartySupportRate': 0,
    'discounted.financial.isFreeProduct': false,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    isEnabled: true,
  },
];

export const exampleWarehouseJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: false,
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: false,
    isEnabled: true,
  },
];

export const exampleWarehouseAmountThirdPartyJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': true,
    'discounted.financial.supplierSupportAmount': 0,
    'discounted.financial.thirdPartySupportAmount': 0,
    'discounted.financial.isFreeProduct': false,
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: false,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': true,
    'discounted.financial.supplierSupportAmount': 0,
    'discounted.financial.thirdPartySupportAmount': 0,
    'discounted.financial.isFreeProduct': false,
    isEnabled: true,
  },
];

export const exampleWarehouseAmountGetirJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': true,
    'discounted.financial.supplierSupportAmount': 0,
    'discounted.financial.thirdPartySupportAmount': 0,
    'discounted.financial.isFreeProduct': false,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: false,
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': true,
    'discounted.financial.supplierSupportAmount': 0,
    'discounted.financial.thirdPartySupportAmount': 0,
    'discounted.financial.isFreeProduct': false,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    isEnabled: true,
  },
];

export const exampleWarehousePercentThirdPartyJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': false,
    'discounted.financial.supplierSupportRate': 0,
    'discounted.financial.thirdPartySupportRate': 0,
    'discounted.financial.isFreeProduct': false,
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': false,
    'discounted.financial.supplierSupportRate': 0,
    'discounted.financial.thirdPartySupportRate': 0,
    'discounted.financial.isFreeProduct': false,
    isEnabled: true,
  },
];

export const exampleWarehousePercentGetirJson = [
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': false,
    'discounted.financial.supplierSupportRate': 0,
    'discounted.financial.thirdPartySupportRate': 0,
    'discounted.financial.isFreeProduct': false,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    isEnabled: true,
  },
  {
    _id: '',
    product: '644e5bbea2464c601365b0a7',
    warehouseIds: '[644e5bbea2464c601365b0a7, 144e5bbea2464c601365b0b8]',
    startDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    endDate: getCountryTimeZoneFormatter('2023-06-14T07:18:52.479Z'),
    price: '9,99',
    domainType: 1,
    isDiscounted: true,
    'discounted.isShownUnderSpecialOffers': true,
    'discounted.financial.isAmount': false,
    'discounted.financial.supplierSupportRate': 0,
    'discounted.financial.thirdPartySupportRate': 0,
    'discounted.financial.isFreeProduct': false,
    'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
    isEnabled: true,
  },
];

export const exampleWasteAmountThirdPartyJson = [{
  _id: '',
  product: '644e5bbea2464c601365b0a7',
  warehouseIds: '[644e5bbea2464c601365b0a7:4, 144e5bbea2464c601365b0b8:11]',
  startDate: '2023-06-14',
  endDate: '2023-06-14',
  price: '9,99',
  domainType: 1,
  isDiscounted: true,
  'discounted.isShownUnderSpecialOffers': true,
  'discounted.financial.isFreeProduct': false,
  'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
  'discounted.financial.isAmount': true,
  'discounted.financial.supplierSupportAmount': 0,
  'discounted.financial.thirdPartySupportAmount': 0,
  badgeId: '644e5bbea2464c601365b0a7',
  isEnabled: true,
}];

export const exampleWasteAmountGetirJson = [{
  _id: '',
  product: '644e5bbea2464c601365b0a7',
  warehouseIds: '[644e5bbea2464c601365b0a7:4, 144e5bbea2464c601365b0b8:11]',
  startDate: '2023-06-14',
  endDate: '2023-06-14',
  price: '9,99',
  domainType: 1,
  isDiscounted: true,
  'discounted.isShownUnderSpecialOffers': true,
  'discounted.financial.isFreeProduct': false,
  'discounted.financial.isAmount': true,
  badgeId: '644e5bbea2464c601365b0a7',
  isEnabled: true,
}];

export const exampleWastePercentThirdPartyJson = [{
  _id: '',
  product: '644e5bbea2464c601365b0a7',
  warehouseIds: '[644e5bbea2464c601365b0a7:4, 144e5bbea2464c601365b0b8:11]',
  startDate: '2023-06-14',
  endDate: '2023-06-14',
  price: '9,99',
  domainType: 1,
  isDiscounted: true,
  'discounted.isShownUnderSpecialOffers': true,
  'discounted.financial.isFreeProduct': false,
  'discounted.financial.supplierId': '6548886d1dbd93c01182941b',
  'discounted.financial.isAmount': false,
  'discounted.financial.supplierSupportRate': 0,
  'discounted.financial.thirdPartySupportRate': 0,
  badgeId: '644e5bbea2464c601365b0a7',
  isEnabled: true,
}];

export const exampleWastePercentGetirJson = [{
  _id: '',
  product: '644e5bbea2464c601365b0a7',
  warehouseIds: '[644e5bbea2464c601365b0a7:4, 144e5bbea2464c601365b0b8:11]',
  startDate: '2023-06-14',
  endDate: '2023-06-14',
  price: '9,99',
  domainType: 1,
  isDiscounted: true,
  'discounted.isShownUnderSpecialOffers': true,
  'discounted.financial.isFreeProduct': false,
  'discounted.financial.isAmount': false,
  badgeId: '644e5bbea2464c601365b0a7',
  isEnabled: true,
}];
