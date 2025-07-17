import { Form, Row, Col, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { productsSelector } from '@app/pages/GetirWater/Campaigns/New/redux/selectors';
import getSelectList from '@app/pages/GetirWater/Announcements/utils/getSelectList';
import { getSelectFilterOption } from '@shared/utils/common';
import SelectWithAll from '@app/pages/GetirWater/components/SelectWithAll';

import { validationSchema } from '../../../formHelper';

const PayXGetY = () => {
  const { t } = useTranslation('getirWaterCampaignsPage');

  const products = useSelector(productsSelector.getData);
  const productList = getSelectList(products, 'productName', 'id');

  const isProductListPending = useSelector(productsSelector.getIsPending);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item name="minOrderAmount" label={t('FORM.PROMO_DETAIL.MIN_ORDER_AMOUNT.TITLE')} rules={validationSchema.minOrderAmount}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="discountTotalAmount"
            label={t('FORM.PROMO_DETAIL.DISCOUNT_TOTAL_AMOUNT_UNIT.TITLE')}
            rules={validationSchema.discountTotalAmount}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>

          <SelectWithAll
            name="excludeProducts"
            label={t('FORM.PROMO_DETAIL.EXCLUDE_ITEMS.TITLE')}
            rules={validationSchema.excludeProducts}
            items={productList}
            labelInValue
            showSearch
            loading={isProductListPending}
            filterOption={getSelectFilterOption}
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item name="totalUsageLimit" label={t('FORM.PROMO_DETAIL.TOTAL_USE_LIMIT.TITLE')} rules={validationSchema.totalUsageLimit}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="dailyUsageLimit" label={t('FORM.PROMO_DETAIL.USE_LIMIT_PER_DAY.TITLE')} rules={validationSchema.dailyUsageLimit}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default PayXGetY;
