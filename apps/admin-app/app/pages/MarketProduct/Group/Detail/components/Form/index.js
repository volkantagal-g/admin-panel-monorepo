import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Select, InputNumber, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import _, { get, mapValues } from 'lodash';

import {
  getMarketProductGroupSelector,
  updateMarketProductGroupSelector,
} from '../../redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';

import { copyToClipboard, getSelectFilterOption } from '@shared/utils/common';
import { canSubmit, getDomainTypeOptions } from '@shared/utils/formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';
import { GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE } from '@shared/shared/constants';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { getGroupTypeOptions, getHierarchyOptions, getPlacementOptions } from '../../../utils';
import { PRODUCT_GROUP_TYPE } from '@app/pages/MarketProduct/constants';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { rankingScenarioNamesSelector } from '@app/pages/MarketProduct/Group/redux/selectors';

export const customDomainTypes = {
  [GETIR_10_DOMAIN_TYPE]: getirMarketDomainTypes[GETIR_10_DOMAIN_TYPE],
  [GETIR_MARKET_DOMAIN_TYPE]: getirMarketDomainTypes[GETIR_MARKET_DOMAIN_TYPE],
};

const MarketProductGroupDetailForm = () => {
  const dispatch = useDispatch();
  const marketProductGroup = useSelector(getMarketProductGroupSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductGroupSelector.getIsPending);
  const rankingScenarioNames = useSelector(rankingScenarioNamesSelector.getData);
  const rankingScenarioNamesIsPending = useSelector(rankingScenarioNamesSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductGroupPage');
  const [form] = Form.useForm();
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const { languageSortOrder: countryLanguages } = useSelector(getSelectedCountryV2);
  const theme = useTheme();

  const initialValues = useMemo(
    () => getInitialValues(marketProductGroup, countryLanguages),
    [marketProductGroup, countryLanguages],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema, {
      t,
      countryLanguages,
    }),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      dispatch(Creators.updateMarketProductGroupRequest({
        id: get(marketProductGroup, '_id'),
        body,
      }));
    },
  });

  const { handleBlur, handleSubmit, values, touched, errors, setFieldValue, setValues, setFieldTouched } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      setIsFormEditable(false);
    }
  }, [isUpdatePending, prevIsUpdatePending]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const validationProps = useMemo(() => mapValues(errors, (value, key) => {
    const isTouched = get(touched, key);
    const error = errors[key];

    return {
      help: isTouched && error,
      validateStatus: isTouched && error ? 'error' : 'success',
    };
  }), [errors, touched]);

  const isDisabled = isUpdatePending || !isFormEditable;

  const getCopyButton = useCallback(
    key => {
      if (values[key] && touched[key] && !isDisabled && !isUpdatePending) {
        return (
          <Button style={{ margin: '-3px', marginRight: '-8px' }} onClick={() => copyToClipboard(values[key])} type="primary" size="small">
            {t('global:COPY_TO_CLIPBOARD')}
          </Button>
        );
      }

      return <span />;
    },
    [t, values, touched, isDisabled, isUpdatePending],
  );

  return (
    <Form form={form} data-testid="product-group-form" id="group-detail" onFinish={handleSubmit} layout="vertical">
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
                disabled={isDisabled}
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
                onChange={value => setFieldValue('order', value)}
                onBlur={handleBlur}
                disabled={isDisabled}
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
                onChange={type => {
                  setFieldValue('type', type);
                }}
                onBlur={handleBlur}
                options={getGroupTypeOptions()}
                disabled
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
            const value = get(values, ['name', countryLanguage], '');

            return (
              <Col
                span={12}
                key={_.toString(countryIndex)}
              >
                <Form.Item
                  className={error ? '' : 'mb-2'}
                  {...validationProps[name]}
                >
                  <Input
                    value={value}
                    onChange={e => setFieldValue(name, e.target.value)}
                    addonAfter={countryLanguage.toUpperCase()}
                    disabled={isDisabled}
                    onBlur={() => setFieldTouched(name)}
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
                disabled={isDisabled}
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
                showSearch
                disabled={isDisabled}
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
                value={values.abTestVariableName}
                placeholder={t('AB_TEST_VARIABLE_NAME_PLACEHOLDER')}
                onChange={e => {
                  setFieldValue('abTestVariableName', e.target.value);
                }}
                onBlur={handleBlur}
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                  loading={isUpdatePending || rankingScenarioNamesIsPending}
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                loading={isUpdatePending || rankingScenarioNamesIsPending}
                disabled={isDisabled}
                showSearch
                showArrow
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </AntCard>
      <Row justify="end" gutter={[theme.spacing(2)]} className="mb-2">
        {isFormEditable ? (
          <>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button size="medium" onClick={handleCancelClick}>
                  {t('button:CANCEL')}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button
                  size="medium"
                  form="group-detail"
                  type="primary"
                  htmlType="submit"
                  loading={isUpdatePending}
                  disabled={!canBeSubmittable}
                >
                  {t('button:SAVE')}
                </Button>
              </Form.Item>
            </Col>
          </>
        ) : (
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="medium" type="primary" onClick={handleEditClick}>
                {t('button:EDIT')}
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default MarketProductGroupDetailForm;
