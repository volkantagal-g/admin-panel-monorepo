import { useEffect, useState } from 'react';
import { Form, Row, Col, Button, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _, { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';
import { COUNTRY_CODES, COUNTRY_IDS, GETIR_GORILLAS_DOMAIN_TYPE, MAIN_WAREHOUSE_TYPE } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { getCitiesSelector, mainStoresSelector, regionsSelector, nonagreementWarehousesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { validate } from '@shared/yup';
import WarehouseTestStatus from '@app/pages/Warehouse/Detail/components/WarehouseTestStatus';
import WarehouseMap from '@app/pages/Warehouse/Detail/components/WarehouseMap';
import { GETIR_WAREHOUSE_DOMAIN_TYPE_CODES, SAP_NON_REQUIRED_WAREHOUSE_TYPES, SAP_REQUIRED_WAREHOUSE_TYPES } from '@app/pages/Warehouse/constants';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { sapDraftWarehousesSelector } from '../../redux/selectors';

const { useForm } = Form;

function FormWrapper() {
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const { t } = useTranslation('warehousePage');
  const classes = useStyles();
  const [form] = useForm();
  const cities = useSelector(getCitiesSelector.getData);
  const regions = useSelector(regionsSelector.getData);
  const mainStores = useSelector(mainStoresSelector.getData);
  const sapDraftWarehouses = useSelector(sapDraftWarehousesSelector.getData);
  const isSAPDraftWarehousesPending = useSelector(sapDraftWarehousesSelector.isPending);
  const [selectedSAPDraft, setSelectedSAPDraft] = useState(null);

  const selectedCountry = useSelector(getSelectedCountryV2);
  const countryCode = get(selectedCountry, 'code.alpha2', '');

  const nonagreementWarehouses = useSelector(nonagreementWarehousesSelector.getData);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createWarehouseRequest({ requestBody: values }));
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue, resetForm } = formik;

  const isMainStore = values.warehouseType === MAIN_WAREHOUSE_TYPE;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      if (fieldName === 'warehouseType' && selectedItems === MAIN_WAREHOUSE_TYPE) {
        setFieldValue('mainStore', '');
      }
      if (fieldName === 'warehouseType' && selectedItems !== MAIN_WAREHOUSE_TYPE) {
        setFieldValue('nonagreementWarehouse', '');
      }
      setFieldValue(fieldName, selectedItems);
    };
  };

  const handleLatlngChange = () => {
    const coordinates = [Number(longitude), Number(latitude)];

    if (longitude && latitude) {
      setFieldValue('location.coordinates', coordinates);
    }
  };

  const handleCityChange = selectedCityId => {
    if (values.region) {
      setFieldValue('region', '');
    }
    const selectedCityObject = cities.find(city => {
      return city._id === selectedCityId;
    });
    setFieldValue('location', {
      type: 'Point',
      coordinates: selectedCityObject.center.coordinates,
    });
    setLongitude(selectedCityObject.center.coordinates[0].toFixed(6));
    setLatitude(selectedCityObject.center.coordinates[1].toFixed(6));
    setFieldValue('city', selectedCityId);
    dispatch(CommonCreators.getRegionsRequest({ cityId: selectedCityId }));
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [cities, form, regions, values, values.mainStore, values.nonagreementWarehouse]);

  useEffect(() => {
    if (!values.SAPReferenceCode) {
      if (values.mainStore) {
        setFieldValue('mainWarehouses', [values.mainStore]);
      }
      else {
        setFieldValue('mainWarehouses', []);
      }
    }
    else {
      setFieldValue('mainWarehouses', values.mainWarehouses || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.mainStore, values.SAPReferenceCode]);

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  const handleDragEnd = position => {
    const { lat, lng } = position;
    const coordinates = [lng, lat];
    setFieldValue('location.coordinates', coordinates);
    setLongitude(coordinates[0].toFixed(6));
    setLatitude(coordinates[1].toFixed(6));
  };

  const filteredDomainTypes = GETIR_WAREHOUSE_DOMAIN_TYPE_CODES.filter(type => {
    if (countryCode === COUNTRY_CODES[COUNTRY_IDS.TR] && type === GETIR_GORILLAS_DOMAIN_TYPE) {
      return false;
    }
    return true;
  });

  const handleSAPReferenceCodeChange = value => {
    if (value === undefined) {
      resetForm({ values: { ...defaultValues } });
    }
    else {
      const SAP_ITEM = sapDraftWarehouses.find(item => item.SAPReferenceCode.toString() === value.toString());
      setSelectedSAPDraft(SAP_ITEM);

      if (SAP_ITEM) {
        if (SAP_ITEM.city) {
          handleCityChange(SAP_ITEM.city);
        }

        if (SAP_ITEM.warehouseType !== MAIN_WAREHOUSE_TYPE) {
          handleSelectChange('mainStore')(SAP_ITEM?.mainWarehouseId);
        }

        if (SAP_ITEM.warehouseType) {
          handleSelectChange('warehouseType')(SAP_ITEM.warehouseType);
        }

        if (SAP_ITEM.mainWarehouses) {
          setFieldValue('mainWarehouses', SAP_ITEM.mainWarehouses || []);
        }

        setFieldValue('postCode', SAP_ITEM?.postCode);
        setFieldValue('name', SAP_ITEM?.name);
        setFieldValue('shortName', SAP_ITEM?.name);
        setFieldValue('address', SAP_ITEM?.address);
        setFieldValue('country', SAP_ITEM?.country);

        setFieldValue('SAPReferenceCode', value.toString());
      }
    }
  };

  const hasSAPReferenceCode = !!values.SAPReferenceCode;

  const renderMainWarehousesDropDown = () => {
    if (values.SAPReferenceCode && selectedSAPDraft?.mainWarehouses?.length > 0) {
      return (
        <SelectWrapper
          selectKey="mainWarehouses"
          label={t('MAIN_WAREHOUSES')}
          value={values.mainWarehouses}
          hasError={_.get(errors, 'mainWarehouses')}
          isTouched={_.get(touched, 'mainWarehouses')}
          optionsData={mainStores}
          optionLabelProp="name"
          optionValueProp="_id"
          mode="multiple"
          onChangeCallback={() => {}}
          disabled={hasSAPReferenceCode}
        />
      );
    }
    return null;
  };

  return (
    <Card title={t('GENERAL_INFO')} bordered={false} footer={<Footer />}>
      <Form
        id="new-warehouse"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <InputWrapper
              setDefaultValue={false}
              inputKey="name"
              label={t('NAME')}
              value={values.name}
              isTouched={_.get(touched, 'name')}
              hasError={_.get(errors, 'name')}
              handleChange={handleChange}
              disabled={hasSAPReferenceCode}
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              setDefaultValue={false}
              inputKey="shortName"
              label={t('SHORTNAME')}
              value={values.shortName}
              isTouched={_.get(touched, 'shortName')}
              hasError={_.get(errors, 'shortName')}
              handleChange={handleChange}
              disabled={hasSAPReferenceCode}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="domainTypes"
              label={t('DOMAIN_TYPE')}
              value={values.domainTypes}
              hasError={_.get(errors, 'domainTypes')}
              isTouched={_.get(touched, 'domainTypes')}
              optionsData={filteredDomainTypes}
              labelTranslationCallback={customLabelTranslation('global:GETIR_MARKET_DOMAIN_TYPES')}
              onChangeCallback={handleSelectChange('domainTypes')}
              mode="multiple"
            />
          </Col>
          <Col span={12}>
            <SelectWrapper
              selectKey="warehouseType"
              label={t('TYPE')}
              value={values.warehouseType}
              hasError={_.get(errors, 'warehouseType')}
              isTouched={_.get(touched, 'warehouseType')}
              renderCustomItems={() => {
                return (
                  <>
                    {SAP_REQUIRED_WAREHOUSE_TYPES.map(type => (
                      <Select.Option key={type} value={type} disabled className={classes.disabledOption}>
                        {customLabelTranslation('global:WAREHOUSE_TYPES')(type)}
                      </Select.Option>
                    ))}
                    {SAP_NON_REQUIRED_WAREHOUSE_TYPES.map(type => (
                      <Select.Option key={type} value={type}>
                        {customLabelTranslation('global:WAREHOUSE_TYPES')(type)}
                      </Select.Option>
                    ))}
                  </>
                );
              }}
              labelTranslationCallback={customLabelTranslation('global:WAREHOUSE_TYPES')}
              onChangeCallback={handleSelectChange('warehouseType')}
              disabled={hasSAPReferenceCode}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="city"
              label={t('CITY')}
              value={values.city}
              hasError={_.get(errors, 'city')}
              isTouched={_.get(touched, 'city')}
              optionsData={cities}
              optionLabelProp={`name.${getLangKey()}`}
              optionValueProp="_id"
              onChangeCallback={handleCityChange}
              disabled={hasSAPReferenceCode}
            />
          </Col>
          <Col span={12}>
            <SelectWrapper
              selectKey="region"
              label={t('REGION')}
              value={values.region}
              hasError={_.get(errors, 'region')}
              isTouched={_.get(touched, 'region')}
              optionsData={regions}
              optionLabelProp={`name.${getLangKey()}`}
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('region')}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col span={12}>
            {isMainStore ? (
              <SelectWrapper
                selectKey="nonagreementWarehouse"
                label={t('warehousePage:NONAGREEMENT_WAREHOUSE')}
                value={values.nonagreementWarehouse}
                hasError={_.get(errors, 'nonagreementWarehouse')}
                isTouched={_.get(touched, 'nonagreementWarehouse')}
                optionsData={nonagreementWarehouses}
                optionLabelProp="name"
                optionValueProp="_id"
                onChangeCallback={handleSelectChange('nonagreementWarehouse')}
              />
            ) : (
              <SelectWrapper
                selectKey="mainStore"
                label={t('MAIN_STORE')}
                value={values.mainStore}
                hasError={_.get(errors, 'mainStore')}
                isTouched={_.get(touched, 'mainStore')}
                optionsData={mainStores}
                optionLabelProp="name"
                optionValueProp="_id"
                onChangeCallback={handleSelectChange('mainStore')}
                disabled={hasSAPReferenceCode}
              />
            )}
          </Col>
          <Col span={12}>
            <SelectWrapper
              setDefaultValue={false}
              selectKey="SAPReferenceCode"
              label={t('SAP_REFERENCE_CODE')}
              value={values.SAPReferenceCode}
              isTouched={_.get(touched, 'SAPReferenceCode')}
              hasError={_.get(errors, 'SAPReferenceCode')}
              loading={isSAPDraftWarehousesPending}
              disabled={isSAPDraftWarehousesPending}
              optionLabelProp="name"
              optionValueProp="SAPReferenceCode"
              optionsData={sapDraftWarehouses}
              filterOption={(input, option) => {
                const matchingWarehouses = sapDraftWarehouses.filter(wh => {
                  return wh?.SAPReferenceCode?.toString()?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                    || wh?.name?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0;
                });

                return matchingWarehouses.some(wh => wh?.SAPReferenceCode === option.value);
              }}
              renderCustomItems={() => {
                return sapDraftWarehouses.map(option => {
                  return (
                    <Select.Option key={option?.SAPReferenceCode} value={option?.SAPReferenceCode}>
                      <div className={classes.sapWarehouseContainer}>
                        <div className={classes.sapWarehouseNameContainer}>
                          <span className={classes.sapWarehouseName}>{option?.name}</span>
                          <div className={classes.sapReferenceCodeContainer}>
                            <span className={classes.sapReferenceCodeLabel}>{t('SAP_REFERENCE_CODE')}:</span>
                            <code className={classes.sapReferenceCode}>{option?.SAPReferenceCode}</code>
                          </div>
                        </div>
                      </div>
                    </Select.Option>
                  );
                });
              }}
              allowClear
              onChangeCallback={handleSAPReferenceCodeChange}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col span={12}>
            {renderMainWarehousesDropDown()}
          </Col>
        </Row>
        <Row gutter={[16]} align="middle">
          <Col span={12}>
            <InputWrapper
              setDefaultValue={false}
              inputKey="address"
              label={t('ADDRESS')}
              value={values.address}
              mode="textarea"
              isTouched={_.get(touched, 'address')}
              hasError={_.get(errors, 'address')}
              handleChange={handleChange}
              disabled={hasSAPReferenceCode}
            />
          </Col>
          <Col span={12}>
            <Form.Item
              name="isTestWarehouse"
              valuePropName="checked"
            >
              <Can permKey={permKey.PAGE_WAREHOUSE_CREATE_TEST_WAREHOUSE_FLAG}>
                <WarehouseTestStatus
                  isTestWarehouse={values.isTestWarehouse}
                  updateWarehouseTestStatusRequest={value => setFieldValue('isTestWarehouse', value)}
                />
              </Can>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16]} align="right">
          <Col span={12}>
            <Row gutter={[16]} align="right">
              <Col span={12}>
                <InputNumber
                  addonBefore={t('WAREHOUSE_LOC.LAT')}
                  value={latitude}
                  min={-180}
                  max={180}
                  onChange={value => {
                    setLatitude(value?.toFixed(6) ?? 0);
                  }}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  addonBefore={t('WAREHOUSE_LOC.LON')}
                  value={longitude}
                  min={-90}
                  max={90}
                  onChange={value => {
                    setLongitude(value?.toFixed(6) ?? 0);
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={4} offset={8}>
            <Button
              block
              type="primary"
              onClick={handleLatlngChange}
            >
              {t('button:SEARCH')}
            </Button>
          </Col>
        </Row>
        <Row gutter={[16]} align="top" className={classes.mapWrapper}>
          <WarehouseMap coordinates={values.location.coordinates} isDraggable handleDragEnd={handleDragEnd} />
        </Row>
      </Form>
    </Card>
  );
}

export default FormWrapper;
