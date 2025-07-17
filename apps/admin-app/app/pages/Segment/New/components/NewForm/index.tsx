import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import { get } from 'lodash';
import moment, { Moment } from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';
import { validate } from '@shared/yup';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes.ts';
import permKey from '@shared/shared/permKey.json';
import { createMap } from '@shared/utils/common';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';

import { Creators } from '../../redux/actions';
import SelectSegmentType from '../../../components/SelectSegmentType';
import { createSegmentSelector } from '../../redux/selectors';
import { validationSchema } from './formHelpers';
import {
  COUNTRIES_GLOBAL_ACCESS,
  CountrySelector,
  DOMAIN_TYPE_ALL_DOMAINS,
  DomainSelector,
} from '../../../components/Selector';

const NewForm = () => {
  const { t } = useTranslation('segment');
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  const isCreationPending = useSelector(createSegmentSelector.getIsPending);
  const countries = useSelector(countriesSelector.getData || []);

  const [form] = Form.useForm();
  const theme = useTheme();
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isDomainTypeDropdownOpen, setIsDomainTypeDropdownOpen] = useState(false);

  const formik = useFormik({
    enableReinitialize: false,
    validate: validate(validationSchema),
    initialValues: {
      description: '',
      countries: [],
      hasGlobalAccess: false,
      type: null,
      domainTypes: [],
      hasAllDomainTypes: false,
      expireAt: null,
    },
    onSubmit: values => {
      const countryMap = createMap(countries);
      const countryCodes = values.countries.map(c => countryMap[c].code.alpha2);

      dispatch(Creators.createSegmentRequest({
        values: {
          ...values,
          domainTypes: values.hasAllDomainTypes ? [DOMAIN_TYPE_ALL_DOMAINS] : values.domainTypes,
          countries: values.hasGlobalAccess ? [COUNTRIES_GLOBAL_ACCESS] : countryCodes,
        },
        onSuccess: (segment: number) => {
          if (canAccess(permKey.PAGE_SEGMENT_DETAIL)) history.push(ROUTE.SEGMENT_DETAIL.path.replace(':segment', segment.toString()));
          else history.push(ROUTE.SEGMENT_LIST.path);
        },
      }));
    },
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setFieldTouched } = formik;

  const getHandleBlur = (fieldName: string) => {
    return () => {
      setFieldTouched(fieldName, true, true);
    };
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const disabledDate = (current: Moment) => current &&
    (current < moment().subtract(1, 'days').endOf('day') || current > moment().add(1, 'year').endOf('day'));
  return (
    <AntCard>
      <Form
        form={form}
        id="segment-detail"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col sm={12} xs={24}>
            <Form.Item
              help={get(touched, 'description') && get(errors, 'description')}
              validateStatus={get(touched, 'description') && get(errors, 'description') ? 'error' : 'success'}
              name="description"
              label={t('DESCRIPTION')}
            >
              <Input
                value={values.description}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('description', value);
                }}
                onBlur={getHandleBlur('description')}
                disabled={isCreationPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              help={!isCountryDropdownOpen && get(touched, 'countries') && get(errors, 'countries')}
              validateStatus={!isCountryDropdownOpen && get(touched, 'countries') && get(errors, 'countries') ? 'error' : 'success'}
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
                onDropdownVisibleChange={setIsCountryDropdownOpen}
                onBlur={getHandleBlur('countries')}
                disabled={isCreationPending}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col sm={12} xs={24}>
            <Form.Item
              help={get(touched, 'type') && get(errors, 'type')}
              validateStatus={get(touched, 'type') && get(errors, 'type') ? 'error' : 'success'}
              name="type"
              label={t('SEGMENT_TYPE')}
            >
              <SelectSegmentType
                value={values.type}
                onChange={_type => {
                  setFieldValue('type', _type);
                }}
                onBlur={getHandleBlur('type')}
                disabled={isCreationPending}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              help={!isDomainTypeDropdownOpen && get(touched, 'domainTypes') && get(errors, 'domainTypes')}
              validateStatus={!isDomainTypeDropdownOpen && get(touched, 'domainTypes') && get(errors, 'domainTypes') ? 'error' : 'success'}
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
                onDropdownVisibleChange={setIsDomainTypeDropdownOpen}
                onBlur={getHandleBlur('domainTypes')}
                disabled={isCreationPending}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col sm={12} xs={24}>
            <Form.Item
              help={get(touched, 'expireAt') && get(errors, 'expireAt')}
              label={t('EXPIRES_AT')}
              validateStatus={get(touched, 'expireAt') && get(errors, 'expireAt') ? 'error' : 'success'}
              name="expireAt"
            >
              <DatePicker
                className="w-100"
                disabledDate={disabledDate}
                value={values.expireAt ? moment(values.expireAt).format('YYYY-MM-DD HH:mm') : null}
                format={getLocalDateTimeFormat()}
                disabled={isCreationPending}
                onChange={_expireAt => {
                  setFieldValue('expireAt', _expireAt);
                }}
                onBlur={getHandleBlur('expireAt')}
                allowClear={false}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" gutter={[theme.spacing(2)]}>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                form="segment-detail"
                type="primary"
                htmlType="submit"
                loading={isCreationPending}
              >
                {t('CREATE')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default NewForm;
