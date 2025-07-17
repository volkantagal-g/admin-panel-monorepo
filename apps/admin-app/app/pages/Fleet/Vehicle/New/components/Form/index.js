import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { get } from 'lodash';

import useStyles from './style';
import { DatePickerWrapper } from '@shared/components/UI/Form';
import { initialValues } from './formHelper';
import { vehicleOwnership, marketVehicleTags } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { createVehicleSelector } from '@app/pages/Fleet/Vehicle/New/redux/selector';
import { getVehicleTypeOptions } from './utils';
import { Creators } from '@app/pages/Fleet/Vehicle/New/redux/actions';
import SelectWarehouse from '@shared/containers/Select/Warehouse';

import { getFranchisesSelector } from '@shared/containers/Select/Franchise/redux/selectors';
import { getWarehousesSelector } from '@shared/containers/Select/Warehouse/redux/selectors';

import Card from '@shared/components/UI/AntCard';
import Franchise from '@shared/containers/Select/Franchise';
import Cities from '@shared/containers/Select/City';
import history from '@shared/utils/history';

const { Text } = Typography;

const CreateVehicleForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['marketVehicle']);
  const [form] = Form.useForm();
  const classes = useStyles();
  const [searchParams] = useSearchParams();

  const ownershipOptions = convertConstantValuesToSelectOptions(vehicleOwnership);
  const tagOptions = convertConstantValuesToSelectOptions(marketVehicleTags, false);
  const vehicleType = useSelector(createVehicleSelector?.getVehicleTypeData);
  const isPending = useSelector(createVehicleSelector?.getIsPending);
  const vehicleOptions = getVehicleTypeOptions(vehicleType?.vehicleConstraints);
  const franchises = useSelector(getFranchisesSelector.getData);
  const warehouse = useSelector(getWarehousesSelector.getData);

  const formik = useFormik({ initialValues });

  const { values, setFieldValue, touched, errors } = formik;

  const mandatory = <Text type="danger">*</Text>;

  const handleWarehouse = value => {
    if (value) {
      setFieldValue('warehouse', value);
      let selectedFranchise = {};
      let selectedCity = {};
      franchises.forEach(franchise => {
        franchise.warehouses.forEach(wr => {
          if (wr._id === value) {
            selectedFranchise = franchise;
          }
        });
      });
      warehouse.forEach(wr => {
        if (wr._id === value) {
          selectedCity = wr.city._id;
        }
      });
      setFieldValue('franchise', selectedFranchise?._id);
      setFieldValue('licenceOwner', selectedFranchise?.owners ? selectedFranchise?.owners[0]?.name : null);
      setFieldValue('city', selectedCity);
    }
    else {
      setFieldValue('warehouse ', null);
      setFieldValue('franchise', null);
      setFieldValue('licenceOwner', null);
      setFieldValue('city', null);
    }
  };

  useEffect(() => {
    const clearForm = searchParams.get('clearForm');
    if (clearForm) {
      formik.resetForm({ values: { ...initialValues, isCreatingAnotherVehicle: true } });
      form.resetFields();
      searchParams.delete('clearForm');
      history.replace({
        pathname: '/fleet/vehicle/new',
        search: `?${searchParams.toString()}`,
      });
    }
  }, [searchParams, formik, form]);

  const handleDisableDate = current => {
    const customDate = moment().format('YYYY-MM-DD');
    return current && current > moment(customDate, 'YYYY-MM-DD');
  };

  const handleInspectionDisableDate = current => {
    return !current || current.isBefore(moment());
  };

  return (
    <Card>
      <Form
        form={form}
        onFinish={() => {
          dispatch(Creators.createVehicleRequest(formik.values));
        }}
      >
        <Card
          title={t('marketVehicle:NEW_VEHICLE_DETAILS')}
          footer={(
            <Space>
              <Checkbox
                data-testid="isCreatingAnotherVehicle"
                checked={values.isCreatingAnotherVehicle}
                onChange={event => setFieldValue('isCreatingAnotherVehicle', event.target.checked)}
              >{t('marketVehicle:CREATE_ANOTHER_VEHICLE')}
              </Checkbox>
              <Button
                data-testid="createVehicle"
                size="small"
                type="primary"
                htmlType="submit"
                loading={isPending}
              >
                {t('button:CREATE')}
              </Button>
            </Space>
          )}
        >
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:VEHICLE_TYPE')} {mandatory}</Text>
              <Form.Item
                name="constraintId"
                rules={[{ required: true, message: t('global:INVALID') }]}
                value={values.constraintId}
                className={classes.wrapper}
              >
                <Select
                  showArrow
                  data-testid="vehicleType"
                  allowClear
                  options={vehicleOptions}
                  onChange={value => (value ? setFieldValue('constraintId', value) : setFieldValue('constraintId ', null))}
                  placeholder={t('marketVehicle:VEHICLE_TYPE')}
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:PLATE')} {mandatory}</Text>
              <Form.Item
                name="plate"
                value={values.plate}
                rules={[{ required: true, message: t('global:INVALID') }]}
                onChange={event => setFieldValue('plate', event.target.value)}
              >
                <Input
                  placeholder={t('marketVehicle:PLATE')}
                  data-testid="plateTest"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:WAREHOUSE')} {mandatory}</Text>
              <Form.Item
                rules={[{ required: true, message: t('global:INVALID') }]}
                name="warehouse"
                help={get(touched, 'warehouse') && get(errors, 'warehouse')}
                validateStatus={errors.warehouse && touched.warehouse ? 'error' : 'success'}
              >
                <SelectWarehouse
                  value={values.warehouse}
                  dataTestId="testWarehouse"
                  needObject
                  onChange={handleWarehouse}
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:FRANCHISE')} {mandatory}</Text>
              <Franchise
                disabled
                value={values.franchise}
              />
            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:CITY')} {mandatory}</Text>
              <Cities
                mode="single"
                isDisabled
                value={values.city}
              />
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:LICENSE_HOLDER')} {mandatory}</Text>
              <Form.Item
                name="licenceOwner"
                rules={[{ required: true, message: t('global:INVALID') }]}
                data-testid="licenseHolderTestKey"
                value={values.licenceOwner}
                onChange={event => setFieldValue('licenceOwner', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:LICENSE_HOLDER')} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:LICENSE_SERIES')}</Text>
              <Form.Item
                name="licenceSerial"
                data-testid="licenseSeriesTest"
                value={values.licenceSerial}
                onChange={event => setFieldValue('licenceSerial', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:LICENSE_SERIES')} />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:LICENSE_NUMBER')}</Text>
              <Form.Item
                name="licenceNumber"
                value={values.licenceNumber}
                onChange={event => setFieldValue('licenceNumber', event.target.value)}
              >
                <Input type="number" placeholder={t('marketVehicle:LICENSE_NUMBER')} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:LICENSE_PICTURE')}</Text>
              <Form.Item
                data-testid="licensePictureTest"
                name="licenceImage"
                value={values.licenceImage}
                onChange={event => setFieldValue('licenceImage', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:LICENSE_PICTURE')} />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:BRAND')}</Text>
              <Form.Item
                data-testid="brandTest"
                name="brand"
                value={values.brand}
                onChange={event => setFieldValue('brand', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:BRAND')} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:MODEL')}</Text>
              <Form.Item
                name="tradeName"
                data-testid="modelTest"
                value={values.tradeName}
                onChange={event => setFieldValue('tradeName', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:MODEL')} />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:MODEL_YEAR')}</Text>
              <Form.Item
                data-testid="modelYearTest"
                name="modelYear"
                value={values.modelYear}
                onChange={event => setFieldValue('modelYear', event.target.value)}
              >
                <Input type="number" placeholder={t('marketVehicle:MODEL_YEAR')} />
              </Form.Item>

            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:COLOR')}</Text>
              <Form.Item
                data-testid="colorTest"
                name="color"
                value={values.color}
                onChange={event => setFieldValue('color', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:COLOR')} />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:GRADE')}</Text>
              <Form.Item
                data-testid="gradeTest"
                name="chasis"
                value={values.chasis}
                onChange={event => setFieldValue('chasis', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:GRADE')} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:BODY_TYPE')}</Text>
              <Form.Item
                data-testid="bodyTest"
                name="kind"
                value={values.kind}
                onChange={event => setFieldValue('kind', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:BODY_TYPE')} />
              </Form.Item>

            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:ENGINE_DETAILS')}</Text>
              <Form.Item
                data-testid="engineTest"
                name="engineNumber"
                value={values.engineNumber}
                onChange={event => setFieldValue('engineNumber', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:ENGINE_DETAILS')} />
              </Form.Item>

            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:CHASSIS_NUMBER')}</Text>
              <Form.Item
                data-testid="chassisTest"
                name="identityNumber"
                value={values.identityNumber}
                onChange={event => setFieldValue('identityNumber', event.target.value)}
              >
                <Input placeholder={t('marketVehicle:CHASSIS_NUMBER')} />
              </Form.Item>

            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:INSPECTION_DATE')}</Text>
              <DatePickerWrapper
                dataTestId="inspectionTest"
                disabledDate={handleInspectionDisableDate}
                selectKey="inspectionValidityDate"
                size="large"
                format="DD/MM/YYYY"
                value={values.inspectionValidityDate}
                allowClear={false}
                onChangeCallback={value => setFieldValue('inspectionValidityDate', value)}
              />
            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:FIRST_REGISTRY')} {mandatory}</Text>
              <DatePickerWrapper
                dataTestId="firstRegistryTest"
                disabledDate={handleDisableDate}
                selectKey="firstRegistrationDate"
                size="large"
                format="DD/MM/YYYY"
                value={values.firstRegistrationDate}
                allowClear={false}
                onChangeCallback={value => setFieldValue('firstRegistrationDate', value)}
              />
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:REGISTRY_DATE')}</Text>
              <DatePickerWrapper
                disabledDate={handleDisableDate}
                selectKey="registrationDate"
                dataTestId="registryTest"
                size="large"
                format="DD/MM/YYYY"
                value={values.registrationDate}
                allowClear={false}
                onChangeCallback={value => setFieldValue('registrationDate', value)}
              />
            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:OWNERSHIP_STATUS')} {mandatory}</Text>
              <Form.Item
                name="ownershipType"
                data-testid="ownershipTest"
                rules={[{ required: true, message: t('global:INVALID') }]}
                value={values.ownershipType}
                className={classes.wrapper}
              >
                <Select
                  showArrow
                  allowClear
                  options={ownershipOptions}
                  onChange={value => setFieldValue('ownershipType', value)}
                  placeholder={t('marketVehicle:SELECT_OWNERSHIP_STATUS')}
                />
              </Form.Item>

            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:TAGS')} {mandatory}</Text>
              <Form.Item
                value={values.tags || []}
                initialValues={values.tags}
                rules={[{ required: true, message: t('global:INVALID') }]}
                name="tags"
                data-testid="tagsTest"
                className={classes.wrapper}
              >
                <Select
                  mode="multiple"
                  showArrow
                  allowClear
                  onChange={value => (value ? setFieldValue('tags', value) : setFieldValue('tags', null))}
                  options={tagOptions}
                  placeholder={t('marketVehicle:TAGS')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Card>
  );
};

export default CreateVehicleForm;
