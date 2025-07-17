import * as allReducers from '@app/pages/TipPayback/PayoutSummaryList/redux/reducer';
import { Types } from '@app/pages/TipPayback/PayoutSummaryList/redux/actions';

const allReducerFunctions = Object.entries(allReducers).filter(
  ([, value]) => typeof value === 'function',
);

const { default: reducer, INITIAL_STATE } = allReducers;
describe('PayoutSummaryList page reducers', () => {
  it.each(allReducerFunctions)('%s should return object for default state', (reducerName, reducerFunc) => {
    expect(reducerFunc(undefined, {})).toBeInstanceOf(Object);
  });

  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });
});

describe('reducer GET_SUMMARIES_REQUEST', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.GET_SUMMARIES_REQUEST });
    const expectedState = {
      summaries: {
        isPending: true,
        data: [],
      },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer GET_SUMMARIES_SUCCESS', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.GET_SUMMARIES_SUCCESS, data: [{ content: [{ id: 1 }] }] });
    const expectedState = {
      summaries: {
        isPending: false,
        data: [{ content: [{ id: 1 }] }],
      },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer GET_SUMMARIES_FAILURE', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.GET_SUMMARIES_FAILURE, error: new Error('404 Not Found') });
    const expectedState = { summaries: { isPending: false, error: new Error('404 Not Found') } };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer CANCEL_PAYOUT_REQUEST', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.CANCEL_PAYOUT_REQUEST, id: 1 });
    const expectedState = {
      cancelPayout: { data: [] },
      pendingList: { cancel: { 1: true } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer CANCEL_PAYOUT_SUCCESS', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.CANCEL_PAYOUT_SUCCESS, id: 1, data: 'Success' });
    const expectedState = {
      cancelPayout: { data: 'Success' },
      pendingList: { cancel: { 1: false } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer CANCEL_PAYOUT_FAILURE', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.CANCEL_PAYOUT_FAILURE, id: 1 });
    const expectedState = {
      cancelPayout: {},
      pendingList: { cancel: { 1: false } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer CALCULATE_REQUEST', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.CALCULATE_REQUEST });
    const expectedState = { calculate: { data: [], isPending: true } };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer CALCULATE_SUCCESS', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.CALCULATE_SUCCESS, data: 'Success' });
    const expectedState = { calculate: { data: 'Success', isPending: false } };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer CALCULATE_FAILURE', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.CALCULATE_FAILURE, error: new Error('404 Not Found') });
    const expectedState = {
      calculate: {
        error: new Error('404 Not Found'),
        isPending: false,
      },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer PAYOUT_REQUEST', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.PAYOUT_REQUEST, id: 1 });
    const expectedState = {
      payout: { data: [] },
      pendingList: { payout: { 1: true } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer PAYOUT_SUCCESS', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.PAYOUT_SUCCESS, id: 1, data: 'Success' });
    const expectedState = {
      payout: { data: 'Success' },
      pendingList: { payout: { 1: false } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer PAYOUT_FAILURE', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.PAYOUT_FAILURE, id: 1 });
    const expectedState = {
      payout: {},
      pendingList: { payout: { 1: false } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer STATUS_UPDATE_REQUEST', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.STATUS_UPDATE_REQUEST, id: 1 });
    const expectedState = {
      statusUpdate: { data: [] },
      pendingList: { statusUpdate: { 1: true } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer STATUS_UPDATE_SUCCESS', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.STATUS_UPDATE_SUCCESS, id: 1, data: 'Success' });
    const expectedState = {
      statusUpdate: { data: 'Success' },
      pendingList: { statusUpdate: { 1: false } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer STATUS_UPDATE_FAILURE', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.STATUS_UPDATE_FAILURE, id: 1 });
    const expectedState = {
      statusUpdate: {},
      pendingList: { statusUpdate: { 1: false } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer TRIGGER_REPORT_REQUEST', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.TRIGGER_REPORT_REQUEST, id: 1 });
    const expectedState = {
      triggerReport: { data: [] },
      pendingList: { triggerReport: { 1: true } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer TRIGGER_REPORT_SUCCESS', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.TRIGGER_REPORT_SUCCESS, id: 1, data: 'Success' });
    const expectedState = {
      triggerReport: { data: 'Success' },
      pendingList: { triggerReport: { 1: false } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});

describe('reducer TRIGGER_REPORT_FAILURE', () => {
  it('receivedState should equal to expectedState', () => {
    const receivedState = reducer({}, { type: Types.TRIGGER_REPORT_FAILURE, id: 1 });
    const expectedState = {
      triggerReport: {},
      pendingList: { triggerReport: { 1: false } },
    };
    expect(receivedState).toEqual(expectedState);
  });
});
