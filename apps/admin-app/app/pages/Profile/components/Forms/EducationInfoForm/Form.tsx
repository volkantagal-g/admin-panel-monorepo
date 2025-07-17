import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Button,
  Divider,
  Skeleton,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  FormItemProps,
  FormInstance,
} from 'antd';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { isEmpty as _isEmpty } from 'lodash';

import SelectEducationLevel from '@app/pages/Employee/components/Select/EducationLevel';
import SelectEducationStatus from '@app/pages/Employee/components/Select/EducationStatus';
import { IEmployeeEducation } from '@app/pages/Employee/types';

import DeleteButton from './DeleteButton';
import ActionButtons from '../../ActionButtons';
import { getEmployeeEducationSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

import useStyles from '../../styles';
import { EDUCATION_LEVELS, EDUCATION_STATUSES } from '../../../constants';
import { validationSchema } from './validationSchema';

const FORM_MODES = {
  ADD: 'add',
  EDIT: 'edit',
} as const;

export default function EducationForm({
  mode = FORM_MODES.EDIT,
  education,
}: { mode: typeof FORM_MODES[keyof typeof FORM_MODES], education?: IEmployeeEducation }) {
  const { t } = useTranslation(['employeePage', 'global']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isAcademicProgramRequired, setIsAcademicProgramRequired] = useState<boolean>(true);

  const isEducationsPending = useSelector(getEmployeeEducationSelector.getIsPending);
  const isAddEducationPending = useSelector(getEmployeeEducationSelector.getIsPending);
  const isRemoveEducationPending = useSelector(getEmployeeEducationSelector.getIsPending);
  const isUpdateEducationPending = useSelector(getEmployeeEducationSelector.getIsPending);
  const educations = useSelector(getEmployeeEducationSelector.getData);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsAcademicProgramRequired((education?.level || 0) > EDUCATION_LEVELS.HIGH_SCHOOL);
  }, [education?.level]);

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = validationSchema(t);
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  const formEditableProps = isFormEditable ?
    {
      hasFeedback: true,
      required: true,
      rules,
    } :
    { validateStatus: undefined, disabled: true };

  if (mode === FORM_MODES.EDIT && (isUpdateEducationPending || isEducationsPending)) {
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        active
        loading
      />
    );
  }

  const handleValuesChange = (_: any, formValues: any) => {
    setIsAcademicProgramRequired(formValues.level > EDUCATION_LEVELS.HIGH_SCHOOL);
  };

  return (
    <>
      { mode === FORM_MODES.ADD && !!educations?.length && <Divider /> }
      <Form
        form={form}
        name="employeeEducationInfoForm"
        id="employeeEducationInfoForm"
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
        initialValues={{
          ...education,
          ...(education?.graduationYear && { graduationYear: moment().year(education.graduationYear) }),
        }}
      >
        {
          ((mode === FORM_MODES.ADD && isFormEditable) || mode === FORM_MODES.EDIT) && (
            <Row gutter={[8, 8]}>
              <Col sm={8} xs={24}>
                <Form.Item
                  {...formEditableProps}
                  name={['level']}
                  label={t('employeePage:EDUCATION_LEVEL')}
                >
                  {/* the
                  // @ts-ignore */}
                  <SelectEducationLevel
                    disabled={!isFormEditable}
                    className={classes.inputContainer}
                  />
                </Form.Item>
              </Col>
              <Col sm={8} xs={24}>
                <Form.Item
                  {...formEditableProps}
                  name={['institute']}
                  label={t('employeePage:INSTITUTE')}
                >
                  <Input disabled={!isFormEditable} placeholder={t('employeePage:INSTITUTE')} className={classes.inputContainer} />
                </Form.Item>
              </Col>
              <Col sm={8} xs={24}>
                <Form.Item
                  {...formEditableProps}
                  {...(!isAcademicProgramRequired ? { required: false } : { required: formEditableProps.required })}
                  dependencies={['level']}
                  name={['academicProgram']}
                  label={t('employeePage:ACADEMIC_PROGRAM')}
                >
                  <Input disabled={!isFormEditable} placeholder={t('employeePage:ACADEMIC_PROGRAM')} className={classes.inputContainer} />
                </Form.Item>
              </Col>
              <Col sm={8} xs={24}>
                <Form.Item
                  {...formEditableProps}
                  name={['status']}
                  label={t('employeePage:EDUCATION_STATUS')}
                >
                  {/* the
                  // @ts-ignore */}
                  <SelectEducationStatus
                    disabled={!isFormEditable}
                    className={classes.inputContainer}
                    onChange={handleEducationStatusValue}
                  />
                </Form.Item>
              </Col>
              <Col sm={8} xs={24}>
                <Form.Item
                  {...formEditableProps}
                  name={['graduationYear']}
                  label={t('employeePage:GRADUATION_YEAR')}
                >
                  <DatePicker
                    picker="year"
                    allowClear={false}
                    disabled={!isFormEditable}
                    className={`${classes.inputContainer} w-100`}
                    disabledDate={handleDisabledYear}
                  />
                </Form.Item>
              </Col>
            </Row>
          )
        }
        { mode === FORM_MODES.EDIT && !_isEmpty(education) && !isFormEditable && (
          <Divider orientation="right" orientationMargin={0}>
            <Button
              loading={isEducationsPending || isAddEducationPending || isRemoveEducationPending || isUpdateEducationPending}
              type="primary"
              size="small"
              className={classes.buttonBase}
              onClick={handleEditClick}
            >
              {t('EDIT')}
            </Button>&nbsp;&nbsp;
            <DeleteButton
              onClick={() => handleDeleteClick({ educationId: education._id })}
              disabled={isEducationsPending || isAddEducationPending || isRemoveEducationPending || isUpdateEducationPending}
            />
          </Divider>
        ) }
        {
          (mode === FORM_MODES.ADD || (mode === FORM_MODES.EDIT && isFormEditable)) && (
            <Row gutter={[8, 8]} justify="end" className={(mode === FORM_MODES.EDIT && isFormEditable) ? 'mb-4' : ''}>
              <Col>
                <ActionButtons
                  isFormEditable={isFormEditable}
                  isPending={isEducationsPending || isAddEducationPending || isRemoveEducationPending || isUpdateEducationPending}
                  onEdit={handleAddClick}
                  onCancel={handleCancelClick}
                  onSave={handleSaveClick}
                  editBtnText={t('global:ADD')}
                />
              </Col>
            </Row>
          )
        }
      </Form>
    </>
  );

  function resetFormFields() {
    if (mode === FORM_MODES.ADD) {
      form.resetFields();
    }
    else {
      form.setFieldsValue({
        ...education,
        ...(education?.graduationYear && { graduationYear: moment().year(education.graduationYear) }),
      });
    }
  }

  function commonOnSuccessForDispatch() {
    resetFormFields();
    setIsFormEditable(false);
  }

  function handleSubmit(formValues: any): void {
    if (mode === FORM_MODES.ADD) {
      dispatch(Creators.addEducationRequest({
        values: formValues,
        onSuccess: commonOnSuccessForDispatch,
      }));
    }
    else if (mode === FORM_MODES.EDIT) {
      dispatch(Creators.updateEducationRequest({
        values: formValues,
        educationId: education?._id,
        onSuccess: commonOnSuccessForDispatch,
      }));
    }
  }

  function handleDeleteClick({ educationId }: { educationId: string }) {
    dispatch(Creators.removeEducationRequest({ educationId }));
  }

  function handleAddClick() {
    setIsFormEditable(true);
    form.validateFields();
  }

  function handleEditClick() {
    setIsFormEditable(true);
    form.validateFields();
  }

  function handleCancelClick() {
    setIsFormEditable(false);
    resetFormFields();
  }

  function handleSaveClick() {
    let hasError = false;
    const fieldErrors = form.getFieldsError();
    fieldErrors.forEach(fieldError => {
      if (fieldError.errors.length > 0) {
        hasError = true;
      }
    });
    if (!hasError) {
      form.submit();
    }
  }

  function handleDisabledYear(current: moment.Moment) {
    if (form.getFieldsValue().status === EDUCATION_STATUSES.GRADUATED) {
      return moment(current).year() > moment().year();
    }
    return false;
  }

  function handleEducationStatusValue(status: number) {
    form.setFieldsValue({ graduationYear: undefined });
  }
}
