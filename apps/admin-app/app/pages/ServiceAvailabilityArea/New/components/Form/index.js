import { Button, Col, Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import confirm from 'antd/lib/modal/confirm';

import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { ROUTE } from '@app/routes';

import { Creators } from '../../redux/actions';
import { defaultValues } from './config';
import { getCombinedValidationSchema } from '../../../formUtils';
import useStyles from '../../../formStyles';
import { useDomainOptions } from '../../../useDomainOptions';

export default function FormNew({ countries }) {
  const classes = useStyles();
  const { t } = useTranslation('saaPage');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const initialValues = { ...defaultValues, country: getSelectedCountry()._id };
  const formik = useFormik({
    initialValues,
    validationSchema: getCombinedValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: values => {
      const confirmOptions = {
        icon: <ExclamationCircleOutlined />,
        width: '50%',
        content: t('CONFIRM_TEXT'),
        onOk() {
          dispatch(Creators.createSaaRequest({ data: values, countries }));
        },
      };
      confirm(confirmOptions);
    },
  });
  const { handleSubmit, values, errors, handleChange, handleBlur, setFieldValue, isValid, touched, dirty } = formik;
  const domainOptions = useDomainOptions();

  const countryOptions = useMemo(() => {
    return countries.map(c => {
      const label = c.name[getLangKey()];
      const value = c._id;
      return { value, label };
    });
  }, [countries]);

  return (
    <Col xs={24} sm={24} md={4} lg={4}>
      <div className={classes.form}>
        <h6 className={classes.formTitle}>
          {t('CREATE_SAA')}{' '}
          <Link to={ROUTE.SERVICE_AVAILABILITY_AREA_LIST.path}>
            <CloseOutlined className={classes.goBackLink} />
          </Link>
        </h6>
        <Form initialValues={initialValues} form={form} id="newSaaForm" onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label={t('NAME_1')}
            name="name"
            className={classes.label}
            help={_.get(touched, 'name') && _.get(errors, 'name')}
            validateStatus={_.get(touched, 'name') && _.get(errors, 'name') ? 'error' : 'success'}
          >
            <Input value={values.name} placeholder={t('NAME_PLACE_HOLDER')} onChange={handleChange} onBlur={handleBlur} />
          </Form.Item>
          <Form.Item
            label={t('COUNTRY')}
            name="country"
            className={classes.label}
            help={_.get(touched, 'country') && _.get(errors, 'country')}
            validateStatus={_.get(touched, 'country') && _.get(errors, 'country') ? 'error' : 'success'}
          >
            <Select
              value={values.country}
              options={countryOptions}
              onChange={country => {
                setFieldValue('country', country);
              }}
              onBlur={handleBlur}
              className={classes.fullWidth}
            />
          </Form.Item>
          <Form.Item
            label={t('ACTIVE_DOMAINS')}
            name="activeDomains"
            className={classes.label}
            help={_.get(touched, 'activeDomains') && _.get(errors, 'activeDomains')}
            validateStatus={_.get(touched, 'activeDomains') && _.get(errors, 'activeDomains') ? 'error' : 'success'}
          >
            <Select
              value={values.activeDomains}
              placeholder={t('ACTIVE_DOMAINS_PLACE_HOLDER')}
              options={domainOptions}
              mode="multiple"
              onChange={domains => {
                setFieldValue('activeDomains', domains);
              }}
              className={classes.fullWidth}
              onBlur={handleBlur}
              allowClear
            />
          </Form.Item>
          <Form.Item
            label={t('GEO_JSON')}
            name="geoJSON"
            className={classes.label}
            help={_.get(touched, 'geoJSON') && _.get(errors, 'geoJSON')}
            validateStatus={_.get(touched, 'geoJSON') && _.get(errors, 'geoJSON') ? 'error' : 'success'}
          >
            <Input.TextArea
              placeholder={t('GEO_JSON')}
              value={values.geoJSON}
              className={classes.jsonView}
              onBlur={handleBlur}
              onChange={e => {
                setFieldValue('geoJSON', e.target.value);
              }}
              autoSize={{ minRows: 8, maxRows: 22 }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" disabled={!isValid || !dirty}>
            {t('CREATE')}
          </Button>
        </Form>
      </div>
    </Col>
  );
}
