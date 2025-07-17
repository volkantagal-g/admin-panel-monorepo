import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import { usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { getTransferGroupByIdSelector, updateTransferGroupSelector } from '../../redux/selectors';
import { getInitialValues, manipulateValuesAfterSubmit, validationSchema } from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';

const TransferGroupDetailForm = () => {
  const dispatch = useDispatch();
  const transferGroup = useSelector(getTransferGroupByIdSelector.getData) || {};
  const isUpdatePending = useSelector(updateTransferGroupSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('transferGroupPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(transferGroup),
    onSubmit: values => {
      const body = manipulateValuesAfterSubmit(values);
      dispatch(Creators.updateTransferGroupRequest({
        id: _.get(transferGroup, '_id'),
        body,
      }));
      setIsFormEditable(false);
    },
  });
  const { values, handleSubmit, setFieldValue, errors } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      setIsFormEditable(false);
    }
  }, [isUpdatePending]);

  const handleCancelClick = () => {
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" form="transfer-group" type="primary" htmlType="submit" loading={isUpdatePending}>
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('TRANSFER_GROUP')}>
      <Form form={form} id="transfer-group" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <Form.Item
              help={_.get(errors, 'name.tr')}
              validateStatus={_.get(errors, 'name.tr') ? 'error' : 'success'}
              name={['name', 'tr']}>
              <Input
                value={_.get(values, 'name.tr', '')}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('name.tr', value);
                }}
                addonAfter="TR"
                disabled={isUpdatePending || !isFormEditable} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={_.get(errors, 'name.en')}
              validateStatus={_.get(errors, 'name.en') ? 'error' : 'success'}
              name={['name', 'en']}>
              <Input
                value={_.get(values, 'name.en', '')}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('name.en', value);
                }}
                addonAfter="EN"
                disabled={isUpdatePending || !isFormEditable} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default TransferGroupDetailForm;
