import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Typography, Button } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { SelectWrapper } from '@shared/components/UI/Form';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';
import { convertConstantValuesToSelectOptions } from '@app/pages/Kds/utils';
import { SelectAuditFormType } from '@app/pages/Kds/components';
import { StatusEnum } from '@app/pages/Kds/constant';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { createKdsQuestionGroupSelector } from '../../redux/selectors';

const { Text } = Typography;

const CreateKdsQuestionGroupForm = () => {
  const { t } = useTranslation('kdsQuestionGroupPage');

  const dispatch = useDispatch();
  const isPending = useSelector(createKdsQuestionGroupSelector.getIsPending);

  const statusOptions = convertConstantValuesToSelectOptions(StatusEnum);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.createKdsQuestionGroupRequest({ ...values }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  return (
    <Form onFinish={handleSubmit}>
      <Card
        title={t('QUESTION_GROUP')}
        footer={
          <Button
            size="small"
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            {t('button:SAVE')}
          </Button>
        }
      >
        <Row gutter={[16, 16]}>
          <Col lg={24} xs={24}>
            <MultiLanguageInput
              label={t('GROUP_NAME')}
              fieldPath={['name']}
              formik={formik}
              disabled={isPending}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('FORM_TYPE')}</Text>
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
      </Card>
    </Form>
  );
};

export default CreateKdsQuestionGroupForm;
