import { useDispatch } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { Form } from './components';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage } from '@shared/hooks';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';

const { Title } = Typography;
const reduxKey = REDUX_KEY.KDS.QUESTION.NEW;

const NewKdsQuestionPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const pageTitle = t('PAGE_TITLE.KDS.QUESTION.NEW');

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Form />
    </>
  );
};
export default NewKdsQuestionPage;
