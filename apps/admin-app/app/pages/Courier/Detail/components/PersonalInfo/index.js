import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import { getPersonalInfo } from '../../utils';
import SelectCountryDialingCode from '@shared/components/Select/CountryDialingCode';
import useStyles from './styles';

const { useForm } = Form;

function PersonalInfo({ data }) {
  const { t } = useTranslation('courierPage');
  const [form] = useForm();
  const [personalInfo, setPersonalInfo] = useState({});
  const classes = useStyles();

  useEffect(() => {
    setPersonalInfo(() => {
      const values = getPersonalInfo(data);
      form.setFieldsValue(values);
      return values;
    });
  }, [data, form]);

  return (
    <Form form={form} layout="vertical">
      <Card
        title={t('PERSONAL_INFORMATION')}
      >
        <Row gutter={[4, 4]} align="bottom">
          <Col span={24}>
            <InputWrapper
              inputKey="uniqueIdentifier"
              label={t('UNIQUE_IDENTIFIER')}
              value={personalInfo.uniqueIdentifier}
              disabled
            />
          </Col>
          <Col span={24}>
            <Form.Item
              name="countryGsmCode"
              label={t('COUNTRY_CODE')}
              className={classes.inputWrapper}
            >
              <SelectCountryDialingCode
                isDisabled
                isFirstOptionSelected={false}
                value={personalInfo.countryGsmCode}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <InputWrapper
              inputKey="personalGsm"
              label={t('GSM')}
              value={personalInfo.personalGsm}
              disabled
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default PersonalInfo;
