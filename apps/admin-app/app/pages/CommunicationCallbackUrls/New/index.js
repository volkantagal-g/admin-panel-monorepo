import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Form, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { GeneralForm } from '@app/pages/CommunicationCallbackUrls/New/components';
import useStyles from '@app/pages/CommunicationCallbackUrls/New/styles';
import { manipulateValuesBeforeSubmit } from '@app/pages/CommunicationCallbackUrls/New/formHelpers';
import { communicationCallbackUrlsSaveSelector } from '@app/pages/CommunicationCallbackUrls/New/redux/selectors';
import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';

const CallbackUrlsNew = () => {
  usePageViewAnalytics({ name: ROUTE.COMMUNICATION_CALLBACK_URLS_NEW.name, squad: ROUTE.COMMUNICATION_CALLBACK_URLS_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('communicationCallbackUrlsPage');
  const { Can } = usePermission();
  const [form] = Form.useForm();
  const classes = useStyles();
  const backTop = document.querySelector('.ant-back-top');

  if (backTop) {
    backTop.style.right = '55px';
  }

  const [serviceType, setServiceType] = useState(null);
  const urlId = useSelector(communicationCallbackUrlsSaveSelector.getAccessToken)?.id;

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (urlId) history.push(getRelativeRouteWithSlug(ROUTE.COMMUNICATION_CALLBACK_URLS_DETAIL.path, { id: urlId, serviceType }));
  }, [serviceType, urlId]);

  return (
    <Can permKey={permKey.PAGE_COMMUNICATION_CALLBACK_URLS_NEW}>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title={t('CREATE_COMMUNICATION_CALLBACK_URLS')}
      />
      <Form
        scrollToFirstError
        form={form}
        layout="horizontal"
        preserve={false}
        name="communicationCallbackUrlsForm"
        labelCol={{ flex: '150px' }}
        labelAlign="left"
        onFinish={values => {
          dispatch(Creators.communicationCallbackUrlsSaveRequest({ body: manipulateValuesBeforeSubmit(values), serviceType }));
        }}
        className={classes.antDefaultForm}
      >
        <Row justify="center" className="mt-4">
          <Col xxl={16} xl={20} lg={20} xs={24}>
            <GeneralForm serviceType={serviceType} setServiceType={setServiceType} />
            { serviceType && (
              <Row>
                <Col xs={24} lg={24} className="text-right pb-3">
                  <Button htmlType="Submit" type="primary">
                    {t('button:SAVE')}
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Form>
    </Can>
  );
};

const reduxKey = REDUX_KEY.COMMUNICATION_CALLBACK_URLS.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CallbackUrlsNew);
