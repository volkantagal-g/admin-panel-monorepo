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
import { isEmpty as _isEmpty, isEqual as _isEqual, omit as _omit } from 'lodash';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import SelectEducationLevel from '@app/pages/Employee/components/Select/EducationLevel';
import SelectEducationStatus from '@app/pages/Employee/components/Select/EducationStatus';
import { IEmployeeEducation } from '@app/pages/Employee/types';
import DeleteButton from './DeleteButton';
import ActionButtons from '../ActionButtons';
import {
  addEducationSelector,
  educationsSelector,
  removeEducationSelector,
  updateEducationSelector,
} from '@app/pages/Employee/Detail/redux/selectors';
import { Creators } from '@app/pages/Employee/Detail/redux/actions';
import useStyles from '../../styles';
import { validationSchema } from './validationSchema';
import { EDUCATION_LEVELS, EDUCATION_STATUSES } from '../../../constants';

const FORM_MODES = {
  ADD: 'add',
  EDIT: 'edit',
} as const;

const EducationForm = ({
  mode = FORM_MODES.EDIT,
  education,
}: { mode: typeof FORM_MODES[keyof typeof FORM_MODES], education?: IEmployeeEducation }) => {
  const { t } = useTranslation(['employeePage', 'global']);
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isAcademicProgramRequired, setIsAcademicProgramRequired] = useState<boolean>(true);
  const isEducationsPending = useSelector(educationsSelector.getIsPending);
  const isAddEducationPending = useSelector(addEducationSelector.getIsPending);
  const isRemoveEducationPending = useSelector(removeEducationSelector.getIsPending);
  const isUpdateEducationPending = useSelector(updateEducationSelector.getIsPending);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(true);
  const educations = useSelector(educationsSelector.getData);
  const hasEditAccess = canAccess(permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_EDIT_EMPLOYEE);
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

  const resetFormFields = () => {
    if (mode === FORM_MODES.ADD) {
      form.resetFields();
    }
    else {
      form.setFieldsValue({
        ...education,
        ...(education?.graduationYear && { graduationYear: moment().year(education.graduationYear) }),
      });
    }
  };

  const commonOnSuccessForDispatch = () => {
    resetFormFields();
    setIsFormEditable(false);
    setIsSaveButtonDisabled(true);
  };
  const handleSubmit = (formValues: any): void => {
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
  };

  const handleDeleteClick = ({ educationId }: { educationId: string }) => {
    dispatch(Creators.removeEducationRequest({ educationId }));
  };
  const handleAddClick = () => {
    setIsFormEditable(true);
    form.validateFields();
  };
  const handleEditClick = () => {
    setIsFormEditable(true);
    form.validateFields();
  };
  const handleCancelClick = () => {
    setIsFormEditable(false);
    setIsSaveButtonDisabled(true);
    resetFormFields();
  };
  const handleSaveClick = () => {
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
  };

  const formEditableProps = isFormEditable ?
    {
      hasFeedback: true,
      required: true,
      rules,
    } :
    { validateStatus: undefined, disabled: true };

  if (!hasEditAccess && mode === FORM_MODES.ADD) {
    return null;
  }

  if (mode === FORM_MODES.EDIT && (isUpdateEducationPending || isEducationsPending)) {
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        active
        loading
      />
    );
  }

  const handleDisabledYear = (current: moment.Moment) => {
    if (form.getFieldsValue().status === EDUCATION_STATUSES.GRADUATED) {
      return moment(current).year() > moment().year();
    }
    return false;
  };

  const handleEducationStatusValue = (status: number) => {
    form.setFieldsValue({ graduationYear: undefined });
  };

  const handleValuesChange = (_:any, formValues: any) => {
    const IGNORED_FIELDS = ['id', '_id', '__v', 'employee', 'isDeleted', 'updatedAt', 'createdAt'];

    setIsAcademicProgramRequired(formValues.level > EDUCATION_LEVELS.HIGH_SCHOOL);
    const formattedEducation = {
      ...education,
      ...(education?.graduationYear && { graduationYear: education.graduationYear }),
    };

    const formattedFormValues = {
      ...formValues,
      ...(formValues?.graduationYear && { graduationYear: formValues.graduationYear?.year() }),
    };

    const omittedAndFormattedEducation = _omit(formattedEducation, IGNORED_FIELDS);
    const hasFormValuesChanged = !_isEqual(formattedFormValues, omittedAndFormattedEducation);
    setIsSaveButtonDisabled(!hasFormValuesChanged);
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
            <Row gutter={[16, 16]}>
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
        { hasEditAccess && mode === FORM_MODES.EDIT && !_isEmpty(education) && !isFormEditable && (
          <Divider orientation="right" orientationMargin={5}>
            <Button
              loading={isEducationsPending || isAddEducationPending || isRemoveEducationPending || isUpdateEducationPending}
              type="primary"
              size="middle"
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
            <Row>
              <Col span={24}>
                <ActionButtons
                  isFormEditable={isFormEditable}
                  isPending={isEducationsPending || isAddEducationPending || isRemoveEducationPending || isUpdateEducationPending}
                  isSaveDisabled={isSaveButtonDisabled}
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
};

export default EducationForm;
