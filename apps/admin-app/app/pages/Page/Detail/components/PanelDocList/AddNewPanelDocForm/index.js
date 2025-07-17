import { memo, useEffect } from 'react';
import { Form, Input, Row, Col, Button, Alert } from 'antd';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { Creators } from '../../../redux/actions';
import {
  getInitialValues,
  validationSchema,
} from './formHelper';

const AddNewPanelDocForm = ({ t, afterSubmit, afterCancel, loading, pageId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: getInitialValues(),
    enableReinitialize: false,
    validationSchema,
    onSubmit: values => {
      dispatch(Creators.createPanelDocRequest({ name: values.name, pageId }));
      AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.DOC_INFO_ADD });
    },
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setFieldTouched, isValid, dirty } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const getHandleBlur = fieldName => {
    return () => {
      setFieldTouched(fieldName, true, true);
    };
  };

  const onFinish = () => {
    handleSubmit();
    if (isValid) {
      afterSubmit();
    }
  };

  return (
    <Form
      form={form}
      id="add-new-panel-doc-form"
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={[theme.spacing(3)]} align="bottom">
        <Col span={24}>
          <Form.Item
            help={get(touched, 'name.tr') && get(errors, 'name.tr')}
            validateStatus={get(touched, 'name.tr') && get(errors, 'name.tr') ? 'error' : 'success'}
            name={['name', 'tr']}
            htmlFor="name_tr_modal"
            label={`${t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.NAME')} (TR)`}
          >
            <Input
              id="name_tr_modal"
              value={values.name.tr}
              onChange={event => {
                const value = get(event, 'target.value', '');
                setFieldValue('name.tr', value);
              }}
              onBlur={getHandleBlur('name.tr')}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]} align="bottom">
        <Col span={24}>
          <Form.Item
            help={get(touched, 'name.en') && get(errors, 'name.en')}
            validateStatus={get(touched, 'name.en') && get(errors, 'name.en') ? 'error' : 'success'}
            htmlFor="name_en_modal"
            name={['name', 'en']}
            label={`${t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.NAME')} (EN)`}
          >
            <Input
              id="name_en_modal"
              value={values.name.en}
              onChange={event => {
                const value = get(event, 'target.value', '');
                setFieldValue('name.en', value);
              }}
              onBlur={getHandleBlur('name.en')}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]} align="bottom">
        <div key="alert-row" style={{ marginBottom: '4px', textAlign: 'left' }}>
          <Alert message={t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.MODAL_INFO_TEXT')} type="info" showIcon />
        </div>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24} style={{ display: 'flex', justifyContent: 'end' }}>
          <div key="buttons-row">
            <Button
              onClick={afterCancel}
            >
              {t('button:CANCEL')}
            </Button>
            <Button
              className="ml-1"
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!dirty}
            >
              {t('button:SAVE')}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default memo(AddNewPanelDocForm);
