import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, PageHeader, Row, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GeneralForm } from '@app/pages/CommunicationCallbackUrls/Detail/components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/CommunicationCallbackUrls/Detail/styles';
import { Creators } from '@app/pages/CommunicationCallbackUrls/Detail/redux/actions';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/CommunicationCallbackUrls/Detail/formHelpers';

import { communicationCallbackUrlsUpdateSelector } from '@app/pages/CommunicationCallbackUrls/Detail/redux/selectors';
import { getDetailPageTitle } from '@app/pages/CommunicationCallbackUrls/utils';

const CallbackUrlsDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.COMMUNICATION_CALLBACK_URLS_DETAIL.name,
    squad: ROUTE.COMMUNICATION_CALLBACK_URLS_DETAIL.squad,
  });

  const [form] = Form.useForm();
  const { id: communicationCallbackUrlsId } = useParams();
  const serviceType = parseInt(useParams().serviceType, 10);
  const title = getDetailPageTitle(serviceType);
  const { t } = useTranslation('communicationCallbackUrlsPage');

  const dispatch = useDispatch();
  const classes = useStyles();
  const backTop = document.querySelector('.ant-back-top');

  if (backTop) {
    backTop.style.right = '55px';
  }
  const [isFormEditable, setIsFormEditable] = useState(false);
  const urlsDetail = useSelector(communicationCallbackUrlsUpdateSelector.getData);
  const urlsPending = useSelector(communicationCallbackUrlsUpdateSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.communicationCallbackUrlsGetRequest({ communicationCallbackUrlsId, serviceType }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, communicationCallbackUrlsId, serviceType]);

  useEffect(() => {
    form.setFieldsValue(getInitialValues(urlsDetail));
  }, [urlsDetail, isFormEditable, form, serviceType]);

  return (
    <>
      <PageHeader
        ghost={false}
        title={t(title)}
        subTitle={communicationCallbackUrlsId}
      />
      <Skeleton loading={urlsPending} active className="p-5 bg-white">
        <Form
          scrollToFirstError
          form={form}
          initialValues={getInitialValues(urlsDetail)}
          layout="horizontal"
          name="detailCredentialsForm"
          labelCol={{ flex: '150px' }}
          labelAlign="left"
          onFinish={values => {
            dispatch(Creators.communicationCallbackUrlsUpdateRequest({
              id: communicationCallbackUrlsId,
              body: manipulateValuesBeforeSubmit(values),
              serviceType,
            }));
            setIsFormEditable(false);
          }}
          className={classes.antDefaultForm}
        >
          <Row justify="center" className="mt-4">
            <Col xxl={16} xl={20} lg={20} xs={24}>
              <GeneralForm
                form={form}
                isFormEditable={isFormEditable}
                serviceType={serviceType}
                formFooter={(
                  <FormFooter
                    {...{ isFormEditable, setIsFormEditable, dispatch, t, urlsDetail, communicationCallbackUrlsId, serviceType }}
                  />
                )}
              />
            </Col>
          </Row>
        </Form>
      </Skeleton>
    </>
  );
};
const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, communicationCallbackUrlsId, serviceType }) => {
  return (
    <Row justify="end" gutter={24}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mt-3">
              <Button
                size="small"
                onClick={() => {
                  setIsFormEditable(false);
                  dispatch(Creators.communicationCallbackUrlsGetRequest({ communicationCallbackUrlsId, serviceType }));
                }}
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mt-3">
              <Button size="small" htmlType="submit" data-test="save-btn">
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mt-3">
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

const reduxKey = REDUX_KEY.COMMUNICATION_CALLBACK_URLS.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CallbackUrlsDetail);
