import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Card,
  FormItemProps,
  FormInstance,
} from 'antd';
import { useTranslation } from 'react-i18next';
import moment, { Moment } from 'moment';
import { isEmpty as _isEmpty } from 'lodash';

import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { Creators } from '@app/pages/Employee/New/redux/actions';
import { FormValues } from '@app/pages/Employee/New/types';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import SelectGender from '../../../components/Select/Gender';
import SelectCountryCode from '../../../components/Select/Country';
import useStyles from '../../style';

const PersonalInfoFormSection = ({
  rules,
  form,
}: { rules: FormItemProps['rules'], form: FormInstance }) => {
  const { t } = useTranslation(['employeePage']);
  const parentClasses = useStyles();
  const dispatch = useDispatch();

  const uniqueIdentifierIsUSedBeforeCheck = useCallback(({
    uniqueIdentifier,
    onSuccess,
    onError,
  }) => {
    dispatch(Creators.checkUniqueIdentifierUsedStatusRequest({
      uniqueIdentifier,
      onSuccess,
      onError,
    }));
  }, [dispatch]);

  const { debouncedCallback: debouncedUniqueIdentifierIsUSedBeforeCheck }: {
    debouncedCallback: (args: {
      uniqueIdentifier: string,
      onSuccess: (isUsed: boolean) => void,
      onError: (error: Error) => void,
    }) => void;
  } = useDebouncedCallback({
    callback: uniqueIdentifierIsUSedBeforeCheck,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const uniqueIdentifierUsedBeforeValidation = {
    async validator() {
      try {
        return new Promise((resolve, reject) => {
          const values = form.getFieldsValue() as FormValues;
          // Yup validate uniqueIdentifier so we dont need it in here again
          if (_isEmpty(values.uniqueIdentifier)) {
            resolve('');
          }
          else {
            debouncedUniqueIdentifierIsUSedBeforeCheck({
              uniqueIdentifier: values.uniqueIdentifier,
              onSuccess: (isUsed: boolean) => {
                if (isUsed) {
                  return reject(new Error(t('employeePage:ERROR.UNIQUE_IDENTIFIER_USED_BEFORE')));
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

  const disabledDateAfterToday = (current: Moment) => {
    return current && current.endOf('day').valueOf() > moment().valueOf();
  };

  return (
    <Card
      bordered={false}
      title={t('employeePage:PERSONAL_INFORMATION')}
    >
      <Row gutter={[16, 16]}>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            label={t('employeePage:NAME')}
            name={['name']}
            rules={rules}
          >
            <Input placeholder={t('employeePage:NAME')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['surname']}
            label={t('employeePage:SURNAME')}
            rules={rules}
          >
            <Input placeholder={t('employeePage:SURNAME')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['uniqueIdentifier']}
            label={t('employeePage:UNIQUE_IDENTIFIER')}
            rules={[
              // @ts-ignore
              ...(rules && rules),
              uniqueIdentifierUsedBeforeValidation,
            ]}
          >
            <Input placeholder={t('employeePage:UNIQUE_IDENTIFIER')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['birthdate']}
            label={t('employeePage:BIRTHDAY')}
            rules={rules}
          >
            <DatePicker
              disabledDate={disabledDateAfterToday}
              placeholder={t('employeePage:BIRTHDAY')}
              allowClear={false}
              className={`${parentClasses.inputContainer} w-100`}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['gender']}
            label={t('employeePage:GENDER')}
            rules={rules}
          >
            {/* onChange is passed to the SelectGender component by Form.Item
                @ts-ignore */}
            <SelectGender className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['nationality']}
            label={t('employeePage:NATIONALITY')}
            rules={rules}
          >
            {/* @ts-ignore */}
            <SelectCountryCode showTurkeyFirst placeholder={t('NATIONALITY')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default PersonalInfoFormSection;
