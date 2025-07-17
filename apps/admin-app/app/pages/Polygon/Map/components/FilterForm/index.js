import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Switch, Tooltip } from 'antd';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, reverse } from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import { getLangKey } from '@shared/i18n';
import {
  GETIR_MARKET_SUBREGION_INTERVAL_TYPES,
  DELIVERY_SLOTS_GETIR_MARKET_POLYGON_TYPE,
  GETIR_FINANCE_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { validate } from '@shared/yup';
import { polygonsMapSelector } from '../../redux/selectors';
import { GETIR_DOMAIN_TYPES, bannedForCourierPolygonType, polygonTypesForMaps, vehicleTypes } from '../../utils';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const { useForm, Item } = Form;

function FilterForm(props) {
  const {
    getPolygons,
    cities,
    formStatus,
    setMapCenter,
    handleSelectedCity,
    handleMapOptionsChange,
    handleFiltersChange,
    handleMapZoom,
    onConfigToggle,
    isConfigApplied,
  } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const mapOptions = useSelector(polygonsMapSelector.getMapOptions);
  const { canAccess } = usePermission();

  const isPermittedForGetirFinance = canAccess(permKey.PAGE_POLYGON_MAP_COMPONENT_GETIR_FINANCE_EMPLOYEE);
  if (isPermittedForGetirFinance) {
    defaultValues.domainType = GETIR_FINANCE_DOMAIN_TYPE;
  }

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: () => {
      getPolygons();
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
      handleFiltersChange({ [fieldName]: selectedItems });
    };
  };

  const handleCityChange = selectedItem => {
    const selectedCity = cities.find(city => {
      return city._id === selectedItem;
    });
    if (selectedItem === '') {
      handleMapZoom({ zoom: 6 });
    }
    setFieldValue('city', selectedItem);
    handleSelectedCity(selectedItem);
    handleFiltersChange({ city: selectedItem });
    if (selectedItem) {
      return setMapCenter({ center: reverse([...selectedCity.center.coordinates]) });
    }
    handleMapOptionsChange({ isShowWarehousesMarker: false });
    return setMapCenter({ center: reverse([...cities[1].center.coordinates]) });
  };

  const getShowWarehousesMarkerSwitchClassNames = ({ isShowWarehousesMarker }) => {
    if (!values.city) {
      return undefined;
    }
    return isShowWarehousesMarker ? 'bg-success' : 'bg-danger';
  };

  const renderVehicleTypeField = () => {
    if (values.polygonType === bannedForCourierPolygonType) {
      return (
        <Col span={24}>
          <SelectWrapper
            selectKey="vehicleTypes"
            label={t('polygonPage:VEHICLE_TYPE')}
            value={values.vehicleTypes}
            mode="multiple"
            hasError={get(errors, 'vehicleType')}
            isTouched={get(touched, 'vehicleType')}
            optionsData={vehicleTypes}
            labelTranslationCallback={customLabelTranslation('polygonPage:MARKET_VEHICLE_TYPES')}
            onChangeCallback={handleSelectChange('vehicleTypes')}
          />
        </Col>
      );
    }
    return undefined;
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, cities]);

  useEffect(() => {
    handleFiltersChange(values);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={[16]} align="top">
        <Col span={12}>
          <SelectWrapper
            selectKey="polygonType"
            label={t('polygonPage:POLYGON_TYPE')}
            value={values.polygonType}
            hasError={get(errors, 'polygonType')}
            isTouched={get(touched, 'polygonType')}
            optionsData={polygonTypesForMaps}
            labelTranslationCallback={customLabelTranslation('polygonPage:GETIR_MARKET_POLYGON_TYPES')}
            onChangeCallback={handleSelectChange('polygonType')}
            disabled={!formStatus}
          />
        </Col>
        <Col span={12}>
          <SelectWrapper
            selectKey="city"
            label={t('global:CITY')}
            value={values.city}
            hasError={get(errors, 'city')}
            isTouched={get(touched, 'city')}
            optionsData={cities}
            optionLabelProp={`name.${getLangKey()}`}
            optionValueProp="_id"
            onChangeCallback={handleCityChange}
            disabled={!formStatus}
          />
        </Col>
      </Row>
      <Row gutter={[16]} align="top">
        <Col span={12}>
          <SelectWrapper
            selectKey="domainType"
            label={t('global:DOMAIN_TYPE')}
            value={values.domainType}
            hasError={get(errors, 'domainType')}
            isTouched={get(touched, 'domainType')}
            optionsData={GETIR_DOMAIN_TYPES}
            labelTranslationCallback={customLabelTranslation('global:GETIR_MARKET_DOMAIN_TYPES')}
            onChangeCallback={handleSelectChange('domainType')}
            disabled={!formStatus || isPermittedForGetirFinance}
          />
        </Col>
        <Col span={12}>
          <SelectWrapper
            selectKey="subregionIntervalType"
            label={t('polygonPage:SELECT_INTERVAL_TYPE')}
            value={values.subregionIntervalType}
            hasError={get(errors, 'subregionIntervalType')}
            isTouched={get(touched, 'subregionIntervalType')}
            optionsData={GETIR_MARKET_SUBREGION_INTERVAL_TYPES}
            labelTranslationCallback={customLabelTranslation('polygonPage:GETIR_MARKET_SUBREGION_INTERVAL_TYPES')}
            onChangeCallback={handleSelectChange('subregionIntervalType')}
            disabled={!formStatus}
          />
        </Col>
        {renderVehicleTypeField()}
        <Col span={12}>
          <Item label={t('polygonPage:SHOW_WAREHOUSE_MARKERS_ON_MAP')}>
            <Tooltip title={!values.city ? t('polygonPage:SELECT_CITY_TOOLTIP') : undefined}>
              <Switch
                disabled={!values.city}
                checked={mapOptions.isShowWarehousesMarker}
                onChange={status => {
                  handleMapOptionsChange({ isShowWarehousesMarker: status });
                }}
                className={getShowWarehousesMarkerSwitchClassNames({
                  values,
                  isShowWarehousesMarker: mapOptions.isShowWarehousesMarker,
                })}
              />
            </Tooltip>
          </Item>
        </Col>
        <Col span={12}>
          {values.polygonType === DELIVERY_SLOTS_GETIR_MARKET_POLYGON_TYPE && (
          <Item label={t('polygonPage:GET_EVERY_DAY_DELIVERY_HOURS')}>
            <Tooltip title={t('polygonPage:SELECT_EVERY_DAY_DELIVERY_HOURS_DESCRIPTION')}>
              <Switch
                disabled={!values.city}
                checked={isConfigApplied}
                onChange={
                  onConfigToggle
                }
              />
            </Tooltip>
          </Item>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            block
            type={formStatus ? 'primary' : 'default'}
            disabled={!formStatus}
            htmlType="submit"
          >
            {t('button:GET')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

FilterForm.propTypes = {
  getPolygons: PropTypes.func,
  formStatus: PropTypes.bool,
  setMapCenter: PropTypes.func,
  handleSelectedCity: PropTypes.func,
  handleMapOptionsChange: PropTypes.func,
  handleFiltersChange: PropTypes.func,
  handleMapZoom: PropTypes.func,
};

FilterForm.defaultProps = {
  getPolygons: () => {},
  formStatus: false,
  setMapCenter: () => {},
  handleSelectedCity: () => {},
  handleMapOptionsChange: () => {},
  handleFiltersChange: () => {},
  handleMapZoom: () => {},
};

export default FilterForm;
