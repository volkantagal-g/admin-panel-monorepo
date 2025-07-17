import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { reducerKey as reduxKey } from './redux/key';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import FormWrapper from './components/Form';
import FilterWrapper from './components/Filter';

const { Title } = Typography;

const FieldAnnouncementCreate = () => {
  usePageViewAnalytics({ name: ROUTE.FIELD_ANNOUNCEMENT_CREATE.name, squad: ROUTE.FIELD_ANNOUNCEMENT_CREATE.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('fieldAnnouncementPage');

  const [announcementType, setAnnouncementType] = useState('');

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);
  return (
    <>
      <Row gutter={[8, 8]} justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{t('PAGE_TITLE.CREATE')}</Title>
        </Col>
      </Row>
      <FilterWrapper setAnnouncementType={setAnnouncementType} />
      <FormWrapper announcementType={announcementType} />
    </>
  );
};

const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });
export default compose(withReducer, withSaga)(FieldAnnouncementCreate);
