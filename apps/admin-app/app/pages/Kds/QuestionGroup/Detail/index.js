import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Form } from './components';

const { Title } = Typography;
const reduxKey = REDUX_KEY.KDS.QUESTION_GROUP.DETAIL;

const Detail = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { id } = useParams();
  const { t } = useTranslation();
  const pageTitle = t('PAGE_TITLE.KDS.QUESTION_GROUP.DETAIL');

  useEffect(() => {
    dispatch(Creators.getKdsQuestionGroupDetailRequest({ id }));
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

export default Detail;
