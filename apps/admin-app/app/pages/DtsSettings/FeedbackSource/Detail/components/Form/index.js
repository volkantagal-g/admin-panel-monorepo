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
import { SelectWrapper } from '@shared/components/UI/Form';
import { convertSelectOptions } from '@shared/utils/common';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';
import { getDtsFeedbackDetailSelector } from '../../redux/selectors';

const { Text } = Typography;

const DtsFeedbackDetailForm = ({ id }) => {
  const { t } = useTranslation('dtsFeedbackSetting');
  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector(getDtsFeedbackDetailSelector.getData);
  const isPending = useSelector(getDtsFeedbackDetailSelector.getIsPending);

  const statusOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.updateDtsFeedbackSettingDetailRequest({ data: { ...values, id } }));
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
      isActive,
      description,
      title,
    } = data;
    form.setFieldsValue({
      isActive,
      description,
      title,
    });
    setValues({
      isActive,
      description,
      title,
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
        title={t('DTS_FEEDBACK_SETTING_DETAIL')}
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
              label={t('DTS_FEEDBACK_SETTING_TITLE')}
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
              label={t('DTS_FEEDBACK_SETTING_DESCRIPTION')}
              fieldPath={['description']}
              formik={formik}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
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

export default DtsFeedbackDetailForm;
