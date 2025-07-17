import { useEffect } from 'react';
import { Form, Row, Col, Button, Tooltip, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { get } from 'lodash';

import { useSelector } from 'react-redux';

import { SelectWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import { defaultValues, validationSchema } from './formHelper';
import {
  GETIR_MARKET_SUBREGION_INTERVAL_TYPES,
  GETIR_MARKET_POLYGON_TYPES,
} from '@shared/shared/constants';

import { getLangKey } from '@shared/i18n';
import { locationIntelligenceSelector } from '../../redux/selectors';
import { GETIR_DOMAIN_TYPES } from '../../utils/constants';

const { useForm, Item } = Form;

const PolygonFilter = ({
  getPolygons,
  cities,
  onFiltersChange,
  onMapOptionsChange,
  onCityChange,
  isFormDisabled,
}) => {
  const { t } = useTranslation();
  const [form] = useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: () => {
      getPolygons();
    },
    enableReinitialize: true,
  });
  const mapOptions = useSelector(locationIntelligenceSelector.getMapOptions);

  const { handleSubmit, values, errors, touched, setFieldValue } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
      onFiltersChange({ [fieldName]: selectedItems });
    };
  };

  const handleCityChange = selectedItem => {
    const selectedCity = cities.find(city => {
      return city._id === selectedItem;
    });
    setFieldValue('city', selectedItem);
    onFiltersChange({ city: selectedItem });
    onMapOptionsChange({ isShowWarehousesMarker: false });
    onCityChange({ selectedCity });
    return selectedCity;
  };

  const getShowWarehousesMarkerSwitchClassNames = ({ isShowWarehousesMarker }) => {
    if (!values.city) {
      return undefined;
    }
    return isShowWarehousesMarker ? 'bg-success' : 'bg-danger';
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, cities]);

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={[16]} align="top">
        <Col span={12}>
          <SelectWrapper
            selectKey="polygonType"
            placeholder={t('global:POLYGON_TYPE')}
            label={t('global:POLYGON_TYPE')}
            value={values.polygonType}
            hasError={get(errors, 'polygonType')}
            isTouched={!!get(touched, 'polygonType')}
            optionsData={GETIR_MARKET_POLYGON_TYPES}
            labelTranslationCallback={customLabelTranslation('gisLocationIntelligencePage:GETIR_POLYGON_TYPES')}
            onChangeCallback={handleSelectChange('polygonType')}
            disabled={isFormDisabled}
          />
        </Col>
        <Col span={12}>
          <SelectWrapper
            selectKey="city"
            placeholder={t('global:CITY')}
            label={t('global:CITY')}
            value={values.city}
            hasError={get(errors, 'city')}
            isTouched={get(touched, 'city')}
            optionsData={cities}
            optionLabelProp={`name.${getLangKey()}`}
            optionValueProp="_id"
            onChangeCallback={handleCityChange}
            disabled={isFormDisabled}
          />
        </Col>
      </Row>
      <Row gutter={[16]} align="top">
        <Col span={12}>
          <SelectWrapper
            selectKey="domainType"
            placeholder={t('global:DOMAIN_TYPE')}
            label={t('global:DOMAIN_TYPE')}
            value={values.domainType}
            hasError={get(errors, 'domainType')}
            isTouched={get(touched, 'domainType')}
            optionsData={GETIR_DOMAIN_TYPES}
            labelTranslationCallback={customLabelTranslation('global:GETIR_MARKET_DOMAIN_TYPES')}
            onChangeCallback={handleSelectChange('domainType')}
            disabled={isFormDisabled}
          />
        </Col>
        <Col span={12}>
          <SelectWrapper
            selectKey="subregionIntervalType"
            placeholder={t('gisLocationIntelligencePage:SELECT_INTERVAL_TYPE')}
            label={t('gisLocationIntelligencePage:SUBREGION_INTERVAL_TYPE_TITLE')}
            value={values.subregionIntervalType}
            hasError={get(errors, 'subregionIntervalType')}
            isTouched={get(touched, 'subregionIntervalType')}
            optionsData={GETIR_MARKET_SUBREGION_INTERVAL_TYPES}
            labelTranslationCallback={customLabelTranslation('gisLocationIntelligencePage:GETIR_SUBREGION_INTERVAL_TYPES')}
            onChangeCallback={handleSelectChange('subregionIntervalType')}
            disabled={isFormDisabled}
          />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={10}>
          <Item>
            <Tooltip title={!values.city ? t('gisLocationIntelligencePage:SELECT_CITY_TOOLTIP') : undefined}>
              <Switch
                checkedChildren={t('gisLocationIntelligencePage:SHOW_WAREHOUSE_MARKERS_OF_MAP')}
                unCheckedChildren={t('gisLocationIntelligencePage:SHOW_WAREHOUSE_MARKERS_ON_MAP')}
                disabled={!values.city}
                checked={mapOptions.isShowWarehousesMarker}
                onChange={status => {
                  onMapOptionsChange({ isShowWarehousesMarker: status });
                }}
                className={getShowWarehousesMarkerSwitchClassNames({
                  values,
                  isShowWarehousesMarker: mapOptions.isShowWarehousesMarker,
                })}
              />
            </Tooltip>
          </Item>
        </Col>
        <Col span={14}>
          <Button
            block
            shape="round"
            type="primary"
            htmlType="submit"
            disabled={isFormDisabled}
          >
            {t('gisLocationIntelligencePage:GET_POLYGONS')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PolygonFilter;
