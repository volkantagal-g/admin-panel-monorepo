import { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Divider } from 'antd';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import AntCard from '@shared/components/UI/AntCard';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { validate } from '@shared/yup';
import { getInitialValues, validationSchema } from './formHelper';
import { orderDetailSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

import useStyles from './styles';
import { formatDate } from '@shared/utils/dateHelper';
import { getUser } from '@shared/redux/selectors/auth';

const OrderNote = () => {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('waterOrderPage');
  const dispatch = useDispatch();
  const theme = useTheme();
  const [form] = Form.useForm();
  const orderDetail = useSelector(orderDetailSelector.getData) || [];
  const classes = useStyles();
  const user = getUser();
  const { waterOrderId } = useParams();

  const orderNotes = _.get(orderDetail, 'adminNoteList', []);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: (values, formikBag) => {
      dispatch(
        Creators.orderNoteRequest({
          adminNote: {
            createdByUserId: user._id,
            createdDate: moment().toISOString(),
            text: values.message,
            createdByUserName: user.name,
          },
          orderId: waterOrderId,
        }),
      );
      formikBag.setFieldValue('message', '');
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const handleCancelClick = () => {
    setFieldValue('message', '');
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
              <Button size="small" form="message-info-form" type="primary" htmlType="submit">
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick}>
              {t('button:ADD')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('ORDER_NOTES.TITLE')}>
      <Col span={24}>
        {orderNotes.length > 0 &&
            orderNotes.map(note => {
              return (
                <div key={note._id}>
                  <div className={classes.noteContainer}>
                    <div className={classes.noteCol}>
                      <span>{note.createdByUserName}</span>
                    </div>
                    <div className={classes.noteCol}>
                      <span>{formatDate(note.createdDate)}</span>
                    </div>
                    <div className={classes.noteCol}>
                      <span>{note.text}</span>
                    </div>
                  </div>
                  <Divider plain />
                </div>
              );
            })}
      </Col>
      <Form form={form} id="message-info-form" onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={24}>
            <Form.Item help={_.get(errors, 'message')} validateStatus={_.get(errors, 'message') ? 'error' : 'success'} name={['message']}>
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
  );
};

export default OrderNote;
