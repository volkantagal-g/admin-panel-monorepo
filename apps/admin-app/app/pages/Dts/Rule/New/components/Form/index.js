import { useEffect } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Row, Col, Form, Button, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { automaticClosingOption } from '@app/pages/Dts/Rule/constants';
import { defaultValues, validationSchema } from './formHelper';
import { createDtsRuleSelector } from '../../redux/selector';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { SelectPriorityFormType, SelectCategoryFormType } from '../../../components';
import { convertConstantValuesToSelectOptions, convertSelectOptions } from '@shared/utils/common';
import { removePointPropertiesFromPayload } from '@app/pages/Dts/Rule/utils';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';

const { TextArea } = Input;
const { Text } = Typography;

const CreateRuleFormType = () => {
  const { t } = useTranslation('dtsRulePage');
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const isPending = useSelector(createDtsRuleSelector.getIsPending);

  const closingOptions = convertConstantValuesToSelectOptions(automaticClosingOption);
  const activityOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      const payload = removePointPropertiesFromPayload(values);
      dispatch(Creators.createDtsRuleRequest(payload));
    },
  });

  const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = formik;

  const handleSelectChange = fieldName => {
    return (selectedItems, all) => {
      if (fieldName === 'priority') {
        setFieldValue('rejectionPoint', all?.data?.rejectionPoint);
        setFieldValue('warningPoint', all?.data?.warningPoint);
        setFieldValue('acceptancePoint', all?.data?.acceptancePoint);
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
        title={t('NEW_DTS_RULE')}
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
            <Text>{t('RULE_NUMBER')}</Text>
            <InputWrapper
              inputKey="ruleNumber"
              name="ruleNumber"
              value={values.ruleNumber}
              setFieldValue={setFieldValue}
              hasError={get(errors, 'ruleNumber')}
              isTouched={get(touched, 'ruleNumber')}
              formik={formik}
              disabled={isPending}
              mode="number"
            />
          </Col>
        </Row>
        <Row>
          <Col lg={24} xs={24}>
            <MultiLanguageInput
              name="title"
              label={t('RULE_DESCRIPTION')}
              fieldPath={['title']}
              formik={formik}
              disabled={isPending}
            />
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col lg={12} xs={12}>
            <Text>{t('global:CATEGORY')}</Text>
            <SelectCategoryFormType
              selectKey="category"
              fieldName="category"
              formik={formik}
              disabled={isPending}
              value={values.category}
              onChangeCallback={handleSelectChange('category')}
            />
          </Col>
          <Col lg={12} xs={12}>
            <Text>{t('global:PRIORITY')}</Text>
            <SelectPriorityFormType
              selectKey="priority"
              fieldName="priority"
              formik={formik}
              disabled={isPending}
              value={values.priority}
              onChangeCallback={handleSelectChange('priority')}
            />
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col lg={8} sm={8} xs={24}>
            <Text>{t('AUTO_CLOSE_OPTION')}</Text>
            <SelectWrapper
              selectKey="closeAs"
              value={values.closeAs}
              hasError={get(errors, 'closeAs')}
              isTouched={get(touched, 'closeAs')}
              optionsData={closingOptions}
              onChangeCallback={handleSelectChange('closeAs')}
              shouldMapOptionsData
              allowClear
              disabled={isPending}
            />
          </Col>
          <Col lg={8} sm={8} xs={24}>
            <Text>{t('AUTO_CLOSE_MESSAGE')}</Text>
            <InputWrapper
              inputKey="closeMessage"
              name="closeMessage"
              placeholder={t('AUTO_CLOSE_MESSAGE')}
              value={values.closeMessage}
              handleChange={handleChange}
              hasError={get(errors, 'closeMessage')}
              isTouched={get(touched, 'closeMessage')}
              formik={formik}
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
        <Row>
          <Col lg={24} xs={24}>
            <MultiLanguageInput
              name="description"
              label={t('RULE_DETAIL')}
              fieldPath={['description']}
              formik={formik}
              disabled={isPending}
            />
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col lg={8} xs={8}>
            <Text>{t('REJECTION_POINT')}</Text>
            <InputWrapper
              inputKey="rejectionPoint"
              name="rejectionPoint"
              value={values.rejectionPoint}
              setFieldValue={setFieldValue}
              hasError={get(errors, 'rejectionPoint')}
              isTouched={get(touched, 'rejectionPoint')}
              formik={formik}
              disabled
            />
          </Col>
          <Col lg={8} xs={8}>
            <Text>{t('WARNING_POINT')}</Text>
            <InputWrapper
              inputKey="warningPoint"
              name="warningPoint"
              value={values.warningPoint}
              setFieldValue={setFieldValue}
              hasError={get(errors, 'warningPoint')}
              isTouched={get(touched, 'warningPoint')}
              formik={formik}
              disabled
            />
          </Col>
          <Col lg={8} xs={8}>
            <Text>{t('ACCEPTANCE_POINT')}</Text>
            <InputWrapper
              inputKey="acceptancePoint"
              name="acceptancePoint"
              value={values.acceptancePoint}
              setFieldValue={setFieldValue}
              hasError={get(errors, 'acceptancePoint')}
              isTouched={get(touched, 'acceptancePoint')}
              formik={formik}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Text>{t('DEFAULT_NOTE')}</Text>
            <TextArea
              name="defaultNote"
              value={values.defaultNote}
              rows={4}
              onChange={handleChange}
              disabled={isPending}
              placeholder={t('DEFAULT_NOTE')}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateRuleFormType;
