import { useDispatch } from 'react-redux';
import { Col, Row, Typography } from 'antd';
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

const reduxKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE.NEW;
const { Title } = Typography;

const NewMarketFranchiseUserRole = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_FRANCHISE_USER_ROLE_NEW.name, squad: ROUTE.MARKET_FRANCHISE_USER_ROLE_NEW.squad });

  const { t } = useTranslation();
  const pageTitle = t('PAGE_TITLE.MARKET_FRANCHISE_USER_ROLE.NEW');

  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Row gutter={[8,8]}>
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
          <Form />
        </Col>
      </Row>
    </>
  );
};

export default NewMarketFranchiseUserRole;
