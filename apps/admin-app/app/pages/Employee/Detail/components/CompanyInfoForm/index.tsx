import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Form,
  DatePicker,
  Row,
  Card,
  Skeleton,
  FormItemProps,
  FormInstance,
  Tooltip,
  Typography,
} from 'antd';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { isEmpty as _isEmpty, isEqual as _isEqual, omit as _omit } from 'lodash';
import { useParams } from 'react-router-dom';
import { InfoCircleTwoTone } from '@ant-design/icons';

import theme from '@shared/jssTheme';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { isEligibleForEmployment } from '@app/pages/Employee/utils';
import { COUNTRY_IDS, DEFAULT_DATE_FORMAT } from '@shared/shared/constants';

import SelectCity from '../../../components/Select/City';
import SelectContractType from '../../../components/Select/ContractType';
import SelectEmploymentType from '../../../components/Select/EmploymentType';
import SelectLocation from '../../../components/Select/Location';
import { employeeSelector, mainSelector, updateCompanyInfoSelector } from '../../redux/selectors';
import useStyles from '../../styles';
import { validationSchema } from './validationSchema';
import ActionButtons from '../ActionButtons';
import { Creators } from '../../redux/actions';

const CompanyInfoFormSection = ({ setShowWarning }: { setShowWarning: Function }) => {
  const { t } = useTranslation(['employeePage']);
  const classes = useStyles();
  const { id: employeeId } = useParams();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const isEmployeeDataPending = useSelector(employeeSelector.getIsPending);
  const isPending = useSelector(updateCompanyInfoSelector.getIsPending);
  const isFirstLoadDone = useSelector(mainSelector.getIsFirstLoadDone);
  const companyInfoFormData = useSelector(employeeSelector.getCompanyInfoFormData);
  const personalInfoFormData = useSelector(employeeSelector.getPersonalInfoFormData);
  const contactInfoFormData = useSelector(employeeSelector.getContactInfoFormData);

  const hasEditAccess = canAccess(permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_EDIT_EMPLOYEE);

  useEffect(() => {
    if (companyInfoFormData && !_isEmpty(companyInfoFormData)) {
      form.setFieldsValue(companyInfoFormData);
      setIsFormEditable(false);
      setIsSaveDisabled(true);
    }
  }, [form, companyInfoFormData]);

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = validationSchema(t);
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  const handleSubmit = (formValues: any): void => {
    dispatch(Creators.updateCompanyInfoRequest({
      values: formValues,
      onSuccess: () => {
        setIsFormEditable(false);
        // if workEndDate is changed, we update the survey history's workEndDate
        // we need to re-fetch the survey history
        dispatch(Creators.getEmployeeSurveyHistoryRequest({ values: { employeeId } }));
      },
    }));
  };

  const handleWorkStartDateChange = (_: any, dateString: string) => {
    return isEligibleForEmployment({ birthdate: personalInfoFormData?.birthdate.format(DEFAULT_DATE_FORMAT), workStartDate: dateString, setShowWarning });
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
    form.validateFields();
    setShowWarning(false);
  };
  const handleCancelClick = () => {
    setIsFormEditable(false);
    setIsSaveDisabled(true);
    form.resetFields();
    setShowWarning(false);
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
      setShowWarning(false);
    }
  };

  const handleValuesChange = (_: any, formValues: any) => {
    const IGNORED_FIELDS = ['annualLeaveCalculations'];

    const formattedFormValues = {
      ...formValues,
      workStartDate: formValues.workStartDate ? formValues.workStartDate.format(DEFAULT_DATE_FORMAT) : null,
      workEndDate: formValues.workEndDate ? formValues.workEndDate.format(DEFAULT_DATE_FORMAT) : null,
      seniorityStartDate: formValues.seniorityStartDate ? formValues.seniorityStartDate.format(DEFAULT_DATE_FORMAT) : null,
      annualLeaveCalculationStartDate:
        formValues.annualLeaveCalculationStartDate ? formValues.annualLeaveCalculationStartDate.format(DEFAULT_DATE_FORMAT) : null,
      mainWorkLocation: formValues.mainWorkLocation?.value,
      sgkCity: formValues.sgkCity,
    };

    const formattedCompanyInfoFormData = {
      ...companyInfoFormData,
      workStartDate: companyInfoFormData.workStartDate ? companyInfoFormData.workStartDate.format(DEFAULT_DATE_FORMAT) : null,
      workEndDate: companyInfoFormData.workEndDate ? companyInfoFormData.workEndDate.format(DEFAULT_DATE_FORMAT) : null,
      seniorityStartDate: companyInfoFormData.seniorityStartDate ? companyInfoFormData.seniorityStartDate.format(DEFAULT_DATE_FORMAT) : null,
      annualLeaveCalculationStartDate:
        companyInfoFormData.annualLeaveCalculationStartDate ? companyInfoFormData.annualLeaveCalculationStartDate.format(DEFAULT_DATE_FORMAT) : null,
      mainWorkLocation: companyInfoFormData.mainWorkLocation?.value,
      sgkCity: companyInfoFormData.sgkCity,
    };

    const omittedAndFormattedFormValues = _omit(formattedFormValues, IGNORED_FIELDS);
    const omittedAndFormattedCompanyInfoFormData = _omit(formattedCompanyInfoFormData, IGNORED_FIELDS);
    const hasFormValuesChanged = !_isEqual(omittedAndFormattedFormValues, omittedAndFormattedCompanyInfoFormData);
    setIsSaveDisabled(!hasFormValuesChanged);
  };

  const formEditableProps = isFormEditable ?
    {
      hasFeedback: true,
      required: true,
      rules,
    } :
    { validateStatus: undefined, disabled: true };

  if (!isFirstLoadDone && isEmployeeDataPending) {
    return (
      <Skeleton
        paragraph={{ rows: 5 }}
        active
        loading
      />
    );
  }

  return (
    <Form
      form={form}
      name="employeeDetailCompanyInfoForm"
      id="employeeDetailCompanyInfoForm"
      layout="vertical"
      initialValues={companyInfoFormData}
      onFinish={handleSubmit}
      onValuesChange={handleValuesChange}
    >
      <Card
        bordered
        className={classes.cardContainer}
        title={t('employeePage:COMPANY_INFORMATION')}
        actions={hasEditAccess ? [
          <ActionButtons
            isFormEditable={isFormEditable}
            isPending={isPending}
            onEdit={handleEditClick}
            onCancel={handleCancelClick}
            onSave={handleSaveClick}
            isSaveDisabled={isSaveDisabled}
          />,
        ] : undefined}
      >
        <Row gutter={[16, 16]}>
          <Col sm={8} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['workStartDate']}
              label={t('employeePage:WORK_START_DATE')}
            >
              <DatePicker
                disabled={!isFormEditable}
                placeholder={t('employeePage:WORK_START_DATE')}
                allowClear={false}
                className={`${classes.inputContainer} w-100`}
                onChange={handleWorkStartDateChange}
              />
            </Form.Item>
          </Col>
          <Col sm={8} xs={24}>
            <Form.Item
              {...formEditableProps}
              required={false}
              name={['seniorityStartDate']}
              label={t('employeePage:SENIORITY_DATE')}
            >
              <DatePicker
                disabled={!isFormEditable}
                placeholder={t('employeePage:SENIORITY_DATE')}
                className={`${classes.inputContainer} w-100`}
              />
            </Form.Item>
          </Col>
          <Col sm={8} xs={24}>
            <Form.Item
              {...formEditableProps}
              required={false}
              name={['annualLeaveCalculationStartDate']}
              label={t('employeePage:LEAVE_ENTITLEMENT')}
            >
              <DatePicker
                disabled={!isFormEditable}
                placeholder={t('employeePage:LEAVE_ENTITLEMENT')}
                className={`${classes.inputContainer} w-100`}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['mainWorkLocation']}
              label={t('employeePage:WORKING_LOCATION')}
            >
              {/* the form item passes the onChange
                // @ts-ignore */}
              <SelectLocation
                labelInValue
                disabled={!isFormEditable}
                placeholder={t('employeePage:WORKING_LOCATION')}
                className={classes.inputContainer}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['employmentType']}
              label={t('employeePage:EMPLOYMENT_TYPE')}
            >
              {/* onChange is passed to the SelectGender component by Form.Item
                @ts-ignore */}
              <SelectEmploymentType disabled={!isFormEditable} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['contractType']}
              label={t('employeePage:CONTRACT_TYPE')}
            >
              {/* the Form.Item passes the onChange
                // @ts-ignore */}
              <SelectContractType disabled={!isFormEditable} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          {
            companyInfoFormData.workEndDate && (
              <Col sm={12} xs={24}>
                <Form.Item
                  name={['workEndDate']}
                  label={t('employeePage:WORK_END_DATE')}
                >
                  <DatePicker
                    disabled={!isFormEditable}
                    value={companyInfoFormData.workEndDate}
                    className={`${classes.inputContainer} w-100`}
                  />
                </Form.Item>
              </Col>
            )
          }
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['sgkCity']}
              label={t('employeePage:SGK_CITY')}
            >
              {/* the Form.Item passes the onChange
                // @ts-ignore */}
              <SelectCity
                country={COUNTRY_IDS.TR}
                className={classes.inputContainer}
                disabled={!isFormEditable}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              required={false}
              label={t('employeePage:EMPLOYEE_PERMIT_INFORMATION')}
            >
              {
                companyInfoFormData.annualLeaveCalculations?.shouldShowVestedDays && (
                  <Typography.Text strong className="pr-1">
                    {`${t('employeePage:VESTED_PERMIT_DAYS')}`}: {companyInfoFormData.annualLeaveCalculations.vested || 0}{' /'}
                  </Typography.Text>
                )
              }
              <Typography.Text strong>{t('employeePage:USED_PERMIT_DAYS')}: {companyInfoFormData.annualLeaveCalculations?.used || 0} </Typography.Text>
              {
                companyInfoFormData.annualLeaveCalculations?.shouldShowVestedDays && (
                  <>
                    <Typography.Text strong className="pr-2">
                      {`/ ${t('employeePage:REMAINING_PERMIT_DAYS')}`}: {
                        (companyInfoFormData.annualLeaveCalculations.vested || 0) - (companyInfoFormData.annualLeaveCalculations.used || 0)
                      }
                    </Typography.Text>
                    <Tooltip title={t('employeePage:VESTED_PERMIT_DAYS_WARNING_TOOLTIP')}>
                      <InfoCircleTwoTone twoToneColor={theme.color.status.warning} className="pr-1" />
                    </Tooltip>
                  </>
                )
              }
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CompanyInfoFormSection;
