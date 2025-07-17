import { Form, Row, Col, DatePicker, Slider, Typography, Tooltip, Switch } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { reverse, get } from 'lodash';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { SelectWrapper } from '@shared/components/UI/Form';

import { validate } from '@shared/yup';
import { defaultValues, validationSchema } from './formHelper';
import { GETIR_MARKET_POLYGON_TYPES } from '@shared/shared/constants';
import { GETIR_DOMAIN_TYPES } from '../../utils/constants';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';

import { heatMapSelector } from '@app/pages/GIS/HeatMap/redux/selectors';

const { useForm, Item } = Form;

const FilterForm = ({
  cities,
  mapCenter,
  mapOption,
  handleSelectedCity,
  handleHeatmapFiltersChange,
  handlePolygonFiltersChange,
}) => {
  const { t } = useTranslation();
  const [form] = useForm();
  const classes = useStyles();
  const mapOptions = useSelector(heatMapSelector.getMapOptions);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue } = formik;

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  const handleCityChange = selectedItem => {
    const selectedCity = cities.find(city => {
      return city._id === selectedItem;
    });
    setFieldValue('city', selectedItem);
    handleSelectedCity(selectedItem);
    handlePolygonFiltersChange({ city: selectedItem });
    handleHeatmapFiltersChange({ selectedCity: selectedItem });
    if (selectedItem) {
      return mapCenter({ center: reverse([...selectedCity.center.coordinates]) });
    }
    return mapCenter({ center: reverse([...cities[1].center.coordinates]) });
  };

  const handleDateChange = (dates, dateStrings) => {
    setFieldValue('date', dateStrings);
    const selectedStartDate = dateStrings[0].concat('T00:00:00.000Z');
    const selectedEndDate = dateStrings[1].concat('T23:59:59.999Z');
    handleHeatmapFiltersChange({ startDate: selectedStartDate, endDate: selectedEndDate });
  };

  const range = (start, end) => {
    if (start === end) return [start];
    return [start, ...range(start + 1, end)];
  };

  const handleSliderAfterChange = value => {
    if (value[0] === 0 && value[1] === 24) {
      setFieldValue('hours', []);
      handleHeatmapFiltersChange({ hours: [] });
    }
    const hourArray = range(value[0], value[1]);
    setFieldValue('hours', hourArray);
    handleHeatmapFiltersChange({ hours: hourArray });
  };

  const handleSelectedFilterChange = filter => {
    if (filter === 'domainTypes') {
      return selectedItem => {
        setFieldValue({ [filter]: selectedItem });
        handlePolygonFiltersChange({ [filter]: selectedItem });
        handleHeatmapFiltersChange({ [filter]: selectedItem });
      };
    }
    return selectedItem => {
      setFieldValue({ [filter]: selectedItem });
      handlePolygonFiltersChange({ [filter]: selectedItem });
    };
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical" data-testid="heatmap-form">
      <Row gutter={[16]} align="top">
        <Col span={24}>
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
          />
        </Col>
      </Row>
      <Row gutter={[16]} align="top">
        <Col span={24}>
          <SelectWrapper
            selectKey="polygonTypes"
            label={t('gisHeatMapPage:POLYGON_TYPE')}
            value={values.polygonTypes}
            hasError={get(errors, 'polygonTypes')}
            isTouched={get(touched, 'polygonTypes')}
            optionsData={GETIR_MARKET_POLYGON_TYPES}
            labelTranslationCallback={customLabelTranslation('gisHeatMapPage:GETIR_POLYGON_TYPES')}
            onChangeCallback={handleSelectedFilterChange('polygonTypes')}
          />
        </Col>
      </Row>
      <Row gutter={[16]} align="top">
        <Col span={24}>
          <SelectWrapper
            selectKey="domainTypes"
            label={t('global:DOMAIN_TYPE')}
            value={values.domainTypes}
            hasError={get(errors, 'domainTypes')}
            isTouched={get(touched, 'domainTypes')}
            optionsData={GETIR_DOMAIN_TYPES}
            labelTranslationCallback={customLabelTranslation('global:GETIR_MARKET_DOMAIN_TYPES')}
            onChangeCallback={handleSelectedFilterChange('domainTypes')}
          />
        </Col>
      </Row>
      <Row gutter={[16]} align="top">
        <Col span={24}>
          <Typography.Text>{t('gisHeatMapPage:DATE_RANGE')}</Typography.Text>
          <DatePicker.RangePicker
            selectKey="date"
            className={classes.rangePicker}
            ranges={{
              Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            showTime={false}
            format="YYYY-MM-DD"
            onChange={handleDateChange}
          />
        </Col>
      </Row>
      <Row gutter={[16]} align="top">
        <Col span={24}>
          <Slider
            selectKey="hours"
            marks={{ 0: '00:00', 24: '24:00' }}
            range
            className={classes.sliderWrapper}
            min={0}
            max={24}
            step={1}
            defaultValue={[0, 24]}
            onAfterChange={handleSliderAfterChange}
          />
        </Col>
        <Row gutter={[16]} align="top">
          <Col span={24} className={classes.switchWrapper}>
            <Item label={t('gisHeatMapPage:SHOW_WAREHOUSE')}>
              <Tooltip title={!values.city ? t('gisHeatMapPage:SELECT_CITY') : undefined}>
                <Switch
                  disabled={!values.city}
                  checked={mapOptions.isShowWarehousesMarker}
                  onChange={status => {
                    mapOption({ isShowWarehousesMarker: status });
                  }}
                />
              </Tooltip>
            </Item>
          </Col>
        </Row>
      </Row>
    </Form>
  );
};

FilterForm.propTypes = {
  cities: PropTypes.string,
  mapCenter: PropTypes.func,
  handleSelectedCity: PropTypes.func,
};

FilterForm.defaultProps = {
  cities: '',
  mapCenter: () => null,
  handleSelectedCity: () => null,
};

export default FilterForm;
