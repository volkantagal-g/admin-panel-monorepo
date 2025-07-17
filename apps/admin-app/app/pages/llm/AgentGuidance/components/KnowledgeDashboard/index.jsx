import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Tabs, Card } from '@shared/components/GUI';
import { agentGuidanceContentSelector } from '../../redux/selectors';
import { agentTypes } from '@app/pages/llm/constants';
import KnowledgeContent from './Content';
import { Creators } from '../../redux/actions';

const KnowledgeDashboard = () => {
  const { t } = useTranslation('agentGuidancePage');
  const dispatch = useDispatch();
  const filters = useSelector(agentGuidanceContentSelector.getFilters);
  const knowledgeTypeTabs = agentTypes.map(type => ({
    key: type.value,
    label: type.label,
    children: <KnowledgeContent />,
  }));

  const handleChangeTab = type => {
    const selectedFilters = { ...filters, type };
    dispatch(Creators.setFilters({ filters: selectedFilters }));
    if (Object.values(filters)?.every(Boolean)) {
      dispatch(
        Creators.getAgentGuidanceContentRequest({ filters: selectedFilters }),
      );
    }
  };

  return (
    <Card title={t('KNOWLEDGE.TITLE')}>
      <Tabs items={knowledgeTypeTabs} activeKey={filters.type} onChange={handleChangeTab} />
    </Card>
  );
};

export default KnowledgeDashboard;
