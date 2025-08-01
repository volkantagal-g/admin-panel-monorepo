import { Button, Checkbox, Col, Form, Row, Select } from 'antd';

import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import AntCard from '@shared/components/UI/AntCard';
import MultiLanguageTextArea from '@shared/components/UI/MultiLanguage/TextArea';
import { bagConstraintSelector, masterCategoriesSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';
import {
  getFormattedSelectOptions,
  getInitialValues,
  getUnselectedValues,
  getValuesBeforeSubmit,
} from './formHelpers';
import { FromValues } from '../../../types';

function AddConstraint() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('bagConstraintsPage');
  const masterCategories = getFormattedSelectOptions(
    useSelector(masterCategoriesSelector.getData),
  );
  const isPending = useSelector(bagConstraintSelector.getCreateIsPending);

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: (payload: FromValues) => {
      const formValues = getValuesBeforeSubmit(payload);
      dispatch(Creators.createBagConstraintRequest(formValues));
    },
  });

  const { values, setFieldValue, handleSubmit, resetForm } = formik;
  const onClose = () => {
    resetForm();
    form.resetFields();
    navigate(-1);
  };

  const firstGroupItems = getUnselectedValues(
    masterCategories,
    values.secondGroupItems as string[],
  );
  const secondGroupItems = getUnselectedValues(
    masterCategories,
    values.firstGroupItems as string[],
  );

  const cardFooter = (
    <Row justify="end">
      <Form.Item className="m-2">
        <Button
          size="small"
          form="new-bag-constraint"
          type="primary"
          loading={isPending}
          htmlType="submit"
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
    </Row>
  );
  return (
    <AntCard data-testid="add-constraint" footer={cardFooter} bordered={false} title={t('NEW_CONSTRAINT')}>
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
              disabled={isPending!}
              label={[t('global:DESCRIPTION')]}
              fieldPath={['description']}
            />
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
}

export default AddConstraint;
