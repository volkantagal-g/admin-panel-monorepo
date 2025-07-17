import { Col, Row } from 'antd';

import { productPackagingTypes } from '@shared/shared/constantValues';
import { PRODUCT_PACKAGING_TYPE } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { PRODUCT_DETAIL_COMPONENT_ID } from '@app/pages/MarketProduct/constants';

export const Columns = () => (
  <Row gutter={[16, 16]} align="middle" className="text-center">
    <Col span={4} />
    <Col span={5}>
      {productPackagingTypes?.[PRODUCT_PACKAGING_TYPE.UNIT]?.[getLangKey()]}
    </Col>
    <Col span={5}>
      {productPackagingTypes?.[PRODUCT_PACKAGING_TYPE.SUB_PACK]?.[getLangKey()]}
    </Col>
    <Col span={5}>
      {productPackagingTypes?.[PRODUCT_PACKAGING_TYPE.BOX]?.[getLangKey()]}
    </Col>
    <Col span={5}>
      {productPackagingTypes?.[PRODUCT_PACKAGING_TYPE.PALLET]?.[getLangKey()]}
    </Col>
  </Row>
);

export const PRODUCT_PACKAGING_ROWS = (t, isImperialUnitUsed) => ([
  {
    colId: PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_UNIT_INBOX_QUANTITY,
    title: t('PACKAGING_INFO.INBOX_QUANTITY'),
    fieldKey: 'inboxQuantity',
    dimension: false,
    isImperialUnitUsed: false,
    imperialTitle: '',
    isDisabled: false,
  },
  {
    colId: PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_UNIT_DIMENSION_WIDTH,
    title: t('PACKAGING_INFO.METRIC_UNITS.WIDTH'),
    fieldKey: 'width',
    dimension: true,
    isImperialUnitUsed,
    imperialTitle: t('PACKAGING_INFO.IMPERIAL_UNITS.WIDTH'),
    isDisabled: false,
  },
  {
    colId: PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_UNIT_DIMENSION_HEIGHT,
    title: t('PACKAGING_INFO.METRIC_UNITS.HEIGHT'),
    fieldKey: 'height',
    dimension: true,
    isImperialUnitUsed,
    imperialTitle: t('PACKAGING_INFO.IMPERIAL_UNITS.HEIGHT'),
    isDisabled: false,
  },
  {
    colId: PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_UNIT_DIMENSION_DEPTH,
    title: t('PACKAGING_INFO.METRIC_UNITS.DEPTH'),
    fieldKey: 'depth',
    dimension: true,
    isImperialUnitUsed,
    imperialTitle: t('PACKAGING_INFO.IMPERIAL_UNITS.DEPTH'),
    isDisabled: false,
  },
  {
    colId: PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_UNIT_NET_WEIGHT,
    title: t('PACKAGING_INFO.METRIC_UNITS.NET_WEIGHT'),
    fieldKey: 'netWeight',
    dimension: false,
    isImperialUnitUsed,
    imperialTitle: t('PACKAGING_INFO.IMPERIAL_UNITS.NET_WEIGHT'),
    isDisabled: false,
  },
  {
    colId: PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_UNIT_GROSS_WEIGHT,
    title: t('PACKAGING_INFO.METRIC_UNITS.GROSS_WEIGHT'),
    fieldKey: 'grossWeight',
    dimension: false,
    isImperialUnitUsed,
    imperialTitle: t('PACKAGING_INFO.IMPERIAL_UNITS.GROSS_WEIGHT'),
    isDisabled: false,
  },
  {
    colId: PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_UNIT_VOLUME,
    title: t('PACKAGING_INFO.METRIC_UNITS.VOLUME'),
    fieldKey: 'volume',
    dimension: false,
    isImperialUnitUsed,
    imperialTitle: t('PACKAGING_INFO.IMPERIAL_UNITS.VOLUME'),
    isDisabled: true,
  },
]);
