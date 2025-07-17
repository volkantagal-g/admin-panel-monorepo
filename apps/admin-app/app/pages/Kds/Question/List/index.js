import { useDispatch } from 'react-redux';
import { PageHeader, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import { Table } from './components';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';

const reduxKey = REDUX_KEY.KDS.QUESTION.LIST;

const KdsQuestionListingPage = () => {
  const dispatch = useDispatch();
  const { Can } = usePermission();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation('kdsQuestionPage');

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('PAGE_TITLE.KDS.QUESTION.LIST')}
          />
        </Col>
        <Can permKey={permKey.PAGE_KDS_QUESTION_NEW}>
          <Col>
            <Link to={ROUTE.KDS_QUESTION_NEW.path}>
              <Button type="primary" icon={<PlusOutlined />}>
                {t('LIST.NEW_KDS_QUESTION')}
              </Button>
            </Link>
          </Col>
        </Can>
      </Row>
      <Row>
        <Col span={24}>
          <Table />
        </Col>
      </Row>
    </>
  );
};

export default KdsQuestionListingPage;
