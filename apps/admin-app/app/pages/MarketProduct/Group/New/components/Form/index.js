import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col, Select, InputNumber, Input } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import _, { get, mapValues } from 'lodash';

import { useTheme } from 'react-jss';

import { Creators } from '../../redux/actions';
import { createMarketProductGroupSelector } from '../../redux/selectors';
import {
  getValidationSchema,
  getModifiedValues,
  getInitialValues,
} from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { copyToClipboard, getSelectFilterOption } from '@shared/utils/common';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { getDomainTypeOptions } from '@shared/utils/formHelper';
import { GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, MINUTES_IN_A_HOUR } from '@shared/shared/constants';
import { PRODUCT_GROUP_TYPE } from '@app/pages/MarketProduct/constants';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { getGroupTypeOptions, getHierarchyOptions, getPlacementOptions } from '../../../utils';
import WeekMinPickerInfo from './WeekMinPickerInfo';
import {
  getAvailableTimeBoxesMap,
  getInitialAvailableTimes,
  transformFromTimeBoxesToAvailableTimes,
} from '@shared/utils/availableTime';
import { rankingScenarioNamesSelector } from '@app/pages/MarketProduct/Group/redux/selectors';

const MarketProductGroupNewForm = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(createMarketProductGroupSelector.getIsPending);
  const rankingScenarioNames = useSelector(rankingScenarioNamesSelector.getData);
  const rankingScenarioNamesIsPending = useSelector(rankingScenarioNamesSelector.getIsPending);
  const { t } = useTranslation('marketProductGroupPage');
  const [form] = Form.useForm();
  const availableTimes = getInitialAvailableTimes(true);
  const [availableTimeBoxesMap, setAvailableTimeBoxesMap] = useState(getAvailableTimeBoxesMap(availableTimes, MINUTES_IN_A_HOUR));
  const { languageSortOrder: countryLanguages } = useSelector(getSelectedCountryV2);
  const theme = useTheme();

  const formik = useFormik({
    initialValues: getInitialValues(countryLanguages),
    validate: validate(getValidationSchema, {
      t,
      countryLanguages,
    }),
    onSubmit: values => {
      const activeTimes = transformFromTimeBoxesToAvailableTimes(availableTimeBoxesMap, MINUTES_IN_A_HOUR);
      dispatch(Creators.createMarketProductGroupRequest({ body: { ...getModifiedValues(values), activeTimes } }));
    },
  });

  const { handleBlur, handleSubmit, values, errors, setFieldValue, touched } = formik;

  const validationProps = useMemo(() => mapValues(errors, (value, key) => {
    const isTouched = get(touched, key);
    const error = errors[key];

    return {
      help: isTouched && error,
      validateStatus: isTouched && error ? 'error' : 'success',
    };
  }), [errors, touched]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, isPending, form]);

  const customDomainTypes = {
    [GETIR_10_DOMAIN_TYPE]: getirMarketDomainTypes[GETIR_10_DOMAIN_TYPE],
    [GETIR_MARKET_DOMAIN_TYPE]: getirMarketDomainTypes[GETIR_MARKET_DOMAIN_TYPE],
  };

  const getCopyButton = useCallback(
    key => {
      if (values[key] && touched[key] && !isPending) {
        return (
          <Button style={{ margin: '-3px', marginRight: '-8px' }} onClick={() => copyToClipboard(values[key])} type="primary" size="small">
            {t('global:COPY_TO_CLIPBOARD')}
          </Button>
        );
      }

      return <span />;
    },
    [t, values, touched, isPending],
  );

  return (
    <Form form={form} data-testid="product-group-form" id="group-new" onFinish={handleSubmit} layout="vertical">
      <AntCard bordered={false} title={t('GROUP_DETAILS')}>
        <Row>
          <Col span={24}>
            <Form.Item
              name="domainType"
              label={t('GROUP_TARGET')}
              {...validationProps.domainType}
            >
              <Select
                value={values.domainType}
                onChange={value => {
                  setFieldValue('domainType', value);
                }}
                options={getDomainTypeOptions(customDomainTypes)}
                disabled={isPending}
                showSearch
                filterOption={getSelectFilterOption}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="order"
              label={t('GROUP_ORDER')}
              {...validationProps.order}
            >
              <InputNumber
                className="w-100"
                value={values.order}
                onChange={value => {
                  setFieldValue('order', value);
                }}
                onBlur={handleBlur}
                disabled={isPending}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="type"
              label={t('GROUP_TYPE')}
              {...validationProps.type}
            >
              <Select
                value={values.type}
                onChange={value => {
                  setFieldValue('type', value);
                }}
                onBlur={handleBlur}
                options={getGroupTypeOptions()}
                disabled={isPending}
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={[theme.spacing(3)]}
          align="top"
          className="mb-3"
        >
          <Col span={24} className="mb-2">{t('global:NAME_1')}</Col>
          {countryLanguages.map((countryLanguage, countryIndex) => {
            const name = ['name', countryLanguage].join('.');
            const error = touched?.name && errors?.[name];
            const value = values?.[name];

            return (
              <Col
                span={12}
                key={_.toString(countryIndex)}
              >
                <Form.Item
                  name={name}
                  className={error ? '' : 'mb-2'}
                  {...validationProps[name]}
                >
                  <Input
                    value={value}
                    onChange={e => setFieldValue(name, e.target.value)}
                    addonAfter={countryLanguage.toUpperCase()}
                    disabled={isPending}
                    onBlur={handleBlur}
                    data-testid={name}
                  />
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="placement"
              label={t('GROUP_PLACEMENT')}
              {...validationProps.placement}
            >
              <Select
                value={values.placement}
                onChange={value => {
                  setFieldValue('placement', value);
                }}
                onBlur={handleBlur}
                options={getPlacementOptions()}
                disabled={isPending}
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="hierarchy"
              label={t('GROUP_HIERARCHY')}
              {...validationProps.hierarchy}
            >
              <Select
                value={values.hierarchy}
                onChange={value => {
                  setFieldValue('hierarchy', value);
                }}
                onBlur={handleBlur}
                options={getHierarchyOptions()}
                disabled={isPending}
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="abTestVariableName"
              label={t('AB_TEST_VARIABLE_NAME')}
              {...validationProps.abTestVariableName}
            >
              <Input
                placeholder={t('AB_TEST_VARIABLE_NAME_PLACEHOLDER')}
                value={values.abTestVariableName}
                onChange={e => {
                  setFieldValue('abTestVariableName', e.target.value);
                }}
                onBlur={handleBlur}
                disabled={isPending}
                suffix={getCopyButton('abTestVariableName')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="abTestValueId"
              label={t('AB_TEST_VALUE_ID')}
              {...validationProps.abTestValueId}
            >
              <Input
                value={values.abTestValueId}
                onChange={e => {
                  setFieldValue('abTestValueId', e.target.value);
                }}
                onBlur={handleBlur}
                disabled={isPending}
                suffix={getCopyButton('abTestValueId')}
              />
            </Form.Item>
          </Col>
        </Row>
      </AntCard>
      {values.type === PRODUCT_GROUP_TYPE.ALGORITHM && (
        <AntCard bordered={false} title={t('ALGORITHM_DETAILS')}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="algorithmScenarioName"
                label={t('ALGORITHM_SCENARIO_NAME')}
                {...validationProps.algorithmScenarioName}
              >
                <Select
                  value={values.algorithmScenarioName}
                  onChange={value => {
                    setFieldValue('algorithmScenarioName', value);
                  }}
                  onBlur={handleBlur}
                  options={rankingScenarioNames}
                  loading={rankingScenarioNamesIsPending}
                  disabled={isPending}
                  showSearch
                  showArrow
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="scenarioVariant"
                label={t('DECISION_ENGINE_AB_SCENARIO_VARIANT')}
                {...validationProps.scenarioVariant}
              >
                <Input
                  value={values.scenarioVariant}
                  onChange={e => {
                    setFieldValue('scenarioVariant', e.target.value);
                  }}
                  onBlur={handleBlur}
                  disabled={isPending}
                  suffix={getCopyButton('scenarioVariant')}
                />
              </Form.Item>
            </Col>
          </Row>
        </AntCard>
      )}
      <AntCard bordered={false} title={t('FILTER_DETAILS')}>
        <Row>
          <Col span={24}>
            <Form.Item
              name="filterScenarioNames"
              label={t('FILTER_SCENARIO_NAMES')}
              {...validationProps.filterScenarioNames}
            >
              <Select
                value={values.filterScenarioNames}
                mode="multiple"
                onChange={value => {
                  setFieldValue('filterScenarioNames', value.map(val => val.trim()).filter(item => !!item));
                }}
                options={rankingScenarioNames}
                loading={rankingScenarioNamesIsPending}
                disabled={isPending}
                showSearch
                showArrow
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <WeekMinPickerInfo
          availableTimeBoxesMap={availableTimeBoxesMap}
          setAvailableTimeBoxesMap={setAvailableTimeBoxesMap}
        />
      </AntCard>
      <Row justify="end">
        <Form.Item>
          <Button size="medium" type="primary" htmlType="submit" loading={isPending}>
            {t('button:SAVE')}
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default MarketProductGroupNewForm;
