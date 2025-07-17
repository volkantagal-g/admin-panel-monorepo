import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Card, Form, message, Row, Alert } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get, reverse } from 'lodash';
import { useFormik } from 'formik';

import { SelectWrapper, InputWrapper } from '@shared/components/UI/Form';
import { BANNED_COURIERS_POLYGON_TYPE, BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE, FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE } from '@shared/shared/constants';
import {
  BAN_POLYGON_TYPES,
  VEHICLE_TYPES,
  defaultValues,
  GETIR_DOMAIN_TYPES,
} from '../../../utils/constants';
import { validationSchema } from '@app/pages/GIS/BannedAreas/utils/helper';
import { validate } from '@shared/yup';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { bannedAreaPageSelector } from '@app/pages/GIS/BannedAreas/redux/selectors';
import UplaoadDrawer from '../UploadDrawer';

const { useForm } = Form;
function BannedAreaForm(props) {
  const {
    cities,
    handleSelectedCity,
    handleClearSubregions,
    handleMapCenter,
    createBannedArea,
    handleFieldsChange,
  } = props;
  const { t } = useTranslation();
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = useForm();
  const classes = useStyles();
  const geometry = useSelector(bannedAreaPageSelector.getGeometry);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: ({ resetForm, setValues }) => {
      if (geometry) {
        createBannedArea();
        resetForm();
        setIsFormDisabled(false);
        form.resetFields();
        form.setFieldsValue({ ...defaultValues });
        setValues({ ...defaultValues });
      }
      else {
        message.error(t('gisBannedAreasPage:NULL_POLYGON_ERROR'), [1]);
      }
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, handleChange } = formik;

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
      handleFieldsChange({ [fieldName]: selectedItems });
    };
  };

  const handleCityChange = selectedItem => {
    const selectedCity = cities.find(city => {
      return city._id === selectedItem;
    });
    setFieldValue('city', selectedItem);
    setIsFormDisabled(true);
    handleSelectedCity(selectedItem);
    handleClearSubregions();
    handleFieldsChange({ cityId: selectedItem });
    if (selectedItem) {
      return handleMapCenter({ center: reverse([...selectedCity.center.coordinates]) });
    }
    return handleMapCenter({ center: reverse([...cities[1].center.coordinates]) });
  };

  const handleNameChange = value => {
    handleFieldsChange({ name: value });
  };

  const renderVehicleTypeField = () => {
    if (
      values.polygonType === BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE
      ||
      values.polygonType === FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE) {
      return (
        <SelectWrapper
          className={classes.formItemWrapper}
          selectKey="vehicleTypes"
          label={t('gisBannedAreasPage:VEHICLE_TYPE')}
          value={values.vehicleTypes}
          mode="multiple"
          hasError={get(errors, 'vehicleType')}
          isTouched={get(touched, 'vehicleType')}
          optionsData={VEHICLE_TYPES}
          labelTranslationCallback={customLabelTranslation('gisBannedAreasPage:MARKET_VEHICLE_TYPES')}
          onChangeCallback={handleSelectChange('vehicleTypes')}
        />
      );
    }
    return undefined;
  };
  const renderCourierIdField = () => {
    if (values.polygonType === BANNED_COURIERS_POLYGON_TYPE) {
      return (
        <InputWrapper
          className={classes.label}
          inputKey="courierId"
          label={t('gisBannedAreasPage:COURIER_ID')}
          value={values.courierId}
          handleChange={e => {
            setFieldValue('courierId', e.target.value);
            handleFieldsChange({ courierId: e.target.value });
          }}
          hasError={get(errors, 'courierId')}
          isTouched={get(touched, 'courierId')}
          disabled={!isFormDisabled}
        />
      );
    }
    return null;
  };

  const handleAddGeoJsonButton = () => {
    setIsDrawerOpen(true);
  };

  return (
    <Card className={classes.cardWrapper}>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        data-testid="banned-areas-form-test"
      >
        <Col span={24}>
          <SelectWrapper
            className={classes.formItemWrapper}
            selectKey="city"
            label={t('global:CITY')}
            value={values.city}
            hasError={get(errors, 'city')}
            isTouched={get(touched, 'city')}
            optionsData={cities}
            optionLabelProp={`name.${getLangKey()}`}
            optionValueProp="_id"
            onChangeCallback={handleCityChange}
          />
          <SelectWrapper
            className={classes.formItemWrapper}
            selectKey="domainTypes"
            label={t('global:DOMAIN_TYPE')}
            value={values.domainTypes}
            hasError={get(errors, 'domainTypes')}
            isTouched={!!get(touched, 'domainTypes')}
            optionsData={GETIR_DOMAIN_TYPES}
            mode="multiple"
            labelTranslationCallback={customLabelTranslation('global:GETIR_MARKET_DOMAIN_TYPES')}
            onChangeCallback={handleSelectChange('domainTypes')}
            disabled={!isFormDisabled}
          />
          <SelectWrapper
            className={classes.formItemWrapper}
            selectKey="polygonType"
            label={t('gisBannedAreasPage:POLYGON_TYPE')}
            value={values.polygonType}
            hasError={get(errors, 'polygonType')}
            isTouched={!!get(touched, 'polygonType')}
            optionsData={BAN_POLYGON_TYPES}
            labelTranslationCallback={customLabelTranslation('gisBannedAreasPage:GETIR_MARKET_BAN_POLYGON_TYPES')}
            onChangeCallback={handleSelectChange('polygonType')}
            disabled={!isFormDisabled}
          />
          {renderVehicleTypeField()}
          {renderCourierIdField()}
          <InputWrapper
            className={classes.label}
            inputKey="name"
            label={t('NAME_1')}
            value={values.name}
            handleChange={e => {
              handleNameChange(e.target.value);
              handleChange(e);
            }}
            hasError={get(errors, 'name')}
            isTouched={get(touched, 'name')}
            setFieldValue={setFieldValue}
            disabled={!isFormDisabled}
          />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Button
                block
                type="primary"
                htmlType="submit"
                disabled={!isFormDisabled}
              >
                {t('button:ADD')}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block
                type="primary"
                data-testid="banned-areas-show-drawer-button"
                disabled={!isFormDisabled}
                onClick={handleAddGeoJsonButton}
              >
                {t('gisBannedAreasPage:UPLOAD_GEOJSON')}
              </Button>
            </Col>
          </Row>
          <Alert
            className={classes.alertWrapper}
            showIcon
            type="info"
            message={t('gisBannedAreasPage:BAN_INFO')}
          />
        </Col>
      </Form>
      <UplaoadDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </Card>
  );
}

BannedAreaForm.protoTyps = {
  createBannedArea: PropTypes.func,
  handleFieldsChange: PropTypes.func,
};

export default BannedAreaForm;
