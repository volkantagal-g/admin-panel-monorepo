import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, InputNumber, Card, Select } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { getMarketProductsSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { optionalControlOption } from '@shared/containers/Marketing/OptionalControls/constantValues';
import { getMarketProductOptions } from '@shared/utils/formHelper';
import { OPTIONAL_CONTROL } from '@shared/containers/Marketing/OptionalControls/constants';
import { ENVIRONMENT } from '@shared/config';

const StockLevelControl = ({ form, parentFieldName, disabled }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const controlFieldName = 'stock';
  const formName = parentFieldName ? [...[parentFieldName], controlFieldName] : [controlFieldName];

  const marketProducts = useSelector(getMarketProductsSelector.getData);
  const isPendingMarketProduct = useSelector(getMarketProductsSelector.getIsPending);

  const inclusionTypeOptions = optionalControlOption[OPTIONAL_CONTROL.STOCK_LEVEL]?.inclusionTypeOptions || [];
  const marketProductOptions = useMemo(() => getMarketProductOptions(marketProducts, true), [marketProducts]);

  useEffect(() => {
    const filters = {
      isActive: true,
      fields: ['name', 'fullName'],
      populate: [],
    };

    const enhancedFilters = process.env.NODE_ENV === 'development' || ENVIRONMENT.ENV !== 'production'
      ? { ...filters, limit: 5, offset: 0 }
      : filters;

    dispatch(CommonCreators.getMarketProductsRequest({ ...enhancedFilters }));
  }, [dispatch]);

  return (
    <Card size="small" title={t('STOCK_LEVEL_CONTROLLER')}>
      <Row gutter={24}>
        <AntSelectWithCsvImport
          disabled={isPendingMarketProduct || disabled}
          loading={isPendingMarketProduct}
          form={form}
          name={[...formName, 'productIds']}
          label={t('PRODUCTS')}
          btnLabel={t('CSV_UPLOAD')}
          options={marketProductOptions}
          placeholder={`${t('PRODUCTS')}`}
          rule={[{ required: true, message: t('error:REQUIRED') }]}
          labelInValue={false}
        />
      </Row>

      <Row gutter={24}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            hasFeedback
            name={[...formName, 'inclusionType']}
            label={t('INCLUSION_TYPE')}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
          >
            <Select
              disabled={disabled}
              options={convertConstantValuesToSelectOptions(inclusionTypeOptions)}
              placeholder={`${t('INCLUSION_TYPE')}`}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            hasFeedback
            name={[...formName, 'totalMinProductCount']}
            label={t('TOTAL_PRODUCT_STOCK_COUNT')}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
          >
            <InputNumber
              controls
              disabled={disabled}
              className="w-100"
              min={0}
              max={999999}
              placeholder={`${t('TOTAL_PRODUCT_STOCK_COUNT')}`}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default memo(StockLevelControl);
