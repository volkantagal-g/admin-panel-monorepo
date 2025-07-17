import { useEffect, useState, useCallback } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';

import Footer from '@shared/shared/components/Footer';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { convertSelectOptions } from '@shared/utils/common';
import { getDtsPrioritySettingDetailSelector } from '../../redux/selector';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';

const { Text } = Typography;

const PrioritySettingDetailForm = ({ id }) => {
  const { t } = useTranslation('dtsPrioritySettingPage');
  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector(getDtsPrioritySettingDetailSelector.getData);
  const isPending = useSelector(getDtsPrioritySettingDetailSelector.getIsPending);

  const statusOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.updateDtsPrioritySettingDetailRequest({ data: { ...values, id } }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue, setValues } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  const initForm = useCallback(() => {
    const {
      title,
      description,
      rejectionPoint,
      warningPoint,
      isActive,
    } = data;
    form.setFieldsValue({
      title,
      description,
      rejectionPoint,
      warningPoint,
      isActive,
    });
    setValues({
      title,
      description,
      rejectionPoint,
      warningPoint,
      isActive,
    });
  }, [data, setValues, form]);

  useEffect(() => {
    initForm();
  }, [initForm]);

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    initForm();
    setIsFormEditable(false);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Card
        title={t('PRIORITY_DETAIL_SETTING')}
        footer={(
          <Footer
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleEditClick={handleEditClick}
            isFormEditable={isFormEditable}
            isPending={isPending}
          />
        )}
      >
        <Row>
          <Col lg={24} xs={24}>
            <MultiLanguageInput
              name="title"
              label={t('global:NAME')}
              fieldPath={['title']}
              formik={formik}
              disabled={isPending || !isFormEditable}
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
              disabled={isPending || !isFormEditable}
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
              disabled={isPending || !isFormEditable}
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
              disabled={isPending || !isFormEditable}
            />
          </Col>
          <Col lg={8} sm={8} xs={24}>
            <Text>{t('global:STATUS')}</Text>
            <SelectWrapper
              selectKey="isActive"
              value={values.isActive}
              hasError={get(errors, 'isActive')}
              isTouched={get(touched, 'isActive')}
              optionsData={statusOptions}
              onChangeCallback={handleSelectChange('isActive')}
              shouldMapOptionsData
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default PrioritySettingDetailForm;
