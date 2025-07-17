import {
  Checkbox,
  Form,
  Select,
  Space,
  Row,
  Col,
  InputNumber,
  Input,
  Tooltip,
  Divider,
  Typography,
  Alert,
} from 'antd';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { get } from 'lodash';

import { useTranslation } from 'react-i18next';

import { InfoCircleFilled } from '@ant-design/icons';

import { useSearchParams } from 'react-router-dom';

import { getLangKey } from '@shared/i18n';

import { currency } from '@shared/utils/common';
import useStyles from './styles';
import {
  formatNumber,
  getExpiryDate,
  parseNumber,
  promoRules as rules,
} from '../../formHelper';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { FOOD_ORDER_STATUS } from '@shared/shared/constants';

const { Title, Text } = Typography;

const PromoSection = ({ form, hasPromo, setHasPromo, orderDetail }) => {
  const { t } = useTranslation('foodOrderPage');
  const [validUntilDate, setValidUntilDate] = useState(getExpiryDate(180));
  const classes = useStyles();

  const [params] = useSearchParams();

  const hasPersonalPromoInOrder = get(orderDetail, ['personalPromoId'], false);
  const isRefundable = [FOOD_ORDER_STATUS.DELIVERED, FOOD_ORDER_STATUS.RATED].includes(orderDetail.status);
  const selectedCountry = useSelector(getSelectedCountryV2) || null;

  const isPromoUnavailable = hasPersonalPromoInOrder && !isRefundable && !orderDetail.isRefunded && !orderDetail.isRefundPending;

  useEffect(() => {
    const hasPromoParams = !!params.get('discountAmount') || !!params.get('validDayAmount');
    if (!isPromoUnavailable && hasPromoParams) {
      setHasPromo(true);
      const values = form.getFieldsValue(true);
      form.setFieldsValue({
        ...values,
        promo: {
          ...values.promo,
          discountAmount: formatNumber(params.get('discountAmount')),
          validDayAmount: formatNumber(params.get('validDayAmount')),
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handlePromotionChange = e => {
    setHasPromo(e.target.checked);
  };

  const handleValidDayChange = value => {
    setValidUntilDate(
      getExpiryDate(!!value && typeof Number(value) === 'number' ? Number(value) : 0),
    );
  };

  const countryOptions = [selectedCountry].map(country => ({
    key: country.code.alpha2,
    label: country.name[getLangKey()],
    value: country.code.alpha2,
  }));

  if (isPromoUnavailable) {
    return null;
  }

  return (
    <>
      <Divider />
      <Form.Item>
        <Checkbox checked={hasPromo} onChange={handlePromotionChange}>
          {t('PROMOTION_MODAL.DISCOUNT')}
        </Checkbox>
      </Form.Item>
      {hasPromo && !hasPersonalPromoInOrder && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['promo', 'countryCode']}
                label={t('PROMOTION_MODAL.COUNTRY_LABEL')}
                initialValue={get(selectedCountry, ['code', 'alpha2'], null)}
                labelCol={{ span: 24 }}
                help={(
                  <Space>
                    <InfoCircleFilled />
                    <Text>{t('PROMOTION_MODAL.COUNTRY_INFO')}</Text>
                  </Space>
                )}
              >
                <Select
                  id="countryCode"
                  options={countryOptions}
                  placeholder={t('PROMOTION_MODAL.COUNTRY_PLACEHOLDER')}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['promo', 'discountAmount']}
                label={t('PROMOTION_MODAL.DISCOUNT_AMOUNT_lABEL')}
                rules={rules.discountAmount(Number(orderDetail.totalPrice))}
                labelCol={{ span: 24 }}
                help={(
                  <Space>
                    <InfoCircleFilled />
                    <Text>{t('PROMOTION_MODAL.DISCOUNT_AMOUNT_INFO')}</Text>
                  </Space>
                )}
              >
                <InputNumber
                  id="discountAmount"
                  className={classes.fullWidth}
                  controls={false}
                  step="0.00"
                  placeholder="0.00"
                  precision={2}
                  prefix={currency()}
                  max={orderDetail.totalPrice}
                />
              </Form.Item>
            </Col>
            <div />
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['promo', 'validDayAmount']}
                label={t('PROMOTION_MODAL.VALID_DAY_AMOUNT_LABEL')}
                initialValue={180}
                rules={rules.validDayAmount}
                labelCol={{ span: 24 }}
                help={(
                  <Space>
                    <InfoCircleFilled />
                    <Text>{`${t('PROMOTION_MODAL.VALID_DAY_AMOUNT_INFO')} ${validUntilDate}`}
                    </Text>
                  </Space>
                )}
              >
                <InputNumber
                  id="validDayAmount"
                  className={classes.fullWidth}
                  placeholder="0"
                  step="1"
                  controls={false}
                  addonAfter={t('PROMOTION_MODAL.VALID_DAY_AMOUNT_SUFFIX')}
                  formatter={formatNumber}
                  parser={parseNumber}
                  maxLength={4}
                  onChange={handleValidDayChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={t('PROMOTION_MODAL.TITLE_EN')} labelCol={{ span: 24 }} shouldUpdate>
                <Input
                  className={classes.fullWidth}
                  value={`${
                    currency() +
                    get(
                      form.getFieldsValue(true),
                      ['promo', 'discountAmount'],
                      0,
                    )
                  } discount for you!`}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('PROMOTION_MODAL.TITLE_TR')} labelCol={{ span: 24 }} shouldUpdate>
                <Input
                  className={classes.fullWidth}
                  value={`Sana özel ${
                    currency() +
                    get(
                      form.getFieldsValue(true),
                      ['promo', 'discountAmount'],
                      0,
                    )
                  } indirim!`}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={classes.rowSpace} gutter={16}>
            <Col span={12}>
              <Tooltip title={t('PROMOTION_MODAL.TOOLTIP.CANNOT_BE_SELECTED')} placement="right">
                <Form.Item
                  name={['promo', 'deliveryFee', 'doNotCharge']}
                  initialValue={false}
                >
                  <Checkbox disabled>
                    {t('PROMOTION_MODAL.NO_DELIVERY_FEE')}
                  </Checkbox>
                </Form.Item>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip title={t('PROMOTION_MODAL.TOOLTIP.CANNOT_BE_SELECTED')} placement="right">
                <Form.Item
                  name={['promo', 'doNotApplyMinimumBasketSize']}
                  initialValue={false}
                >
                  <Checkbox disabled>
                    {t('PROMOTION_MODAL.NO_MINIMUM_BASKET_SIZE')}
                  </Checkbox>
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>
        </>
      )}
      {hasPromo && hasPersonalPromoInOrder && (
      <Alert
        showIcon
        type="error"
        message={<Title level={5} type="danger">{t('COMPLAINT_REFUND_MODAL.ALREADY_DISCOUNTED_TITLE')}</Title>}
        description={<Text type="danger" strong>{t('COMPLAINT_REFUND_MODAL.ALREADY_DISCOUNTED')}</Text>}
      />
      )}
    </>
  );
};

export default PromoSection;
