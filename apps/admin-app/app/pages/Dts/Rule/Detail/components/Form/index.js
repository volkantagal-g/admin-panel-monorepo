import { useEffect, useState, useCallback } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Row, Col, Form, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';

import Footer from '@shared/shared/components/Footer';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { automaticClosingOption } from '@app/pages/Dts/Rule/constants';
import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { SelectPriorityFormType, SelectCategoryFormType } from '../../../components';
import { convertConstantValuesToSelectOptions, convertSelectOptions } from '@shared/utils/common';
import { removePointPropertiesFromPayload } from '@app/pages/Dts/Rule/utils';
import { getDtsRuleDetailSelector } from '../../redux/selector';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';

const { TextArea } = Input;
const { Text } = Typography;

const RuleDetailForm = ({ id }) => {
  const { t } = useTranslation('dtsRulePage');
  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector(getDtsRuleDetailSelector.getData);
  const isPending = useSelector(getDtsRuleDetailSelector.getIsPending);

  const closingOptions = convertConstantValuesToSelectOptions(automaticClosingOption);
  const activityOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      const payload = removePointPropertiesFromPayload({ ...values, id });
      dispatch(Creators.updateDtsRuleDetailRequest({ data: payload }));
    },
  });

  const { handleSubmit, handleChange, values, touched, errors, setFieldValue, setValues } = formik;

  const handleSelectChange = fieldName => {
    return (selectedItems, all) => {
      if (fieldName === 'priority') {
        setFieldValue('rejectionPoint', all?.data?.rejectionPoint);
        setFieldValue('warningPoint', all?.data?.warningPoint);
        setFieldValue('acceptancePoint', all?.data?.acceptancePoint);
        form.setFieldsValue({ rejectionPoint: all?.data?.rejectionPoint });
        form.setFieldsValue({ warningPoint: all?.data?.warningPoint });
        form.setFieldsValue({ acceptancePoint: all?.data?.acceptancePoint });
      }
      setFieldValue(fieldName, selectedItems);
    };
  };

  const initForm = useCallback(() => {
    const {
      ruleNumber,
      category,
      priority,
      isActive,
      description,
      title,
      closeAs,
      closeMessage,
      defaultNote,
    } = data;
    form.setFieldsValue({
      ruleNumber,
      category: category?._id,
      priority: priority?._id,
      isActive,
      description,
      title,
      closeAs,
      closeMessage,
      rejectionPoint: priority?.rejectionPoint,
      warningPoint: priority?.warningPoint,
      acceptancePoint: priority?.acceptancePoint,
      defaultNote,
    });
    setValues({
      ruleNumber,
      category: category?._id,
      priority: priority?._id,
      isActive,
      description,
      title,
      closeAs,
      closeMessage,
      rejectionPoint: priority?.rejectionPoint,
      warningPoint: priority?.warningPoint,
      acceptancePoint: priority?.acceptancePoint,
      defaultNote,
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
        title={t('DTS_RULE_DETAIL')}
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
            <Text>{t('RULE_NUMBER')}</Text>
            <InputWrapper
              inputKey="ruleNumber"
              name="ruleNumber"
              value={values.ruleNumber}
              setFieldValue={setFieldValue}
              hasError={get(errors, 'ruleNumber')}
              isTouched={get(touched, 'ruleNumber')}
              formik={formik}
              disabled={isPending || !isFormEditable}
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
              disabled={isPending || !isFormEditable}
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
              disabled={isPending || !isFormEditable}
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
              disabled={isPending || !isFormEditable}
              value={values.priority}
              onChangeCallback={handleSelectChange('priority')}
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
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
              disabled={isPending || !isFormEditable}
              allowClear
            />
          </Col>
          <Col lg={8} sm={8} xs={24}>
            <Text>{t('AUTO_CLOSE_MESSAGE')}</Text>
            <InputWrapper
              inputKey="closeMessage"
              name="closeMessage"
              value={values.closeMessage}
              handleChange={handleChange}
              placeholder={t('AUTO_CLOSE_MESSAGE')}
              hasError={get(errors, 'closeMessage')}
              isTouched={get(touched, 'closeMessage')}
              formik={formik}
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
              optionsData={activityOptions}
              onChangeCallback={handleSelectChange('isActive')}
              shouldMapOptionsData
              disabled={isPending || !isFormEditable}
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
              disabled={isPending || !isFormEditable}
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
              placeholder={t('DEFAULT_NOTE')}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default RuleDetailForm;
