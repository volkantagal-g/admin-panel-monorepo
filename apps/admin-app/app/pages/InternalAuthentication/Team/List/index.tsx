import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { compose } from 'redux';

import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import permKey from '@shared/shared/permKey.json';

import { NewTeamModal, TeamList } from './components';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const InternalAuthenticationTeamListPage = () => {
  const { t } = useTranslation(['internalAuthentication', 'global']);
  const dispatch = useDispatch();
  const { Can } = usePermission();
  usePageViewAnalytics({ name: ROUTE.INTERNAL_AUTHENTICATION_TEAM_LIST.name, squad: ROUTE.INTERNAL_AUTHENTICATION_TEAM_LIST.squad });
  useInitAndDestroyPage({ dispatch, Creators });

  const [addTeamModalVisible, setAddTeamModalVisible] = useState(false);

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE.INTERNAL_AUTHENTICATION.TEAM_LIST')} />
      <Row>
        <Col flex={1}>
          <PageHeader title={t('PAGE_TITLE.INTERNAL_AUTHENTICATION.TEAM_LIST')} />
        </Col>
        <Col>
          <Can permKey={permKey.PAGE_INTERNAL_AUTHENTICATION_SERVICE_LIST}>
            <Link to={ROUTE.INTERNAL_AUTHENTICATION_SERVICE_LIST.path}>
              <Button>{t('REPOSITORY_LIST')}</Button>
            </Link>
          </Can>
        </Col>
        <Col>
          <Button
            className="ml-2"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddTeamModalVisible(true)}
          >{t('NEW_TEAM')}
          </Button>
        </Col>
      </Row>
      {addTeamModalVisible && <NewTeamModal setVisible={setAddTeamModalVisible} />}
      <TeamList />
    </>
  );
};

const reduxKey = REDUX_KEY.INTERNAL_AUTHENTICATION.TEAM.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });
export default compose(withReducer, withSaga)(InternalAuthenticationTeamListPage);
