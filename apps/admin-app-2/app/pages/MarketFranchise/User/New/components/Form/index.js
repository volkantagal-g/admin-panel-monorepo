import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Typography, Button, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import SelectFranchise from '@shared/containers/Select/Franchise';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { createMarketFranchiseUserSelector } from '../../redux/selectors';
import { getCreateMarketFranchiseUserRequestParams } from '../../utils';

const { Text } = Typography;
const { Item } = Form;

const CreateKdsQuestionGroupForm = () => {
  const { t } = useTranslation('marketFranchiseUserPage');

  const dispatch = useDispatch();
  const isPending = useSelector(createMarketFranchiseUserSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const userRequestParams = getCreateMarketFranchiseUserRequestParams(values);
      dispatch(Creators.createMarketFranchiseUserRequest({ requestBody: userRequestParams }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue, handleChange } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  return (
    <Form onFinish={handleSubmit}>
      <Card
        title={t('MARKET_FRANCHISE_USER')}
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
        <Col gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <Text>{t('global:FRANCHISE')}</Text>
            <Item
              help={get(touched, 'franchise') && get(errors, 'franchise')}
              validateStatus={errors.franchise && touched.franchise ? 'error' : 'success'}
            >
              <SelectFranchise
                disabled={isPending}
                value={values.franchise}
                onChange={handleSelectChange('franchise')}
                allowClear={false}
                placeholder={t('global:FRANCHISE')}
              />
            </Item>
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('global:NAME')}</Text>
            <InputWrapper
              inputKey="name"
              value={values?.name}
              isTouched={get(touched, 'name')}
              hasError={get(errors, 'name')}
              handleChange={handleChange}
              disabled={isPending}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('global:USERNAME')}</Text>
            <InputWrapper
              inputKey="username"
              value={values?.username}
              isTouched={get(touched, 'username')}
              hasError={get(errors, 'username')}
              handleChange={handleChange}
              disabled={isPending}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('global:EMAIL')}</Text>
            <InputWrapper
              inputKey="email"
              value={values?.email}
              isTouched={get(touched, 'email')}
              hasError={get(errors, 'email')}
              handleChange={handleChange}
              disabled={isPending}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text>{t('global:GSM')}</Text>
            <InputWrapper
              inputKey="gsm"
              mode="number"
              value={values.gsm}
              isTouched={get(touched, 'gsm')}
              hasError={get(errors, 'gsm')}
              setFieldValue={setFieldValue}
              disabled={isPending}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Item
              help={get(touched, 'isOwner') && get(errors, 'isOwner')}
              validateStatus={errors.isOwner && touched.isOwner ? 'error' : 'success'}
            >
              <Checkbox
                name="isOwner"
                checked={values.isOwner}
                onChange={handleChange}
                disabled={isPending || values.isGetirEmployee}
              >
                {t('IS_OWNER')}
              </Checkbox>
            </Item>
          </Col>
          <Col lg={12} xs={24}>
            <Item
              help={get(touched, 'isGetirEmployee') && get(errors, 'isGetirEmployee')}
              validateStatus={errors.isGetirEmployee && touched.isGetirEmployee ? 'error' : 'success'}
            >
              <Checkbox
                name="isGetirEmployee"
                checked={values.isGetirEmployee}
                onChange={handleChange}
                disabled={isPending || values.isOwner}
              >
                {t('IS_GETIR_EMPLOYEE')}
              </Checkbox>
            </Item>
          </Col>
        </Col>
      </Card>
    </Form>
  );
};

export default CreateKdsQuestionGroupForm;
