import { useEffect, useState } from 'react';
import { Button, Col, Card, Form, message, Row, Alert, TimePicker, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get, reverse } from 'lodash';
import { useFormik } from 'formik';

import moment from 'moment';

import { SelectWrapper, InputWrapper } from '@shared/components/UI/Form';
import { GETIR_DOMAIN_TYPE_CODES, BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE } from '@shared/shared/constants';
import { SCHEDULED_BAN_POLYGON_TYPES, VEHICLE_TYPES, weekDays } from '@app/pages/GIS/BannedAreas/utils/constants';
import { validationSchema, defaultValues } from './formHelper';
import { validate } from '@shared/yup';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { bannedAreaPageSelector } from '@app/pages/GIS/BannedAreas/redux/selectors';

import UplaoadDrawer from '../UploadDrawer';

const { RangePicker: DateRangePicker } = DatePicker;
const { RangePicker: TimeRangePicker } = TimePicker;

const { useForm } = Form;
function ScheduledBannedAreaForm(props) {
  const {
    cities,
    handleSelectedCity,
    handleClearSubregions,
    handleMapCenter,
    createScheduledBannedArea,
    handleFieldsChange,
  } = props;
  const { t } = useTranslation('gisBannedAreasPage');
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
        createScheduledBannedArea();
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
    setFieldValue('cityId', selectedItem);
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
    if (values.polygonType === BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE) {
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

  const handleAddGeoJsonButton = () => {
    setIsDrawerOpen(true);
  };
  const handleTimeRangeChange = value => {
    let startTime = null;
    let endTime = null;
    if (value) {
      startTime = moment(value[0]).utc().format('HH:mm');
      endTime = moment(value[1]).utc().format('HH:mm');
    }
    setFieldValue('startTime', startTime);
    setFieldValue('endTime', endTime);
    handleFieldsChange({ startTime });
    handleFieldsChange({ endTime });
  };

  const handleDateRangeChange = value => {
    if (value) {
      const startDate = moment(value[0]).utc().format('YYYY-MM-DD');
      const endDate = moment(value[1]).utc().format('YYYY-MM-DD');
      setFieldValue('startDate', startDate);
      setFieldValue('endDate', endDate);
      handleFieldsChange({ startDate });
      handleFieldsChange({ endDate });
    }
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <Card className={classes.cardWrapper}>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        data-testid="scheduled-banned-areas-form-test"
      >
        <Col span={24}>
          <SelectWrapper
            className={classes.formItemWrapper}
            selectKey="cityId"
            label={t('global:CITY')}
            value={values.cityId}
            hasError={get(errors, 'cityId')}
            isTouched={get(touched, 'cityId')}
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
            optionsData={GETIR_DOMAIN_TYPE_CODES}
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
            optionsData={SCHEDULED_BAN_POLYGON_TYPES}
            labelTranslationCallback={customLabelTranslation('gisBannedAreasPage:GETIR_MARKET_BAN_POLYGON_TYPES')}
            onChangeCallback={handleSelectChange('polygonType')}
            disabled={!isFormDisabled}
          />
          {renderVehicleTypeField()}
          <Form.Item
            name="dateRange"
            label={t('DATE_RANGE')}
            help={get(errors, 'startDate') || get(errors, 'endDate')}
            validateStatus={(get(errors, 'startDate') || get(errors, 'endDate')) ? 'error' : 'success'}
          >
            <DateRangePicker
              className="w-100"
              format="YYYY-MM-DD"
              values={[moment(values.startDate), moment(values.endDate)]}
              allowClear={false}
              onChange={handleDateRangeChange}
              disabled={!isFormDisabled}
              disabledDate={current => {
                return current && current < moment().startOf('day');
              }}
            />
          </Form.Item>
          <Form.Item
            name="hourRange"
            label={t('gisBannedAreasPage:HOUR_RANGE')}
            help={get(errors, 'startTime') || get(errors, 'endTime')}
            validateStatus={(get(errors, 'startTime') || get(errors, 'endTime')) ? 'error' : 'success'}
          >
            <TimeRangePicker
              className="w-100"
              format="HH:mm"
              onChange={handleTimeRangeChange}
              showNow={false}
              order={false}
              minuteStep={30}
              disabled={!isFormDisabled}
            />
          </Form.Item>
          <SelectWrapper
            className={classes.formItemWrapper}
            selectKey="activeDays"
            label={t('gisBannedAreasPage:ACTIVE_DAYS')}
            value={values.activeDays}
            mode="multiple"
            hasError={get(errors, 'activeDays')}
            isTouched={get(touched, 'activeDays')}
            optionsData={weekDays}
            labelTranslationCallback={customLabelTranslation('gisBannedAreasPage:WEEK_DAYS')}
            onChangeCallback={handleSelectChange('activeDays')}
          />
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

export default ScheduledBannedAreaForm;
