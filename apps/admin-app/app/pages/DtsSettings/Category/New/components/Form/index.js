import { useEffect } from 'react';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { Row, Col, Form, Button, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';
import { defaultValues, validationSchema } from './formHelper';
import { createDtsCategorySettingSelector } from '../../redux/selector';
import { SelectWrapper } from '@shared/components/UI/Form';
import { convertSelectOptions } from '@shared/utils/common';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';

const { Text } = Typography;

const CreateDtsCategorySetting = ({ createDtsCategorySetting }) => {
  const { t } = useTranslation('dtsCategorySetting');
  const [form] = Form.useForm();

  const isPending = useSelector(createDtsCategorySettingSelector.getIsPending);

  const statusOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => createDtsCategorySetting(values),
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
        title={t('NEW_DTS_CATEGORY_SETTING')}
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
              label={t('DTS_CATEGORY_SETTING_TITLE')}
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
              label={t('DTS_CATEGORY_SETTING_DESCRIPTION')}
              fieldPath={['description']}
              formik={formik}
              disabled={isPending}
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
              disabled={isPending}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateDtsCategorySetting;
