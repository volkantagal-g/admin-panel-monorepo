import { Row, Col, Form, Typography, Divider } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { get } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import UploadPicture from '@app/pages/Mentorship/components/UploadPicture';
import SelectLanguage from '@app/pages/Mentorship/components/Select/Language';
import SelectTopic from '@app/pages/Mentorship/components/Select/Topic';
import { Space, TextArea } from '@shared/components/GUI';

const { Item } = Form;

const FormUtil = ({ initialValues }) => {
  const [form] = useForm();
  const { t } = useTranslation(['mentorshipPage', 'global']);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Space title={t('USER_INFORMATION')}>
      <Form
        initialValues={initialValues}
        form={form}
        id="mentorDetailPage"
        layout="vertical"
      >
        <Row gutter={[8, 8]} align="middle">
          <Col lg={{ span: 12 }} xs={{ span: 24 }}>
            <div className="d-flex w-100 h-100 align-items-center">
              <Item name={['picURL']} className="m-0">
                <UploadPicture className="flex-grow-1" disabled />
              </Item>
              <div>
                <Typography.Title level={5} className="m-0">{get(initialValues, ['employeeId', 'fullName'])}</Typography.Title>
                <Typography.Text>{get(initialValues, ['employeeId', 'workEmail'])}</Typography.Text>
              </div>
            </div>
          </Col>
          <Col lg={{ span: 12 }} xs={{ span: 24 }}>
            <Item className="m-0" name="bio">
              <TextArea label={t('BIO')} disabled />
            </Item>
          </Col>
        </Row>
        <Divider orientation="left" />
        <Row gutter={[8, 8]} align="middle">
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <Item className="m-0" name={['languages']}>
              <SelectLanguage label={t('LANGUAGES_SPOKEN')} disabled />
            </Item>
          </Col>
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <Item className="m-0" name={['topicsToTeach']}>
              <SelectTopic label={t('TOPICS_CAN_TEACH')} mode="multiple" disabled />
            </Item>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default FormUtil;
