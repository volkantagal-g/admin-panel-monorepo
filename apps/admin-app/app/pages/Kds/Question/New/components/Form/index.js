import { useEffect } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Checkbox, Row, Col, Typography, Alert } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { getLangKey } from '@shared/i18n';
import {
  QuestionGroupSelection,
  MultiChoiceQuestion,
  NumberInputQuestion,
  ScoreMappingSelection,
} from '@app/pages/Kds/Question/components';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { SelectWrapper } from '@shared/components/UI/Form';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { initialValues, validationSchema } from './formHelper';
import { convertConstantValuesToSelectOptions, createNewQuestionBody } from '../../../../utils';
import { Creators } from '../../redux/actions';
import { kdsQuestionSelector } from '../../redux/selectors';
import {
  ResponsibleDomainTypesValuesEnum,
  QuestionTypeEnum,
  StatusEnum,
  QuestionTypes,
  DomainTypes, NotApplicableOptionType,
} from '@app/pages/Kds/constant';
import useStyles from './styles';
import { SelectAuditFormType } from '@app/pages/Kds/components';

const { useForm } = Form;

const { Text } = Typography;

const NewKdsCreationForm = () => {
  const classes = useStyles();
  const [form] = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('kdsQuestionPage');
  const selectedCountry = getSelectedCountry();
  const countryCode = get(selectedCountry, 'code.alpha2', '');
  const responsibleDomainTypeOptions = convertConstantValuesToSelectOptions(ResponsibleDomainTypesValuesEnum, countryCode);
  const questionTypes = convertConstantValuesToSelectOptions(QuestionTypeEnum);
  const statusOptions = convertConstantValuesToSelectOptions(StatusEnum);

  const isPending = useSelector(kdsQuestionSelector.getIsPending);
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      const requestBody = createNewQuestionBody(values);
      dispatch(Creators.createKdsQuestionRequest({ requestBody }));
    },
    validate: validate(validationSchema),
    enableReinitialize: true,
    validateOnChange: false,
  });

  const { values, touched, errors, setFieldValue, handleSubmit, handleChange, setValues } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      if (fieldName === 'questionType') {
        form.setFieldsValue({ domainType: [] });
        setFieldValue('domainType', []);
        form.setFieldsValue({ scoreMapping: {} });
        setFieldValue('scoreMapping', {});

        if (selectedItems === QuestionTypes.NUMBER_INPUT) {
          form.setFieldsValue({ questionType: QuestionTypes.NUMBER_INPUT, answerOptions: '' });
          setFieldValue(fieldName, selectedItems);
          setFieldValue('answerOptions', '');
          return;
        }
        if (selectedItems === QuestionTypes.MULTIPLE_CHOICE) {
          form.setFieldsValue({ questionType: QuestionTypes.MULTIPLE_CHOICE });
          form.setFieldsValue({ notApplicableOptionAvailable: false });
          setFieldValue('notApplicableOptionAvailable', false);
          setFieldValue(fieldName, selectedItems);
          setFieldValue('answerOptions', [{ tr: '', en: '', isHighlighted: false }]);
          return;
        }
      }
      setFieldValue(fieldName, selectedItems);
    };
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

  useEffect(() => {
    form.setFieldsValue(initialValues);
    setValues(initialValues);
  }, [form, setValues]);

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Card
        title={t('FORM_TITLE')}
        footer={(
          <Row className={classes.submitButton}>
            <Button type="primary" htmlType="submit">
              {t('global:CREATE')}
            </Button>
          </Row>
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              form={form}
              setFieldValue={setFieldValue}
            />
          </>
        )}
        {values.questionType === QuestionTypes.NUMBER_INPUT && (
          <NumberInputQuestion
            formik={formik}
            answerOptions={values?.answerOptions}
            isPending={isPending}
            handleChange={handleChange}
          />
        )}
        <Row gutter={[16, 16]} className={classes.rowWrapper}>
          <Col lg={12} xs={24}>
            <Text>{t('RESPONSIBLE_DOMAIN')}</Text>
            <SelectWrapper
              selectKey="domainType"
              className={classes.selectItem}
              value={values.domainType}
              optionsData={responsibleDomainTypeOptions}
              hasError={get(errors, 'domainType')}
              isTouched={get(touched, 'domainType')}
              disabled={isPending || !values.questionType}
              onChangeCallback={handleSelectChange('domainType')}
              shouldMapOptionsData
              onDeselect={handleDeselectDomainType}
              mode="multiple"
            />
          </Col>
          <Col sm={24} md={6}>
            <Checkbox
              name="askForStoreConversion"
              checked={values.askForStoreConversion}
              onChange={handleScChange}
              disabled={isPending || !values.questionType}
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
              disabled={isPending || !values.questionType}
              hasError={get(errors, 'askForMainWarehouse')}
              isTouched={get(touched, 'askForMainWarehouse')}
            >{t('ASK_TO_MAIN_WAREHOUSES')}
            </Checkbox>
          </Col>
        </Row>
        {
          values.domainType.map((domainType, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Row key={index} gutter={[16, 16]}>
                <Col sm={24}>
                  <Text>{`${t('SCORE_MAPPING')} ${DomainTypes[domainType][getLangKey()]}`}</Text>
                  <ScoreMappingSelection
                    name={`scoreMapping.${domainType}`}
                    className={classes.selectItem}
                    value={values.scoreMapping[domainType]}
                    questionType={values.questionType}
                    domainType={domainType}
                    formik={formik}
                    disabled={isPending}
                  />
                </Col>
              </Row>
            );
          })
        }
        {values.askForStoreConversion && (
          <Row gutter={[16, 16]}>
            <Col sm={24}>
              <Text>{`${t('SCORE_MAPPING')} ${DomainTypes.STORE_CONVERSION[getLangKey()]}`}</Text>
              <ScoreMappingSelection
                name="scoreMapping.STORE_CONVERSION"
                className={classes.selectItem}
                questionType={values.questionType}
                domainType="STORE_CONVERSION"
                value={values.scoreMapping.STORE_CONVERSION}
                formik={formik}
                disabled={isPending}
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
                disabled={isPending}
              />
            </Col>
          </Row>
        )}
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <div>{t('AUDIT_FORM_TYPE')}</div>
            <SelectAuditFormType
              selectKey="auditFormType"
              fieldName="auditFormType"
              formik={formik}
              isMultiple
              disabled={isPending}
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
            >{t('IS_PHOTO_FORCED')}
            </Checkbox>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default NewKdsCreationForm;
