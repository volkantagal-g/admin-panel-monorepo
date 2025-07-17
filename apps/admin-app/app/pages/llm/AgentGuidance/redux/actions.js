import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.LLM.AGENT_GUIDANCE_GENERATION}_`;

export const { Types, Creators } = createActions(
  {
    getAgentGuidanceContentRequest: { filters: null },
    getAgentGuidanceContentSuccess: { data: null },
    getAgentGuidanceContentFailure: { error: null },
    updateAgentGuidanceContentRequest: { data: null, onSuccess: null },
    updateAgentGuidanceContentSuccess: {},
    updateAgentGuidanceContentFailure: { error: null },
    setFilters: {
      filters: {
        type: null,
        feature: null,
        domain: null,
        contact: null,
        channel: null,
        level: null,
        mr: null,
        sr: null,
        segment: null,
      },
    },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
