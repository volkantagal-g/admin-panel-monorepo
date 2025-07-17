import { Form, Row, Col, Select, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import AntCard from '@shared/components/UI/AntCard';
import AntInputNumber from '@shared/components/UI/AntInputNumber';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Announcements/utils/createCardButtonActions';
import SelectWithAll from '@app/pages/GetirWater/components/SelectWithAll';
import { platformList } from '@app/pages/GetirWater/Announcements/constants';
import getSelectList from '@app/pages/GetirWater/Announcements/utils/getSelectList';
import { brandsSelector, vendorsSelector } from '@app/pages/GetirWater/Announcements/Detail/redux/selectors';
import { Creators } from '@app/pages/GetirWater/Announcements/Detail/redux/actions';

import { validationSchema } from '../formHelper';

const Filter = () => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');
  const dispatch = useDispatch();

  const brands = useSelector(brandsSelector.getBrands);
  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const vendors = useSelector(vendorsSelector.getVendors);
  const isVendorListPending = useSelector(vendorsSelector.getVendorsIsPending);

  const brandList = getSelectList(brands, 'brandName', 'id');
  const cityList = getSelectList(cities, 'name', '_id');
  const vendorList = getSelectList(vendors, 'vendorName', 'id');

  useEffect(() => {
    dispatch(Creators.getVendorsRequest());
  }, [dispatch]);

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.FILTER.TITLE', 'filter');

  return (
    <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="g10CountMin" label={t('FORM.FILTER.G10_COUNT.TITLE')}>
            <AntInputNumber className="w-100" addonAfter="MIN" disabled={!isEditable} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="g10CountMax" label={t('FORM.FILTER.G10_COUNT.TITLE')}>
            <AntInputNumber className="w-100" addonAfter="MAX" disabled={!isEditable} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="gsuCountMin" label={t('FORM.FILTER.GWATER_COUNT.TITLE')}>
            <AntInputNumber className="w-100" addonAfter="MIN" disabled={!isEditable} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="gsuCountMax" label={t('FORM.FILTER.GWATER_COUNT.TITLE')}>
            <AntInputNumber className="w-100" addonAfter="MAX" disabled={!isEditable} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>

        <Col span={8}>
          <Form.Item name="brandIdList" label={t('FORM.FILTER.BRANDS.TITLE')} rules={validationSchema.brandIds}>
            <Select
              options={brandList}
              mode="multiple"
              disabled
              filterOption={getSelectFilterOption}

            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <SelectWithAll
            name="cityIdList"
            label={t('FORM.FILTER.CITY.TITLE')}
            items={cityList}
            rules={validationSchema.cityIdList}
            disabled={!isEditable}
            loading={isCitiesPending}
            showSearch
            filterOption={getSelectFilterOption}
          />
        </Col>
        <Col span={8}>
          <SelectWithAll
            name="vendorIds"
            rules={validationSchema.vendorIds}
            disabled
            label={t('FORM.FILTER.VENDORS.TITLE')}
            items={vendorList}
            loading={isVendorListPending}
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]} align="bottom">
        <Col span={4}>
          <Form.Item name="excludeFieldStaff" valuePropName="checked">
            <Checkbox disabled={!isEditable}>{t('FORM.FILTER.FIELD_STAFF.TITLE')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="excludeWhiteCollar" valuePropName="checked">
            <Checkbox disabled={!isEditable}>{t('FORM.FILTER.WHITE_COLLAR.TITLE')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="platformType" label={t('FORM.FILTER.PLATFORM.TITLE')}>
            <Select options={platformList} mode="multiple" disabled />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default Filter;
