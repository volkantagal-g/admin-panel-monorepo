import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import {
  defaultValues,
  validationSchema,
} from './formHelper';
import { validate } from '@shared/yup';
import { Modal, TextInput } from '@shared/components/GUI';
import {
  isNewFamilyModalOpenSelector,
  createMarketProductFamilySelector,
} from '@app/pages/MarketProduct/Family/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/Family/redux/actions';

const NewProductFamilyModal = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(createMarketProductFamilySelector.getIsPending);
  const { t } = useTranslation('marketProductFamilyPage');
  const [form] = Form.useForm();
  const isNewFamilyModalOpen = useSelector(isNewFamilyModalOpenSelector);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createMarketProductFamilyRequest({ body: values }));
      // eslint-disable-next-line no-use-before-define
      resetForm();
      dispatch(Creators.closeNewFamilyModal());
    },
  });

  const { handleSubmit, values, errors, setFieldValue, resetForm } =
    formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, isPending]);

  const handleCancel = () => {
    resetForm();
    dispatch(Creators.closeNewFamilyModal());
  };

  return (
    <Modal
      visible={isNewFamilyModalOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: isPending }}
      title={t('NEW_PRODUCT_FAMILY')}
    >
      <Form form={form} id="product-family-new" layout="vertical">
        <Row className="mb-3">
          <Col span={24}>
            <Form.Item label={t('FAMILY_NAME')} name="name" help={get(errors, 'name')} validateStatus={get(errors, 'name') ? 'error' : 'success'}>
              <TextInput
                errors={errors}
                name="testName"
                disabled={isPending}
                value={values.name}
                onChange={event => {
                  setFieldValue('name', event.target.value);
                }}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewProductFamilyModal;

NewProductFamilyModal.propTypes = { ...Modal.propTypes };

NewProductFamilyModal.defaultProps = { ...Modal.defaultProps };
