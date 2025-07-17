import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import Card from '@shared/components/UI/AntCard';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { createKdsAuditFormTypeSelector } from '../../redux/selectors';
import useStyles from './styles';

const CreateAuditFormType = () => {
  const { t } = useTranslation('kdsAuditFormTypePage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(createKdsAuditFormTypeSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.createKdsAuditFormTypeRequest({ ...values }));
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <Form onFinish={handleSubmit}>
      <Card
        title={t('NEW_AUDIT_FORM_TYPE')}
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
        <Row gutter={[16, 16]} className={classes.wrapper}>
          <Col lg={20} xs={24}>
            <MultiLanguageInput
              name="name"
              label={t('NAME')}
              fieldPath={['name']}
              formik={formik}
              disabled={isPending}
            />
          </Col>
          <Col xs={24} lg={4}>
            <Checkbox
              name="isSendToFranchise"
              checked={values.isSendToFranchise}
              onChange={handleChange}
              hasError={get(errors, 'isSendToFranchise')}
              isTouched={get(touched, 'isSendToFranchise')}
            >{t('SEND_TO_FRANCHISE_CONFIRM_TEXT')}
            </Checkbox>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateAuditFormType;
