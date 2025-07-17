import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { getLangKey } from '@shared/i18n';
import { validate } from '@shared/yup';
import WarehouseMap from '../WarehouseMap';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { useSAPReference } from '../SAPReferenceContext';

const { useForm } = Form;

function AddressInfo(props) {
  const {
    address,
    country,
    city,
    region,
    postCode,
    location,
    cities,
    regions,
    getCitiesRequest,
    getRegionsRequest,
    submitRequest,
  } = props;
  const { t } = useTranslation();
  const { canAccess } = usePermission();

  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const initialProps = { address, country, city, region, postCode, location };

  const { hasSAPReferenceCode } = useSAPReference();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }

      submitRequest(values);

      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue, setValues } = formik;

  const handleCityChange = selectedCityId => {
    if (values.region) {
      setFieldValue('region', '');
    }
    setFieldValue('city', selectedCityId);
    if (selectedCityId) {
      getRegionsRequest({ cityId: selectedCityId });
    }
  };

  const handleCountryChange = selectedCountryId => {
    if (values.city) {
      setFieldValue('city', '');
      setFieldValue('region', '');
    }
    setFieldValue('country', selectedCountryId);
    getCitiesRequest({ countryId: selectedCountryId });
  };

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return;
    }

    if (values.country !== initialProps.country) {
      handleCountryChange(initialProps.country);
      handleCityChange(initialProps.city);
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  useEffect(() => {
    form.setFieldsValue({ address, country, city, region, postCode, location });
    setValues({ address, country, city, region, postCode, location });
  }, [form, setValues, address, country, city, region, postCode, location]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, cities, regions]);

  useEffect(() => {
    getCitiesRequest({ countryId: country });
    if (city) {
      getRegionsRequest({ cityId: city });
    }
  }, [getCitiesRequest, getRegionsRequest, country, city]);

  const handleDragEnd = position => {
    const { lat, lng } = position;
    const coordinates = [lng, lat];
    setFieldValue('location.coordinates', coordinates);
  };

  return (
    <Card title={t('warehousePage:ADDRESS_INFO')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <InputWrapper
              inputKey="address"
              label={t('ADDRESS')}
              value={values.address}
              isTouched={!!_.get(touched, 'address')}
              hasError={_.get(errors, 'address')}
              handleChange={handleChange}
              disabled={!isFormEditable || hasSAPReferenceCode}
            />
          </Col>
          <Col span={12}>
            <SelectWrapper
              selectKey="city"
              label={t('CITY')}
              value={values.city}
              hasError={_.get(errors, 'city')}
              isTouched={!!_.get(touched, 'city')}
              optionsData={cities}
              optionLabelProp={`name.${getLangKey()}`}
              optionValueProp="_id"
              onChangeCallback={handleCityChange}
              disabled={!isFormEditable || hasSAPReferenceCode}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="region"
              label={t('REGION')}
              value={values.region}
              hasError={_.get(errors, 'region')}
              isTouched={!!_.get(touched, 'region')}
              optionsData={regions}
              optionLabelProp={`name.${getLangKey()}`}
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('region')}
              disabled={!isFormEditable}
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              inputKey="postCode"
              label={t('warehousePage:POST_CODE')}
              value={values.postCode}
              isTouched={!!_.get(touched, 'postCode')}
              hasError={_.get(errors, 'postCode')}
              handleChange={handleChange}
              disabled={!isFormEditable || hasSAPReferenceCode}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="bottom">
          <WarehouseMap isDraggable={isFormEditable} coordinates={values.location.coordinates} handleDragEnd={handleDragEnd} />
        </Row>
        {canAccess(permKey.PAGE_WAREHOUSE_DETAIL_EDIT_ADDRESS) && (
          <Row>
            <Col span={24}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={setIsFormEditable}
                handleReset={handleResetForm}
              />
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
}

AddressInfo.propTypes = {
  address: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  region: PropTypes.string,
  postCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  location: PropTypes.shape({}),
  submitRequest: PropTypes.func,
};

AddressInfo.defaultProps = {
  address: null,
  country: null,
  city: null,
  region: null,
  postCode: null,
  location: { coordinates: [0, 0] },
  submitRequest: () => { },
};

export default AddressInfo;
