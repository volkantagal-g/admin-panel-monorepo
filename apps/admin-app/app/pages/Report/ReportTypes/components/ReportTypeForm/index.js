import { Button, Checkbox, Col, Form, Input, Row, Select, Tag } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import confirm from 'antd/lib/modal/confirm';

import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';
import { ROUTE } from '@app/routes';

// import ReportTag from '../../../components/ReportTag';
import { REPORT_TYPE_FORM_MODE } from '../../constants';
import { reportTypeValidationSchema } from './schema';
import useStyles from './styles';
import ParameterInput from './ParameterInput';
import { getInitialParameterValues, TAG_VALUE_SEPARATOR } from './formUtils';
import { getCustomTagValue } from '../../utils';
import { getChangedValues } from '../../../utils';

const { Option } = Select;

const fieldNames = {
  nameTr: 'name.tr',
  nameEn: 'name.en',
  descTr: 'description.tr',
  descEn: 'description.en',
  instructionsTr: 'instructions.tr',
  instructionsEn: 'instructions.en',
};

const TagRender = props => {
  const navigate = useNavigate();
  const { label, value, onClose } = props;
  // we have to do this to pass colors with value, custom fields are not passed with props so we generate value from colors
  // there is no documentation about tagRender for more control
  // https://ant.design/components/select/#API you can look at tagRender prop
  const [_id, backgroundColor, color, canClose] = value.split(TAG_VALUE_SEPARATOR);
  const closable = canClose === 'true';

  const redirectToReportTagDetailPage = () => {
    const tagDetailRoute = ROUTE.REPORT_TAGS_DETAIL.path;
    const tagDetailPath = tagDetailRoute.replace(':id', _id);
    navigate(tagDetailPath);
  };

  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles
    <Tag
      onClick={() => redirectToReportTagDetailPage()}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3, backgroundColor, color }}
    >
      {label}
    </Tag>
  );
};

