import { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { Button, Col, Collapse, DatePicker, Form, Input, InputNumber, Row, Select, Space, Spin } from 'antd';
import { ExpandAltOutlined, LoadingOutlined } from '@ant-design/icons';

import { Moment } from 'moment';

import { getCitiesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import {
  DEVICE_TYPE_OPTIONS,
  getAggressionStateOptions,
  getCitiesOptions,
  getDefaultOpenAggressionStates,
  getDomainTypeOptions,
  getSelectedCitiesWarehouses,
  getWarehouseOptions,
  isLocalPromo,
  validationSchema,
} from '@app/pages/Promo/Detail/components/GeneralInfoForm/formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import permKey from '@shared/shared/permKey.json';
import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import { validate } from '@shared/yup';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import { promoTargets } from '@app/pages/Promo/constantValues';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { Hint } from '@app/pages/Promo/Detail/components/Hint';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { flatArrayError } from '@app/pages/Promo/utils';
import { GeneralInformationFormType, PROMO_AGGRESSION_STATE } from '@app/pages/Promo/types';
import { GeneralInfoSlice } from '@app/pages/Promo/Detail/components/GeneralInfoForm/slice';
import { generalInfoSaga } from '@app/pages/Promo/Detail/components/GeneralInfoForm/saga';
import { injected } from '@shared/utils/injected';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const maxTagCount = 25;

const GeneralInfoForm = injected(function GeneralInfoForm() {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);
  const isP3Enabled = useSelector(PromoDetailSlice.selectors.p3Enabled);
  const initialValues = useSelector(PromoDetailSlice.selectors.generalInformationFormInitialValues);
  const isTabPromo = useSelector(PromoDetailSlice.selectors.isTabPromo);
  const usedOrderCount = useSelector(PromoDetailSlice.selectors.usedOrderCount)!;
  const isUpdatePending = useSelector(GeneralInfoSlice.selectors.isLoading);
  const isFormEditable = useSelector(GeneralInfoSlice.selectors.isEditing);
  const cities = useSelector(getCitiesSelector.getData);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isWarehousesPending = useSelector(getWarehousesSelector.getIsPending);

  useInitAndDestroyPage({ dispatch, Creators: GeneralInfoSlice.actions });

  const [isCitiesCsvModal, setIsCitiesCsvModal] = useState(false);
  const [isWarehousesCsvModal, setIsWarehousesCsvModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { t } = useTranslation('promoPage');

  const formik = useFormik<GeneralInformationFormType>({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      dispatch(GeneralInfoSlice.actions.update(values));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;
  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

  const handleCancelClick = () => {
    setValues(initialValues);
    dispatch(GeneralInfoSlice.actions.setIsEditing(false));
  };

  const handleEditClick = () => {
    setValues(initialValues);
    dispatch(GeneralInfoSlice.actions.setIsEditing(true));
  };

  const handleSelectDateRange = (dates: [Moment | null, Moment | null] | null) => {
    setFieldValue('validFrom', dates?.[0] ?? null);
    setFieldValue('validUntil', dates?.[1] ?? null);
  };

  const handleCitiesCsvImport = ({ data }: { data: { cityId: MongoIDType }[] }) => {
    if (!data.length) return;
    const importedCities = data.map(city => city.cityId);
    setFieldValue('cities', importedCities);
  };

  const handleWarehousesCsvImport = ({ data }: { data: { warehouseId: MongoIDType }[] }) => {
    if (!data.length) return;
    const importedWarehouses = data.map(warehouse => warehouse.warehouseId);
    setFieldValue('warehouses', importedWarehouses);
  };

  const handleCitiesChange = (selectedCitiesOptions: MongoIDType[]) => {
    setFieldValue('cities', selectedCitiesOptions);
    setFieldValue('warehouses', []);
    const selectedWarehousesOptions = getSelectedCitiesWarehouses(selectedCitiesOptions, warehouses);
    if (selectedWarehousesOptions) {
      setFieldValue('warehouses', selectedWarehousesOptions);
    }
  };

  const cardFooter = (
    <Row justify="end" gutter={[8, 8]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick} id="gen-info_cancel">
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                id="gen-info_save"
                size="small"
                type="primary"
                loading={isUpdatePending}
                disabled={!canBeSubmittable}
                onClick={() => handleSubmit()}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick} id="gen-info_edit">
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  const citiesWarehouses = !isLocalPromo(values.domainTypes) && (
    <>
      <Row>
        <Col span={18}>
          <Form.Item
            label={t('GENERAL_INFO.CITIES')}
          >
            <Select
              aria-label={t('GENERAL_INFO.CITIES')}
              id="gen-info_cities"
              mode="multiple"
              value={values.cities}
              onChange={selectedCities => handleCitiesChange(selectedCities)}
              options={getCitiesOptions(cities)}
              disabled={isUpdatePending || !isFormEditable}
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Button
            onClick={() => setIsCitiesCsvModal(true)}
            className="mt-4 ml-1"
            style={{ border: 'none' }}
            disabled={isUpdatePending || !isFormEditable}
          >
            <CsvImporter
              onOkayClick={handleCitiesCsvImport}
              hasNestedHeaderKeys
              exampleCsv={{ cityId: 'id' }}
              isVisible={isCitiesCsvModal}
            />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Form.Item
            label={(
              <Space align="center">
                {t('GENERAL_INFO.WAREHOUSES')}
                {isP3Enabled && <Hint translationKey="promoPage:HINT.AI_CHANGES_WARNING" placement="topLeft" />}
              </Space>
            )}
          >
            {isWarehousesPending ? (<Spin />) : (
              <Select
                id="gen-info_warehouses"
                aria-label={t('GENERAL_INFO.WAREHOUSES')}
                mode="multiple"
                suffixIcon={isWarehousesPending ? <LoadingOutlined spin /> : (
                  <ExpandAltOutlined
                    onClick={() => setIsExpanded(prev => !prev)}
                  />
                )}
                showArrow
                maxTagCount={isExpanded ? undefined : maxTagCount}
                value={values.warehouses}
                onChange={selectedWarehouses => {
                  setFieldValue('warehouses', selectedWarehouses);
                }}
                options={getWarehouseOptions(warehouses)}
                disabled={isUpdatePending || !isFormEditable}
                showSearch
                loading={isWarehousesPending}
                filterOption={getSelectFilterOption}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          {!isWarehousesPending && (
            <Button
              onClick={() => setIsWarehousesCsvModal(true)}
              className="mt-4 ml-1"
              style={{ border: 'none' }}
              disabled={isUpdatePending || !isFormEditable}
            >
              <CsvImporter
                onOkayClick={handleWarehousesCsvImport}
                hasNestedHeaderKeys
                exampleCsv={{ warehouseId: 'id' }}
                isVisible={isWarehousesCsvModal}
              />
            </Button>
          )}
        </Col>
      </Row>
    </>
  );

  const domainItemError = useMemo(() => {
    return flatArrayError(errors, 'domainTypes');
  }, [errors]);

  const openAggressionStatesError = useMemo(() => {
    return flatArrayError(errors, 'openAggressionStates');
  }, [errors]);

  return (
    <Form layout="vertical" aria-label="General Information Form">
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Form.Item
            label={t('GENERAL_INFO.PROMO_TARGET')}
            help={get(errors, 'promoTarget')}
            validateStatus={get(errors, 'promoTarget') ? 'error' : 'success'}
          >
            <Select
              aria-label={t('GENERAL_INFO.PROMO_TARGET')}
              id="gen-info_promo-target"
              allowClear
              value={values.promoTarget}
              options={convertConstantValuesToSelectOptions(promoTargets)}
              onChange={promoTarget => {
                setFieldValue('promoTarget', promoTarget);
                setFieldValue('domainTypes', []);
              }}
              disabled={isUpdatePending || !isFormEditable || usedOrderCount > 0}
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'domainTypes') || domainItemError}
            validateStatus={get(errors, 'domainTypes') || domainItemError ? 'error' : 'success'}
            label={(
              <Space align="center">
                {t('GENERAL_INFO.PROMO_DOMAIN')}
                {isP3Enabled && <Hint translationKey="promoPage:HINT.AI_CHANGES_WARNING" placement="topLeft" />}
              </Space>
            )}
          >
            <Select
              id="gen-info_domain-types"
              aria-label={t('GENERAL_INFO.PROMO_DOMAIN')}
              mode="multiple"
              allowClear
              value={values.domainTypes}
              options={getDomainTypeOptions(values.promoTarget)}
              onChange={domainTypes => {
                setFieldValue('domainTypes', domainTypes);
              }}
              disabled={isUpdatePending || !isFormEditable}
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'promoCode')}
            validateStatus={get(errors, 'promoCode') ? 'error' : 'success'}
            label={t('GENERAL_INFO.PROMO_CODE')}
          >
            <Input
              id="gen-info_promo-code"
              aria-label={t('GENERAL_INFO.PROMO_CODE')}
              value={values.promoCode}
              disabled={isUpdatePending || !isFormEditable}
              onChange={event => setFieldValue('promoCode', event.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'deviceTypes')}
            validateStatus={get(errors, 'deviceTypes') ? 'error' : 'success'}
            label={t('GENERAL_INFO.PLATFORM')}
          >
            <Select
              aria-label={t('GENERAL_INFO.PLATFORM')}
              id="gen-info_device-types"
              mode="multiple"
              allowClear
              value={values.deviceTypes}
              options={DEVICE_TYPE_OPTIONS}
              onChange={deviceTypes => {
                setFieldValue('deviceTypes', deviceTypes);
              }}
              disabled={isUpdatePending || !isFormEditable}
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            help={get(errors, 'priority')}
            validateStatus={get(errors, 'priority') ? 'error' : 'success'}
            label={(
              <Space align="center">
                {t('GENERAL_INFO.PRIORITY')}
                {(!isTabPromo && !isParent) && <Hint translationKey="promoPage:HINT.UNIQUE_PRIORITY" />}
              </Space>
            )}
          >
            <InputNumber
              className="w-100"
              aria-label={t('GENERAL_INFO.PRIORITY')}
              id="gen-info_priority"
              value={values.priority}
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('priority', value)}
            />
          </Form.Item>
        </Col>
      </Row>
      {citiesWarehouses}
      <Row>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'validFrom') || get(errors, 'validUntil')}
            validateStatus={get(errors, 'validFrom') || get(errors, 'validUntil') ? 'error' : 'success'}
            htmlFor="valid_range"
            label={(
              <Space align="center">
                {t('GENERAL_INFO.START_DATE')}
                <Hint translationKey="promoPage:HINT.AUTO_INACTIVE_ON_EXPIRY" placement="topLeft" />
              </Space>
            )}
          >
            <RangePicker
              id="valid_range"
              aria-label={t('GENERAL_INFO.START_DATE')}
              disabled={isUpdatePending || !isFormEditable}
              format={DEFAULT_TIME_FORMAT}
              showTime
              value={[values.validFrom, values.validUntil]}
              onChange={handleSelectDateRange}
            />
          </Form.Item>
        </Col>
        {
          !isParent && (
            <Col span={12}>
              <Form.Item
                help={get(errors, 'isAggressionStateNonAffected')}
                validateStatus={get(errors, 'isAggressionStateNonAffected') ? 'error' : 'success'}
                label={(
                  <Space align="center">
                    {t('GENERAL_INFO.NEVER_CLOSE')}
                    <Hint translationKey="promoPage:HINT.NEVER_CLOSE" />
                  </Space>
                )}
              >
                <input
                  aria-label={t('GENERAL_INFO.NEVER_CLOSE')}
                  id="gen-info_is-aggression-state-non-affected"
                  type="checkbox"
                  disabled={isUpdatePending || !isFormEditable}
                  checked={values.isAggressionStateNonAffected}
                  onChange={e => setValues({
                    ...values,
                    isAggressionStateNonAffected: e.target.checked,
                    openAggressionStates: getDefaultOpenAggressionStates(e.target.checked),
                  })}
                />
              </Form.Item>
              <Form.Item
                help={get(errors, 'openAggressionStates') ?? openAggressionStatesError}
                validateStatus={get(errors, 'openAggressionStates') || openAggressionStatesError ? 'error' : 'success'}
                label={t('GENERAL_INFO.AUTO_CLOSE')}
              >
                <Select
                  id="gen-info_open-aggression-states"
                  aria-label={t('GENERAL_INFO.AUTO_CLOSE')}
                  mode="multiple"
                  allowClear
                  value={values.openAggressionStates}
                  options={getAggressionStateOptions(values.openAggressionStates.some(item => item === PROMO_AGGRESSION_STATE.NEVER_CLOSE))}
                  onChange={openAggressionStates => {
                    setFieldValue('openAggressionStates', openAggressionStates);
                  }}
                  disabled={values.isAggressionStateNonAffected || isUpdatePending || !isFormEditable}
                  showSearch
                  filterOption={getSelectFilterOption}
                />
              </Form.Item>
            </Col>
          )
        }
      </Row>
      {canEdit && cardFooter}
    </Form>
  );
}, {
  key: GeneralInfoSlice.reducerPath,
  reducer: GeneralInfoSlice.reducer,
  saga: generalInfoSaga,
});

const GeneralInfoSection = memo(function GeneralInfoSection() {
  const { t } = useTranslation('promoPage');

  return (
    <Collapse className="mb-2">
      <Panel header={t('GENERAL_INFO.TITLE')} key={1}>
        <GeneralInfoForm />
      </Panel>
    </Collapse>
  );
});

export default GeneralInfoSection;
