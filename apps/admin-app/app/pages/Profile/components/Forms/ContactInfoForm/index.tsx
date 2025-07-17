import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { isEmpty as _isEmpty } from 'lodash';
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  FormItemProps,
  FormInstance,
} from 'antd';

import { getEmployeeDetailsSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

import SelectEmergencyContactRelationship from '@app/pages/Employee/components/Select/EmergencyContactRelationship';
import SelectCountryDialingCode from '@app/pages/Employee/components/Select/CountryDialingCode';
import SelectCountry from '@shared/containers/Select/Country';
import SelectCity from '@app/pages/Employee/components/Select/City';
import ActionButtons from '../../ActionButtons';

import { validationSchema } from './validationSchema';
import useStyles from '../../styles';

export default function ContactInfoForm() {
  const { t } = useTranslation(['profile', 'employeePage']);
  const [form] = Form.useForm();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [selectedResidentialCountry, setSelectedResidentialCountry] = useState<MongoIDType | undefined>();
  const [selectedPersonalGSMDialCode, setSelectedPersonalGSMDialCode] = useState<string | undefined>();

  const isPending = useSelector(getEmployeeDetailsSelector.getIsPending);
  const employeeInfoFormData = useSelector(getEmployeeDetailsSelector.getEmployeeInfoData);
  const contactInfoFormData = useSelector(getEmployeeDetailsSelector.getContactInfoData);

  useEffect(() => {
    if (form && contactInfoFormData) {
      form.setFieldsValue(contactInfoFormData);
      setSelectedResidentialCountry(contactInfoFormData.residentialAddress?.country);
      setSelectedPersonalGSMDialCode(contactInfoFormData.personalGSMDialCode);
      setIsFormEditable(false);
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

  const formEditableProps = isFormEditable ?
    {
      hasFeedback: true,
      required: true,
      rules,
    } :
    { validateStatus: undefined, disabled: true };

  return (
    <Form
      form={form}
      layout="vertical"
      name="employeeDetailContactInfoForm"
      id="employeeDetailContactInfoForm"
      initialValues={contactInfoFormData}
      onFinish={handleSubmit}
    >
      <Row gutter={[8, 8]}>
        <Col sm={8} xs={24}>
          <Form.Item
            {...formEditableProps}
            label={t('employeePage:RESIDENTIAL_COUNTRY')}
            name={['residentialAddress', 'country']}
          >
            {/* @ts-ignore */}
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
            {/* @ts-ignore */}
            <SelectCity
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
            <Input
              disabled={!isFormEditable}
              placeholder={t('employeePage:RESIDENTIAL_DISTRICT')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={24} xs={24}>
          <Form.Item
            {...formEditableProps}
            name={['residentialAddress', 'address']}
            label={t('employeePage:RESIDENTIAL_ADDRESS')}
          >
            <Input
              disabled={!isFormEditable}
              placeholder={t('employeePage:RESIDENTIAL_ADDRESS')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            {...formEditableProps}
            name={['personalEmail']}
            label={t('employeePage:PERSONAL_EMAIL')}
          >
            <Input
              disabled={!isFormEditable}
              placeholder={t('employeePage:PERSONAL_EMAIL')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item hasFeedback label={t('employeePage:PERSONAL_GSM')}>
            <Input.Group compact>
              <Form.Item
                noStyle
                name={['personalGSMDialCode']}
                dependencies={['personalGSMNumber']}
                rules={rules}
              >
                {/* @ts-ignore */}
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
                normalize={(value: string) => value || ''}
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
            <Input
              disabled={!isFormEditable}
              placeholder={t(
                'employeePage:EMERGENCY_CONTACT.NAME_SURNAME',
              )}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            {...formEditableProps}
            name={['emergencyContact', 'relationsType']}
            label={t('employeePage:EMERGENCY_CONTACT.RELATION')}
          >
            {/* @ts-ignore */}
            <SelectEmergencyContactRelationship disabled={!isFormEditable} className={classes.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item label={t('employeePage:EMERGENCY_CONTACT.PHONE')}>
            <Input.Group compact>
              <Form.Item noStyle name={['emergencyContact', 'dialCode']} rules={rules}>
                {/* @ts-ignore */}
                <SelectCountryDialingCode allowClear disabled={!isFormEditable} className={classes.dialingCodeSelect} />
              </Form.Item>
              <Form.Item
                noStyle
                name={['emergencyContact', 'gsm']}
                normalize={(value: string) => value || ''}
                rules={rules}
              >
                <InputNumber
                  disabled={!isFormEditable}
                  placeholder={t('employeePage:EMERGENCY_CONTACT.PHONE')}
                  className={classes.phoneNumberInput}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]} justify="end">
        <Col>
          <ActionButtons
            isFormEditable={isFormEditable}
            isPending={isPending}
            onEdit={handleEditClick}
            onCancel={handleCancelClick}
            onSave={handleSaveClick}
          />
        </Col>
      </Row>
    </Form>
  );

  function handleResidentialCountryChange(value: MongoIDType | undefined): void {
    form.setFieldsValue({ residentialAddress: { country: value, city: undefined } });
    setSelectedResidentialCountry(value);
  }

  function handleEditClick() {
    setIsFormEditable(true);
  }

  function handleCancelClick() {
    setIsFormEditable(false);
    form.resetFields();
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

  function handleSubmit(formValues: any): void {
    dispatch(Creators.updateContactInfoRequest({
      values: formValues,
      onSuccess: () => {
        setIsFormEditable(false);
      },
    }));
  }
}
