import { Row, Col, Form, Checkbox, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemo, FC } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import Card from '@shared/components/UI/AntCard';
import SelectCountryDialingCode from '@shared/components/Select/CountryDialingCode';
import { IApplicantInfoFormProps } from '../../interfaces';

const ApplicantInfoForm: FC<IApplicantInfoFormProps> = ({ isDisabled, values, errors, touched, handleChange }) => {
  const { t } = useTranslation('warehouseProposalPage');

  const onCheckboxChange = (fieldName: string) => (e: CheckboxChangeEvent) => {
    handleChange(`applicant.${fieldName}`, e.target.checked);
  };

  const dialingCodeAddon = useMemo(() => {
    return (
      <SelectCountryDialingCode
        isDisabled
        isFirstOptionSelected={false}
        value={values?.countryGsmCode}
        onChange={(e: string) => {
          handleChange('applicant.countryGsmCode', e);
        }}
      />
    );
  }, [values?.countryGsmCode, handleChange]);

  const handleGsmKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentValue = values?.gsm || '';
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }
    if (currentValue.length >= 10 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  return (
    <Col span={24}>
      <Card title={t('APPLICANT.TITLE')}>
        <Row gutter={[24, 24]} align="bottom">
          <Col span={12}>
            <Form.Item
              help={touched?.name && errors?.name}
              validateStatus={touched?.name && errors?.name ? 'error' : 'success'}
              label={t('global:NAME')}
            >
              <Input
                value={values?.name}
                onChange={e => {
                  handleChange('applicant.name', e.target.value);
                }}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={touched?.surname && errors?.surname}
              validateStatus={touched?.surname && errors?.surname ? 'error' : 'success'}
              label={t('global:SURNAME')}
            >
              <Input
                value={values?.surname}
                onChange={e => {
                  handleChange('applicant.surname', e.target.value);
                }}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]} align="bottom">
          <Col span={12}>
            <Form.Item
              help={touched?.gsm && errors?.gsm}
              validateStatus={touched?.gsm && errors?.gsm ? 'error' : 'success'}
              label={t('global:PHONE')}
            >
              <Input
                value={values?.gsm}
                onChange={e => {
                  let { value } = e.target;
                  value = value.replace(/\D/g, '');
                  value = value.substring(0, 10);
                  handleChange('applicant.gsm', value);
                }}
                disabled={isDisabled}
                addonBefore={dialingCodeAddon}
                maxLength={10}
                inputMode="numeric"
                onKeyPress={handleGsmKeyPress}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={touched?.email && errors?.email}
              validateStatus={touched?.email && errors?.email ? 'error' : 'success'}
              label={t('global:EMAIL')}
            >
              <Input
                value={values?.email}
                onChange={e => {
                  handleChange('applicant.email', e.target.value);
                }}
                disabled={isDisabled}
                type="email"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Checkbox
                disabled={isDisabled}
                checked={values?.isPropertyOwner}
                onChange={onCheckboxChange('isPropertyOwner')}
              >
                {t('APPLICANT.IS_PROPERTY_OWNER')}
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ApplicantInfoForm;
