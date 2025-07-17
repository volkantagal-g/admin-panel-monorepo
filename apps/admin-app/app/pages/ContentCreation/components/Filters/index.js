import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { SelectPromo } from '@shared/containers/Select/Promo';
import { Button, Checkbox, Select, Space, TextInput } from '@shared/components/GUI';
import {
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
  getPreferredAiToolsOptions,
  getTimingsOptions,
  getToneOfVoicesOptions,
  languages,
  validateValuesBeforeSubmit,
  validationSchema,
} from './formHelper';
import { getDomainTypeOptions } from '@app/pages/Promo/Detail/components/GeneralInfoForm/formHelper';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/ContentCreation/redux/actions';
import {
  getContentCreationTransactionDetailsSelector,
  getContentCreationTransactionIdSelector,
} from '@app/pages/ContentCreation/redux/selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSelectFilterOption } from '@shared/utils/common';

const formId = 'content-creation-form';

const Filters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('contentCreation');
  const [form] = Form.useForm();
  const isUpdatePending = useSelector(getContentCreationTransactionIdSelector.getIsPending);
  const { transactionId } = useSelector(getContentCreationTransactionIdSelector.getData);
  const transactionDetail = useSelector(getContentCreationTransactionDetailsSelector.getData);

  const [isPollingIntervalRunning, setIsPollingIntervalRunning] = useState(false);
  const intervalIdRef = useRef(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validate: validate(validationSchema),
    onSubmit: async values => {
      try {
        validateValuesBeforeSubmit({ values, t });
        const filters = getOnlyModifiedValuesBeforeSubmit({ values });

        return dispatch(
          Creators.getContentCreationTransactionIdRequest({ filters }),
        );
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error }));
      }
    },
  });

  const { handleSubmit, values, setFieldValue, errors, handleChange } = formik;

  const handleLanguageChange = languageCode => {
    if (values.languages.includes(languageCode)) {
      setFieldValue('languages', values.languages.filter(item => item !== languageCode));
    }
    else {
      setFieldValue('languages', [...values.languages, languageCode]);
    }
  };

  useEffect(() => {
    if (transactionId && !isPollingIntervalRunning) {
      intervalIdRef.current = setInterval(() => {
        dispatch(Creators.getContentCreationTransactionDetailsRequest({ transactionId }));
      }, 5000);
      setIsPollingIntervalRunning(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId, dispatch]);

  useEffect(() => {
    const cleanupInterval = () => {
      clearInterval(intervalIdRef.current);
      setIsPollingIntervalRunning(false);
    };
    return cleanupInterval;
  }, [transactionId]);

  useEffect(() => {
    if (transactionDetail) {
      clearInterval(intervalIdRef.current);
      setIsPollingIntervalRunning(false);
    }
  }, [transactionDetail]);

  return (
    <Space
      title={(
        <>
          {t('INPUT_NOTIF_TITLE')}
        &nbsp;&nbsp;
          <Tooltip title={t('TOOLTIP_INFO')}>
            <InfoCircleOutlined className="icon-type3" />
          </Tooltip>
        </>
      )}
    >
      <Form form={form} id={formId} onFinish={handleSubmit} layout="vertical">
        <Row gutter={16}>
          <Col sm={24} md={12} lg={10} style={{ display: 'flex', gap: 20 }}>
            <Form.Item
              help={get(errors, 'languages')}
              validateStatus={get(errors, 'languages') ? 'error' : 'success'}
              name="languages"
              style={{ display: 'flex', gap: 20, marginBottom: 10 }}
            >
              {languages.map(lang => (
                <label
                  key={lang.value}
                  style={{ margin: '20px 20px 0 0' }}
                >
                  {lang.label}
                  <Checkbox
                    defaultChecked
                    onChange={() => handleLanguageChange(lang.value)}
                  />
                </label>
              ))}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="mb-2">
          <Col sm={24} md={12} lg={10}>
            <SelectPromo
              slice="contentCreation"
              labelInValue
              id="promoCode"
              label={t('PROMO_CODE')}
              onChange={(_, option) => {
                setFieldValue('promoCode', option.label);
                setFieldValue('promoId', option.value);
              }}
              allowClear
              className="w-100"
            />
          </Col>
          <Col sm={24} md={12} lg={10}>
            <Select
              allowClear
              mode="multiple"
              label={t('DOMAIN_TYPES')}
              value={values.domainTypes}
              optionsData={getDomainTypeOptions()}
              onChange={domainTypes => {
                setFieldValue('domainTypes', domainTypes);
              }}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
        </Row>
        <Row gutter={16} className="mb-2">
          <Col sm={24} md={12} lg={10}>
            <Select
              allowClear
              label={t('TONE_OF_VOICE')}
              value={values.toneOfVoice}
              optionsData={getToneOfVoicesOptions()}
              onChange={toneOfVoice => {
                setFieldValue('toneOfVoice', toneOfVoice);
              }}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          <Col sm={24} md={12} lg={10}>
            <TextInput onChange={handleChange} id="discount" label={t('DISCOUNT')} />
          </Col>
        </Row>
        <Row gutter={16} className="mb-2">
          <Col sm={24} md={12} lg={10}>
            <TextInput onChange={handleChange} id="lifeStyle" label={t('LIFESTYLE')} />
          </Col>
          <Col sm={24} md={12} lg={10}>
            <TextInput onChange={handleChange} id="discountProducts" label={t('DISCOUNTED_PRODUCTS')} />
          </Col>
        </Row>
        <Row gutter={16} className="mb-2">
          <Col sm={24} md={12} lg={10}>
            <TextInput onChange={handleChange} id="occasion" label={t('OCCASION')} />
          </Col>
          <Col sm={24} md={12} lg={10}>
            <TextInput onChange={handleChange} id="conditionalProducts" label={t('CONDITIONAL_PRODUCTS')} />
          </Col>
        </Row>
        <Row gutter={16} className="mb-2">
          <Col sm={24} md={12} lg={10}>
            <Select
              allowClear
              label={t('TIMING')}
              value={values.timing}
              optionsData={getTimingsOptions()}
              onChange={timing => {
                setFieldValue('timing', timing);
              }}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          <Col sm={24} md={12} lg={10}>
            <TextInput onChange={handleChange} id="minimumBasket" label={t('MINIMUM_BASKET')} />
          </Col>
        </Row>
        <Row gutter={16} className="mb-2">
          <Col sm={24} md={12} lg={10}>
            <Select
              allowClear
              label={t('AI_TOOL')}
              value={values.aiTool}
              optionsData={getPreferredAiToolsOptions()}
              onChange={aiTool => {
                setFieldValue('aiTool', aiTool);
              }}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
        </Row>
        <Row gutter={16} className="mb-2 text-right" style={{ justifyContent: 'end' }}>
          <Button
            data-testid="save-button"
            size="medium"
            form={form}
            htmlType="submit"
            loading={isUpdatePending || isPollingIntervalRunning}
            onClick={handleSubmit}
          >{t('global:GENERATE')}
          </Button>
        </Row>
      </Form>
    </Space>
  );
};

export default Filters;
