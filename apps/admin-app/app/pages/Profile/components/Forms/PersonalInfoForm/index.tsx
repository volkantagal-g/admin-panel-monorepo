import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, DatePicker, Form, Input, Row, Image } from 'antd';

import { getEmployeeDetailsSelector } from '../../../redux/selectors';
// @ts-ignore
import NOT_FOUND_IMAGE from '@shared/assets/images/not-found.png';

import SelectGender from '@app/pages/Employee/components/Select/Gender';
import SelectCountry from '@app/pages/Employee/components/Select/Country';

import useStyles from '../../styles';

export default function PersonalInfoForm() {
  const { t } = useTranslation(['profile', 'employeePage']);
  const [form] = Form.useForm();
  const classes = useStyles();

  const personalInfoFormData = useSelector(getEmployeeDetailsSelector.getPersonalInfoData);

  useEffect(() => {
    if (form && personalInfoFormData) {
      form.setFieldsValue(personalInfoFormData);
    }
  }, [form, personalInfoFormData]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="employeeDetailPersonalInfoForm"
      id="employeeDetailPersonalInfoForm"
      initialValues={personalInfoFormData}
    >
      <Row gutter={[8, 8]}>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 6, order: 1 }}>
          <div style={{ display: 'grid', placeItems: 'Center' }}>
            <Image src={personalInfoFormData.picURL || NOT_FOUND_IMAGE} alt="avatar" className={classes.profilePictureImage} />
          </div>
        </Col>
        <Col xs={{ span: 24, order: 2 }} md={{ span: 18, order: 1 }}>
          <Form.Item label={t('employeePage:NAME')} name={['name']}>
            <Input
              disabled
              placeholder={t('employeePage:NAME')}
              className={classes.inputContainer}
            />
          </Form.Item>
          <Form.Item name={['surname']} label={t('employeePage:SURNAME')}>
            <Input
              disabled
              placeholder={t('employeePage:SURNAME')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24} order={3}>
          <Form.Item
            name={['uniqueIdentifier']}
            label={t('employeePage:UNIQUE_IDENTIFIER')}
          >
            <Input
              placeholder={t('employeePage:UNIQUE_IDENTIFIER')}
              disabled
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24} order={4}>
          <Form.Item
            name={['birthdate']}
            label={t('employeePage:BIRTHDAY')}
          >
            <DatePicker
              disabled
              placeholder={t('employeePage:BIRTHDAY')}
              allowClear={false}
              className={`${classes.inputContainer} w-100`}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24} order={5}>
          <Form.Item name={['gender']} label={t('employeePage:GENDER')}>
            {/* onChange is passed to the SelectGender component by Form.Item
          @ts-ignore */}
            <SelectGender disabled className={classes.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24} order={6}>
          <Form.Item
            name={['nationality']}
            label={t('employeePage:NATIONALITY')}
          >
            {/* @ts-ignore */}
            <SelectCountry
              showTurkeyFirst
              placeholder={t('employeePage:NATIONALITY')}
              disabled
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
