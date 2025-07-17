import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col, Select, DatePicker, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { get } from 'lodash';

import { Creators } from '../../redux/actions';

import { createAssetSelector } from '../../redux/selectors';
import { getInitialValues, manipulateValuesAfterSubmit, newAssetSchema, OtherAssetSchema } from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';
import { validate } from '@shared/yup';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import useStyles from './styles';
import {
  ASSET_ASSIGNMENT_STATUS_OPTIONS,
  ASSET_DEVICE_STATUS_OPTIONS,
  ASSET_RAM_OPTIONS,
  ASSET_CHIP_TYPE_OPTIONS,
  ASSET_CITIES,
  ASSET_COUNTRY_OPTIONS,
  BRANDS_BY_ASSET_TYPES,
  ASSET_DEVICE_STATUS_AND_ASSIGNMENT_STATUS_RELATIONSHIP,
  ASSET_RESOLUTION_OPTIONS,
  ASSET_DEVICE_CONFIG_FIELDS,
  ASSET_TYPE_OPTIONS,
  ASSET_CATEGORIES,
  DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES,
  ASSET_TYPES,
  ASSET_DISPLAY_SIZE_OPTIONS,
} from '@app/pages/Asset/constants';

const AssetNewForm = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(createAssetSelector.getIsPending);
  const { t } = useTranslation(['assetPage', 'global']);
  const [form] = Form.useForm();
  const theme = useTheme();
  const classes = useStyles();
  const [assetCityOptions, setAssetCityOptions] = useState([]);
  const [assetBrandOptions, setAssetBrandOptions] = useState([]);
  const [assetCategory] = useState(ASSET_CATEGORIES.IT);

  const validationSchema = assetCategory === ASSET_CATEGORIES.IT ? newAssetSchema : OtherAssetSchema;

  const formik = useFormik({
    initialValues: getInitialValues(),
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = manipulateValuesAfterSubmit(values, assetCategory);
      dispatch(Creators.createAssetRequest({ body }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, touched } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    setFieldValue('city', '');
    if (values.country && ASSET_CITIES[values.country]) {
      setAssetCityOptions(convertConstantValueTranslationsToSelectOptions({
        constants: ASSET_CITIES[values.country],
        translationBaseKey: `assetPage:ASSET_CITIES.${values.country}`,
        pageTranslator: t,
      }));
    }
  }, [values.country, setFieldValue, t]);

  useEffect(() => {
    setFieldValue('brand', '');
    ASSET_DEVICE_CONFIG_FIELDS.forEach(fieldName => {
      setFieldValue(fieldName, '');
    });
    if (values.deviceType && BRANDS_BY_ASSET_TYPES[values.deviceType]) {
      setAssetBrandOptions(
        convertConstantValueTranslationsToSelectOptions({
          constants: BRANDS_BY_ASSET_TYPES[values.deviceType],
          translationBaseKey: 'assetPage:DEVICE_BRANDS',
          pageTranslator: t,
        }),
      );
    }
  }, [values.deviceType, setFieldValue, t]);

  useEffect(() => {
    setFieldValue('deviceType', '');
  }, [assetCategory, setFieldValue]);

  const cardFooter = (
    <Row justify="end">
      <Form.Item className="m-0">
        <Button onClick={handleSubmit} form="user-new" type="primary" htmlType="submit" loading={isPending}>
          {t('button:CREATE')}
        </Button>
      </Form.Item>
    </Row>
  );

  // in order to link antd form and formik form
  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (fieldName === 'deviceStatus') {
        setFieldValue('assignmentStatus', ASSET_DEVICE_STATUS_AND_ASSIGNMENT_STATUS_RELATIONSHIP[param]);
      }
      if (inputType === 'select' || inputType === 'date') {
        setFieldValue(fieldName, param);
      }
      else if (inputType === 'checkbox') {
        setFieldValue(fieldName, param.target.checked);
      }
      else {
        setFieldValue(fieldName, param.target.value);
      }
    };
  };

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('SUB_HEADING')}>
      <Form form={form} id="user-new" onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <Form.Item
              help={get(errors, 'name')}
              validateStatus={touched.name && get(errors, 'name') ? 'error' : 'success'}
              name={['name']}
              label={t('NAME_OF_ASSET')}
            >
              <Input
                value={values.name}
                onChange={getHandleChange('name')}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={get(errors, 'deviceType')}
              validateStatus={touched.deviceType && get(errors, 'deviceType') ? 'error' : 'success'}
              name={['deviceType']}
              label={t('DEVICE_TYPE')}
            >
              <Select
                showSearch
                filterOption
                optionFilterProp="label"
                disabled={isPending}
                value={values.deviceType}
                options={ASSET_TYPE_OPTIONS[assetCategory](t)}
                placeholder={t('DEVICE_TYPE')}
                onChange={getHandleChange('deviceType', 'select')}
              />
            </Form.Item>
          </Col>
          {
            assetCategory === ASSET_CATEGORIES.IT && (
              <Col span={12}>
                <Form.Item
                  help={get(errors, 'brand')}
                  validateStatus={touched.brand && get(errors, 'brand') ? 'error' : 'success'}
                  name={['brand']}
                  label={t('BRAND')}
                >
                  <Select
                    showSearch
                    filterOption
                    optionFilterProp="label"
                    disabled={isPending}
                    value={values.brand}
                    options={assetBrandOptions}
                    placeholder={t('BRAND')}
                    onChange={getHandleChange('brand', 'select')}
                  />
                </Form.Item>
              </Col>
            )
          }
          <Col span={12}>
            <Form.Item
              help={get(errors, 'mdmInstalled')}
              name={['mdmInstalled']}
              label={t('MDM_INSTALLED')}
            >
              <Checkbox checked={get(values, 'mdmInstalled', false)} onChange={getHandleChange('mdmInstalled', 'checkbox')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={get(errors, 'isRental')}
              name={['isRental']}
              label={t('RENTAL')}
            >
              <Checkbox
                checked={get(values, 'isRental', false)}
                onChange={getHandleChange('isRental', 'checkbox')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={get(errors, 'isBrandNew')}
              name={['isBrandNew']}
              label={t('BRAND_NEW')}
            >
              <Checkbox
                checked={get(values, 'isBrandNew', false)}
                onChange={getHandleChange('isBrandNew', 'checkbox')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={get(errors, 'barcode')}
              name={['barcode']}
              label={t('BARCODE')}
            >
              <Input
                value={values.barcode}
                onChange={getHandleChange('barcode')}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={get(errors, 'deviceSerialNumber')}
              validateStatus={touched.deviceSerialNumber && get(errors, 'deviceSerialNumber') ? 'error' : 'success'}
              name={['deviceSerialNumber']}
              label={t('DEVICE_SERIAL_NUMBER')}
            >
              <Input
                value={values.deviceSerialNumber}
                onChange={getHandleChange('deviceSerialNumber')}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              help={get(errors, 'invoiceNumber')}
              validateStatus={touched.invoiceNumber && get(errors, 'invoiceNumber') ? 'error' : 'success'}
              name={['invoiceNumber']}
              label={t('INVOICE_NUMBER')}
            >
              <Input
                value={values.invoiceNumber}
                onChange={getHandleChange('invoiceNumber')}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              help={get(errors, 'invoiceDate')}
              validateStatus={touched.invoiceDate && get(errors, 'invoiceDate') ? 'error' : 'success'}
              name={['invoiceDate']}
              label={t('INVOICE_DATE')}
            >
              <DatePicker
                value={values.invoiceDate}
                onChange={getHandleChange('invoiceDate', 'date')}
                format={DEFAULT_DATE_FORMAT}
                placeholder={t('INVOICE_DATE')}
                className={classes.datePickerWidth}
                disabled={isPending}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              help={get(errors, 'supplier')}
              validateStatus={touched.supplier && get(errors, 'supplier') ? 'error' : 'success'}
              name={['supplier']}
              label={t('SUPPLIER')}
            >
              <Input
                value={values.supplier}
                onChange={getHandleChange('supplier')}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              help={get(errors, 'country')}
              validateStatus={touched.country && get(errors, 'country') ? 'error' : 'success'}
              name={['country']}
              label={t('COUNTRY')}
            >
              <Select
                showSearch
                filterOption
                optionFilterProp="label"
                value={values.country}
                options={ASSET_COUNTRY_OPTIONS(t)}
                placeholder={t('COUNTRY')}
                onChange={getHandleChange('country', 'select')}
                disabled
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              help={get(errors, 'city')}
              validateStatus={touched.city && get(errors, 'city') ? 'error' : 'success'}
              name={['city']}
              label={t('CITY')}
            >
              <Select
                showSearch
                filterOption
                optionFilterProp="label"
                disabled={isPending}
                value={values.city}
                options={assetCityOptions}
                placeholder={t('CITY')}
                onChange={getHandleChange('city', 'select')}
              />
            </Form.Item>
          </Col>

          { assetCategory === ASSET_CATEGORIES.IT && (
            <>
              <Col span={12}>
                <Form.Item
                  help={get(errors, 'warrantyEndDate')}
                  validateStatus={touched.warrantyEndDate && get(errors, 'warrantyEndDate') ? 'error' : 'success'}
                  name={['warrantyEndDate']}
                  label={t('WARRANTY_END_DATE')}
                >
                  <DatePicker
                    value={values.warrantyEndDate}
                    onChange={getHandleChange('warrantyEndDate', 'date')}
                    format={DEFAULT_DATE_FORMAT}
                    placeholder={t('WARRANTY_END_DATE')}
                    className={classes.datePickerWidth}
                    disabled={isPending}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  help={get(errors, 'remarks')}
                  validateStatus={get(errors, 'remarks') ? 'error' : 'success'}
                  name={['remarks']}
                  label={t('REMARKS')}
                >
                  <Input
                    value={values.remarks}
                    onChange={getHandleChange('remarks')}
                    disabled={isPending}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  help={get(errors, 'deviceStatus')}
                  validateStatus={touched.deviceStatus && get(errors, 'deviceStatus') ? 'error' : 'success'}
                  name={['deviceStatus']}
                  label={t('DEVICE_STATUS')}
                >
                  <Select
                    showSearch
                    filterOption
                    optionFilterProp="label"
                    disabled={isPending}
                    value={values.deviceStatus}
                    options={ASSET_DEVICE_STATUS_OPTIONS(t)}
                    placeholder={t('DEVICE_STATUS')}
                    onChange={getHandleChange('deviceStatus', 'select')}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  help={get(errors, 'assignmentStatus')}
                  validateStatus={get(errors, 'assignmentStatus') ? 'error' : 'success'}
                  name={['assignmentStatus']}
                  label={t('ASSIGNMENT_STATUS')}
                >
                  <Select
                    showSearch
                    filterOption
                    optionFilterProp="label"
                    disabled
                    value={values.assignmentStatus}
                    options={ASSET_ASSIGNMENT_STATUS_OPTIONS(t)}
                    placeholder={t('ASSIGNMENT_STATUS')}
                    onChange={getHandleChange('assignmentStatus', 'select')}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  help={get(errors, 'deviceModel')}
                  validateStatus={touched.deviceModel && get(errors, 'deviceModel') ? 'error' : 'success'}
                  name={['deviceModel']}
                  label={t('DEVICE_MODEL')}
                >
                  <Input
                    value={values.deviceModel}
                    onChange={getHandleChange('deviceModel')}
                    disabled={isPending}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </>
          )}

          {
            values.isRental && (
              <>
                <Col span={12}>
                  <Form.Item
                    name={['rentalStartDate']}
                    label={t('RENTAL_START_DATE')}
                    help={get(errors, 'rentalStartDate')}
                    validateStatus={get(errors, 'rentalStartDate') ? 'error' : 'success'}
                  >
                    <DatePicker
                      value={values.rentalStartDate}
                      onChange={getHandleChange('rentalStartDate', 'date')}
                      format={DEFAULT_DATE_FORMAT}
                      placeholder={t('RENTAL_START_DATE')}
                      className={classes.datePickerWidth}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['rentalEndDate']}
                    label={t('RENTAL_END_DATE')}
                    help={get(errors, 'rentalEndDate')}
                    validateStatus={get(errors, 'rentalEndDate') ? 'error' : 'success'}
                  >
                    <DatePicker
                      value={values.rentalEndDate}
                      onChange={getHandleChange('rentalEndDate', 'date')}
                      format={DEFAULT_DATE_FORMAT}
                      placeholder={t('RENTAL_END_DATE')}
                      className={classes.datePickerWidth}
                    />
                  </Form.Item>
                </Col>
              </>
            )
          }

          {
            DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.macAddresses.has(+values.deviceType) && (
              <>
                <Col span={12}>
                  <Form.Item
                    className={classes.formItem}
                    name={['numberOfMacAddresses']}
                    label={t('NUMBER_OF_MAC_ADDRESSES')}
                  >
                    <Select
                      showSearch
                      filterOption
                      optionFilterProp="children"
                      value={values.numberOfMacAddresses}
                      placeholder={t('NUMBER_OF_MAC_ADDRESSES')}
                      allowClear
                      onChange={getHandleChange('numberOfMacAddresses', 'select')}
                    >
                      {Array.from({ length: 11 }).map((_, index) => (
                        <Select.Option key={+index} value={index}>
                          {index}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {
                  values.numberOfMacAddresses > 0 && Array.from({ length: values.numberOfMacAddresses }).map((_, index) => (
                    <Col key={+index} span={12}>
                      <Form.Item
                        help={get(errors, 'macAddresses')}
                        validateStatus={touched.macAddresses && get(errors, 'macAddresses') ? 'error' : 'success'}
                        name={[`macAddresses[${index}]`]}
                        label={`${t('MAC_ADDRESS')} ${index + 1}`}
                      >
                        <Input
                          value={values.macAddresses[index]}
                          onChange={getHandleChange(`macAddresses[${index}]`)}
                          disabled={isPending}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  ))
                }
              </>
            )
          }

          {
            DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.storage.has(+values.deviceType) && (
            <Col span={12}>
              <Form.Item
                help={get(errors, 'storage')}
                validateStatus={touched.storage && get(errors, 'storage') ? 'error' : 'success'}
                name={['storage']}
                label={t('STORAGE')}
              >
                <Input
                  value={values.storage}
                  onChange={getHandleChange('storage')}
                  disabled={isPending}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            )
          }

          {
            DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.year.has(+values.deviceType) && (
            <Col span={12}>
              <Form.Item
                help={get(errors, 'year')}
                name={['year']}
                label={t('YEAR')}
              >
                <Input
                  value={values.year}
                  onChange={getHandleChange('year')}
                  disabled={isPending}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            )
          }

          {
            DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.displaySize.has(+values.deviceType) && (
            <Col span={12}>
              <Form.Item
                help={get(errors, 'displaySize')}
                validateStatus={touched.displaySize && get(errors, 'displaySize') ? 'error' : 'success'}
                name={['displaySize']}
                label={t('DISPLAY_SIZE')}
              >
                <Select
                  showSearch
                  filterOption
                  optionFilterProp="label"
                  disabled={isPending}
                  value={values.displaySize}
                  options={ASSET_DISPLAY_SIZE_OPTIONS}
                  placeholder={t('DISPLAY_SIZE')}
                  onChange={getHandleChange('displaySize', 'select')}
                />
              </Form.Item>
            </Col>
            )
          }
          {DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.chipType.has(+values.deviceType) && (
            <>
              <Col span={12}>
                <Form.Item
                  help={get(errors, 'chipType')}
                  validateStatus={touched.chipType && get(errors, 'chipType') ? 'error' : 'success'}
                  name={['chipType']}
                  label={t('CHIP_TYPE')}
                >
                  <Select
                    showSearch
                    filterOption
                    optionFilterProp="label"
                    disabled={isPending}
                    value={values.chipType}
                    options={ASSET_CHIP_TYPE_OPTIONS}
                    placeholder={t('CHIP_TYPE')}
                    onChange={getHandleChange('chipType', 'select')}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  help={get(errors, 'ram')}
                  validateStatus={touched.ram && get(errors, 'ram') ? 'error' : 'success'}
                  name={['ram']}
                  label={t('RAM')}
                >
                  <Select
                    showSearch
                    filterOption
                    optionFilterProp="label"
                    disabled={isPending}
                    value={values.ram}
                    options={ASSET_RAM_OPTIONS}
                    placeholder={t('RAM')}
                    onChange={getHandleChange('ram', 'select')}
                  />
                </Form.Item>
              </Col>
            </>
          )}
          {
            DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.imei1.has(+values.deviceType) && (
              <>
                <Col span={12}>
                  <Form.Item
                    help={get(errors, 'imei1')}
                    validateStatus={touched.imei1 && get(errors, 'imei1') ? 'error' : 'success'}
                    name={['imei1']}
                    label={t('IMEI_1')}
                  >
                    <Input
                      value={values.imei1}
                      onChange={getHandleChange('imei1')}
                      disabled={isPending}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    help={get(errors, 'imei2')}
                    validateStatus={touched.imei2 && get(errors, 'imei2') ? 'error' : 'success'}
                    name={['imei2']}
                    label={t('IMEI_2')}
                  >
                    <Input
                      value={values.imei2}
                      onChange={getHandleChange('imei2')}
                      disabled={isPending}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </>
            )
          }

          {
            DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.refreshRate.has(+values.deviceType) && (
              <>
                <Col span={12}>
                  <Form.Item
                    help={get(errors, 'refreshRate')}
                    validateStatus={touched.refreshRate && get(errors, 'refreshRate') ? 'error' : 'success'}
                    name={['refreshRate']}
                    label={t('REFRESH_RATE')}
                  >
                    <Input
                      value={values.refreshRate}
                      onChange={getHandleChange('refreshRate')}
                      disabled={isPending}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    help={get(errors, 'resolution')}
                    validateStatus={touched.resolution && get(errors, 'resolution') ? 'error' : 'success'}
                    name={['resolution']}
                    label={t('RESOLUTION')}
                  >
                    <Select
                      showSearch
                      filterOption
                      optionFilterProp="label"
                      disabled={isPending}
                      value={values.resolution}
                      options={ASSET_RESOLUTION_OPTIONS}
                      placeholder={t('RESOLUTION')}
                      onChange={getHandleChange('resolution', 'select')}
                    />
                  </Form.Item>
                </Col>
              </>
            )
          }

          {
            values.deviceType === ASSET_TYPES.CAR && (
              <>
                <Col span={12}>
                  <Form.Item
                    help={get(errors, 'plateNumber')}
                    validateStatus={touched.plateNumber && get(errors, 'plateNumber') ? 'error' : 'success'}
                    name={['plateNumber']}
                    label={t('PLATE_NUMBER')}
                  >
                    <Input
                      value={values.plateNumber}
                      onChange={getHandleChange('plateNumber')}
                      disabled={isPending}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    help={get(errors, 'chassis')}
                    validateStatus={touched.chassis && get(errors, 'chassis') ? 'error' : 'success'}
                    name={['chassis']}
                    label={t('CHASSIS')}
                  >
                    <Input
                      value={values.chassis}
                      onChange={getHandleChange('chassis')}
                      disabled={isPending}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    help={get(errors, 'engineNumber')}
                    validateStatus={touched.engineNumber && get(errors, 'engineNumber') ? 'error' : 'success'}
                    name={['engineNumber']}
                    label={t('ENGINE_NUMBER')}
                  >
                    <Input
                      value={values.engineNumber}
                      onChange={getHandleChange('engineNumber')}
                      disabled={isPending}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </>
            )
          }
        </Row>
      </Form>
    </AntCard>
  );
};

export default AssetNewForm;
