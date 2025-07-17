/* eslint-disable no-use-before-define */
import { Button, Col, Divider, Form, Row } from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import AntCard from '@shared/components/UI/AntCard';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { formatDate } from '@shared/utils/dateHelper';
import { validate } from '@shared/yup';
import { getInitialValues, validationSchema } from './formHelper';
import useStyles from './styles';
// import { orderNotesSelector, orderDetailSelector } from '../../redux/selectors';
import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators } from '../../redux/actions';
import { ORDER_NOTE } from './constants';

const OrderNote = () => {
  const { t } = useTranslation('financeOrderDetailPage');
  const dispatch = useDispatch();
  const theme = useTheme();
  const [form] = Form.useForm();
  const classes = useStyles();
  const user = getUser();
  const { orderId } = useParams();
  const isNotePending = useSelector(financeOrderDetailSelector.getIsNotePending);
  const notes = useSelector(financeOrderDetailSelector.getNotes) ?? {};

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      dispatch(Creators.createFinanceOrderNoteRequest({ orderNote: values.orderNote, agentId: user._id, agentName: user.name, orderId }));
      resetForm();
      form.setFieldsValue({ [ORDER_NOTE]: '' });
    },
  });

  const { handleSubmit, values, errors, setFieldValue, resetForm } = formik;

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      <Col>
        <Form.Item className="mb-0 mt-0">
          <Button size="small" form="message-info-form" type="primary" htmlType="submit" loading={isNotePending}>
            {t('ORDER_NOTES.POST')}
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );

  return (
    <AntCard data-testid="order-note" footer={cardFooter} bordered={false} title={t('ORDER_NOTES.TITLE')}>
      <Col span={24}>
        {notes?.length > 0 &&
            notes?.map(note => {
              return (
                <div key={note.dateTime}>
                  <div className={classes.noteContainer}>
                    <div className={classes.noteCol}>
                      <strong>{note?.agentName}</strong> - <span>{formatDate(note?.dateTime)}</span>
                    </div>
                    <div className={classes.noteCol}>
                      <span>{note?.note}</span>
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
            <Form.Item help={get(errors, ORDER_NOTE)} validateStatus={get(errors, ORDER_NOTE) ? 'error' : 'success'} name={[ORDER_NOTE]}>
              <AntTextArea
                value={values[ORDER_NOTE]}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue(ORDER_NOTE, value);
                }}
                placeholder={t('ORDER_NOTES.PLACEHOLDER')}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export { OrderNote };
