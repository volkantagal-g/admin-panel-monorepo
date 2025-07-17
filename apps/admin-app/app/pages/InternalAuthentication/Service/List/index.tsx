import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Row, Col } from 'antd';
import { compose } from 'redux';

import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import ServiceList from './components/ServiceList';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { useInitAndDestroyPage } from '@shared/hooks';

const InternalAuthenticationServiceListPage = () => {
  const { t } = useTranslation(['internalAuthentication', 'global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.INTERNAL_AUTHENTICATION_SERVICE_LIST.name, squad: ROUTE.INTERNAL_AUTHENTICATION_SERVICE_LIST.squad });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE.INTERNAL_AUTHENTICATION.REPOSITORY_LIST')} />
      <Row>
        <Col flex={1}>
          <PageHeader title={t('PAGE_TITLE.INTERNAL_AUTHENTICATION.REPOSITORY_LIST')} />
        </Col>
      </Row>
      <ServiceList />
    </>
  );
};

const reduxKey = REDUX_KEY.INTERNAL_AUTHENTICATION.SERVICE.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });
export default compose(withReducer, withSaga)(InternalAuthenticationServiceListPage);
