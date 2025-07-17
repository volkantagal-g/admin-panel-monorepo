import { memo } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from '../PersonalInformation/styles';
import { getCountFromOrderCounts } from './utils';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
} from '@shared/shared/constants';

const formItemLayout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 8 },
};

const MarketTypesInfo = ({ client }) => {
  const { t } = useTranslation('clientDetail');
  const classes = useStyles();
  const {
    sucOrderCount,
    sucOrderCounts,
    organicOrderCount,
    promoOrderCount,
    sucFoodOrderCount,
    sucArtisanOrderCount: sucLocalsOrderCount,
    sucBiTaksiTripCount,
  } = client;

  const sucGetirXCount = getCountFromOrderCounts(sucOrderCounts, GETIR_10_DOMAIN_TYPE);
  const sucGetirVoyagerCount = getCountFromOrderCounts(sucOrderCounts, GETIR_VOYAGER_DOMAIN_TYPE);
  const sucMarketOrderCount = getCountFromOrderCounts(sucOrderCounts, GETIR_MARKET_DOMAIN_TYPE);

  return (
    <Form
      className={classes.noFieldMargin}
      name="validate_other"
      {...formItemLayout}
      initialValues={{}}
    >
      <Form.Item label="G10 Istanbul Total">
        <span className="ant-form-text">{sucOrderCount || 0}</span>
      </Form.Item>
      <Form.Item label={`G10 ${t("global:ORGANIC")}`}>
        <span className="ant-form-text">{organicOrderCount || 0}</span>
      </Form.Item>
      <Form.Item label={`G10 ${t("global:PROMO")}`}>
        <span className="ant-form-text">{promoOrderCount || 0}</span>
      </Form.Item>
      <Form.Item label={t("global:GETIR_MARKET_DOMAIN_TYPES.2")}>
        <span className="ant-form-text">{sucFoodOrderCount || 0}</span>
      </Form.Item>
      <Form.Item label={t("global:GETIR_MARKET_DOMAIN_TYPES.6")}>
        <span className="ant-form-text">{sucLocalsOrderCount || 0}</span>
      </Form.Item>
      <Form.Item label={t("global:GETIR_MARKET_DOMAIN_TYPES.3")}>
        <span className="ant-form-text">{sucMarketOrderCount || 0}</span>
      </Form.Item>
      <Form.Item label={`G10 ${t("global:NEW_CITIES")}`}>
        <span className="ant-form-text">{sucGetirXCount || 0}</span>
      </Form.Item>
      <Form.Item label={t("global:GETIR_MARKET_DOMAIN_TYPES.4")}>
        <span className="ant-form-text">{sucGetirVoyagerCount || 0}</span>
      </Form.Item>
      <Form.Item label={t("CLIENT_META.GETIRBITAKSI")}>
        <span className="ant-form-text">{sucBiTaksiTripCount || 0}</span>
      </Form.Item>
    </Form>
  );
};

export default memo(MarketTypesInfo);