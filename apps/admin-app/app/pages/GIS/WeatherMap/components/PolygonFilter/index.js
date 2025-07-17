import { useEffect } from 'react';
import { Form, Row, Col, Button, Tooltip, Switch, DatePicker, Space } from 'antd';

import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { get } from 'lodash';

import { useSelector } from 'react-redux';

import moment from 'moment';

import { SelectWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import { defaultValues, validationSchema } from './formHelper';
import {
  DATE_FORMAT,
  DATE_FORMAT_FOR_FORM,
  DOMAIN_TYPES,
  POLYGON_TYPES,
  SUBREGION_INTERVAL_TYPES,
} from '../../utils/constants';

import { getLangKey } from '@shared/i18n';
import { weatherMapSelector } from '../../redux/selectors';
import useStyles from './styles';

const { useForm, Item } = Form;

const PolygonFilter = ({
  getPolygons,
  cities,
  onPolygonFiltersChange,
  onWeatherFiltersChange,
  handleMapOptionsChange,
  onCityChange,
  isFormDisabled,
}) => {
  const { t } = useTranslation('gisWeatherMapPage');
  const [form] = useForm();

  const classes = useStyles();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: () => {
      getPolygons();
    },
    enableReinitialize: true,
  });
  const mapOptions = useSelector(weatherMapSelector.getMapOptions);

  const { handleSubmit, values, errors, touched, setFieldValue } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
      onPolygonFiltersChange({ [fieldName]: selectedItems });
    };
  };

  const handleCityChange = selectedItem => {
    const selectedCity = cities.find(city => {
      return city._id === selectedItem;
    });
    setFieldValue('city', selectedItem);
    onPolygonFiltersChange({ city: selectedItem });
    handleMapOptionsChange({ isShowWarehousesMarker: false });
    onCityChange({ selectedCity });

    return selectedCity;
  };

  const getShowWarehousesMarkerSwitchClassNames = ({ isShowWarehousesMarker }) => {
    if (!values.city) {
      return undefined;
    }
    return isShowWarehousesMarker ? 'bg-success' : 'bg-danger';
  };

  const handleDateFieldsChange = startDate => {
    const startDateString = startDate.format(DATE_FORMAT);
    const endDateString = moment(startDateString).add(1, 'days').format(DATE_FORMAT);
    setFieldValue('startDate', startDateString);
    setFieldValue('endDate', endDateString);
    onWeatherFiltersChange({ startDate: startDateString, endDate: endDateString });
  };

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, cities]);

  useEffect(() => {
    onWeatherFiltersChange({ startDate: values.startDate, endDate: values.endDate });
  }, [onWeatherFiltersChange, values.endDate, values.startDate]);

  const disabledDate = current => {
    const initialDate = moment('2023-12-01');

    return current && current < initialDate;
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
            optionsData={POLYGON_TYPES}
            labelTranslationCallback={customLabelTranslation('gisWeatherMapPage:GETIR_POLYGON_TYPES')}
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
            optionsData={DOMAIN_TYPES}
            labelTranslationCallback={customLabelTranslation('global:GETIR_MARKET_DOMAIN_TYPES')}
            onChangeCallback={handleSelectChange('domainType')}
            disabled={isFormDisabled}
          />
        </Col>
        <Col span={12}>
          <SelectWrapper
            selectKey="subregionIntervalType"
            placeholder={t('gisWeatherMapPage:SELECT_INTERVAL_TYPE')}
            label={t('gisWeatherMapPage:SUBREGION_INTERVAL_TYPE_TITLE')}
            value={values.subregionIntervalType}
            hasError={get(errors, 'subregionIntervalType')}
            isTouched={get(touched, 'subregionIntervalType')}
            optionsData={SUBREGION_INTERVAL_TYPES}
            labelTranslationCallback={customLabelTranslation('gisWeatherMapPage:GETIR_SUBREGION_INTERVAL_TYPES')}
            onChangeCallback={handleSelectChange('subregionIntervalType')}
            disabled={isFormDisabled}
          />
        </Col>
      </Row>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: 'flex' }}
      >
        <Row gutter={[16, 16]} align="top">
          <Col span={24}>
            <DatePicker
              format={DATE_FORMAT_FOR_FORM}
              disabledDate={disabledDate}
              allowClear={false}
              onChange={handleDateFieldsChange}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="space-between">
          <Col xs={12} sm={12} md={12} lg={10}>
            <Item>
              <Tooltip title={!values.city ? t('gisWeatherMapPage:SELECT_CITY_TOOLTIP') : undefined}>
                <Switch
                  checkedChildren={t('gisWeatherMapPage:SHOW_WAREHOUSE_MARKERS_OF_MAP')}
                  unCheckedChildren={t('gisWeatherMapPage:SHOW_WAREHOUSE_MARKERS_ON_MAP')}
                  disabled={!values.city}
                  checked={mapOptions.isShowWarehousesMarker}
                  onChange={status => {
                    handleMapOptionsChange({ isShowWarehousesMarker: status });
                  }}
                  className={`${classes.warehouseSwitch} ${getShowWarehousesMarkerSwitchClassNames({
                    values,
                    isShowWarehousesMarker: mapOptions.isShowWarehousesMarker,
                  })}`}
                />
              </Tooltip>
            </Item>
          </Col>
          <Col xs={12} sm={12} md={12} lg={14}>
            <Button
              block
              className={classes.getWeatherButton}
              shape="round"
              type="primary"
              htmlType="submit"
              disabled={isFormDisabled}
            >
              {t('gisWeatherMapPage:GET_WEATHER_FORECASTS')}
            </Button>
          </Col>
        </Row>
      </Space>
    </Form>
  );
};

export default PolygonFilter;
