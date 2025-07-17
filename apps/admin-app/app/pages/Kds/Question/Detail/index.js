import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { Form } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage } from '@shared/hooks';

const { Title } = Typography;
const reduxKey = REDUX_KEY.KDS.QUESTION.DETAIL;

const KdsQuestionUpdatePage = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { id } = useParams();
  const { t } = useTranslation();
  const pageTitle = t('PAGE_TITLE.KDS.QUESTION.DETAIL');

  useEffect(() => {
    dispatch(Creators.getKdsQuestionDetailRequest({ id }));
  }, []);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Form id={id} />
    </>
  );
};

export default KdsQuestionUpdatePage;
