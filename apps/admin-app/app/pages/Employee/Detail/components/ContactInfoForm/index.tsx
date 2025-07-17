import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  InputNumber,
  Form,
  Input,
  Row,
  Card,
  Skeleton,
  FormItemProps,
  FormInstance,
} from 'antd';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { isEmpty as _isEmpty, isEqual as _isEqual } from 'lodash';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { employeeSelector, mainSelector, updateContactInfoSelector } from '../../redux/selectors';
import SelectCountry from '@shared/containers/Select/Country';
import SelectCityOfCountry from '../../../components/Select/City';
import SelectCountryDialingCode from '../../../components/Select/CountryDialingCode';
import SelectEmergencyContactRelationship from '../../../components/Select/EmergencyContactRelationship';
import useStyles from '../../styles';
import { validationSchema } from './validationSchema';
import ActionButtons from '../ActionButtons';
import { Creators } from '../../redux/actions';

const PersonalInfoFormSection = () => {
  const { t } = useTranslation(['employeePage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [selectedPersonalGSMDialCode, setSelectedPersonalGSMDialCode] = useState<string | undefined>();
  const isEmployeeDataPending = useSelector(employeeSelector.getIsPending);
  const isPending = useSelector(updateContactInfoSelector.getIsPending);
  const isFirstLoadDone = useSelector(mainSelector.getIsFirstLoadDone);
  const contactInfoFormData = useSelector(employeeSelector.getContactInfoFormData);
  const employeeInfoFormData = useSelector(employeeSelector.getEmployeeInfoFormData);

  const [selectedResidentialCountry, setSelectedResidentialCountry] = useState<MongoIDType | undefined>();
  const hasEditAccess = canAccess(permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_EDIT_EMPLOYEE);

  const handleResidentialCountryChange = (value: MongoIDType | undefined): void => {
    form.setFieldsValue({ residentialAddress: { country: value, city: undefined } });
    setSelectedResidentialCountry(value);
  };

  useEffect(() => {
    if (contactInfoFormData && !_isEmpty(contactInfoFormData)) {
      form.setFieldsValue(contactInfoFormData);
      setSelectedResidentialCountry(contactInfoFormData.residentialAddress?.country);
      setSelectedPersonalGSMDialCode(contactInfoFormData.personalGSMDialCode);
      setIsFormEditable(false);
      setIsSaveDisabled(true);
    }
  }, [form, contactInfoFormData]);

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = validationSchema(t, { isPersonalGSMRequired: !employeeInfoFormData.workGSMNumber || _isEmpty(employeeInfoFormData.workGSMNumber) });
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  const handleSubmit = (formValues: any): void => {
    dispatch(Creators.updateContactInfoRequest({
      values: formValues,
      onSuccess: () => {
        setIsFormEditable(false);
      },
    }));
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
    form.validateFields();
  };
  const handleCancelClick = () => {
    setIsFormEditable(false);
    setIsSaveDisabled(true);
    form.resetFields();
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
    const hasFormValuesChanged = !_isEqual(formValues, contactInfoFormData);
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
      name="employeeDetailContactInfoForm"
      id="employeeDetailContactInfoForm"
      layout="vertical"
      initialValues={contactInfoFormData}
      onFinish={handleSubmit}
      onValuesChange={handleValuesChange}
    >
      <Card
        bordered
        className={classes.cardContainer}
        title={t('employeePage:CONTACT_INFORMATION')}
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
              label={t('employeePage:RESIDENTIAL_COUNTRY')}
              name={['residentialAddress', 'country']}
            >
              {/* the form item passes the onChange
                // @ts-ignore */}
              <SelectCountry
                showOldCountries
                isOldCountriesSelectable
                disabled={!isFormEditable}
                className={classes.inputContainer}
                onChange={handleResidentialCountryChange}
              />
            </Form.Item>
          </Col>
          <Col sm={8} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['residentialAddress', 'city']}
              label={t('employeePage:RESIDENTIAL_CITY')}
              dependencies={['residentialAddress', 'country']}
            >
              {/* the form item passes the onChange
                // @ts-ignore */}
              <SelectCityOfCountry
                country={selectedResidentialCountry}
                disabled={!selectedResidentialCountry || !isFormEditable}
                placeholder={t('employeePage:RESIDENTIAL_CITY')}
                className={classes.inputContainer}
              />
            </Form.Item>
          </Col>
          <Col sm={8} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['residentialAddress', 'district']}
              label={t('employeePage:RESIDENTIAL_DISTRICT')}
            >
              <Input disabled={!isFormEditable} placeholder={t('employeePage:RESIDENTIAL_DISTRICT')} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={24} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['residentialAddress', 'address']}
              label={t('employeePage:RESIDENTIAL_ADDRESS')}
            >
              <Input disabled={!isFormEditable} placeholder={t('employeePage:RESIDENTIAL_ADDRESS')} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['personalEmail']}
              label={t('employeePage:PERSONAL_EMAIL')}
            >
              <Input disabled={!isFormEditable} placeholder={t('employeePage:PERSONAL_EMAIL')} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              hasFeedback
              label={t('employeePage:PERSONAL_GSM')}
            >
              <Input.Group compact>
                <Form.Item
                  noStyle
                  name={['personalGSMDialCode']}
                  dependencies={['personalGSMNumber']}
                  rules={rules}
                >
                  {/* the Form.Item passes the onChange
                    // @ts-ignore */}
                  <SelectCountryDialingCode
                    allowClear
                    onChange={setSelectedPersonalGSMDialCode}
                    disabled={!isFormEditable}
                    className={classes.dialingCodeSelect}
                  />
                </Form.Item>
                <Form.Item
                  noStyle
                  name={['personalGSMNumber']}
                  dependencies={['personalGSMDialCode']}
                  normalize={(value: number) => value?.toString() || ''}
                  rules={rules}
                >
                  <InputNumber
                    disabled={!isFormEditable || !selectedPersonalGSMDialCode}
                    placeholder={t('employeePage:PERSONAL_GSM')}
                    className={classes.phoneNumberInput}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col sm={8} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['emergencyContact', 'name']}
              label={t('employeePage:EMERGENCY_CONTACT.NAME_SURNAME')}
            >
              <Input disabled={!isFormEditable} placeholder={t('employeePage:EMERGENCY_CONTACT.NAME_SURNAME')} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={8} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['emergencyContact', 'relationsType']}
              label={t('employeePage:EMERGENCY_CONTACT.RELATION')}
            >
              {/* the Form.Item passes the onChange
                // @ts-ignore */}
              <SelectEmergencyContactRelationship disabled={!isFormEditable} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={8} xs={24}>
            <Form.Item
              {...formEditableProps}
              label={t('employeePage:EMERGENCY_CONTACT.PHONE')}
            >
              <Input.Group compact>
                <Form.Item
                  noStyle
                  name={['emergencyContact', 'dialCode']}
                  rules={rules}
                >
                  {/* the Form.Item passes the onChange
                    // @ts-ignore */}
                  <SelectCountryDialingCode allowClear disabled={!isFormEditable} className={classes.dialingCodeSelect} />
                </Form.Item>
                <Form.Item
                  noStyle
                  name={['emergencyContact', 'gsm']}
                  normalize={(value: string) => value || ''}
                  rules={rules}
                >
                  <InputNumber disabled={!isFormEditable} placeholder={t('employeePage:EMERGENCY_CONTACT.PHONE')} className={classes.phoneNumberInput} />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default PersonalInfoFormSection;
