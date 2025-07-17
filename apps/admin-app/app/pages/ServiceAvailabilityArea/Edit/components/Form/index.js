import { Button, Col, Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useMemo, useState } from 'react';

import { Link } from 'react-router-dom';

import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';

import confirm from 'antd/lib/modal/confirm';

import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';

import { Creators } from '../../redux/actions';
import { getGeoJSONValidationSchema, getPart1ValidationSchema } from '../../../formUtils';
import useStyles from '../../../formStyles';
import { getFormattedSaa } from '../../../utils';
import useClipboard from '@shared/shared/hooks/useClipboard';
import { useDomainOptions } from '../../../useDomainOptions';

export default function FormEdit({ saa, countries }) {
  const classes = useStyles();
  const { t } = useTranslation('saaPage');
  const { geoJSON, id, ...rest } = getFormattedSaa(saa, countries);
  return (
    <Col xs={24} sm={24} md={4} lg={4}>
      <div className={classes.form}>
        <h6 className={classes.formTitle}>
          {t('EDIT_SAA')}{' '}
          <Link to={ROUTE.SERVICE_AVAILABILITY_AREA_DETAIL.path.replace(':id', id)} className={classes.goBackLink}>
            <CloseOutlined />
          </Link>
        </h6>
        <FormPart1 initialValues={rest} id={id} countries={countries} isAutomatedSAA={saa.isAutomated} />
        <GeoJSONForm initialValues={{ geoJSON }} id={id} isAutomatedSAA={saa.isAutomated} />
      </div>
    </Col>
  );
}

function FormPart1({ initialValues, id, countries, isAutomatedSAA }) {
  const classes = useStyles();
  const { t } = useTranslation('saaPage');
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: getPart1ValidationSchema,
    validateOnChange: true,
    onSubmit: values => {
      const confirmOptions = {
        icon: <ExclamationCircleOutlined />,
        width: '50%',
        content: t('CONFIRM_TEXT'),
        onOk() {
          dispatch(Creators.editFirstPartRequest({ data: { ...values, id } }));
        },
      };
      confirm(confirmOptions);
    },
  });
  const { handleSubmit, values, errors, handleChange, setFieldValue, dirty, isValid } = formik;

  const domainOptions = useDomainOptions();

  const countryOptions = useMemo(() => {
    return countries.map(c => {
      const label = c.name[getLangKey()];
      const value = c._id;
      return { value, label };
    });
  }, [countries]);

  return (
    <Form initialValues={initialValues} form={form} id="editPart1Form" onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label={t('NAME_1')}
        name="name"
        className={classes.label}
        help={_.get(errors, 'name')}
        validateStatus={_.get(errors, 'name') ? 'error' : 'success'}
      >
        <Input value={values.name} placeholder={t('placeholder')} onChange={handleChange} disabled={isAutomatedSAA} />
      </Form.Item>
      <Form.Item label={t('ID')} className={classes.label}>
        <Input value={id} disabled />
      </Form.Item>
      <Form.Item label={t('COUNTRY')} name="country" className={classes.label}>
        <Select value={values.country} options={countryOptions} className={classes.fullWidth} disabled />
      </Form.Item>
      <Form.Item
        label={t('ACTIVE_DOMAINS')}
        name="activeDomains"
        className={classes.label}
        help={_.get(errors, 'activeDomains')}
        validateStatus={_.get(errors, 'activeDomains') ? 'error' : 'success'}
      >
        <Select
          value={values.activeDomains}
          options={domainOptions}
          mode="multiple"
          onChange={domains => {
            setFieldValue('activeDomains', domains);
          }}
          className={classes.fullWidth}
          allowClear
          disabled={isAutomatedSAA}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className={classes.addNewSaa} disabled={!dirty || !isValid}>
        {t('SAVE')}
      </Button>
    </Form>
  );
}

function GeoJSONForm({ initialValues, id, isAutomatedSAA }) {
  const classes = useStyles();
  const { t } = useTranslation('saaPage');
  const [form] = Form.useForm();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: getGeoJSONValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: values => {
      const confirmOptions = {
        icon: <ExclamationCircleOutlined />,
        width: '50%',
        content: t('CONFIRM_TEXT'),
        onOk() {
          dispatch(Creators.editGeoRequest({ data: { ...values, id } }));
          setIsEditOpen(false);
        },
      };
      confirm(confirmOptions);
    },
  });
  const { handleSubmit, values, errors, setFieldValue, dirty, isValid } = formik;
  const [isCopied, setCopied] = useClipboard(values.geoJSON, { successDuration: 2000 });

  const { canAccess } = usePermission();

  const canAccessGeoJSONEdit =
    canAccess(permKey.PAGE_SERVICE_AVAILABILITY_AREA_EDIT_GEOJSON)
    && !isAutomatedSAA;

  const handleJSONEdit = isOpen => {
    // if we cancel, reset to initial value
    if (!isOpen) {
      setFieldValue('geoJSON', initialValues.geoJSON);
      form.setFieldsValue({ ...initialValues });
    }
    setIsEditOpen(isOpen);
  };

  return (
    <Form initialValues={initialValues} form={form} id="editGeoJSONForm" onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label={(
          <>
            {t('GEO_JSON')}
            {canAccessGeoJSONEdit && (
              <Button size="small" className={classes.copyButton} onClick={() => handleJSONEdit(!isEditOpen)}>
                {isEditOpen && `${t('CANCEL')}`}
                {!isEditOpen && `JSON ${t('button:EDIT')}`}
              </Button>
            )}
            <Button className={classes.copyButton} key="geoJSONCopy" icon={isCopied ? <CheckOutlined /> : null} onClick={setCopied}>
              {isCopied ? t('button:COPIED') : t('button:COPY')}
            </Button>
          </>
        )}
        name="geoJSON"
        className={classes.label}
        help={_.get(errors, 'geoJSON')}
        validateStatus={_.get(errors, 'geoJSON') ? 'error' : 'success'}
      >
        <Input.TextArea
          value={values.geoJSON}
          className={classes.jsonView}
          disabled={!isEditOpen}
          onChange={e => {
            setFieldValue('geoJSON', e.target.value);
          }}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className={classes.addNewSaa} disabled={!dirty || !isValid}>
        {t('SAVE')}
      </Button>
    </Form>
  );
}
