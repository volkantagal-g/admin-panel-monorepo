import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Form, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  ContentInformationForm,
  GeneralInformationForm,
  SendingInformationForm,
  AppLocationSettingForm,
  OptionalControlForm,
} from '@app/pages/Banner/New/components';
import useStyles from '@app/pages/Banner/New/styles';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { COMPONENT_TYPE } from '../constants';
import { getInitialValues, normalizeFormValues } from '@shared/utils/marketing/formUtils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

const BannerNew = () => {
  usePageViewAnalytics({
    name: ROUTE.BANNER_NEW.name,
    squad: ROUTE.BANNER_NEW.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const { canAccess } = usePermission();
  const [form] = Form.useForm();
  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const onFinish = values => {
    if (values?.componentType === COMPONENT_TYPE.GAME_COMPONENT) {
      dispatch(Creators.saveGameBannerFlow({ values }));
    }
    else {
      dispatch(Creators.bannerSaveRequest({ body: normalizeFormValues(values, PAGE_TYPES.BANNER_NEW) }));
    }
  };

  return (
    canAccess(permKey.PAGE_BANNER_NEW) ? (
      <>
        <PageHeader
          ghost={false}
          className="site-page-header"
          title={t('CREATE_BANNER')}
        />
        <Form
          scrollToFirstError
          form={form}
          initialValues={getInitialValues(PAGE_TYPES.BANNER_NEW)}
          layout="horizontal"
          preserve={false}
          name="createBannerForm"
          labelCol={{ flex: '150px' }}
          labelAlign="left"
          onFinish={onFinish}
          className={classes.antDefaultForm}
        >
          <Row justify="center" className="mt-4">
            <Col xxl={16} xl={20} lg={20} xs={24}>
              <GeneralInformationForm form={form} />
              <AppLocationSettingForm form={form} />
              <ContentInformationForm form={form} />
              <OptionalControlForm form={form} />
              <SendingInformationForm form={form} footer={<FormFooter />} />
            </Col>
          </Row>
        </Form>
      </>
    ) : null
  );
};

const FormFooter = () => {
  const { t } = useTranslation('marketing');
  return (
    <Row className="w-100">
      <Col lg={24}>
        <Button htmlType="Submit" className="float-right">{t('SAVE')}</Button>
      </Col>
    </Row>
  );
};

const reduxKey = REDUX_KEY.BANNER.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BannerNew);
