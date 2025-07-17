import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, PageHeader, Row, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/TransactionalSms/Detail/redux/actions';

import { ContentInformationForm, GeneralInformationForm } from '@app/pages/TransactionalSms/Detail/components';

import { transactionalSmsDetailSelector } from '@app/pages/TransactionalSms/Detail/redux/selectors';

import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/TransactionalSms/Detail/styles';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/TransactionalSms/Detail/formHelpers';

import { Creators as CommonCreators } from '@shared/redux/actions/common';

import { getLangKey } from '@shared/i18n';

const TransactionalSmsDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.TRANSACTIONAL_SMS_DETAIL.name,
    squad: ROUTE.TRANSACTIONAL_SMS_DETAIL.squad,
  });

  const [form] = Form.useForm();
  const { id: transactionalSmsId } = useParams();
  const { t } = useTranslation('transactionalSmsPage');

  const dispatch = useDispatch();
  const classes = useStyles();
  const backTop = document.querySelector('.ant-back-top');

  if (backTop) {
    backTop.style.right = '55px';
  }
  const [isFormEditable, setIsFormEditable] = useState(false);

  const transactionalSmsDetail = useSelector(transactionalSmsDetailSelector.getData);
  const isTransactionalSmsDetailPending = useSelector(transactionalSmsDetailSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getTransactionalSmsRequest({ transactionalSmsId, clientLanguage: getLangKey() }));
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, transactionalSmsId]);

  useEffect(() => {
    form.setFieldsValue(getInitialValues(transactionalSmsDetail));
  }, [transactionalSmsDetail, isFormEditable, form]);

  return (
    <>
      <PageHeader
        ghost={false}
        title={t('TRANSACTIONAL_SMS_DETAIL')}
        subTitle={transactionalSmsId}
      />
      <Row justify="center" className="mt-4">
        <Col lg={20}>
          <Skeleton loading={isTransactionalSmsDetailPending} active className="p-5 bg-white">
            <Form
              scrollToFirstError
              form={form}
              initialValues={getInitialValues(transactionalSmsDetail)}
              layout="horizontal"
              name="createTransactionalSmsForm"
              labelCol={{ flex: '150px' }}
              labelAlign="left"
              onFinish={values => {
                dispatch(Creators.updateTransactionalSmsRequest({
                  id: transactionalSmsId,
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
                  <FormFooter {...{ isFormEditable, setIsFormEditable, dispatch, t, transactionalSmsDetail, transactionalSmsId }
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

const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, transactionalSmsId }) => {
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
                  dispatch(Creators.getTransactionalSmsRequest({ transactionalSmsId }));
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

const reduxKey = REDUX_KEY.TRANSACTIONAL_SMS.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(TransactionalSmsDetail);
