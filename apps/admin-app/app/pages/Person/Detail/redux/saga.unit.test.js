import { testSaga } from 'redux-saga-test-plan';

import {
  getGetirUpTrainings as getGetirUpTrainingsApi,
  getPersonDetail as getPersonDetailApi,
  updatePersonDetail as updatePersonDetailApi,
  addPersonTraining as addPersonTrainingApi,
  createCourierForPerson as createCourierForPersonApi,
  createPickerForPerson as createPickerForPersonApi,
  disableLoginOfCouriers as disableLoginOfCouriersApi,
  setMarketEmployer as setMarketEmployerApi,
  unsetMarketEmployer as unsetMarketEmployerApi,
  changePassword as changePasswordApi,
  deactivatePerson as deactivatePersonApi,
  removeEmployeeDiscount as removeEmployeeDiscountApi,
  addEmployeeDiscount as addEmployeeDiscountApi,
  editMarketEmployer as editMarketEmployerApi,
} from '@shared/api/person';
import { getNotes as getNotesApi, updateNote as updateNoteApi, createNote as createNoteApi } from '@shared/api/note';
import { filterCouriers as filterCouriersApi } from '@shared/api/marketCouriers';
import { filterPickers as filterPickersApi } from '@shared/api/picker';
import { getContractListApi } from '@shared/api/personContractType';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from './actions';
import {
  getGetirUpTrainingsRequest,
  personDetailRequest,
  updatePersonDetailRequest,
  addPersonTrainingRequest,
  createCourierForPersonRequest,
  createPickerForPersonRequest,
  disableLoginOfCouriersRequest,
  getPersonNotesRequest,
  updatePersonNoteRequest,
  createPersonNoteRequest,
  addMarketEmployerRequest,
  removeMarketEmployerRequest,
  changePasswordRequest,
  getCouriersRequest,
  getPickersRequest,
  deactivatePersonRequest,
  addEmployeeDiscountRequest,
  getPersonContractRequest,
  commonUpdateSteps as commonUpdateStepsSaga,
  editMarketEmployerRequest,
} from './saga';
import { CLIENT_SEGMENT_EMPLOYEE_DISCOUNT } from '../constants';

const personId = '601d5350de39115790f73100';

const commonUpdateSteps = updatedPerson => {
  testSaga(commonUpdateStepsSaga, { updatedPerson })
    .next()
    .put(Creators.getCouriersSuccess({ data: [] }))
    .next()
    .put(Creators.getPickersSuccess({ data: [] }))
    .next()
    .put(Creators.getPersonDetailSuccess({ data: updatedPerson }))
    .next()
    .put(ToastCreators.success())
    .next()
    .isDone();
};

describe('saga #getGetirUpTrainings', () => {
  it('should call the getGetirUpTrainings (success)', () => {
    testSaga(getGetirUpTrainingsRequest, { personId })
      .next()
      .call(getGetirUpTrainingsApi, { personId })
      .next()
      .put(Creators.getGetirUpTrainingsSuccess({ data: undefined }))
      .next()
      .isDone();
  });
});

describe('saga #personDetail', () => {
  it('should call the personDetail (success)', () => {
    testSaga(personDetailRequest, { personId })
      .next()
      .call(getPersonDetailApi, { personId })
      .next()
      .put(Creators.getPersonDetailSuccess({ data: undefined }))
      .next()
      .isDone();
  });
});

