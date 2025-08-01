import { useEffect, useState } from 'react';
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
import { isEmpty as _isEmpty, isEqual as _isEqual } from 'lodash';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { IEmployeeSurveyHistory } from '@app/pages/Employee/types';
import ActionButtons from '../ActionButtons';

import {
  addSurveyRequest,
  employeeSurveyHistorySelector,
  updateSurveyRequest,
} from '@app/pages/Employee/Detail/redux/selectors';
import { Creators } from '@app/pages/Employee/Detail/redux/actions';
import useStyles from '../../styles';
import { validationSchema } from './validationSchema';
import SelectEndOfEmploymentSurveyTurnoverReasons
  from '@app/pages/Employee/components/Select/EndOfEmploymentSurveyTurnoverReasons';
import SelectEndOfEmploymentSurveyLeaveReasons
  from '@app/pages/Employee/components/Select/EndOfEmploymentSurveyLeaveReasons';

const FORM_MODES = {
  ADD: 'add',
  EDIT: 'edit',
} as const;

const OnboardingForm = ({
  mode = FORM_MODES.EDIT,
  surveyHistoryData,
}: { mode: typeof FORM_MODES[keyof typeof FORM_MODES], surveyHistoryData?: IEmployeeSurveyHistory }) => {
  const { t } = useTranslation(['employeePage', 'global']);
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(true);

  const isAddSurveyPending = useSelector(addSurveyRequest.getIsPending);
  const isUpdateSurveyPending = useSelector(updateSurveyRequest.getIsPending);
  const isAllSurveyHistoryPending = useSelector(employeeSurveyHistorySelector.getIsPending);
  const allSurveyHistoryData = useSelector(employeeSurveyHistorySelector.getData)?.surveyHistory;
  const isEmployeeSurveyHistoryPending = useSelector(employeeSurveyHistorySelector.getIsPending);
  // const hasEditAccess = canAccess(permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_EDIT_EMPLOYEE);
  const hasEditAccess = true;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...surveyHistoryData,
      ...(surveyHistoryData?.workEndDate && { workEndDate: moment(surveyHistoryData.workEndDate) }),
    });
  }, [form, surveyHistoryData]);

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
        ...surveyHistoryData,
        ...(surveyHistoryData?.workEndDate && { workEndDate: moment(surveyHistoryData.workEndDate) }),
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
      dispatch(Creators.addSurveyRequest({
        values: formValues,
        onSuccess: commonOnSuccessForDispatch,
      }));
    }

    else if (mode === FORM_MODES.EDIT) {
      dispatch(Creators.updateSurveyRequest({
        values: formValues,
        id: surveyHistoryData?._id,
        onSuccess: commonOnSuccessForDispatch,
      }));
    }
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
  const handleValuesChange = (_: any, formValues: any) => {
    const formattedFormValues = {
      turnoverType: formValues.surveyInfo?.turnoverType,
      leaveType: formValues.surveyInfo?.leaveType,
      workEndDate: formValues.workEndDate?.toISOString(),
    };

    const formattedSurveyHistoryData = {
      turnoverType: surveyHistoryData?.surveyInfo?.turnoverType,
      leaveType: surveyHistoryData?.surveyInfo?.leaveType,
      workEndDate: surveyHistoryData?.workEndDate,
    };

    const hasFormValuesChange = !_isEqual(formattedFormValues, formattedSurveyHistoryData);
    setIsSaveButtonDisabled(!hasFormValuesChange);
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
  // add updatePending
  if (mode === FORM_MODES.EDIT && (isEmployeeSurveyHistoryPending)) {
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        active
        loading
      />
    );
  }

  return (
    <>
      { mode === FORM_MODES.ADD && !!allSurveyHistoryData?.length && <Divider /> }
      <Form
        form={form}
        name="employeeOnboardingInfoForm"
        id="employeeOnboardingInfoForm"
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
      >
        {
          ((mode === FORM_MODES.ADD && isFormEditable) || mode === FORM_MODES.EDIT) && (
            <Row gutter={[16, 16]}>
              <Col sm={8} xs={24}>
                <Form.Item
                  {...formEditableProps}
                  name={['workEndDate']}
                  label={t('employeePage:WORK_END_DATE')}
                >
                  <DatePicker
                    disabled
                    className={`${classes.inputContainer} w-100`}
                  />
                </Form.Item>
              </Col>
              <Col sm={8} xs={24}>
                <Form.Item
                  {...formEditableProps}
                  name={['surveyInfo', 'turnoverType']}
                  label={t('employeePage:EMPLOYEE_SURVEY_TURNOVER_TITLE')}
                >
                  {/* @ts-ignore */}
                  <SelectEndOfEmploymentSurveyTurnoverReasons
                    disabled={!isFormEditable}
                    className={classes.inputContainer}
                  />
                </Form.Item>
              </Col>
              <Col sm={8} xs={24}>
                <Form.Item
                  {...formEditableProps}
                  name={['surveyInfo', 'leaveType']}
                  label={t('employeePage:TYPE_OF_LEAVE_TITLE')}
                >
                  {/* @ts-ignore */}
                  <SelectEndOfEmploymentSurveyLeaveReasons
                    disabled={!isFormEditable}
                    className={classes.inputContainer}
                  />
                </Form.Item>
              </Col>
              { (hasEditAccess && mode === FORM_MODES.EDIT && !_isEmpty(surveyHistoryData) && !isFormEditable) && (
                <Col sm={8} xs={24}>
                  <Form.Item
                    {...formEditableProps}
                    name={['terminationBy', 'name']}
                    label={t('employeePage:SURVEY_ACTION_BY')}
                  >
                    <Input
                      disabled
                      placeholder={t('employeePage:SURVEY_ACTION_BY')}
                      className={classes.inputContainer}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          )
        }
        { hasEditAccess && mode === FORM_MODES.EDIT && !_isEmpty(surveyHistoryData) && !isFormEditable && (
          <Divider orientation="right" orientationMargin={5}>
            <Button
              loading={isUpdateSurveyPending || isAddSurveyPending || isAllSurveyHistoryPending}
              type="primary"
              size="middle"
              className={classes.buttonBase}
              onClick={handleEditClick}
            >
              {t('EDIT')}
            </Button>&nbsp;&nbsp;
          </Divider>
        )}
        {
          (mode === FORM_MODES.ADD || (mode === FORM_MODES.EDIT && isFormEditable)) && (
          <Row>
            <Col span={24}>
              <ActionButtons
                isFormEditable={isFormEditable}
                isPending={isAddSurveyPending || isUpdateSurveyPending || isAllSurveyHistoryPending}
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

export default OnboardingForm;
