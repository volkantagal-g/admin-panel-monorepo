import { REDUX_KEY } from '@shared/shared/constants';
import { typesMap } from '../../constants';
import { getLangKey } from '@shared/i18n';

const reduxKey = REDUX_KEY.LLM.AGENT_GUIDANCE_GENERATION;

export const agentGuidanceContentSelector = {
  getIsPending: state => state[reduxKey].getAgentGuidanceContent.isPending,
  getIsUpdatePending: state => state[reduxKey].updateAgentGuidanceContent.isPending,
  getData: state => state[reduxKey].getAgentGuidanceContent.data,
  getFilters: state => state[reduxKey].filters,
  getSelectedType: state => {
    const { filters } = state[reduxKey];
    return typesMap?.[filters?.type || 'knowledge']?.[getLangKey()];
  },
  isAgentAssistance: state => state[reduxKey].filters?.feature === 'assistance',
};
