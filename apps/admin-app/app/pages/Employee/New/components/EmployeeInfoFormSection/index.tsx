import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Card,
  FormItemProps,
  FormInstance,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { EMPLOYEE_PAYROLL_COUNTRY_OPTIONS } from '@app/pages/Employee/constants';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { isValidEmail } from '@shared/utils/validation';
import { Creators } from '../../redux/actions';
import { FormValues } from '../../types';
import SelectCountryCode from '../../../components/Select/Country';
import SelectCountryDialingCode from '../../../components/Select/CountryDialingCode';
import useStyles from '../../style';
import SelectPayrollStatus from '../../../components/Select/PayrollStatus';

const EmployeeInfoFormSection = ({
  rules,
  form,
}: { rules: FormItemProps['rules'], form: FormInstance }) => {
  const { t } = useTranslation(['employeePage']);
  const parentClasses = useStyles();
  const dispatch = useDispatch();
  const [selectedWorkGSMDialCode, setSelectedWorkGSMDialCode] = useState<string | undefined>();

  const workEmailIsUSedBeforeCheck = useCallback(({
    email,
    onSuccess,
    onError,
  }) => {
    dispatch(Creators.checkEmailUsedStatusRequest({
      email,
      onSuccess,
      onError,
    }));
  }, [dispatch]);

  const { debouncedCallback: debouncedWorkEmailIsUSedBeforeCheck }: {
    debouncedCallback: (args: {
      email: string,
      onSuccess: (isUsed: boolean) => void,
      onError: (error: Error) => void,
    }) => void;
  } = useDebouncedCallback({
    callback: workEmailIsUSedBeforeCheck,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const workEmailUsedBeforeValidation = {
    async validator() {
      try {
        return new Promise((resolve, reject) => {
          const values = form.getFieldsValue() as FormValues;
          // Yup validate email so we dont need it in here
          if (!isValidEmail(values.workEmail)) {
            resolve('');
          }
          else {
            debouncedWorkEmailIsUSedBeforeCheck({
              email: values.workEmail,
              onSuccess: (isUsed: boolean) => {
                if (isUsed) {
                  return reject(new Error(t('employeePage:ERROR.EMAIL_USED_BEFORE')));
                }
                return resolve('resolve');
              },
              onError: (error: Error) => reject(new Error(error?.message)),
            });
          }
        });
      }
      catch (error: Error | any) {
        return Promise.reject(new Error(error?.message));
      }
    },
  };

  return (
    <Card
      bordered={false}
      title={t('employeePage:EMPLOYEE_INFORMATION')}
    >
      <Row gutter={[16, 16]}>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            // validateFirst={false}
            name={['workEmail']}
            label={t('employeePage:WORK_EMAIL')}
            rules={[
              // @ts-ignore
              ...(rules && rules),
              workEmailUsedBeforeValidation,
            ]}
          >
            <Input placeholder={t('employeePage:WORK_EMAIL')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            hasFeedback
            label={t('employeePage:WORK_GSM')}
          >
            <Input.Group compact>
              <Form.Item
                noStyle
                name={['workGSMDialCode']}
                dependencies={['workGSMNumber']}
                rules={rules}
              >
                {/* the Form.Item passes the onChange
                    // @ts-ignore */}
                <SelectCountryDialingCode onChange={setSelectedWorkGSMDialCode} allowClear className={parentClasses.dialingCodeSelect} />
              </Form.Item>
              <Form.Item
                noStyle
                name={['workGSMNumber']}
                dependencies={['personalGSMNumber', 'workGSMDialCode']}
                initialValue=""
                normalize={(value: string) => value || ''}
                rules={rules}
              >
                <InputNumber disabled={!selectedWorkGSMDialCode} placeholder={t('employeePage:WORK_GSM')} className={parentClasses.phoneNumberInput} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['payrollCountryCode']}
            label={t('employeePage:PAYROLL_COUNTRY')}
            rules={rules}
          >
            {/* @ts-ignore */}
            <SelectCountryCode
              showTurkeyFirst
              countries={EMPLOYEE_PAYROLL_COUNTRY_OPTIONS}
              placeholder={t('PAYROLL_COUNTRY')}
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            hasFeedback
            name={['officeAccessCardId']}
            label={t('employeePage:OFFICE_CARD_ID')}
            rules={rules}
          >
            <Input placeholder={t('employeePage:OFFICE_CARD_ID')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['payrollStatus']}
            label={t('employeePage:IN_GETIR_PAYROLL')}
            rules={rules}
          >
            <SelectPayrollStatus
              placeholder={t('employeePage:IN_GETIR_PAYROLL')}
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default EmployeeInfoFormSection;
