import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Row, Col, Tooltip } from 'antd';
import { isEmpty, isEqual, sum, get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { dysConfigsSelector } from '../../redux/selectors';
import { validationSchema } from './formHelper';
import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import useStyles from './styles';
import { validate } from '@shared/yup';
import Footer from '@shared/shared/components/Footer';

const { useForm } = Form;

function DysConfigsForm({ submitRequest, selectedTab }) {
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const { t } = useTranslation('dysConfigurationsPage');
  const classes = useStyles();

  const dysConfigs = useSelector(dysConfigsSelector.getData);
  const isPending = useSelector(dysConfigsSelector.getIsPending);

  const dysWeighted = useMemo(() => {
    return Object.fromEntries(
      Object.entries(dysConfigs[selectedTab]).map(([key, value]) => [key, value * 100]),
    );
  }, [dysConfigs, selectedTab]);

  const formik = useFormik({
    initialValues: dysWeighted,
    validate: validate(validationSchema),
    onSubmit: values => {
      const fixedValues = Object.values(values).map(value => +value.toFixed(2));

      if (isEqual(values, dysWeighted)) {
        setIsFormEditable(false);
      }
      else if (sum(fixedValues) === 100) {
        setIsFormEditable(false);
        submitRequest(values);
      }
      else {
        toast.error(t('SUMMATION_ERROR_MESSAGE'));
      }
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, handleChange, setValues, setFieldValue } = formik;

  const handleResetForm = () => {
    setIsFormEditable(false);

    setValues({ ...dysWeighted });
    form.setFieldsValue({ ...dysWeighted });
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  useEffect(() => {
    setIsFormEditable(false);
  }, [selectedTab]);

  useEffect(() => {
    form.setFieldsValue({ ...dysWeighted });
    setValues({ ...dysWeighted });
  }, [form, setValues, dysWeighted]);

  return (
    <Card
      classes={classes.container}
      footer={(
        <Footer
          isPending={isPending || isEmpty(Object.values(dysConfigs)[0])}
          isFormEditable={isFormEditable}
          handleCancelClick={handleResetForm}
          handleEditClick={handleEditClick}
          handleSubmit={handleSubmit}
        />
      )}
    >
      <Form form={form} layout="horizontal" onFinish={handleSubmit}>
        <Col span={24}>
          <Tooltip title={t('DDS_TOOLTIP')}>
            <Row span={24}>
              <InputWrapper
                inputKey="dds_weight"
                mode="number"
                setFieldValue={setFieldValue}
                label={t('DDS')}
                value={values.dds_weight}
                isTouched={get(touched, 'dds_weight')}
                hasError={get(errors, 'dds_weight')}
                handleChange={handleChange}
                disabled={!isFormEditable}
              />
            </Row>
          </Tooltip>
          <Tooltip title={t('STS_TOOLTIP')}>
            <Row span={24}>
              <InputWrapper
                inputKey="sts_weight"
                mode="number"
                setFieldValue={setFieldValue}
                label={t('STS')}
                value={values.sts_weight}
                isTouched={get(touched, 'sts_weight')}
                hasError={get(errors, 'sts_weight')}
                handleChange={handleChange}
                disabled={!isFormEditable}
              />
            </Row>
          </Tooltip>
          <Tooltip title={t('DTS_TOOLTIP')}>
            <Row span={12}>
              <InputWrapper
                inputKey="dts_weight"
                mode="number"
                setFieldValue={setFieldValue}
                label={t('DTS')}
                value={values.dts_weight}
                isTouched={get(touched, 'dts_weight')}
                hasError={get(errors, 'dts_weight')}
                handleChange={handleChange}
                disabled={!isFormEditable}
              />
            </Row>
          </Tooltip>
          <Tooltip title={t('KDS_TOOLTIP')}>
            <Row span={12}>
              <InputWrapper
                inputKey="kds_weight"
                mode="number"
                setFieldValue={setFieldValue}
                label={t('KDS')}
                value={values.kds_weight}
                isTouched={get(touched, 'kds_weight')}
                hasError={get(errors, 'kds_weight')}
                handleChange={handleChange}
                disabled={!isFormEditable}
              />
            </Row>
          </Tooltip>
        </Col>
      </Form>
    </Card>
  );
}

export default DysConfigsForm;
