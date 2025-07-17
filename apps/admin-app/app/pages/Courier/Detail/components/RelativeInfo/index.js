import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import { getRelativeInfo } from '../../utils';
import SelectCountryDialingCode from '@shared/components/Select/CountryDialingCode';
import useStyles from './styles';
import SelectRelativeStatus from '@shared/components/Select/RelativeStatus';

const { useForm } = Form;

function RelativeInfo({ data }) {
  const { t } = useTranslation('courierPage');
  const [form] = useForm();
  const [relativeInfo, setRelativeInfo] = useState({});
  const classes = useStyles();

  useEffect(() => {
    setRelativeInfo(() => {
      const values = getRelativeInfo(data);
      form.setFieldsValue(values);
      return values;
    });
  }, [data, form]);

  return (
    <Form form={form} layout="vertical">
      <Card
        title={t('RELATIVE_INFORMATION')}
      >
        <Row gutter={[4, 4]} align="bottom">
          <Col span={24}>
            <InputWrapper
              inputKey="name"
              label={t('NAME')}
              value={relativeInfo.name}
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
                value={relativeInfo.countryGsmCode}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <InputWrapper
              inputKey="gsm"
              label={t('GSM')}
              value={relativeInfo.gsm}
              disabled
            />
          </Col>
          <Col span={24}>
            <Form.Item
              name="relation"
              label={t('RELATIVE_STATUS')}
              className={classes.inputWrapper}
            >
              <SelectRelativeStatus
                isDisabled
                isFirstOptionSelected={false}
                value={relativeInfo.relation}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default RelativeInfo;
