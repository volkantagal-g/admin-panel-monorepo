import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'react-jss';

import { useEffect } from 'react';

import { Creators } from '../../redux/actions';
import { createBrandSelector } from '../../redux/selectors';
import { defaultValues, validationSchema } from './formHelper';
import Spinner from '@shared/components/Spinner';
import { validate } from '@shared/yup';
import { Space, TextInput, Button } from '@shared/components/GUI';
import useStyles from '@app/pages/Brand/styles';

const BrandNewForm = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(createBrandSelector.getIsPending);
  const { t } = useTranslation('brandPage');
  const theme = useTheme();
  const classes = useStyles();
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = { ...values };
      dispatch(Creators.createBrandRequest({ body }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  const handleFormValueChange = (target, event) => {
    setFieldValue(target, event.target.value);
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Space title={t('BRAND_INFO')}>
      <Form form={form} id="brand-new" onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3), theme.spacing(3)]}>
          <Col span={24}>
            <TextInput
              name="name"
              label={t('global:NAME')}
              onChange={value => handleFormValueChange('name', value)}
              errors={errors}
            />
          </Col>
          <Col span={24}>
            <TextInput
              name="sapCode"
              label={t('SAP_CODE')}
              onChange={value => handleFormValueChange('sapCode', value)}
              errors={errors}
            />
          </Col>
        </Row>
        <Col span={24}>
          <Row justify="end" gutter={[8, 8]} className={classes.buttonMargin}>
            <Col>
              <Button
                form="brand-new"
                size="small"
                htmlType="submit"
                loading={isPending}
              >
                {t('SAVE')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Form>
    </Space>
  );
};

export default BrandNewForm;
