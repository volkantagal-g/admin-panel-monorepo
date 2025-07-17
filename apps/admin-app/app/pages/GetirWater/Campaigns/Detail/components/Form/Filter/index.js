import { Form, Row, Col, Select, Checkbox, Button, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import AntInputNumber from '@shared/components/UI/AntInputNumber';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import {
  brandsSelector,
  createSegmentSelector,
  getClientCountBySegmentSelector,
  vendorsSelector,
} from '@app/pages/GetirWater/Campaigns/Detail/redux/selectors';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Campaigns/utils/createCardActionButtons';
import { Creators } from '@app/pages/GetirWater/Campaigns/Detail/redux/actions';
import SelectWithAll from '@app/pages/GetirWater/components/SelectWithAll';

import { abusivesList, platformList, paymentMethodsList, ALL_OPTION } from '../../../../constants';
import { validationSchema } from '../formHelper';
import getSelectList from '@app/pages/GetirWater/Campaigns/utils/getSelectList';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import createCampaignBody from '@app/pages/GetirWater/Campaigns/utils/createCampaignBody';

const SegmentType = {
  INCLUDE: 2,
  EXCLUDE: 3,
};

const Filter = ({ segmentType, values, availableTimes }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('getirWaterCampaignsPage');
  const { id } = useParams();
  const [filterForm] = Form.useForm();

  useEffect(() => {
    filterForm.setFieldsValue({
      ...values,
      includeSegments: get(values, 'includedSegments', []),
      excludeSegments: get(values, 'excludedSegments', []),
      brandIds: get(values, 'isForAllBrands') ? [ALL_OPTION] : get(values, 'brandIds'),
      cityIds: get(values, 'isForAllCities') ? [ALL_OPTION] : get(values, 'cityIds'),
    });
  }, [values, filterForm]);

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
  const createdSegmentId = useSelector(createSegmentSelector.getData);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(Creators.getVendorsRequest());
  }, [dispatch]);

  const brandSelectList = getSelectList(brands, 'brandName', 'id');
  const citySelectList = getSelectList(cities, 'name', '_id');
  const vendorSelectList = getSelectList(vendors, 'vendorName', 'id');

  useEffect(() => {
    if (createdSegmentId) {
      const { segmentId } = createdSegmentId;

      const formValues = filterForm.getFieldsValue(['includeSegments', 'excludeSegments']);
      const { includeSegments, excludeSegments } = formValues;

      if (segmentType === SegmentType.INCLUDE) {
        filterForm.setFieldsValue({ includeSegments: [...includeSegments, ...[segmentId]] });

        return;
      }
      if (segmentType === SegmentType.EXCLUDE) {
        filterForm.setFieldsValue({ excludeSegments: [...excludeSegments, ...[segmentId]] });
      }
    }
  }, [createdSegmentId, filterForm, segmentType]);

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.FILTER.TITLE', 'edit-filter');

  const handleGetClientNumberClick = () => {
    const formValues = filterForm.getFieldsValue(['includeSegments', 'excludeSegments']);
    const { includeSegments, excludeSegments } = formValues;

    const data = {
      includeSegments: includeSegments ? includeSegments.map(segment => Number(segment)) : [],
      excludeSegments: excludeSegments ? excludeSegments.map(segment => Number(segment)) : [],
    };

    dispatch(Creators.getClientCountBySegmentRequest({ data }));
  };

  const onFinishFilter = formValues => {
    const resultData = createCampaignBody(formValues, availableTimes, 'filter');
    dispatch(
      Creators.updateCampaignRequest({
        data: { filterSection: resultData },
        campaignId: id,
      }),
    );
  };

  return (
    <Form id="edit-filter" onFinish={onFinishFilter} layout="vertical" form={filterForm}>
      <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <SelectWithAll
              name="brandIds"
              label={t('FORM.FILTER.BRANDS.TITLE')}
              rules={validationSchema.brandIds}
              items={brandSelectList}
              loading={isBrandListPending}
              disabled={!isEditable}
            />
          </Col>
          <Col span={8}>
            <SelectWithAll
              name="cityIds"
              rules={validationSchema.cityIds}
              label={t('FORM.FILTER.CITIES.TITLE')}
              items={citySelectList}
              loading={isCityListPending}
              disabled={!isEditable}
            />
          </Col>
          <Col span={8}>
            <SelectWithAll
              name="vendorIds"
              label={t('FORM.FILTER.VENDORS.TITLE')}
              rules={validationSchema.vendorIds}
              items={vendorSelectList}
              loading={isVendorListPending}
              disabled={!isEditable}
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item
              name="minNumberOfPreviousGWaterMPOrder"
              label={t('FORM.FILTER.GSU_USERS_NUMBER.TITLE')}
              rules={validationSchema.minNumberOfPreviousGWaterMPOrder}
            >
              <AntInputNumber className="w-100" addonAfter="MIN" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="maxNumberOfPreviousGWaterMPOrder"
              label={t('FORM.FILTER.GSU_USERS_NUMBER.TITLE')}
              rules={validationSchema.maxNumberOfPreviousGWaterMPOrder}
            >
              <AntInputNumber className="w-100" addonAfter="MAX" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="paymentMethods" label={t('FORM.FILTER.PAYMENT_METHODS.TITLE')} rules={validationSchema.paymentMethods}>
              <Select options={paymentMethods} mode="multiple" disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align="middle">
          <Col span={8}>
            <Form.Item
              name="exceptForPromotionAbusives"
              label={t('FORM.FILTER.PROMOTION_ABUSIVES.TITLE')}
              rules={validationSchema.exceptForPromotionAbusives}
            >
              <Select options={abusivesTypes} className="w-100" disabled={!isEditable} allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="platforms" label={t('FORM.FILTER.PLATFROM.TITLE')} rules={validationSchema.platforms}>
              <Select options={platformList} className="w-100" mode="multiple" disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="includeSegments" label={t('FORM.FILTER.INCLUDE_SEGMENTS.TITLE')}>
              <Select mode="tags" options={[]} disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align="bottom">
          <Col span={8}>
            <Form.Item name="excludeSegments" label={t('FORM.FILTER.EXCLUDE_SEGMENTS.TITLE')}>
              <Select mode="tags" options={[]} disabled={!isEditable} />
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
          <Col span={6}>
            <Form.Item name="isShowOnlyLocalNumbers" valuePropName="checked" rules={validationSchema.isShowOnlyLocalNumbers}>
              <Checkbox disabled={!isEditable}>{t('FORM.FILTER.LOCAL_NUMBERS.TITLE')}</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default Filter;
