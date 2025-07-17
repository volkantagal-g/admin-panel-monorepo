import { useState, useEffect } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Typography, Form } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import arrayMove from '@shared/utils/arrayMove';
import { SelectWrapper } from '@shared/components/UI/Form';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';
import { convertConstantValuesToSelectOptions } from '@app/pages/Kds/utils';
import { SelectAuditFormType } from '@app/pages/Kds/components';
import { StatusEnum } from '@app/pages/Kds/constant';
import Footer from '@shared/shared/components/Footer';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { kdsQuestionGroupDetailSelector } from '../../redux/selectors';
// eslint-disable-next-line import/no-cycle
import { SortableList } from '../index';

const { useForm } = Form;
const { Text } = Typography;

const UpdateKdsQuestionGroupForm = ({ id }) => {
  const { t } = useTranslation('kdsQuestionGroupPage');
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector(kdsQuestionGroupDetailSelector.getData);
  const isPending = useSelector(kdsQuestionGroupDetailSelector.getIsPending);

  const statusOptions = convertConstantValuesToSelectOptions(StatusEnum);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.updateKdsQuestionGroupRequest({ data: { ...values, questionList, questionGroupId: id } }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue, setValues } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    const { status, name, auditFormType, questions } = data;
    form.setFieldsValue({ status, auditFormType, name });
    setQuestionList(questions);
    setIsFormEditable(false);
  };

  useEffect(() => {
    const { status, name, auditFormType, questions } = data;
    form.setFieldsValue({ status, auditFormType, name });
    setValues({ status, auditFormType, name });
    setQuestionList(questions || []);
  }, [data]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newList = arrayMove(questionList, oldIndex, newIndex);
    newList = newList.map((list, index) => {
      return {
        ...list,
        position: index,
      };
    });
    setQuestionList(newList);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Card
        title={t('QUESTION_GROUP')}
        footer={
          <Footer
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleEditClick={handleEditClick}
            isFormEditable={isFormEditable}
            isPending={isPending}
          />
        }
      >
        <Row gutter={[16, 16]}>
          <Col lg={24} xs={24}>
            <MultiLanguageInput
              disabled={isPending || !isFormEditable}
              label={t('GROUP_NAME')}
              fieldPath={['name']}
              formik={formik}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('FORM_TYPE')}</Text>
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
              disabled={isPending || !isFormEditable}
              selectKey="status"
              value="ACTIVE"
              hasError={get(errors, 'status')}
              isTouched={get(touched, 'status')}
              optionsData={statusOptions}
              optionLabelProp="label"
              optionValueProp="value"
              onChangeCallback={handleSelectChange('status')}
            />
          </Col>
        </Row>
        <Row>
          <Text>{t('QUESTION_ORDER')}</Text>
          <SortableList
            disabled={isPending || !isFormEditable}
            items={questionList}
            onSortEnd={onSortEnd}
          />
        </Row>
      </Card>
    </Form>
  );
};

export default UpdateKdsQuestionGroupForm;
