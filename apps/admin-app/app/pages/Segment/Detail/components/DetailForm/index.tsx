import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Row, Col, Button, Space, Popconfirm, DatePicker } from 'antd';
import { NumberOutlined, DeleteOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import _ from 'lodash';
import moment, { Moment } from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';
import { validate } from '@shared/yup';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { createMap } from '@shared/utils/common';
import permKey from '@shared/shared/permKey.json';

import { Creators } from '../../redux/actions';
import { segmentClientCountSelector, segmentSelector, updateSegmentSelector, resetClientsOfSegmentSelector } from '../../redux/selectors';
import SelectSegmentType from '../../../components/SelectSegmentType';
import { getInitialValues, validationSchema } from './formHelpers';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes.ts';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import {
  COUNTRIES_GLOBAL_ACCESS,
  CountrySelector,
  DOMAIN_TYPE_ALL_DOMAINS,
  DomainSelector,
} from '@app/pages/Segment/components/Selector';

const DetailForm = () => {
  const { t } = useTranslation('segment');
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  const segment = useSelector(segmentSelector.getData) || {};
  const isUpdatePending = useSelector(updateSegmentSelector.getIsPending);
  const segmentClientCount = useSelector(segmentClientCountSelector.getData);
  const isSegmentClientCountRequested = useSelector(segmentClientCountSelector.getIsRequested);
  const isSegmentClientCountPending = useSelector(segmentClientCountSelector.getIsPending);
  const isResetClientsOfSegmentPending = useSelector(resetClientsOfSegmentSelector.getIsPending);
  const countries = useSelector(countriesSelector.getData || []);

  const [isEditingForm, setIsEditingForm] = useState(false);
  const [form] = Form.useForm();
  const theme = useTheme();
  const hasPermissionToGetClientCount = canAccess(permKey.PAGE_SEGMENT_DETAIL_COMPONENT_GET_CLIENT_COUNT);
  const hasPermissionToEditSegment = canAccess(permKey.PAGE_SEGMENT_DETAIL_COMPONENT_EDIT_SEGMENT);
  const hasPermissionToDeleteSegment = canAccess(permKey.PAGE_SEGMENT_DETAIL_COMPONENT_DELETE_SEGMENT);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validate: validate(validationSchema),
    initialValues: getInitialValues(countries, segment),
    onSubmit: values => {
      const countryMap = createMap(countries);
      const countryCodes = values.countries.map(c => countryMap[c].code.alpha2);

      dispatch(Creators.updateSegmentRequest({
        segment: segment.segment,
        updateData: {
          ...values,
          domainTypes: values.hasAllDomainTypes ? [DOMAIN_TYPE_ALL_DOMAINS] : values.domainTypes,
          countries: values.hasGlobalAccess ? [COUNTRIES_GLOBAL_ACCESS] : countryCodes,
        },
      }));

      setIsEditingForm(false);
    },
  });

  const { handleSubmit, values, errors, setFieldValue, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleCancelClick = () => {
    resetForm();
    setIsEditingForm(false);
  };

  const handleEditClick = () => {
    setIsEditingForm(true);
  };

  const cardExtras = (
    <Space>
      {hasPermissionToGetClientCount && (
        <Button
          size="small"
          disabled={isSegmentClientCountPending || isSegmentClientCountRequested}
          onClick={() => dispatch(Creators.getSegmentClientCountRequest({ segment: segment.segment }))}
        >
          <NumberOutlined />
          {isSegmentClientCountPending || !isSegmentClientCountRequested ? t('GET_CLIENT_COUNT') : `${t('CLIENT_COUNT')}: ${segmentClientCount}`}
        </Button>
      )}
      {hasPermissionToEditSegment && (
        <Popconfirm
          title={t('CONFIRM.RESET_CLIENTS_OF_SEGMENT')}
          onConfirm={() => dispatch(Creators.resetClientsOfSegmentRequest({ segment: segment.segment }))}
        >
          <Button
            size="small"
            danger
            type="dashed"
            disabled={isResetClientsOfSegmentPending}
          >
            <UsergroupDeleteOutlined />
            {t('RESET_CLIENTS_OF_SEGMENT')}
          </Button>
        </Popconfirm>
      )}
      {hasPermissionToDeleteSegment && (
      <Popconfirm
        title={t('COMMON_CONFIRM_TEXT')}
        onConfirm={() => dispatch(Creators.deleteSegmentRequest({
          segment: segment.segment,
          onSuccess: () => history.push(ROUTE.SEGMENT_LIST.path),
        }))}
      >
        <Button size="small" danger>
          <DeleteOutlined />
          {t('DELETE')}
        </Button>
      </Popconfirm>
      )}
    </Space>
  );

  const disabledDate = (current: Moment) => current &&
    (current < moment().subtract(1, 'days').endOf('day') || current > moment().add(1, 'year').endOf('day'));
  return (
    <AntCard
      title={t('SEGMENT_INFO')}
      extra={cardExtras}
    >
      <Form
        form={form}
        id="segment-detail"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'description')}
              validateStatus={_.get(errors, 'description') ? 'error' : 'success'}
              name="description"
              label={t('DESCRIPTION')}
            >
              <Input
                value={values.description}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('description', value);
                }}
                disabled={isUpdatePending || !isEditingForm}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'countries')}
              validateStatus={_.get(errors, 'countries') ? 'error' : 'success'}
              name="countries"
              label={t('COUNTRIES')}
            >
              <CountrySelector
                t={t}
                countries={values.countries}
                setCountries={_countries => {
                  setFieldValue('countries', _countries);
                }}
                hasGlobalAccess={values.hasGlobalAccess}
                setHasGlobalAccess={_hasGlobalAccess => {
                  setFieldValue('hasGlobalAccess', _hasGlobalAccess);
                }}
                disabled={isUpdatePending || !isEditingForm}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'type')}
              validateStatus={_.get(errors, 'type') ? 'error' : 'success'}
              name="type"
              label={t('SEGMENT_TYPE')}
            >
              <SelectSegmentType
                value={values.type}
                onChange={_type => {
                  setFieldValue('type', _type);
                }}
                disabled={isUpdatePending || !isEditingForm}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'domainTypes')}
              validateStatus={_.get(errors, 'domainTypes') ? 'error' : 'success'}
              name="domainTypes"
              label={t('DOMAIN_TYPES')}
            >
              <DomainSelector
                t={t}
                domainTypes={values.domainTypes}
                setDomainTypes={_domainTypes => {
                  setFieldValue('domainTypes', _domainTypes);
                }}
                hasAllDomainTypes={values.hasAllDomainTypes}
                setHasAllDomainTypes={_hasAllDomainTypes => {
                  setFieldValue('hasAllDomainTypes', _hasAllDomainTypes);
                }}
                disabled={isUpdatePending || !isEditingForm}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'expireAt')}
              label={t('EXPIRES_AT')}
              validateStatus={_.get(errors, 'expireAt') ? 'error' : 'success'}
              name="expireAt"
              valuePropName="date"
            >
              <DatePicker
                className="w-100"
                disabledDate={disabledDate}
                value={moment(values.expireAt)}
                format={getLocalDateTimeFormat()}
                disabled={isUpdatePending || !isEditingForm}
                onChange={_expireAt => {
                  setFieldValue('expireAt', _expireAt);
                }}
                allowClear={false}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('CREATED_AT')}
            >
              <Input disabled value={moment(values.createdAt).format(getLocalDateTimeFormat())} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('UPDATED_AT')}
            >
              <Input disabled value={moment(values.updatedAt).format(getLocalDateTimeFormat())} />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" gutter={[theme.spacing(2)]}>
          {hasPermissionToEditSegment && isEditingForm ? (
            <>
              <Col>
                <Form.Item className="mb-0 mt-0">
                  <Button size="small" onClick={handleCancelClick}>
                    {t('button:CANCEL')}
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item className="mb-0 mt-0">
                  <Button
                    size="small"
                    form="segment-detail"
                    type="primary"
                    htmlType="submit"
                    loading={isUpdatePending}
                  >
                    {t('button:SAVE')}
                  </Button>
                </Form.Item>
              </Col>
            </>
          ) : (
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button size="small" onClick={handleEditClick}>
                  {t('button:EDIT')}
                </Button>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </AntCard>
  );
};

export default DetailForm;
