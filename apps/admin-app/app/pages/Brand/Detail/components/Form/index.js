import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';

import { usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { getBrandSelector, updateBrandSelector } from '../../redux/selectors';
import { getInitialValues, validationSchema } from './formHelper';
import { TextInput, Space, EditSaveCancelButtons } from '@shared/components/GUI';
import useStyles from '@app/pages/Brand/styles';
import { canSubmit } from '@shared/utils/formHelper';
import { validate } from '@shared/yup';

const BrandDetailForm = () => {
  const dispatch = useDispatch();
  const brand = useSelector(getBrandSelector.getData);
  const isUpdatePending = useSelector(updateBrandSelector.getIsPending);
  const isUpdateFailure = useSelector(updateBrandSelector.getError);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('brandPage');
  const { id: brandId } = useParams();
  const [form] = Form.useForm();
  const theme = useTheme();
  const classes = useStyles();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  useEffect(() => {
    dispatch(Creators.getBrandRequest({ id: brandId }));
  }, [brandId, dispatch]);

  const initialValues = useMemo(
    () => getInitialValues(brand),
    [brand],
  );
  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      dispatch(Creators.updateBrandRequest({ id: brand, updateData: values }));
      setIsFormEditable(false);
    },
  });

  const { values, handleSubmit, errors, setFieldValue, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (isUpdateFailure) {
        setValues(initialValues);
      }
      else {
        setIsFormEditable(false);
      }
    }
  }, [initialValues, isUpdateFailure, isUpdatePending, prevIsUpdatePending, setValues, values]);

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  const handleCancelClick = () => {
    setIsFormEditable(false);
    setValues(initialValues);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };
  const handleFormValueChange = (target, event) => {
    setFieldValue(target, event.target.value);
  };

  return (
    <Space title={t('BRAND_INFO')}>
      <Form form={form} id="brand-detail" onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3), theme.spacing(3)]} className={classes.buttonMargin}>
          <Col span={24}>
            <TextInput
              name="name"
              label={t('global:NAME')}
              value={values.name}
              onChange={value => handleFormValueChange('name', value)}
              disabled={isUpdatePending || !isFormEditable}
              errors={errors}
            />
          </Col>
          <Col span={24}>
            <TextInput
              name="sapCode"
              label={t('SAP_CODE')}
              value={values.sapCode}
              onChange={value => handleFormValueChange('sapCode', value)}
              disabled={isUpdatePending || !isFormEditable}
              errors={errors}
            />
          </Col>
        </Row>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form="brand-detail"
          htmlType="submit"
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Form>
    </Space>
  );
};

export default BrandDetailForm;
