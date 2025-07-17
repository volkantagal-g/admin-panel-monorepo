import { useEffect } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { createDtsPrioritySettingSelector } from '../../redux/selector';
import { convertSelectOptions } from '@shared/utils/common';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';

const { Text } = Typography;

const CreatePrioritySettingFormType = () => {
  const { t } = useTranslation('dtsPrioritySettingPage');
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const isPending = useSelector(createDtsPrioritySettingSelector.getIsPending);

  const activityOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.createDtsPrioritySettingRequest(values));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Card
        title={t('NEW_PRIORITY_SETTING')}
        footer={(
          <Button
            size="small"
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            {t('button:SAVE')}
          </Button>
        )}
      >
        <Row>
          <Col lg={24} xs={24}>
            <MultiLanguageInput
              name="title"
              label={t('global:NAME')}
              fieldPath={['title']}
              formik={formik}
              disabled={isPending}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={24} xs={24}>
            <MultiLanguageInput
              name="description"
              label={t('global:DESCRIPTION')}
              fieldPath={['description']}
              formik={formik}
              disabled={isPending}
            />
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col lg={8} sm={8} xs={24}>
            <Text>{t('REJECTION_POINT')}</Text>
            <InputWrapper
              inputKey="rejectionPoint"
              name="rejectionPoint"
              value={values.rejectionPoint}
              setFieldValue={setFieldValue}
              hasError={get(errors, 'rejectionPoint')}
              isTouched={get(touched, 'rejectionPoint')}
              formik={formik}
              mode="number"
              disabled={isPending}
            />
          </Col>
          <Col lg={8} sm={8} xs={24}>
            <Text>{t('WARNING_POINT')}</Text>
            <InputWrapper
              inputKey="warningPoint"
              name="warningPoint"
              value={values.warningPoint}
              setFieldValue={setFieldValue}
              hasError={get(errors, 'warningPoint')}
              isTouched={get(touched, 'warningPoint')}
              formik={formik}
              mode="number"
              disabled={isPending}
            />
          </Col>
          <Col lg={8} sm={8} xs={24}>
            <Text>{t('global:STATUS')}</Text>
            <SelectWrapper
              selectKey="isActive"
              value={values.isActive}
              hasError={get(errors, 'isActive')}
              isTouched={get(touched, 'isActive')}
              optionsData={activityOptions}
              onChangeCallback={handleSelectChange('isActive')}
              shouldMapOptionsData
              disabled={isPending}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreatePrioritySettingFormType;
