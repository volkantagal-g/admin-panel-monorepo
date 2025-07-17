import { Form, Row, Col, Select, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { productsSelector } from '@app/pages/GetirWater/Campaigns/New/redux/selectors';

import { validationSchema } from '../../../formHelper';

const Discount = ({ isEditable }) => {
  const { t } = useTranslation('getirWaterCampaignsPage');

  const products = useSelector(productsSelector.getData);
  const isProductListPending = useSelector(productsSelector.getIsPending);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item name="products" label={t('FORM.PROMO_DETAIL.PRODUCT_TO_DISCOUNT.TITLE')} rules={validationSchema.products}>
            <Select
              options={products.map(product => ({
                value: product.id,
                label: product.productName,
              }))}
              labelInValue
              loading={isProductListPending}
              mode="multiple"
              disabled={!isEditable}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="maxItemCount" label={t('FORM.PROMO_DETAIL.MAX_ITEM_COUNT.TITLE')} rules={validationSchema.maxItemCount}>
            <InputNumber className="w-100" disabled={!isEditable} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="discountTotalAmount"
            label={t('FORM.PROMO_DETAIL.DISCOUNT_TOTAL_AMOUNT.TITLE')}
            rules={validationSchema.discountTotalAmount}
          >
            <InputNumber className="w-100" disabled={!isEditable} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item name="minOrderAmount" label={t('FORM.PROMO_DETAIL.MIN_ORDER_AMOUNT.TITLE')} rules={validationSchema.minOrderAmount}>
            <InputNumber className="w-100" disabled={!isEditable} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="maxOrderAmount" label={t('FORM.PROMO_DETAIL.MAX_ORDER_AMOUNT.TITLE')} rules={validationSchema.maxOrderAmount}>
            <InputNumber className="w-100" disabled={!isEditable} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="totalUsageLimit" label={t('FORM.PROMO_DETAIL.TOTAL_USE_LIMIT.TITLE')} rules={validationSchema.totalUsageLimit}>
            <InputNumber className="w-100" disabled={!isEditable} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Discount;
