import { useEffect } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import Card from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { createDtsSelector } from '../../redux/selector';
import { DatePickerWrapper, SelectWrapper, InputWrapper, FileUploadWrapper } from '@shared/components/UI/Form';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import { SelectRule, SelectFeedbackSource, SelectEmployee } from '../../../components';
import { convertSelectOptions } from '@shared/utils/common';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';
import { preparePayload } from './utils';

const { Text } = Typography;

const CreateDtsForm = () => {
  const { t } = useTranslation('dts');
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const isPending = useSelector(createDtsSelector.getIsPending);

  const activityOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      const payload = preparePayload(values);
      dispatch(Creators.createDtsRequest(payload));
    },
  });

  const { handleSubmit, values, handleChange, touched, errors, setFieldValue } = formik;

  const handleSelectChange = fieldName => {
    return (selectedItems, all) => {
      if (fieldName === 'rule') {
        setFieldValue('ruleDescription', all?.data?.description?.[getLangKey()]);
        setFieldValue('ruleCategory', all?.data?.category?.title?.[getLangKey()]);
        setFieldValue('rulePriority', all?.data?.priority?.title?.[getLangKey()]);
      }
      setFieldValue(fieldName, selectedItems);
    };
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Card
        title={t('NEW_DTS')}
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
        <Row gutter={[12, 12]}>
          <Col lg={12} xs={24}>
            <Text>{t('RULE_NUMBER')}</Text>
            <SelectRule
              selectKey="rule"
              fieldName="rule"
              formik={formik}
              disabled={isPending}
              value={values.rule}
              onChangeCallback={handleSelectChange('rule')}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('RULE_DESCRIPTION')}</Text>
            <InputWrapper
              setDefaultValue={false}
              inputKey="ruleDescription"
              value={values.ruleDescription}
              isTouched={get(touched, 'ruleDescription')}
              hasError={get(errors, 'ruleDescription')}
              handleChange={() => { }}
              disabled
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('RULE_CATEGORY')}</Text>
            <InputWrapper
              setDefaultValue={false}
              inputKey="ruleCategory"
              value={values.ruleCategory}
              isTouched={get(touched, 'ruleCategory')}
              hasError={get(errors, 'ruleCategory')}
              handleChange={() => { }}
              disabled
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('RULE_PRIORITY')}</Text>
            <InputWrapper
              setDefaultValue={false}
              inputKey="rulePriority"
              value={values.rulePriority}
              isTouched={get(touched, 'rulePriority')}
              hasError={get(errors, 'rulePriority')}
              handleChange={() => { }}
              disabled
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('global:DATE')}</Text>
            <DatePickerWrapper
              selectKey="realized"
              value={values.realized}
              format="DD/MM/YYYY HH:mm"
              hasError={get(errors, 'realized')}
              isTouched={get(touched, 'realized')}
              onChangeCallback={handleSelectChange('realized')}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('global:WAREHOUSE')}</Text>
            <Form.Item
              help={get(errors, 'warehouse')}
              validateStatus={get(errors, 'warehouse') ? 'error' : 'success'}
              name="warehouse"
              className={get(errors, 'warehouse') ? '' : 'mb-2'}
            >
              <SelectWarehouse
                fieldName="warehouse"
                formik={formik}
                value={values.warehouse}
                onChange={handleSelectChange('warehouse')}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('EMPLOYEE')}</Text>
            <SelectEmployee
              selectKey="person"
              fieldName="person"
              allowClear
              formik={formik}
              disabled={isPending}
              value={values.person}
              onChangeCallback={handleSelectChange('person')}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('global:DESCRIPTION')}</Text>
            <InputWrapper
              mode="textarea"
              setDefaultValue={false}
              inputKey="description"
              value={values.description}
              placeholder={t('global:DESCRIPTION')}
              isTouched={get(touched, 'description')}
              hasError={get(errors, 'description')}
              handleChange={handleChange}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('FEEDBACK_SOURCE')}</Text>
            <SelectFeedbackSource
              selectKey="feedbackSource"
              fieldName="feedbackSource"
              formik={formik}
              disabled={isPending}
              value={values.feedbackSource}
              onChangeCallback={handleSelectChange('feedbackSource')}
            />
          </Col>
          <Col lg={12} xs={24}>
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
          <Col xs={24}>
            <Text>{t('FILES')}</Text>
            <FileUploadWrapper
              inputKey="files"
              hasError={get(errors, 'files')}
              onChangeCallback={handleSelectChange('files')}
              fileList={values.files}
              disabled={isPending}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateDtsForm;
