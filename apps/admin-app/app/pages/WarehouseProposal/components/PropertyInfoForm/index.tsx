import { useEffect } from 'react';
import { Row, Col, Checkbox, InputNumber, Input, Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import Card from '@shared/components/UI/AntCard';
import SelectCities from '../SelectCities';
import SelectDistrict from '../SelectDistrict';
import SelectNeighborhood from '../SelectNeighborhood';
import { getImmovablePropertyOptions, getTaxTypeOptions } from '../../Create/formHelper';
import { IPropertyInfoFormProps } from '../../interfaces';

const PropertyInfoForm: React.FC<IPropertyInfoFormProps> = ({
  isDisabled,
  values,
  errors,
  touched,
  handleChange,
  onDetail,
  note,
}) => {
  const { t } = useTranslation('warehouseProposalPage');
  const dispatch = useDispatch();
  const selectedCountry = useSelector(getSelectedCountryV2);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest({ countryId: selectedCountry._id }));
  }, [dispatch, selectedCountry._id]);

  const onCheckboxChange = (fieldName: string) => (e: CheckboxChangeEvent) => {
    handleChange(`property.${fieldName}`, e.target.checked);
  };

  const onCityChange = (value: string) => {
    handleChange('property.city', value);
    handleChange('property.district', '');
    handleChange('property.neighborhood', '');
  };

  const onDistrictChange = (value: string) => {
    handleChange('property.district', value);
    handleChange('property.neighborhood', '');
  };

  const onNeighborhoodChange = (value: string) => {
    handleChange('property.neighborhood', value);
  };

  return (
    <Col span={24}>
      <Card title={t('PROPERTY.TITLE')}>
        <Row gutter={[24, 24]} align="bottom">
          <Col span={12}>
            <SelectCities
              errors={errors}
              touched={touched}
              disabled={isDisabled}
              value={values?.city}
              onChangeCallback={onCityChange}
            />
          </Col>
          <Col span={12}>
            <SelectDistrict
              errors={errors}
              touched={touched}
              disabled={isDisabled || !values?.city}
              value={values?.district}
              onChangeCallback={onDistrictChange}
              city={values?.city}
            />
          </Col>
          <Col span={12}>
            <SelectNeighborhood
              errors={errors}
              touched={touched}
              disabled={isDisabled || !values?.district}
              value={values?.neighborhood}
              onChangeCallback={onNeighborhoodChange}
              district={values?.district}
            />
          </Col>
          <Col span={12}>
            <Form.Item
              help={touched?.addressDescription && errors?.addressDescription}
              validateStatus={touched?.addressDescription && errors?.addressDescription ? 'error' : 'success'}
              label={t('PROPERTY.ADDRESS_DESCRIPTION')}
            >
              <Input
                value={values?.addressDescription}
                onChange={e => {
                  handleChange('property.addressDescription', e.target.value);
                }}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={touched?.street && errors?.street}
              validateStatus={touched?.street && errors?.street ? 'error' : 'success'}
              label={t('global:STREET')}
            >
              <Input
                value={values?.street}
                onChange={e => {
                  handleChange('property.street', e.target.value);
                }}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={touched?.buildingNo && errors?.buildingNo}
              validateStatus={touched?.buildingNo && errors?.buildingNo ? 'error' : 'success'}
              label={t('PROPERTY.OUTER_DOOR_NO')}
            >
              <Input
                value={values?.buildingNo}
                onChange={e => {
                  handleChange('property.buildingNo', e.target.value);
                }}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('PROPERTY.GROUND_FLOOR_NET_SQUARE_METER')}
              help={touched?.netFloorSize && errors?.netFloorSize}
              validateStatus={touched?.netFloorSize && errors?.netFloorSize ? 'error' : 'success'}
            >
              <InputNumber
                className="w-100"
                disabled={isDisabled}
                type="number"
                value={values?.netFloorSize}
                onChange={value => {
                  handleChange('property.netFloorSize', Number(value));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('PROPERTY.BASEMENT_NET_SQUARE_METER')}
              help={touched?.netBasementSize && errors?.netBasementSize}
              validateStatus={touched?.netBasementSize && errors?.netBasementSize ? 'error' : 'success'}
            >
              <InputNumber
                className="w-100"
                disabled={isDisabled}
                type="number"
                value={values?.netBasementSize}
                onChange={value => {
                  handleChange('property.netBasementSize', Number(value));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('PROPERTY.MEZZANINE_NET_SQUARE_METER')}
              help={touched?.netMezzanineSize && errors?.netMezzanineSize}
              validateStatus={touched?.netMezzanineSize && errors?.netMezzanineSize ? 'error' : 'success'}
            >
              <InputNumber
                className="w-100"
                disabled={isDisabled}
                type="number"
                value={values?.netMezzanineSize}
                onChange={value => {
                  handleChange('property.netMezzanineSize', Number(value));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('PROPERTY.TOTAL_NET_SQUARE_METER')}
              help={touched?.netTotalSize && errors?.netTotalSize}
              validateStatus={touched?.netTotalSize && errors?.netTotalSize ? 'error' : 'success'}
            >
              <InputNumber
                className="w-100"
                disabled={isDisabled}
                type="number"
                value={values?.netTotalSize}
                onChange={value => {
                  handleChange('property.netTotalSize', Number(value));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('global:RENT')}
              help={touched?.rent && errors?.rent}
              validateStatus={touched?.rent && errors?.rent ? 'error' : 'success'}
            >
              <InputNumber
                className="w-100"
                disabled={isDisabled}
                type="number"
                value={values?.rent}
                onChange={value => {
                  handleChange('property.rent', Number(value));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={touched?.taxType && errors?.taxType}
              validateStatus={touched?.taxType && errors?.taxType ? 'error' : 'success'}
              label={t('PROPERTY.TAX_TYPE')}
            >
              <Select
                value={values?.taxType}
                options={getTaxTypeOptions(t)}
                onChange={value => {
                  handleChange('property.taxType', value);
                }}
                disabled={isDisabled}
                placeholder={t('PROPERTY.TAX_TYPE')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={touched?.kind && errors?.kind}
              validateStatus={touched?.kind && errors?.kind ? 'error' : 'success'}
              label={t('PROPERTY.IMMOVABLE_PROPERTY')}
            >
              <Select
                value={values?.kind}
                options={getImmovablePropertyOptions(t)}
                onChange={value => {
                  handleChange('property.kind', value);
                }}
                disabled={isDisabled}
                placeholder={t('PROPERTY.IMMOVABLE_PROPERTY')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={touched?.year && errors?.year}
              validateStatus={touched?.year && errors?.year ? 'error' : 'success'}
              label={t('global:YEAR')}
            >
              <InputNumber
                className="w-100"
                disabled={isDisabled}
                type="number"
                value={values?.year}
                onChange={value => {
                  handleChange('property.year', Number(value));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Checkbox
              disabled={isDisabled}
              checked={values?.hasOccupancyPermit}
              onChange={onCheckboxChange('hasOccupancyPermit')}
            >
              {t('PROPERTY.HAS_BUILDING_USE_PERMIT')}
            </Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox
              disabled={isDisabled}
              checked={values?.hasConstructionRegistration}
              onChange={onCheckboxChange('hasConstructionRegistration')}
            >
              {t('PROPERTY.HAS_REGISTRATION_CERTIFICATE')}
            </Checkbox>
          </Col>
          <Col span={12}>
            <Form.Item
              help={touched?.note && errors?.note}
              validateStatus={touched?.note && errors?.note ? 'error' : 'success'}
              label={t('global:NOTE')}
            >
              <Input
                value={values?.note || note}
                onChange={e => {
                  handleChange('property.note', e.target.value);
                }}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default PropertyInfoForm;
