import { Button, Checkbox, Col, Form, Input, Row, Tooltip } from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DynamicFormItems } from '@shared/components/DynamicForm/DynamicFormItems';

import { getDynamicFormConfigsFromReportType, REPORT_FORM_MODE } from '../../constants';
import { getReportValidationFromReportType } from './formUtils';
import useStyles from './styles';

export default function ReportForm({ initialValues, reportType, onFormActionClick, mode, isLoading, canAccessFormActions = true }) {
  const classes = useStyles();
  const { t } = useTranslation(['reportsPage', 'marketProductPage']);
  const isReadonly = mode === REPORT_FORM_MODE.READONLY;
  const [shouldStay, setShouldStay] = useState(false);

  const validationSchema = getReportValidationFromReportType(reportType, isReadonly);
  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      // remove UI filters' fields that don't belong in final request, before sending
      const clean = validationSchema.cast(values, { stripUnknown: true });
      onFormActionClick(clean, shouldStay);
    },
  });
  const { handleSubmit, values, setFieldValue, setFieldTouched, dirty, touched, errors } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const getValue = fieldName => get(values, fieldName);
  const getHelp = fieldName => get(touched, fieldName) && get(errors, fieldName);
  const getValidationStatus = fieldName => (get(touched, fieldName) && get(errors, fieldName) ? 'error' : 'success');
  const getHandleChange = fieldName => {
    return param => {
      setFieldValue(fieldName, param.target.value);
    };
  };

  const getHandleBlur = fieldName => {
    return () => setFieldTouched(fieldName);
  };

  const configs = useMemo(
    () => getDynamicFormConfigsFromReportType(reportType, t, isReadonly, classes),
    [reportType, t, isReadonly, classes],
  );

  return (
    <Form initialValues={initialValues} form={form} id="reportForm" onFinish={handleSubmit} layout="vertical" className={classes.form}>
      <Row gutter={[4, 4]}>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('NAME_1')} (TR)`}
            name={['name', 'tr']}
            help={getHelp('name.tr')}
            validateStatus={getValidationStatus('name.tr')}
            className={classes.formItem}
          >
            <Input
              value={getValue('name.tr')}
              type="text"
              placeholder={t('REPORT_NAME_PLACEHOLDER')}
              onChange={getHandleChange('name.tr')}
              onBlur={getHandleBlur('name.tr')}
              disabled={isReadonly}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('NAME_1')} (EN)`}
            name={['name', 'en']}
            help={getHelp('name.en')}
            validateStatus={getValidationStatus('name.en')}
            className={classes.formItem}
          >
            <Input
              value={getValue('name.en')}
              type="text"
              placeholder={t('REPORT_NAME_PLACEHOLDER')}
              onChange={getHandleChange('name.en')}
              onBlur={getHandleBlur('name.en')}
              disabled={isReadonly}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <DynamicFormItems formConfigs={configs} formik={formik} />
      </Row>
      {canAccessFormActions && (
        <Row gutter={[10, 4]}>
          <Col span={24} className={classes.actionButtonContainer}>
            {getButtonForMode(mode)}
          </Col>
        </Row>
      )}
    </Form>
  );

  function getButtonForMode(modeInp) {
    const commonProps = { type: 'primary', htmlType: 'submit', disabled: !dirty || isLoading };

    switch (modeInp) {
      case REPORT_FORM_MODE.NEW:
        return (
          <div>
            <Checkbox checked={shouldStay} onChange={() => setShouldStay(prev => !prev)}>
              <Tooltip placement="top" title={t('SHOUL_STAY_SAME_PAGE_TOOLTIP')}>
                {t('SHOUL_STAY_SAME_PAGE')}
              </Tooltip>
            </Checkbox>
            <Button {...commonProps} key="create" loading={isLoading}>
              {t('CREATE')}
            </Button>
          </div>
        );
      default:
        return null;
    }
  }
}
