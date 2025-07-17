import { useEffect, useState, useCallback } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Checkbox, Form, Typography, Alert } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { validate } from '@shared/yup';
import { getLangKey } from '@shared/i18n';
import Card from '@shared/components/UI/AntCard';
import Footer from '@shared/shared/components/Footer';
import { SelectWrapper } from '@shared/components/UI/Form';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { defaultValues, validationSchema } from './formHelper';
import { convertConstantValuesToSelectOptions, updateQuestionDetailBody } from '../../../../utils';
import { Creators } from '../../redux/actions';
import { kdsQuestionDetailSelector } from '../../redux/selectors';
import {
  ResponsibleDomainTypesValuesEnum,
  QuestionTypeEnum,
  StatusEnum,
  QuestionTypes, NotApplicableOptionType, DomainTypes,
} from '@app/pages/Kds/constant';
import {
  QuestionGroupSelection,
  NumberInputQuestion,
  MultiChoiceQuestion, ScoreMappingSelection,
} from '@app/pages/Kds/Question/components';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { SelectAuditFormType } from '@app/pages/Kds/components';
import useStyles from './styles';

const { useForm } = Form;

const { Text } = Typography;

const UpdateKdsQuestionForm = ({ id }) => {
  const { t } = useTranslation('kdsQuestionPage');

  const classes = useStyles();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector(kdsQuestionDetailSelector.getData);
  const isPending = useSelector(kdsQuestionDetailSelector.getIsPending);

  const selectedCountry = getSelectedCountry();
  const countryCode = get(selectedCountry, 'code.alpha2', '');
  const responsibleDomainTypeOptions = convertConstantValuesToSelectOptions(ResponsibleDomainTypesValuesEnum, countryCode);
  const questionTypes = convertConstantValuesToSelectOptions(QuestionTypeEnum);
  const statusOptions = convertConstantValuesToSelectOptions(StatusEnum);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      const requestBody = updateQuestionDetailBody(values, id);
      dispatch(Creators.updateKdsQuestionRequest({ data: requestBody }));
    },
  });

  const { values, touched, errors, setFieldValue, handleSubmit, handleChange, setValues } = formik;

  const initForm = useCallback(() => {
    const {
      questionGroupId,
      name,
      tooltip,
      questionType,
      answerOptions,
      isPhotoForced,
      scoreMapping,
      domainType,
      askForStoreConversion,
      askForMainWarehouse,
      status,
      auditFormType,
      notApplicableOptionAvailable,
    } = data;
    form.setFieldsValue({
      questionGroupId,
      name,
      tooltip,
      questionType,
      answerOptions,
      isPhotoForced,
      scoreMapping,
      domainType,
      askForStoreConversion,
      askForMainWarehouse,
      status,
      auditFormType,
      notApplicableOptionAvailable,
    });
    setValues({
      questionGroupId,
      name,
      tooltip,
      questionType,
      answerOptions,
      isPhotoForced,
      scoreMapping,
      domainType,
      askForMainWarehouse,
      askForStoreConversion,
      status,
      auditFormType,
      notApplicableOptionAvailable,
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

  const handleSelectChange = fieldName => {
    return selectedItems => {
      if (fieldName === 'questionType') {
        form.setFieldsValue({ domainType: [] });
        setFieldValue('domainType', []);
        form.setFieldsValue({ scoreMapping: {} });
        setFieldValue('scoreMapping', {});

        if (selectedItems === QuestionTypes.NUMBER_INPUT) {
          setFieldValue(fieldName, selectedItems);
          setFieldValue('answerOptions', '');
          form.setFieldsValue({ questionType: QuestionTypes.NUMBER_INPUT, answerOptions: '' });
          return;
        }
        if (selectedItems === QuestionTypes.MULTIPLE_CHOICE) {
          setFieldValue(fieldName, selectedItems);
          setFieldValue('answerOptions', [{ tr: '', en: '' }]);
          setFieldValue('notApplicableOptionAvailable', false);
          form.setFieldsValue({ questionType: QuestionTypes.MULTIPLE_CHOICE });
          form.setFieldsValue({ notApplicableOptionAvailable: false });
          return;
        }
      }
      setFieldValue(fieldName, selectedItems);
    };
  };

  const onNotApplicableChange = value => {
    const notApplicableValue = value.target.checked;
    let updatedAnswerOptions = values.answerOptions;

    if (!notApplicableValue) {
      updatedAnswerOptions = updatedAnswerOptions.filter(option => option[getLangKey()] !== NotApplicableOptionType[getLangKey()]);
      if (updatedAnswerOptions.length === 0) {
        updatedAnswerOptions.push({ tr: '', en: '', isHighlighted: false });
      }
    }
    else {
      updatedAnswerOptions.push(NotApplicableOptionType);
    }
    setFieldValue('answerOptions', updatedAnswerOptions);
    form.setFieldsValue({ answerOptions: updatedAnswerOptions });
    setFieldValue('notApplicableOptionAvailable', notApplicableValue);
    form.setFieldsValue({ notApplicableOptionAvailable: notApplicableValue });
  };

  const handleDeselectDomainType = value => {
    form.setFieldsValue({ [`scoreMapping.${value}`]: '' });
    setFieldValue(`scoreMapping.${value}`, '');
  };

  const handleScChange = value => {
    if (value.checked) {
      form.setFieldsValue({ 'scoreMapping.STORE_CONVERSION': '' });
      setFieldValue('scoreMapping.STORE_CONVERSION', '');
    }
    else {
      delete values.scoreMapping.STORE_CONVERSION;
    }
    handleChange(value);
  };

  const handleWhChange = value => {
    if (value.checked) {
      form.setFieldsValue({ 'scoreMapping.MAIN_WAREHOUSE': '' });
      setFieldValue('scoreMapping.MAIN_WAREHOUSE', '');
    }
    else {
      delete values.scoreMapping.MAIN_WAREHOUSE;
    }
    handleChange(value);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Card
        title={t('QUESTION')}
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
        <Row gutter={[16, 16]}>
          <Col lg={24} xs={24}>
            <Text>{t('QUESTION_GROUP')}</Text>
            <QuestionGroupSelection
              selectKey="questionGroupId"
              className={classes.selectItem}
              fieldName="questionGroupId"
              formik={formik}
              disabled={isPending || !isFormEditable}
              value={values.questionGroupId}
              onChangeCallback={handleSelectChange('questionGroupId')}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col lg={24} xs={24}>
            <MultiLanguageInput
              name="name"
              label={t('QUESTION')}
              fieldPath={['name']}
              formik={formik}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <MultiLanguageInput
              name="tooltip"
              label={t('TOOLTIP')}
              fieldPath={['tooltip']}
              formik={formik}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text>{t('QUESTION_TYPE')}</Text>
            <SelectWrapper
              selectKey="questionType"
              value={values.questionType}
              className={classes.selectItem}
              onChangeCallback={handleSelectChange('questionType')}
              optionsData={questionTypes}
              hasError={get(errors, 'questionType')}
              isTouched={get(touched, 'questionType')}
              shouldMapOptionsData
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
        {values.questionType === QuestionTypes.MULTIPLE_CHOICE && (
          <Row gutter={[16, 16]}>
            <Col sm={24} md={12}>
              <Checkbox
                name="notApplicableOptionAvailable"
                checked={values.notApplicableOptionAvailable}
                onChange={value => onNotApplicableChange(value)}
                hasError={get(errors, 'notApplicableOptionAvailable')}
                isTouched={get(touched, 'notApplicableOptionAvailable')}
                disabled={isPending || !isFormEditable}
              >{t('HAS_DEFAULT_NOT_APPLICABLE')}
              </Checkbox>
            </Col>
          </Row>
        )}
        {values.questionType === QuestionTypes.MULTIPLE_CHOICE && (
          <>
            <Alert className={classes.infoAlert} type="info" message={t('OPTIONS_DESCRIPTION')} />
            <MultiChoiceQuestion
              formik={formik}
              answerOptions={values?.answerOptions}
              isPending={isPending}
              isFormEditable={isFormEditable}
              form={form}
              setFieldValue={setFieldValue}
            />
          </>
        )}
        {
          values.questionType === QuestionTypes.NUMBER_INPUT && (
            <NumberInputQuestion
              formik={formik}
              answerOptions={values?.answerOptions}
              isPending={isPending || !isFormEditable}
              handleChange={handleChange}
            />
          )
        }
        <Row gutter={[16, 16]} className={classes.rowWrapper}>
          <Col lg={12} xs={24}>
            <Text>{t('RESPONSIBLE_DOMAIN')}</Text>
            <SelectWrapper
              selectKey="domainType"
              mode="multiple"
              className={classes.selectItem}
              value={values.domainType}
              disabled={isPending || !isFormEditable}
              optionsData={responsibleDomainTypeOptions}
              hasError={get(errors, 'domainType')}
              isTouched={get(touched, 'domainType')}
              onChangeCallback={handleSelectChange('domainType')}
              onDeselect={handleDeselectDomainType}
              shouldMapOptionsData
            />
          </Col>
          <Col sm={24} md={6}>
            <Checkbox
              name="askForStoreConversion"
              checked={values.askForStoreConversion}
              onChange={handleScChange}
              disabled={isPending || !values.questionType || !isFormEditable}
              hasError={get(errors, 'askForStoreConversion')}
              isTouched={get(touched, 'askForStoreConversion')}
            >{t('ASK_TO_SC_WAREHOUSES')}
            </Checkbox>
          </Col>
          <Col sm={24} md={6}>
            <Checkbox
              name="askForMainWarehouse"
              checked={values.askForMainWarehouse}
              onChange={handleWhChange}
              disabled={isPending || !values.questionType || !isFormEditable}
              hasError={get(errors, 'askForMainWarehouse')}
              isTouched={get(touched, 'askForMainWarehouse')}
            >{t('ASK_TO_MAIN_WAREHOUSES')}
            </Checkbox>
          </Col>
        </Row>
        {
          values.domainType && values?.domainType.map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Row key={index} gutter={[16, 16]}>
                <Col sm={24}>
                  <Text>{`${t('SCORE_MAPPING')} ${get(DomainTypes, [item, getLangKey()], '-')}`}</Text>
                  <ScoreMappingSelection
                    name={`scoreMapping.${item}`}
                    value={values.scoreMapping[item]}
                    className={classes.selectItem}
                    questionType={values?.questionType}
                    domainType={item}
                    formik={formik}
                    disabled={isPending || !isFormEditable}
                  />
                </Col>
              </Row>
            );
          })
        }
        {values.askForStoreConversion && (
          <Row gutter={[16, 16]}>
            <Col sm={24}>
              <Text>{`${t('SCORE_MAPPING')} ${get(DomainTypes, ['STORE_CONVERSION', getLangKey()], '-')}`}</Text>
              <ScoreMappingSelection
                name="scoreMapping.STORE_CONVERSION"
                className={classes.selectItem}
                questionType={values.questionType}
                domainType="STORE_CONVERSION"
                value={values.scoreMapping?.STORE_CONVERSION}
                formik={formik}
                disabled={isPending || !isFormEditable}
              />
            </Col>
          </Row>
        )}
        {values.askForMainWarehouse && (
          <Row gutter={[16, 16]}>
            <Col sm={24}>
              <Text>{`${t('SCORE_MAPPING')} ${DomainTypes.MAIN_WAREHOUSE[getLangKey()]}`}</Text>
              <ScoreMappingSelection
                name="scoreMapping.MAIN_WAREHOUSE"
                className={classes.selectItem}
                questionType={values.questionType}
                domainType="MAIN_WAREHOUSE"
                value={values.scoreMapping.MAIN_WAREHOUSE}
                formik={formik}
                disabled={isPending || !isFormEditable}
              />
            </Col>
          </Row>
        )}
        <Row gutter={[8, 8]}>
          <Col lg={12} xs={24}>
            <Text>{t('AUDIT_FORM_TYPE')}</Text>
            <SelectAuditFormType
              selectKey="auditFormType"
              fieldName="auditFormType"
              formik={formik}
              isMultiple
              disabled={isPending || !isFormEditable}
              value={values.auditFormType}
              onChangeCallback={handleSelectChange('auditFormType')}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('STATUS')}</Text>
            <SelectWrapper
              selectKey="status"
              value={values.status}
              hasError={get(errors, 'status')}
              isTouched={get(touched, 'status')}
              optionsData={statusOptions}
              onChangeCallback={handleSelectChange('status')}
              disabled={isPending || !isFormEditable}
              shouldMapOptionsData
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col sm={24} md={12}>
            <Checkbox
              name="isPhotoForced"
              checked={values.isPhotoForced}
              onChange={handleChange}
              hasError={get(errors, 'isPhotoForced')}
              isTouched={get(touched, 'isPhotoForced')}
              disabled={isPending || !isFormEditable}
            >{t('IS_PHOTO_FORCED')}
            </Checkbox>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default UpdateKdsQuestionForm;
