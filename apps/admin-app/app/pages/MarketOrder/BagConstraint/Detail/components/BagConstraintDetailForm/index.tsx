import { Button, Checkbox, Col, Form, Modal, Row, Select } from 'antd';

import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useMemo, useState } from 'react';

import MultiLanguageTextArea from '@shared/components/UI/MultiLanguage/TextArea';
import {
  bagConstraintSelector,
  masterCategoriesSelector,
} from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';
import {
  getFormattedSelectOptions,
  getUnselectedValues,
  getValuesBeforeSubmit,
} from '../../../New/components/BagConstraintForm/formHelpers';
import { getInitialValues } from './formHelpers';
import { MasterCategory } from '../../../types';

type ModalProps = {
  isModalVisible: boolean;
  onCloseModal: () => void;
};

const BagConstraintDetail = ({ isModalVisible, onCloseModal }: ModalProps) => {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('bagConstraintsPage');
  const masterCategories: MasterCategory[] = getFormattedSelectOptions(
    useSelector(masterCategoriesSelector.getData),
  );
  const bagConstraint = useSelector(bagConstraintSelector.getData);
  const isPending = useSelector(bagConstraintSelector.getUpdateIsPending);

  const initialValues = useMemo(() => {
    const values = getInitialValues(bagConstraint);
    return values;
  }, [bagConstraint]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: payload => {
      const formValues = getValuesBeforeSubmit(payload);
      dispatch(
        Creators.updateBagConstraintRequest({
          ...formValues,
          _id: bagConstraint?._id,
          onSuccess: () => onClose(),
        }),
      );
    },
  });

  const { values, setFieldValue, handleSubmit, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  function onClose() {
    setValues(initialValues);
    setIsFormEditable(false);
    onCloseModal();
  }

  const firstGroupItems = getUnselectedValues(
    masterCategories,
    values.secondGroupItems,
  );
  const secondGroupItems = getUnselectedValues(
    masterCategories,
    values.firstGroupItems,
  );

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const modalFooter = (
    <Row justify="end">
      {isFormEditable ? (
        <>
          <Form.Item className="m-2">
            <Button
              size="small"
              form="new-bag-constraint"
              type="primary"
              htmlType="submit"
              loading={isPending}
            >
              {t('button:SAVE')}
            </Button>
          </Form.Item>
          <Form.Item className="m-2">
            <Button
              size="small"
              onClick={onClose}
              form="new-bag-constraint"
              type="default"
              htmlType="button"
            >
              {t('button:CANCEL')}
            </Button>
          </Form.Item>
        </>
      ) : (
        <Button
          size="small"
          htmlType="button"
          onClick={handleEditClick}
          data-test="edit-button"
        >
          {t('button:EDIT')}
        </Button>
      )}
    </Row>
  );
  return (
    <Modal
      footer={modalFooter}
      width={1000}
      data-testid="edit-constraint"
      visible={isModalVisible}
      onOk={() => onClose()}
      onCancel={() => onClose()}
      title={t('EDIT_CONSTRAINT')}
    >
      <Form
        form={form}
        id="new-bag-constraint"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row align="middle" gutter={[10, 10]}>
          <Col span={10}>
            <Form.Item label={t('FIRST_GROUP')}>
              <Select
                mode="multiple"
                disabled={isPending || !isFormEditable}
                options={firstGroupItems}
                placeholder={t('FIRST_GROUP')}
                onChange={value => {
                  setFieldValue('firstGroupItems', value);
                }}
                value={values.firstGroupItems}
                allowClear
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label={t('SECOND_GROUP')}>
              <Select
                options={secondGroupItems}
                disabled={isPending || !isFormEditable}
                placeholder={t('SECOND_GROUP')}
                mode="multiple"
                value={values.secondGroupItems}
                onChange={value => {
                  setFieldValue('secondGroupItems', value);
                }}
                allowClear
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item labelAlign="left" label="Status">
              <Checkbox
                disabled={isPending || !isFormEditable}
                checked={values.status}
                onChange={({ target }) => {
                  setFieldValue('status', target?.checked);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <MultiLanguageTextArea
              formik={formik}
              disabled={isPending || !isFormEditable}
              label={[t('global:DESCRIPTION')]}
              fieldPath={['description']}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default BagConstraintDetail;
