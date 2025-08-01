/* eslint-disable no-use-before-define */
import { memo, useEffect } from 'react';
import { Form, Row, Col, Space as AntSpace, List } from 'antd';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { validate } from '@shared/yup';
import { getInitialValues, validationSchema } from './formHelper';
import { Creators } from '../../redux/actions';
import { formatDate } from '@shared/utils/dateHelper';
import { orderNotesSelector, orderDetailSelector } from '../../redux/selectors';
import { getUser } from '@shared/redux/selectors/auth';
import { TextArea, Button, Card } from '@shared/components/GUI';

const OrderNote = () => {
  const { t } = useTranslation('marketOrderPage');
  const dispatch = useDispatch();
  const theme = useTheme();
  const notes = useSelector(orderNotesSelector.getData);
  const isPending = useSelector(orderNotesSelector.getIsPending);
  const { domainType } = useSelector(orderDetailSelector.getData);
  const user = getUser();
  const { orderId } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      dispatch(
        Creators.createOrderNoteRequest({
          from: {
            _id: user._id,
            name: user.name,
          },
          to: orderId,
          toType: 'MarketOrder',
          domainType,
          message: values.message,
        }),
      );
      resetForm();
    },
  });

  const { handleSubmit, values, errors, setFieldValue, resetForm } = formik;

  useEffect(() => {
    dispatch(Creators.getOrderNotesRequest({ orderId, toType: 'MarketOrder' }));
  }, [dispatch, orderId]);

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      <Col>
        <Form.Item className="mb-0 mt-0">
          <Button
            size="small"
            color="primary"
            form="note-info-form"
            type="primary"
            htmlType="submit"
          >
            {t('ORDER_NOTES.POST')}
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );

  return (
    <Card
      data-testid="order-note"
      footer={cardFooter}
      bordered={false}
      size="small"
      title={t('ORDER_NOTES.TITLE')}
    >
      {notes?.length > 0 &&
          notes?.map(note => {
            return (
              <List.Item.Meta
                key={note?._id}
                className="mb-2"
                title={(
                  <span>
                    <strong>{note?.from?.name}</strong> at{' '}
                    <span>{formatDate(note?.createdAt)}</span>
                  </span>
                )}
                description={note?.message}
              />
            );
          })}
      <TextArea
        value={values.message}
        name="message"
        hasForm
        errors={errors}
        onChange={event => {
          setFieldValue('message', event.target.value);
        }}
        placeholder={t('ORDER_NOTES.PLACEHOLDER')}
        autoComplete="off"
      />
      <AntSpace className="w-100" direction="vertical" align="end">
        <Button
          size="extra-small"
          form="note-info-form"
          type="primary"
          onClick={handleSubmit}
          disabled={!values.message || isPending}
        >
          {t('ORDER_NOTES.POST')}
        </Button>
      </AntSpace>
    </Card>
  );
};

export default memo(OrderNote);
