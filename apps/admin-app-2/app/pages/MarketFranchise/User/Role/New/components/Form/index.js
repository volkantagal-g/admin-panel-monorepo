import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Typography, Button } from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';

import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { createMarketFranchiseUserRoleSelector } from '../../redux/selectors';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper } from '@shared/components/UI/Form';

const { Text } = Typography;

const CreateStoreAuditForm = () => {
  const { t } = useTranslation('marketFranchiseUserRolePage');

  const dispatch = useDispatch();
  const isPending = useSelector(createMarketFranchiseUserRoleSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.createMarketFranchiseUserRoleRequest({ ...values, permissions: [] }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue, handleChange } = formik;

  return (
    <Form onFinish={handleSubmit}>
      <Card
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
            <Text>{t("NAME")}</Text>
            <InputWrapper
              inputKey="name"
              value={values.name}
              isTouched={get(touched, 'name')}
              hasError={get(errors, 'name')}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              disabled={isPending}
            />
          </Col>
          <Col lg={24} xs={24}>
            <MultiLanguageInput
              label={t('DESCRIPTION')}
              fieldPath={['descriptions']}
              formik={formik}
              disabled={isPending}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateStoreAuditForm;