export default function ReportTypeForm({
  initialValues,
  mode,
  onFormActionClick,
  onEditCancel,
  onDeleteClick,
  canAccessFormActions,
  isLoading,
  allReportTags = [],
  allEmployees = [],
}) {
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();

  const [form] = useForm();

  const formik = useFormik({
    initialValues,
    validationSchema: reportTypeValidationSchema(t),
    enableReinitialize: true,
    onSubmit: values => {
      if (mode === REPORT_TYPE_FORM_MODE.NEW) {
        return onFormActionClick(values);
      }
      // only get the changed values on edit mode
      const changedValues = getChangedValues(initialValues, values);
      return onFormActionClick(changedValues);
    },
  });
  const { handleSubmit, values, setFieldValue, setFieldTouched, setFieldError, dirty, touched, errors } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (inputType === 'select') {
        setFieldValue(fieldName, param);
      }
      else if (inputType === 'checkbox') {
        setFieldValue(fieldName, param.target.checked);
      }
      else {
        setFieldValue(fieldName, param.target.value);
      }
    };
  };

  const getHandleBlur = fieldName => {
    return () => setFieldTouched(fieldName);
  };

  const isReadonly = mode === REPORT_TYPE_FORM_MODE.READONLY;

  const reportTagOptions = useMemo(
    () => allReportTags.map(rt => {
      // pass custom value so we can use colors and closable props in tagRender
      const customValue = getCustomTagValue(rt, !isReadonly);
      return (
        <Option
          label={rt.name[getLangKey()]}
          value={customValue}
          style={{ backgroundColor: rt.backgroundColor, color: rt.textColor }}
          key={rt._id}
        >
          {rt.name[getLangKey()]}
        </Option>
      );
    }),
    [allReportTags, isReadonly],
  );

  const reportOwnerOptions = useMemo(
    () => (allEmployees || [])?.map(employee => {
      return (
        <Option
          label={employee.fullName}
          value={employee._id}
          key={employee._id}
        >
          {employee.fullName}
        </Option>
      );
    }),
    [allEmployees],
  );
  return (
    <Form initialValues={initialValues} form={form} id="reportTypeForm" onFinish={handleSubmit} layout="vertical" className={classes.form}>
      <Row gutter={[4, 4]}>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('NAME_1')} (TR)`}
            name={['name', 'tr']}
            help={get(touched, fieldNames.nameTr) && get(errors, fieldNames.nameTr)}
            validateStatus={get(touched, fieldNames.nameTr) && get(errors, fieldNames.nameTr) ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Input
              value={get(values, fieldNames.nameTr)}
              type="text"
              placeholder={t('NAME_1')}
              onChange={getHandleChange(fieldNames.nameTr)}
              onBlur={getHandleBlur(fieldNames.nameTr)}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('NAME_1')} (EN)`}
            name={['name', 'en']}
            help={get(touched, fieldNames.nameEn) && get(errors, fieldNames.nameEn)}
            validateStatus={get(touched, fieldNames.nameEn) && get(errors, fieldNames.nameEn) ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Input
              value={get(values, fieldNames.nameEn)}
              type="text"
              placeholder={t('NAME_1')}
              onChange={getHandleChange(fieldNames.nameEn)}
              onBlur={getHandleBlur(fieldNames.nameEn)}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('DESCRIPTION')} (TR)`}
            name={['description', 'tr']}
            help={get(touched, fieldNames.descTr) && get(errors, fieldNames.descTr)}
            validateStatus={get(touched, fieldNames.descTr) && get(errors, fieldNames.descTr) ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Input
              value={get(values, fieldNames.descTr)}
              type="text"
              placeholder={t('DESCRIPTION')}
              onChange={getHandleChange(fieldNames.descTr)}
              onBlur={getHandleBlur(fieldNames.descTr)}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('DESCRIPTION')} (EN)`}
            name={['description', 'en']}
            help={get(touched, fieldNames.descEn) && get(errors, fieldNames.descEn)}
            validateStatus={get(touched, fieldNames.descEn) && get(errors, fieldNames.descEn) ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Input
              value={get(values, fieldNames.descEn)}
              type="text"
              placeholder={t('DESCRIPTION')}
              onChange={getHandleChange(fieldNames.descEn)}
              onBlur={getHandleBlur(fieldNames.descEn)}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('INSTRUCTIONS')} (TR)`}
            name={['instructions', 'tr']}
            className={classes.formItem}
          >
            <Input
              value={get(values, fieldNames.instructionsTr)}
              type="text"
              placeholder={t('INSTRUCTIONS')}
              onChange={getHandleChange(fieldNames.instructionsTr)}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('INSTRUCTIONS')} (EN)`}
            name={['instructions', 'en']}
            className={classes.formItem}
          >
            <Input
              value={get(values, fieldNames.instructionsEn)}
              type="text"
              placeholder={t('INSTRUCTIONS')}
              onChange={getHandleChange(fieldNames.instructionsEn)}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col sm={12} xs={24}>
          <Form.Item
            label={t('SCRIPT_FILE')}
            name="scriptFile"
            help={get(touched, 'scriptFile') && get(errors, 'scriptFile')}
            validateStatus={get(touched, 'scriptFile') && get(errors, 'scriptFile') ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Input
              value={values.scriptFile}
              type="text"
              placeholder={t('SCRIPT_FILE')}
              onChange={getHandleChange('scriptFile')}
              onBlur={getHandleBlur('scriptFile')}
              readOnly={isReadonly}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label={t('IS_ACTIVE')}
            name="isActive"
            help={get(touched, 'isActive') && get(errors, 'isActive')}
            validateStatus={get(touched, 'isActive') && get(errors, 'isActive') ? 'error' : 'success'}
            className={classes.formItem}
          >
            <Checkbox
              checked={get(values, 'isActive')}
              onChange={getHandleChange('isActive', 'checkbox')}
              onBlur={getHandleBlur('isActive')}
              disabled={isReadonly}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label={t('TAGS')} name="reportTags" className={classes.formItem}>
        <Select
          value={get(values, 'reportTags')}
          tagRender={TagRender}
          onChange={getHandleChange('reportTags', 'select')}
          mode="multiple"
          filterOption={getSelectFilterOption}
          disabled={isReadonly}
          showSearch
          optionFilterProp="label"
        >
          {reportTagOptions}
        </Select>
      </Form.Item>
      <Form.Item label={t('REPORT_OWNER')} name="reportOwners" className={classes.formItem}>
        <Select
          value={get(values, 'reportOwners')}
          onChange={getHandleChange('reportOwners', 'select')}
          placeholder={t('REPORT_OWNER')}
          mode="multiple"
          filterOption={getSelectFilterOption}
          disabled={isReadonly}
          showSearch
          optionFilterProp="label"
        >{reportOwnerOptions}
        </Select>
      </Form.Item>
      <Row>
        <Form.Item
          name="parameters"
          // general parameters errors are typeof string
          // otherwise it is a collection of errors for each parameter which we show under each parameter
          help={get(touched, 'parameters') && typeof get(errors, 'parameters') === 'string' && get(errors, 'parameters')}
          validateStatus={get(touched, 'parameters') && get(errors, 'parameters') ? 'error' : 'success'}
        >
          <h5 className={classes.parametersHeader}>{t('PARAMETERS')}</h5>
        </Form.Item>
      </Row>
      <Row gutter={[4, 4]}>
        {values.parameters?.map((param, index) => (
          <ParameterInput
            formik={formik}
            antdFieldName={['parameters', index]}
            formikFieldName={`parameters[${index}]`}
            isReadonly={isReadonly}
            getHandleChange={getHandleChange}
            getHandleBlur={getHandleBlur}
            onClose={() => {
              const copiedArray = [...get(values, 'parameters', [])];
              const copiedErrors = [...get(errors, 'parameters', [])];
              const copiedTouched = [...get(touched, 'parameters', [])];
              // dynamic elements needs to be handled manually, remove the elements from these arrays on that index
              copiedArray.splice(index, 1);
              copiedErrors.splice(index, 1);
              copiedTouched.splice(index, 1);
              setFieldValue('parameters', copiedArray);
              // don't validate on touch here, messes the errors
              setFieldTouched('parameters', copiedTouched, false);
              setFieldError('parameters', copiedErrors);
            }}
            // don't use variableName as it can be same for a period of time when it is edited, so use fakeKey
            key={param.fakeKey}
          />
        ))}
        {!isReadonly && (
          <Col span={12} className={classes.addParameterBox}>
            <Button type="primary" onClick={() => setFieldValue('parameters', [...values.parameters, getInitialParameterValues()])}>
              {t('ADD_PARAMETER')}
            </Button>
          </Col>
        )}
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

  function getButtonForMode(_mode) {
    const commonProps = { type: 'primary', disabled: !dirty || isLoading };

    const resetForm = () => {
      formik.resetForm();
      form.resetFields();
    };

    const onEditCancelWrapper = () => {
      resetForm();
      onEditCancel();
    };

    switch (_mode) {
      case REPORT_TYPE_FORM_MODE.NEW:
        return (
          <Button {...commonProps} htmlType="submit" key="create" loading={isLoading}>
            {t('CREATE')}
          </Button>
        );
      case REPORT_TYPE_FORM_MODE.EDIT:
        return (
          <div className={classes.editModeButtons}>
            <Button danger onClick={() => confirmDelete(onDeleteClick, t)}>
              {t('global:DELETE')}
            </Button>

            <Button {...commonProps} htmlType="submit" key="save" loading={isLoading}>
              {t('SAVE')}
            </Button>
            <Button type="default" key="cancel" htmlType="button" disabled={isLoading} onClick={onEditCancelWrapper}>
              {t('CANCEL')}
            </Button>
          </div>
        );
      case REPORT_TYPE_FORM_MODE.READONLY:
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

function confirmDelete(onConfirm, t) {
  const confirmOptions = {
    title: t('DELETE_REPORT_TYPE_MODAL_TITLE'),
    icon: <ExclamationCircleOutlined />,
    width: '50%',
    content: t('CONFIRMATION.DELETE_REPORT_TYPE'),
    onOk() {
      onConfirm();
    },
  };
  confirm(confirmOptions);
}
