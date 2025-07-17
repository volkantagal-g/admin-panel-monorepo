import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { validate } from '@shared/yup';
import {
  getInitialValues,
  manipulateValuesAfterSubmit,
  validationSchema,
} from './formHelper';
import { Creators } from '../../redux/actions';
import { getOrderNoteSelector, createOrderNoteSelector } from '../../redux/selectors';
import { GETIR_LOCALS_DOMAIN_TYPE, NOTE_TYPES } from '@shared/shared/constants';
import { getUser } from '@shared/redux/selectors/auth';
import { formatDate } from '@shared/utils/dateHelper';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/orderNote/styles';
import { usePrevious } from '@shared/hooks';
import ErrorBoundary from '@shared/shared/ErrorBoundary';

const OrderNote = ({ orderId }) => {
  const classes = useStyles();
  const user = getUser();
  const dispatch = useDispatch();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('artisanOrderPage');
  const theme = useTheme();
  const [form] = Form.useForm();
  const orderNotes = useSelector(getOrderNoteSelector.getData) || [];
  const isOrderNotesPending = useSelector(createOrderNoteSelector.getIsPending);
  const prevIsUpdatePending = usePrevious(isOrderNotesPending);
  const filter = {
    domainType: GETIR_LOCALS_DOMAIN_TYPE,
    toType: NOTE_TYPES.ARTISAN_ORDER,
    to: orderId,
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: async values => {
      const data = manipulateValuesAfterSubmit(values, user, filter);
      await dispatch(Creators.createOrderNoteRequest({ data }));
      setFieldValue('message', '');
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values]);

  useEffect(() => {
    const data = { to: filter.to, toType: filter.toType };
    dispatch(Creators.getOrderNoteRequest({ data }));
  }, []);

  useEffect(() => {
    if (prevIsUpdatePending && !isOrderNotesPending) {
      setIsFormEditable(false);
    }
  }, [isOrderNotesPending]);

  const handleCancelClick = () => {
    form.resetFields();
    formik.resetForm();
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
              <Button
                size="small"
                form="message-info-form"
                type="primary" htmlType="submit"
                loading={isOrderNotesPending}
                disabled={!values?.message?.trim()}
              >
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
    <ErrorBoundary>
      <AntCard footer={cardFooter} bordered={false} title={t('ORDER_NOTES')}>
        <Col span={24}>
          {orderNotes?.map(note => {
            return (
              <div className={classes.noteContainer} key={note._id}>
                <div className={classes.noteCol}>
                  <strong>{note.from?.name}</strong>
                  <span>&nbsp;at {formatDate(note.createdAt)}</span>
                </div>
                {note.updatedBy && (
                  <span>
                    &nbsp;- last edit: {formatDate(note.updatedBy?.updatedAt)}
                    &nbsp;by {note.updatedBy?.name}
                  </span>
                )}
                <div className={classes.noteCol}>
                  <span>{note?.message}</span>
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
                help={isFormEditable &&_.get(errors, 'message')}
                validateStatus={_.get(errors, 'message') && isFormEditable ? 'error' : 'success'}
                name={['message']}
              >
                <AntTextArea
                  value={values.message}
                  onChange={event => {
                    const value = _.get(event, 'target.value', '');
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
