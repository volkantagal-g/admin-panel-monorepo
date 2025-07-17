import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { cloneDeep, get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { setIsLoginDisabledSelector } from '../../redux/selectors';
import Footer from '../CardFooter';
import { validationSchema } from './formHelper';
import useStyles from './styles';

const { Item } = Form;

const Login = ({ data, isPending: isPendingGetCourierData, permKey }) => {
  const { t } = useTranslation('courierPage');
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const isPendingSetIsLoginDisabled = useSelector(setIsLoginDisabledSelector.getIsPending);
  const isSuccessSetIsLoginDisabled = useSelector(setIsLoginDisabledSelector.getIsSuccess);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validate: validate(validationSchema),
    onSubmit: formValues => {
      const { _id, isLoginDisabled } = formValues;
      dispatch(Creators.setIsLoginDisabledRequest({ courierId: _id, isLoginDisabled }));
    },
  });

  const { values, handleChange, setValues, resetForm, handleSubmit, errors, touched } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (isSuccessSetIsLoginDisabled) setIsFormEditable(false);
  }, [isSuccessSetIsLoginDisabled]);

  const handleFooterEditClick = () => {
    setIsFormEditable(true);
  };

  const handleFooterCancelClick = () => {
    const newValues = cloneDeep(data);
    form.resetFields();
    resetForm();
    form.setFieldsValue(newValues);
    setValues(newValues);
    setIsFormEditable(false);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <AntCard
        bordered={false}
        footer={(
          <Footer
            isPending={isPendingGetCourierData || isPendingSetIsLoginDisabled}
            isFormEditable={isFormEditable}
            permKey={permKey}
            handleSubmit={handleSubmit}
            handleEditClick={handleFooterEditClick}
            handleCancelClick={handleFooterCancelClick}
          />
        )}
        title={t('LOGIN')}
      >
        <Row gutter={[4, 4]}>
          <Col lg={24} xs={24}>
            <Item
              help={get(touched, 'isLoginDisabled') && get(errors, 'isLoginDisabled')}
              validateStatus={errors.isLoginDisabled && touched.isLoginDisabled ? 'error' : 'success'}
              className={classes.checkboxItem}
            >
              <Checkbox
                name="isLoginDisabled"
                checked={values.isLoginDisabled}
                onChange={handleChange}
                disabled={isPendingGetCourierData || isPendingSetIsLoginDisabled || !isFormEditable}
              >
                {t('LOGIN_DISABLED')}
              </Checkbox>
            </Item>
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

Login.defaultProps = {
  data: {},
  isPending: false,
  permKey: '',
};

Login.propTypes = {
  data: PropTypes.shape({}),
  isPending: PropTypes.bool,
  permKey: PropTypes.string,
};

export default Login;