describe('saga #updatePersonDetailRequest', () => {
  it('should call the updatePersonDetailRequest (success)', () => {
    const saga = testSaga(updatePersonDetailRequest, {
      personId,
      updateData: {},
      onlyPerson: false,
    })
      .next()
      .call(updatePersonDetailApi, {
        personId,
        updateData: {},
        onlyPerson: false,
      })
      .next()
      .put(Creators.updatePersonDetailSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #addPersonTrainingRequest', () => {
  it('should call the addPersonTrainingRequest (success)', () => {
    const saga = testSaga(addPersonTrainingRequest, {
      person: {},
      trainingObj: {},
    })
      .next()
      .call(addPersonTrainingApi, {
        person: {},
        trainingObj: {},
      })
      .next()
      .put(Creators.addPersonTrainingSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #createCourierForPersonRequest', () => {
  it('should call the createCourierForPersonRequest (success)', () => {
    const saga = testSaga(createCourierForPersonRequest, {
      id: '',
      courierTypes: [],
    })
      .next()
      .call(createCourierForPersonApi, {
        id: '',
        courierTypes: [],
      })
      .next()
      .put(Creators.createCourierForPersonSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #createPickerForPersonRequest', () => {
  it('should call the createPickerForPersonRequest (success)', () => {
    const saga = testSaga(createPickerForPersonRequest, {
      id: '',
      pickerTypes: [],
    })
      .next()
      .call(createPickerForPersonApi, {
        id: '',
        pickerTypes: [],
      })
      .next()
      .put(Creators.createPickerForPersonSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #commonUpdateSteps', () => {
  it('should call the commonUpdateSteps (success)', () => {
    commonUpdateSteps({});
  });
});

describe('saga #disableLoginOfCouriersRequest', () => {
  it('should call the disableLoginOfCouriersRequest (success)', () => {
    const saga = testSaga(disableLoginOfCouriersRequest, {
      id: '',
      courierDisableReason: '',
      isLoginDisabled: true,
    })
      .next()
      .call(disableLoginOfCouriersApi, {
        id: '',
        courierDisableReason: '',
        isLoginDisabled: true,
      })
      .next()
      .put(Creators.disableLoginOfCouriersSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #getPersonNotesRequest', () => {
  xit('should call the getPersonNotesRequest (success)', () => {
    const fakeRequestData = { data: { to: personId, toType: 'Person' } };
    const fakeResponseData = { data: { notes: [] } };

    testSaga(getPersonNotesRequest, fakeRequestData)
      .next(fakeRequestData)
      .call(getNotesApi, fakeRequestData)
      .next(fakeResponseData)
      .put(Creators.getPersonNotesSuccess(fakeResponseData))
      .next()
      .isDone();
  });
});

describe('saga #updatePersonNoteRequest', () => {
  it('should call the updatePersonNoteRequest (success)', () => {
    testSaga(updatePersonNoteRequest, { personId, note: '' })
      .next()
      .call(updateNoteApi, undefined)
      .next()
      .put(Creators.updatePersonNoteSuccess())
      .next()
      .isDone();
  });
});

describe('saga #createPersonNoteRequest', () => {
  it('should call the createPersonNoteRequest (success)', () => {
    testSaga(createPersonNoteRequest, { personId, note: '' })
      .next()
      .call(createNoteApi, undefined)
      .next()
      .put(Creators.createPersonNoteSuccess())
      .next()
      .isDone();
  });
});

describe('saga #addMarketEmployerRequest', () => {
  it('should call the addMarketEmployerRequest (success)', () => {
    const payload = {
      person: undefined,
      franchise: undefined,
      workType: undefined,
      contractId: undefined,
    };

    const saga = testSaga(addMarketEmployerRequest, payload)
      .next()
      .call(setMarketEmployerApi, payload)
      .next(payload)
      .put(Creators.addMarketEmployerSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #addMarketEmployerRequest', () => {
  it('should call the editMarketEmployerRequest (success)', () => {
    const payload = {
      person: undefined,
      marketEmployers: [{
        franchise: undefined,
        workType: undefined,
        contractId: undefined,
      }],
    };

    const saga = testSaga(editMarketEmployerRequest, payload)
      .next()
      .call(editMarketEmployerApi, payload)
      .next(payload)
      .put(Creators.editMarketEmployerSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #removeMarketEmployerRequest', () => {
  it('should call the removeMarketEmployerRequest (success)', () => {
    const payload = {
      person: undefined,
      franchise: undefined,
    };

    const saga = testSaga(removeMarketEmployerRequest, payload)
      .next()
      .call(unsetMarketEmployerApi, payload)
      .next(payload)
      .put(Creators.removeMarketEmployerSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #changePasswordRequest', () => {
  it('should call the changePasswordRequest (success)', () => {
    const payload = {
      id: undefined,
      password: undefined,
    };

    const saga = testSaga(changePasswordRequest, payload)
      .next()
      .call(changePasswordApi, payload)
      .next(payload)
      .put(Creators.changePasswordSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #getCouriersRequest', () => {
  it('should call the getCouriersRequest (success)', () => {
    const payload = { courierIds: [], fields: '' };

    const saga = testSaga(getCouriersRequest, payload)
      .next()
      .call(filterCouriersApi, payload)
      .next(payload)
      .put(Creators.getCouriersSuccess({ data: undefined }))
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #getPickersRequest', () => {
  it('should call the getPickersRequest (success)', () => {
    const payload = { pickerIds: [], fields: '' };

    const saga = testSaga(getPickersRequest, payload)
      .next()
      .call(filterPickersApi, payload)
      .next(payload)
      .put(Creators.getPickersSuccess({ data: undefined }))
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #deactivatePersonRequest', () => {
  it('should call the deactivatePersonRequest (success)', () => {
    const payload = { id: personId, gsm: '', countryCode: '' };

    const saga = testSaga(deactivatePersonRequest, payload)
      .next()
      .call(deactivatePersonApi, { id: personId })
      .next()
      .call(removeEmployeeDiscountApi, {
        gsm: '',
        countryCode: '',
        segments: [CLIENT_SEGMENT_EMPLOYEE_DISCOUNT],
      })
      .next()
      .put(Creators.deactivatePersonSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #addEmployeeDiscountRequest', () => {
  it('should call the addEmployeeDiscountRequest (success)', () => {
    const payload = {
      gsm: '',
      countryCode: '',
    };

    const saga = testSaga(addEmployeeDiscountRequest, payload)
      .next()
      .call(addEmployeeDiscountApi, {
        ...payload,
        segments: [CLIENT_SEGMENT_EMPLOYEE_DISCOUNT],
      })
      .next()
      .put(Creators.addEmployeeDiscountSuccess())
      .next();

    commonUpdateSteps({});

    saga.next().isDone();
  });
});

describe('saga #getPersonContractRequest', () => {
  it('should call the getPersonContractRequest (success)', () => {
    const payload = { countryCode: '' };

    testSaga(getPersonContractRequest, payload)
      .next()
      .call(getContractListApi, payload)
      .next()
      .put(Creators.getPersonContractSuccess({ data: undefined }))
      .next()
      .isDone();
  });
});
