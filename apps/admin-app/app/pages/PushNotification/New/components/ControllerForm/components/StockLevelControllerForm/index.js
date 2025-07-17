import { memo, useEffect } from 'react';
import { Card, Col, Form, InputNumber, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getMarketProductsSelector } from '@shared/redux/selectors/common';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { rules } from '@shared/utils/marketing/formUtils';
import { notificationInclusionType } from '@app/pages/PushNotification/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { convertMarketProductOptions } from '@app/pages/PushNotification/utils';

const StockLevelControllerForm = ({ form, controlFormName }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const formName = [...controlFormName, 'stock'];
  const marketProducts = useSelector(getMarketProductsSelector.getData);
  const isPendingMarketProduct = useSelector(getMarketProductsSelector.getIsPending);

  useEffect(() => {
    dispatch(CommonCreators.getMarketProductsRequest({ statusList: ['ACTIVE'], fields: ['name'], populate: [] }));
  }, [dispatch]);

  return (
    <Card size="small" title={t('STOCK_LEVEL_CONTROLLER')}>
      <Row gutter={24}>
        <AntSelectWithCsvImport
          disabled={isPendingMarketProduct}
          loading={isPendingMarketProduct}
          form={form}
          name={[...formName, 'productIds']}
          label={t('PRODUCTS')}
          btnLabel={t('CSV_IMPORT')}
          options={convertMarketProductOptions(marketProducts)}
          rule={rules.onlyRequired}
          labelInValue={false}
        />
      </Row>

      <Row gutter={24}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            hasFeedback
            name={[...formName, 'inclusionType']}
            label={t('INCLUSION_TYPE')}
            rules={rules.onlyRequired}
          >
            <Select options={convertConstantValuesToSelectOptions(notificationInclusionType)} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            hasFeedback
            name={[...formName, 'totalMinProductCount']}
            label={t('TOTAL_MIN_PRODUCT_STOCK_COUNT')}
            rules={rules.onlyRequired}
          >
            <InputNumber controls className="w-100" min={0} />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default memo(StockLevelControllerForm);
