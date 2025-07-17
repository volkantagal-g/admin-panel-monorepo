import { useDispatch } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form } from './components';

const { Title } = Typography;
const reduxKey = REDUX_KEY.DTS_SETTING.FEEDBACK_SOURCE.NEW;

const DtsFeedbackSettingNew = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.DTS_FEEDBACK_SOURCE_SETTING_NEW.name, squad: ROUTE.DTS_FEEDBACK_SOURCE_SETTING_NEW.squad });

  const { t } = useTranslation();

  const pageTitle = t('PAGE_TITLE.DTS.SETTING.FEEDBACK_SOURCE.NEW');

  const createDtsFeedbackSetting = values => {
    dispatch(Creators.createDtsFeedbackSettingRequest(values));
  };

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Form createDtsFeedbackSetting={createDtsFeedbackSetting} />
    </>

  );
};

export default DtsFeedbackSettingNew;
