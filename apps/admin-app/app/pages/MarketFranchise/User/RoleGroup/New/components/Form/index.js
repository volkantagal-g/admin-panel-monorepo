import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import CustomSelectCountry from '../../../Detail/components/CustomSelectCountry';
import { Creators } from '../../redux/actions';
import { createMarketFranchiseUserRoleGroupSelector } from '../../redux/selectors';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { defaultValues, validationSchema } from './formHelper';

const { useForm } = Form;

const CreateMarketFranchiseUserRoleGroupForm = () => {
  const { t } = useTranslation('marketFranchiseUserRoleGroupPage');
  const [form] = useForm();

  const dispatch = useDispatch();
  const isPending = useSelector(createMarketFranchiseUserRoleGroupSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.createMarketFranchiseUserRoleGroupRequest(values));
    },
  });

  const { handleSubmit } = formik;

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Form form={form} onFinish={handleSubmit}>
          <Card
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
            <Row gutter={[16, 16]}>
              <Col lg={24} xs={24}>
                <MultiLanguageInput
                  name="name"
                  label={t('NAME')}
                  fieldPath={['name']}
                  formik={formik}
                  disabled={isPending}
                />
              </Col>
              <Col lg={24} xs={24}>
                <MultiLanguageInput
                  name="description"
                  label={t('DESCRIPTION')}
                  fieldPath={['description']}
                  formik={formik}
                  disabled={isPending}
                />
              </Col>
              <CustomSelectCountry formik={formik} isDisabled={isPending} form={form} />
            </Row>
          </Card>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateMarketFranchiseUserRoleGroupForm;
