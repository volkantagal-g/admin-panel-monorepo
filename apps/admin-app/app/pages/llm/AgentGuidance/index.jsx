import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { KnowledgeDashboard, Filter } from './components';

const reduxKey = REDUX_KEY.LLM.AGENT_GUIDANCE_GENERATION;

const AgentGuidanceDashboard = () => {
  const { t } = useTranslation('agentGuidancePage');
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.LLM_AGENT_GUIDANCE_GENERATION.name,
    squad: ROUTE.LLM_AGENT_GUIDANCE_GENERATION.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <div className="p-2">
      <PageTitleHeader title={t('TITLE')} />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Filter />
        </Col>
        <Col span={24}>
          <KnowledgeDashboard />
        </Col>
      </Row>
    </div>
  );
};

export default AgentGuidanceDashboard;
