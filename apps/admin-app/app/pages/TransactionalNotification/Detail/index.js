import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, PageHeader, Row, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/TransactionalNotification/Detail/styles';
import { Creators } from '@app/pages/TransactionalNotification/Detail/redux/actions';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/TransactionalNotification/Detail/formHelpers';
import { ContentInformationForm, GeneralInformationForm } from '@app/pages/TransactionalNotification/Detail/components';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { transactionalNotificationDetailSelector } from '@app/pages/TransactionalNotification/Detail/redux/selectors';
import { getLangKey } from '@shared/i18n';

const TransactionalNotificationDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.TRANSACTIONAL_NOTIFICATION_DETAIL.name,
    squad: ROUTE.TRANSACTIONAL_NOTIFICATION_DETAIL.squad,
  });

  const [form] = Form.useForm();
  const { id: transactionalNotificationId } = useParams();
  const { t } = useTranslation('transactionalNotificationPage');

  const dispatch = useDispatch();
  const classes = useStyles();
  const backTop = document.querySelector('.ant-back-top');

  if (backTop) {
    backTop.style.right = '55px';
  }
  const [isFormEditable, setIsFormEditable] = useState(false);

  const transactionalNotificationDetail = useSelector(transactionalNotificationDetailSelector.getData);
  const isTransactionalNotificationDetailPending = useSelector(transactionalNotificationDetailSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getTransactionalNotificationRequest({ transactionalNotificationId, clientLanguage: getLangKey() }));
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, transactionalNotificationId]);

  useEffect(() => {
    form.setFieldsValue(getInitialValues(transactionalNotificationDetail));
  }, [transactionalNotificationDetail, isFormEditable, form]);

  return (
    <>
      <PageHeader
        ghost={false}
        title={t('TRANSACTIONAL_NOTIFICATION_DETAIL')}
        subTitle={transactionalNotificationId}
      />
      <Row justify="center" className="mt-4">
        <Col lg={20}>
          <Skeleton loading={isTransactionalNotificationDetailPending} active className="p-5 bg-white">
            <Form
              scrollToFirstError
              form={form}
              initialValues={getInitialValues(transactionalNotificationDetail)}
              layout="horizontal"
              name="createTransactionalNotificationForm"
              labelCol={{ flex: '150px' }}
              labelAlign="left"
              onFinish={values => {
                dispatch(Creators.updateTransactionalNotificationRequest({
                  id: transactionalNotificationId,
                  body: manipulateValuesBeforeSubmit(values),
                  clientLanguage: getLangKey(),
                }));
                setIsFormEditable(false);
              }}
              className={classes.antDefaultForm}
            >
              <GeneralInformationForm
                isFormEditable={isFormEditable}
                form={form}
              />
              <ContentInformationForm
                form={form}
                isFormEditable={isFormEditable}
                formFooter={(
                  <FormFooter {...{ isFormEditable, setIsFormEditable, dispatch, t, transactionalNotificationDetail, transactionalNotificationId }
                  }
                  />
                )}
              />
            </Form>
          </Skeleton>
        </Col>
      </Row>
    </>
  );
};
const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, transactionalNotificationId }) => {
  return (
    <Row justify="end" gutter={24}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mt-0">
              <Button
                size="small"
                onClick={() => {
                  setIsFormEditable(false);
                  dispatch(Creators.getTransactionalNotificationRequest({ transactionalNotificationId }));
                }}
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mt-0">
              <Button size="small" htmlType="submit" data-test="save-btn">
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mt-0">
            <Button
              size="small"
              onClick={() => {
                setIsFormEditable(true);
              }}
            >
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

const reduxKey = REDUX_KEY.TRANSACTIONAL_NOTIFICATION.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(TransactionalNotificationDetail);
