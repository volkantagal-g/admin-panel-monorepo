import { Button, Form, Input } from 'antd';
import { isString } from 'lodash';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';

import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { REDIRECT_URL } from '@app/routes';
import { Creators } from '@shared/redux/actions/auth';
import { defaultValues, validationSchema } from '@app/pages/Login/formHelper';
import useStyles from './styles';
import { inDevelopmentEnvironment } from '@shared/utils/common';

const MagicLink = () => {
  const { t } = useTranslation('loginPage');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLoginButtonClick = ({ email }) => {
    const redirectUrl = !isString(REDIRECT_URL) ? '' : REDIRECT_URL;
    dispatch(Creators.loginRequest({ email, redirectUrl }));
    AnalyticsService.track(PANEL_EVENTS.LOGIN_REQUEST.EVENT_NAME, { method: PANEL_EVENTS.LOGIN_REQUEST.METHOD.MAGIC_LINK });
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    validate: values => {
      if (inDevelopmentEnvironment) return {};

      const errors = {};
      const email = values.email.trim();
      if (email.endsWith('@getir.com') || email.endsWith('.getir.com')) {
        errors.email = t('USE_GOOGLE_LOGIN');
      }

      return errors;
    },
    onSubmit: values => {
      handleLoginButtonClick(values);
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <Form className={classes.loginForm} onFinish={handleSubmit}>
      <Form.Item
        help={touched.email && errors.email}
        validateStatus={touched.email && errors.email ? 'error' : 'success'}
        name="email"
      >
        <Input size="large" value={values.email} onChange={handleChange} prefix={<MailOutlined />} placeholder={t('EMAIL')} />
      </Form.Item>
      <Form.Item className="mt-3">
        <Button size="large" type="primary" htmlType="submit" block>
          {t('LOGIN')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MagicLink;
