import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { validate } from '@shared/yup';
import {
  getInitialValues,
  manipulateValuesAfterSubmit,
  validationSchema,
} from '@app/pages/GetirFood/OrderDetail/components/orderNote/formHelper';
import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import { getOrderNoteSelector, createOrderNoteSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { GETIR_FOOD_DOMAIN_TYPE, FOOD_NOTE_TYPE } from '@shared/shared/constants';
import { getUser } from '@shared/redux/selectors/auth';
import { formatDate } from '@shared/utils/dateHelper';
import useStyles from '@app/pages/GetirFood/OrderDetail/components/orderNote/styles';
import { usePrevious } from '@shared/hooks';
import ErrorBoundary from '@shared/shared/ErrorBoundary';

const OrderNote = ({ orderId }) => {
  const classes = useStyles();
  const user = getUser();
  const dispatch = useDispatch();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('foodOrderPage');
  const theme = useTheme();
  const [form] = Form.useForm();
  const orderNotes = useSelector(getOrderNoteSelector.getData);
  const isOrderNotesPending = useSelector(createOrderNoteSelector.getIsPending);
  const prevIsUpdatePending = usePrevious(isOrderNotesPending);
  const filter = {
    domainType: GETIR_FOOD_DOMAIN_TYPE,
    toType: FOOD_NOTE_TYPE,
    to: orderId,
  };

  const { handleSubmit, values, errors, setFieldValue, resetForm } = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: async submitValues => {
      const data = manipulateValuesAfterSubmit(submitValues, user, filter);
      await dispatch(Creators.createOrderNoteRequest({ data }));
      setFieldValue('message', '');
      form.resetFields();
      resetForm();
      setIsFormEditable(false);
    },
  });

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    const data = { to: filter.to, toType: filter.toType };
    dispatch(Creators.getOrderNoteRequest({ data }));
  }, [dispatch, filter.to, filter.toType]);

  useEffect(() => {
    if (prevIsUpdatePending && !isOrderNotesPending) {
      setIsFormEditable(false);
    }
  }, [isOrderNotesPending, prevIsUpdatePending]);

  const handleCancelClick = () => {
    form.resetFields();
    resetForm();
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
            <Form.Item className={classes.verticalMarginNone}>
              <Button data-testid="food-order-detail-order-note-cancel-btn" size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className={classes.verticalMarginNone}>
              <Button
                data-testid="food-order-detail-order-note-save-btn"
                size="small"
                form="message-info-form"
                type="primary"
                htmlType="submit"
                loading={isOrderNotesPending}
                disabled={!get(values, 'message').trim()}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className={classes.verticalMarginNone}>
            <Button data-testid="food-order-detail-order-note-edit-btn" size="small" onClick={handleEditClick}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <ErrorBoundary>
      <AntCard footer={cardFooter} bordered={false} title={t('ORDER_NOTES')}>
        <Col span={24}>
          {orderNotes?.map(note => {
            return (
              <div className={classes.noteContainer} key={get(note, '_id')}>
                <div className={classes.noteCol}>
                  <strong>{get(note, ['from', 'name'])}</strong>
                  <span>{` at ${formatDate(get(note, 'createdAt'))}`}</span>
                </div>
                {get(note, 'updatedBy') && (
                  <span>
                    {` - last edit: ${formatDate(get(note, ['updatedBy', 'updatedAt']))}`}
                    {` by ${get(note, ['updatedBy', 'name'])}`}
                  </span>
                )}
                <div className={classes.noteCol}>
                  <span>{get(note, 'message', '')}</span>
                </div>
              </div>
            );
          })}
        </Col>
        <Form
          form={form}
          id="message-info-form"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Row gutter={[theme.spacing(3)]} align="bottom">
            <Col span={24}>
              <Form.Item
                help={isFormEditable && get(errors, 'message')}
                validateStatus={get(errors, 'message') && isFormEditable ? 'error' : 'success'}
                name={['message']}
              >
                <AntTextArea
                  value={values.message}
                  onChange={event => {
                    const value = get(event, 'target.value', '');
                    setFieldValue('message', value);
                  }}
                  disabled={!isFormEditable}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </AntCard>
    </ErrorBoundary>
  );
};

export default OrderNote;
