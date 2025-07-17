import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import {
  Header,
  DetailForm,
  ExpirationStatusForm,
  IndefiniteExpirationForm,
} from './components';

const reduxKey = REDUX_KEY.SEGMENT.DETAIL;

const SegmentDetailPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.SEGMENT_DETAIL.name, squad: ROUTE.SEGMENT_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { segment } = useParams();
  useEffect(() => {
    dispatch(Creators.getSegmentRequest({ segment }));
  }, [dispatch, segment]);

  return (
    <>
      <Header />
      <DetailForm />
      <Row>
        <Col xs={24} sm={12}>
          <ExpirationStatusForm />
        </Col>
        <Col xs={24} sm={12}>
          <IndefiniteExpirationForm />
        </Col>
      </Row>
    </>
  );
};

export default SegmentDetailPage;
