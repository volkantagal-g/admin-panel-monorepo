import { createActions } from 'reduxsauce';

import prefix from './key';

const form = { formType: undefined, formName: undefined };
const formEdit = { data: undefined, id: undefined };

export const { Types, Creators } = createActions(
  {
    getContractFormRequest: form,
    getContractFormSuccess: { data: {} },
    getContractFormFailure: { error: null },

    getContractRequest: { id: undefined },
    getContractSuccess: { data: {} },
    getContractFailure: { error: null },

    saveContractRequest: { data: undefined, ...form },
    saveContractSuccess: { data: {} },
    saveContractFailure: { error: null },

    updateContractRequest: { ...formEdit },
    updateContractSuccess: { data: {} },
    updateContractFailure: { error: null },

    updateContractSchdConfigRequest: { ...formEdit },
    updateContractSchdConfigSuccess: { data: {} },
    updateContractSchdConfigFailure: { error: null },

    updateContractBreakRequest: { ...formEdit },
    updateContractBreakSuccess: { data: {} },
    updateContractBreakFailure: { error: null },

    updateContractCompRequest: { ...formEdit },
    updateContractCompSuccess: { data: {} },
    updateContractCompFailure: { error: null },

    updateContractLeaveRequest: { ...formEdit },
    updateContractLeaveSuccess: { data: {} },
    updateContractLeaveFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
