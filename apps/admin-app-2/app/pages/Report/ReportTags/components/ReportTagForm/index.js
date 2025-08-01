import { Button, Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import { validate } from '@shared/yup';

import ReportTag from '../../../components/ReportTag';
import { REPORT_TAG_FORM_MODE } from '../../constants';
import { reportTagValidationSchema } from './schema';
import useStyles from './styles';
import { getChangedValues } from '../../../utils';

export default function ReportTagForm({ initialValues, mode, onFormActionClick, onEditCancel, canAccessFormActions, isLoading }) {
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();

  const [form] = useForm();

  const formik = useFormik({
    initialValues,
    validate: validate(reportTagValidationSchema),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values => {
      const changedValues = getChangedValues(initialValues, values);
      if (mode === REPORT_TAG_FORM_MODE.NEW) {
        return onFormActionClick(values);
      }
      // only get the changed values on edit mode
      return onFormActionClick(changedValues);
    },
  });
  const { handleSubmit, values, setFieldValue, dirty, touched, errors, handleBlur } = formik;

  const getHandleChange = fieldName => {
    return event => setFieldValue(fieldName, event.target.value);
  };

  const isReadonly = mode === REPORT_TAG_FORM_MODE.READONLY;

  return (
    <Form initialValues={initialValues} form={form} id="reportTagForm" onFinish={handleSubmit} layout="vertical" className={classes.form}>
      <Row gutter={[2, 2]}>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('NAME_1')} (TR)`}
            name={['name', 'tr']}
            help={get(touched, 'name.tr') && get(errors, 'name.tr')}
            validateStatus={get(touched, 'name.tr') && get(errors, 'name.tr') ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Input
              value={values.name.tr}
              type="text"
              placeholder={t('NAME_1')}
              onChange={getHandleChange('name.tr')}
              onBlur={handleBlur}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('NAME_1')} (EN)`}
            name={['name', 'en']}
            help={get(touched, 'name.en') && get(errors, 'name.en')}
            validateStatus={get(touched, 'name.en') && get(errors, 'name.en') ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Input
              value={values.name.en}
              type="text"
              placeholder={t('NAME_1')}
              onChange={getHandleChange('name.en')}
              onBlur={handleBlur}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[2, 2]}>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('DESCRIPTION')} (TR)`}
            name={['description', 'tr']}
            help={get(touched, 'description.tr') && get(errors, 'description.tr')}
            validateStatus={get(touched, 'description.tr') && get(errors, 'description.tr') ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Input
              value={values.description.tr}
              type="text"
              placeholder={t('DESCRIPTION')}
              onChange={getHandleChange('description.tr')}
              onBlur={handleBlur}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('DESCRIPTION')} (EN)`}
            name={['description', 'en']}
            help={get(touched, 'description.en') && get(errors, 'description.en')}
            validateStatus={get(touched, 'description.en') && get(errors, 'description.en') ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Input
              value={values.description.en}
              type="text"
              placeholder={t('DESCRIPTION')}
              onChange={getHandleChange('description.en')}
              onBlur={handleBlur}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10, 4]}>
        <Col sm={6} xs={12}>
          <Form.Item label={t('BG_COLOR')} name="backgroundColor" className={classes.formItem}>
            <Input value={values.backgroundColor} type="color" onChange={getHandleChange('backgroundColor')} disabled={isReadonly} />
          </Form.Item>
        </Col>
        <Col sm={6} xs={12}>
          <Form.Item label={t('TEXT_COLOR')} name="textColor" className={classes.formItem}>
            <Input value={values.textColor} type="color" onChange={getHandleChange('textColor')} disabled={isReadonly} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item label={t('EXAMPLE_DISPLAY')} className={classes.formItem}>
            <ReportTag reportTag={values} isViewMode />
          </Form.Item>
        </Col>
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

  function getButtonForMode() {
    const commonProps = { type: 'primary', disabled: !dirty || isLoading };

    const resetForm = () => {
      formik.resetForm();
      form.resetFields();
    };

    const onEditCancelWrapper = () => {
      resetForm();
      onEditCancel();
    };

    switch (mode) {
      case REPORT_TAG_FORM_MODE.NEW:
        return (
          <Button {...commonProps} htmlType="submit" key="create" loading={isLoading}>
            {t('CREATE')}
          </Button>
        );
      case REPORT_TAG_FORM_MODE.EDIT:
        return (
          <div className={classes.editModeButtons}>
            <Button {...commonProps} htmlType="submit" key="save" loading={isLoading}>
              {t('SAVE')}
            </Button>
            <Button type="default" key="cancel" htmlType="button" disabled={isLoading} onClick={onEditCancelWrapper}>
              {t('CANCEL')}
            </Button>
          </div>
        );
      case REPORT_TAG_FORM_MODE.READONLY:
        return (
          <Button {...commonProps} key="edit" disabled={isLoading} onClick={() => onFormActionClick()}>
            {t('EDIT')}
          </Button>
        );
      default:
        return null;
    }
  }
}
