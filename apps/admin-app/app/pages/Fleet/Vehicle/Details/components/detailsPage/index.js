import { useEffect, useMemo, useState } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Typography, Select, Input } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import useStyles from './style';
import { DatePickerWrapper } from '@shared/components/UI/Form';
import { intialValues, findFranchise, findCity } from './formHelper';
import { vehicleOwnership, marketVehicleTags } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { getVehicleTypeOptions } from './utils';
import SelectWarehouse from '@shared/containers/Select/Warehouse';

import { getFranchisesSelector } from '@shared/containers/Select/Franchise/redux/selectors';
import { getWarehousesSelector } from '@shared/containers/Select/Warehouse/redux/selectors';
import { vehicleDetailsSelector } from '../../redux/selector';
import { VEHICLE_STATUSES } from '@shared/shared/constants';

import Card from '@shared/components/UI/AntCard';
import Franchise from '@shared/containers/Select/Franchise';
import Cities from '@shared/containers/Select/City';
import { Creators } from '@app/pages/Fleet/Vehicle/Details/redux/action';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const { Text } = Typography;

const VehicleDetails = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['marketVehicle']);
  const [form] = Form.useForm();
  const classes = useStyles();
  const { id } = useParams();
  const { canAccess } = usePermission();

  const [editing, setEditing] = useState(false);
  const [specialFields, setSpecialFields] = useState(true);

  const ownershipOptions = convertConstantValuesToSelectOptions(vehicleOwnership);
  const tagOptions = convertConstantValuesToSelectOptions(marketVehicleTags, false);
  const vehicleType = useSelector(vehicleDetailsSelector?.getVehicleTypeData);
  const vehicleOptions = getVehicleTypeOptions(vehicleType?.vehicleConstraints);
  const franchises = useSelector(getFranchisesSelector.getData);
  const warehouse = useSelector(getWarehousesSelector.getData);
  const vehicleDetails = useSelector(vehicleDetailsSelector?.getData);
  const formik = useFormik({
    initialValues: intialValues,
    validateOnChange: false,
  });

  const { values, setFieldValue, touched, errors } = formik;
  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const mandatory = <Text type="danger">*</Text>;

  const handleWarehouse = value => {
    if (value) {
      setFieldValue('warehouse', value);
      const selectedFranchise = findFranchise(value, franchises);
      const selectedCity = findCity(value, warehouse);
      setFieldValue('franchise', selectedFranchise?.franchise || vehicleDetails?.vehicle?.franchise);
      setFieldValue('city', selectedCity || vehicleDetails?.vehicle?.city);
    }
    else {
      setFieldValue('warehouse ', null);
      setFieldValue('franchise', null);
      setFieldValue('city', null);
    }
  };

  useMemo(() => {
    setFieldValue('constraintId', vehicleDetails?.vehicle?.constraint?._id);
    setFieldValue('warehouse', vehicleDetails?.vehicle?.warehouse);
    setFieldValue('franchise', vehicleDetails?.vehicle?.franchise);
    setFieldValue('city', vehicleDetails?.vehicle?.city);
    setFieldValue('plate', vehicleDetails?.vehicle?.plate);
    setFieldValue('licenceOwner', vehicleDetails?.vehicle?.licence?.licenceOwner);
    setFieldValue('licenceSerial', vehicleDetails?.vehicle?.licence?.licenceSerial);
    setFieldValue('licenceNumber', vehicleDetails?.vehicle?.licence?.licenceNumber);
    setFieldValue('licenceImage', vehicleDetails?.vehicle?.licence?.licenceImage);
    setFieldValue('tradeName', vehicleDetails?.vehicle?.licence?.tradeName);
    setFieldValue('modelYear', vehicleDetails?.vehicle?.licence?.modelYear);
    setFieldValue('brand', vehicleDetails?.vehicle?.licence?.brand);
    setFieldValue('color', vehicleDetails?.vehicle?.licence?.color);
    setFieldValue('engineNumber', vehicleDetails?.vehicle?.licence?.engineNumber);
    setFieldValue('kind', vehicleDetails?.vehicle?.licence?.kind);
    setFieldValue('firstRegistrationDate', moment(vehicleDetails?.vehicle?.licence?.firstRegistrationDate));
    setFieldValue('inspectionValidityDate', moment(vehicleDetails?.vehicle?.licence?.inspectionValidityDate));
    setFieldValue('chasis', vehicleDetails?.vehicle?.licence?.class);
    setFieldValue('registrationDate', moment(vehicleDetails?.vehicle?.licence?.registrationDate));
    setFieldValue('ownershipType', vehicleDetails?.vehicle?.ownershipType);
    setFieldValue('tags', vehicleDetails?.vehicle?.tags);
    setFieldValue('identityNumber', vehicleDetails?.vehicle?.licence?.identityNumber);
  }, [vehicleDetails, setFieldValue]);
  const specialEditing = canAccess(permKey.PAGE_VEHICLE_DETAIL_SPECIAL_EDIT);
  const handleEdit = () => {
    setEditing(true);
    setSpecialFields(!specialEditing);
  };
  return (
    <Card>
      <Form
        form={form}
      >
        <Card
          title={t('marketVehicle:VEHICLE_INFORMATION')}
          footer={(editing && (
            <>
              <Button
                size="small"
                type="primary"
                htmlType="submit"
                loading={false}
                onClick={() => {
                  setEditing(true);
                  dispatch(Creators.updateVehicleRequest({ ...formik.values, id }));
                }}
                data-testid="saveButton"
              >
                {t('button:SAVE')}
              </Button>
              <Button
                size="small"
                loading={false}
                onClick={() => setEditing(false)}
                className={classes.cancelButton}
                danger
              >
                {t('button:CANCEL')}
              </Button>
            </>
          )) || (!editing && (
            <Button
              size="small"
              type="primary"
              loading={false}
              disabled={VEHICLE_STATUSES.AVAILABLE !== vehicleDetails?.vehicle?.status}
              onClick={handleEdit}
              data-testid="editButton"
            >
              {t('button:EDIT')}
            </Button>
          ))}
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
                  disabled={specialFields || !editing}
                  data-testid="vehicleType"
                  showArrow
                  allowClear
                  options={vehicleOptions}
                  placeholder={t('marketVehicle:VEHICLE_TYPE')}
                  onChange={value => setFieldValue('constraintId', value || null)}
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
                  disabled={specialFields || !editing}
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
                  isDisabled={!editing}
                  dataTestId="testWarehouse"
                  onChange={handleWarehouse}
                  value={values.warehouse}
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:FRANCHISE')} {mandatory}</Text>
              <Form.Item name="franchise">
                <Franchise
                  disabled
                  value={values.franchise}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12]} className={useStyles.formWrapper}>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:CITY')} {mandatory}</Text>
              <Form.Item name="city">
                <Cities
                  mode="single"
                  isDisabled
                  value={values.city}
                />
              </Form.Item>
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
                <Input
                  disabled={!editing}
                  placeholder={t('marketVehicle:LICENSE_HOLDER')}
                />
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
                <Input
                  disabled={!editing}
                  data-testid="licenseSeriesTest"
                  placeholder={t('marketVehicle:LICENSE_SERIES')}
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:LICENSE_NUMBER')}</Text>
              <Form.Item
                name="licenceNumber"
                value={values.licenceNumber}
                onChange={event => setFieldValue('licenceNumber', event.target.value)}
              >
                <Input
                  disabled={!editing}
                  type="number"
                  data-testid="licenseNumberTest"
                  placeholder={t('marketVehicle:LICENSE_NUMBER')}
                />
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
                <Input
                  disabled={!editing}
                  placeholder={t('marketVehicle:LICENSE_PICTURE')}
                />
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
                <Input
                  disabled={!editing}
                  placeholder={t('marketVehicle:BRAND')}
                />
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
                <Input
                  disabled={!editing}
                  placeholder={t('marketVehicle:MODEL')}
                />
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
                <Input
                  type="number"
                  disabled={!editing}
                  placeholder={t('marketVehicle:MODEL_YEAR')}
                />
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
                <Input
                  disabled={!editing}
                  placeholder={t('marketVehicle:COLOR')}
                />
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
                <Input
                  disabled={!editing}
                  placeholder={t('marketVehicle:GRADE')}
                />
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
                <Input
                  disabled={!editing}
                  placeholder={t('marketVehicle:BODY_TYPE')}
                />
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
                <Input
                  disabled={!editing}
                  placeholder={t('marketVehicle:ENGINE_DETAILS')}
                />
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
                <Input
                  disabled={!editing}
                  placeholder={t('marketVehicle:CHASSIS_NUMBER')}
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={12}>
              <Text>{t('marketVehicle:INSPECTION_DATE')}</Text>
              <DatePickerWrapper
                disabled={!editing}
                dataTestId="inspectionTest"
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
                disabled={!editing}
                dataTestId="firstRegistryTest"
                setDefaultValue
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
                disabled={!editing}
                selectKey="registrationDate"
                dataTestId="registryTest"
                hasError={get(errors, 'registrationDate')}
                isTouched={get(touched, 'registrationDate')}
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
                  disabled={!editing}
                  data-testid="ownershipTest"
                  showArrow
                  allowClear
                  options={ownershipOptions}
                  placeholder={t('global:SELECT_OWNERSHIP_STATUS')}
                  onChange={value => setFieldValue('ownershipType', value)}
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
                  disabled={!editing}
                  mode="multiple"
                  data-testid="tagsTest"
                  showArrow
                  allowClear
                  options={tagOptions}
                  placeholder={t('marketVehicle:TAGS')}
                  onChange={value => setFieldValue('tags', value || null)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Card>
  );
};

export default VehicleDetails;
