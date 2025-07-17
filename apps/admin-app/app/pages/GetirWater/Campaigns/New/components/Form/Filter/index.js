import { Form, Row, Col, Select, Checkbox, Button, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import AntCard from '@shared/components/UI/AntCard';
import AntInputNumber from '@shared/components/UI/AntInputNumber';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { brandsSelector, getClientCountBySegmentSelector, vendorsSelector } from '@app/pages/GetirWater/Campaigns/New/redux/selectors';
import { Creators } from '@app/pages/GetirWater/Campaigns/New/redux/actions';
import SelectWithAll from '@app/pages/GetirWater/components/SelectWithAll';
import { abusivesList, platformList, paymentMethodsList } from '../../../../constants';
import { validationSchema } from '../formHelper';
import getSelectList from '@app/pages/GetirWater/Campaigns/utils/getSelectList';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getCitiesSelector } from '@shared/redux/selectors/common';

const Filter = ({ form }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('getirWaterCampaignsPage');

  const abusivesTypes = convertConstantValuesToSelectOptions(abusivesList);
  const paymentMethods = convertConstantValuesToSelectOptions(paymentMethodsList);

  const brands = useSelector(brandsSelector.getBrands);
  const cities = useSelector(getCitiesSelector.getData);
  const vendors = useSelector(vendorsSelector.getVendors);
  const isBrandListPending = useSelector(brandsSelector.getBrandsIsPending);
  const isCityListPending = useSelector(getCitiesSelector.getIsPending);
  const isVendorListPending = useSelector(vendorsSelector.getVendorsIsPending);
  const clientCountNumber = useSelector(getClientCountBySegmentSelector.getData);
  const isClientCountNumberPending = useSelector(getClientCountBySegmentSelector.getIsPending);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(Creators.getVendorsRequest());
  }, [dispatch]);

  const brandList = getSelectList(brands, 'brandName', 'id');
  const cityList = getSelectList(cities, 'name', '_id');
  const vendorList = getSelectList(vendors, 'vendorName', 'id');

  const handleGetClientNumberClick = () => {
    const values = form.getFieldsValue(['includeSegments', 'excludeSegments']);
    const { includeSegments, excludeSegments } = values;

    const data = {
      includeSegments: includeSegments ? includeSegments.map(segment => Number(segment)) : [],
      excludeSegments: excludeSegments ? excludeSegments.map(segment => Number(segment)) : [],
    };

    dispatch(Creators.getClientCountBySegmentRequest({ data }));
  };

  return (
    <AntCard bordered={false} title={t('FORM.FILTER.TITLE')}>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <SelectWithAll
            name="brandIds"
            label={t('FORM.FILTER.BRANDS.TITLE')}
            rules={validationSchema.brandIds}
            items={brandList}
            loading={isBrandListPending}
          />
        </Col>
        <Col span={8}>
          <SelectWithAll
            name="cityIds"
            rules={validationSchema.cityIds}
            label={t('FORM.FILTER.CITIES.TITLE')}
            items={cityList}
            loading={isCityListPending}
          />
        </Col>
        <Col span={8}>
          <SelectWithAll
            name="vendorIds"
            rules={validationSchema.vendorIds}
            label={t('FORM.FILTER.VENDORS.TITLE')}
            items={vendorList}
            loading={isVendorListPending}
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item
            name="minNumberOfPreviousGWaterMPOrder"
            rules={validationSchema.minNumberOfPreviousGWaterMPOrder}
            label={t('FORM.FILTER.GSU_USERS_NUMBER.TITLE')}
          >
            <AntInputNumber className="w-100" addonAfter="MIN" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="maxNumberOfPreviousGWaterMPOrder"
            rules={validationSchema.maxNumberOfPreviousGWaterMPOrder}
            label={t('FORM.FILTER.GSU_USERS_NUMBER.TITLE')}
          >
            <AntInputNumber className="w-100" addonAfter="MAX" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="paymentMethods" rules={validationSchema.paymentMethods} label={t('FORM.FILTER.PAYMENT_METHODS.TITLE')}>
            <Select options={paymentMethods} mode="multiple" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]} align="middle">
        <Col span={8}>
          <Form.Item
            name="exceptForPromotionAbusives"
            rules={validationSchema.exceptForPromotionAbusives}
            label={t('FORM.FILTER.PROMOTION_ABUSIVES.TITLE')}
          >
            <Select options={abusivesTypes} className="w-100" allowClear />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="platforms" rules={validationSchema.platforms} label={t('FORM.FILTER.PLATFROM.TITLE')}>
            <Select options={platformList} className="w-100" mode="multiple" disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="includeSegments" label={t('FORM.FILTER.INCLUDE_SEGMENTS.TITLE')}>
            <Select mode="tags" options={[]} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]} align="bottom">
        <Col span={8}>
          <Form.Item name="excludeSegments" label={t('FORM.FILTER.EXCLUDE_SEGMENTS.TITLE')}>
            <Select mode="tags" options={[]} />
          </Form.Item>
        </Col>
        <Col span={8}>
          {clientCountNumber ? (
            <Descriptions title="" column={2}>
              <Descriptions.Item label={t('FORM.FILTER.INCLUDE_SEGMENTS.DESCRIPTION_LABEL')}>
                {clientCountNumber?.includeSegmentCount}
              </Descriptions.Item>
              <Descriptions.Item label={t('FORM.FILTER.EXCLUDE_SEGMENTS.DESCRIPTION_LABEL')}>
                {clientCountNumber?.excludeSegmentCount}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Button className="w-100" onClick={handleGetClientNumberClick} loading={isClientCountNumberPending}>
              {t('FORM.FILTER.BTN_SHOW_CLIENT_NUMBER_TEXT')}
            </Button>
          )}
        </Col>
        <Col span={8}>
          <Form.Item name="isShowOnlyLocalNumbers" rules={validationSchema.isShowOnlyLocalNumbers} valuePropName="checked">
            <Checkbox>{t('FORM.FILTER.LOCAL_NUMBERS.TITLE')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default Filter;
