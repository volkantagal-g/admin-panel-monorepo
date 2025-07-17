import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Typography, Form, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import arrayMove from '@shared/utils/arrayMove';
import Card from '@shared/components/UI/AntCard';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';
import Footer from '@shared/shared/components/Footer';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { kdsAuditFormTypeDetailSelector } from '../../redux/selectors';
import SortableList from '../SortableList';
import useStyles from './styles';

const { useForm } = Form;
const { Text } = Typography;

const UpdateKdsAuditFormTypeForm = ({ id }) => {
  const { t } = useTranslation('kdsAuditFormTypePage');
  const classes = useStyles();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [questionGroupList, setQuestionGroupList] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector(kdsAuditFormTypeDetailSelector.getData);
  const isPending = useSelector(kdsAuditFormTypeDetailSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    onSubmit: values => {
      dispatch(Creators.updateKdsAuditFormTypeRequest({ data: { ...values, questionGroupList, auditFormTypeId: id } }));
    },
    validate: validate(validationSchema),
    validateOnChange: false,
  });

  const { handleSubmit, setValues, values, handleChange, errors, touched } = formik;

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    const { name, isSendToFranchise, questionGroups } = data;
    form.setFieldsValue({ name, isSendToFranchise });
    setValues({ name, isSendToFranchise });
    setQuestionGroupList(questionGroups);
    setIsFormEditable(false);
  };

  useEffect(() => {
    if (data) {
      const { name, isSendToFranchise, questionGroups } = data;
      form.setFieldsValue({ name, isSendToFranchise });
      setValues({ name, isSendToFranchise });
      setQuestionGroupList(questionGroups || []);
    }
  }, [data, form, setValues]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newList = arrayMove(questionGroupList, oldIndex, newIndex);
    newList = newList.map((list, index) => {
      return {
        ...list,
        position: index,
      };
    });
    setQuestionGroupList(newList);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Card
        title={t('AUDIT_FORM_TYPE_DETAIL')}
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
        <Row gutter={[16, 16]} className={classes.wrapper}>
          <Col lg={20} xs={24}>
            <MultiLanguageInput
              name="name"
              disabled={isPending || !isFormEditable}
              label={t('NAME')}
              fieldPath={['name']}
              formik={formik}
            />
          </Col>
          <Col xs={24} lg={4}>
            <Checkbox
              name="isSendToFranchise"
              checked={values.isSendToFranchise}
              disabled={isPending || !isFormEditable}
              onChange={handleChange}
              hasError={get(errors, 'isSendToFranchise')}
              isTouched={get(touched, 'isSendToFranchise')}
            >{t('SEND_TO_FRANCHISE_CONFIRM_TEXT')}
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Text>{t('QUESTION_GROUP_ORDER')}</Text>
          <SortableList
            disabled={isPending || !isFormEditable}
            items={questionGroupList}
            onSortEnd={onSortEnd}
          />
        </Row>
      </Card>
    </Form>
  );
};

export default UpdateKdsAuditFormTypeForm;
