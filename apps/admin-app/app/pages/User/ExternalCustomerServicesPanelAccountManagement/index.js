import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import BulkInactivate from './components/BulkInactivate';
import TeleperformanceUserCreation from './components/TeleperformanceUserCreation';
import ConcentrixUserCreationTurkey from './components/ConcentrixUserCreationTurkey';
import AssisttUserCreation from './components/AssisttUserCreation';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.USER.EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT;

const ExternalCustomerServicesPanelAccountManagementPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();

  usePageViewAnalytics({
    name: ROUTE.EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT.name,
    squad: ROUTE.EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.USER.EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT')} />
      <Row>
        <Col xs={24} md={12}>
          <TeleperformanceUserCreation />
          <ConcentrixUserCreationTurkey />
          <AssisttUserCreation />
        </Col>
        <Col xs={24} md={12}>
          <BulkInactivate />
        </Col>
      </Row>
    </>
  );
};

export default ExternalCustomerServicesPanelAccountManagementPage;
