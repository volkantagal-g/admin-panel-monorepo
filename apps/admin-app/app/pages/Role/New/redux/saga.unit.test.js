import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '@app/pages/Role/New/redux/actions';
import { createRole } from '@shared/api/role';
import { mockedRole } from '@shared/api/role/index.mock.data';
import { createRoleRequest } from './saga';

describe('Role/New ', () => {
  const errMessage = '404 Not Found';

  describe('saga #createRoleRequest', () => {
    it('should call the createRole (success)', () => {
      testSaga(createRoleRequest, { body: mockedRole })
        .next()
        .call(createRole, { body: mockedRole })
        .next({ ...mockedRole })
        .put(Creators.createRoleSuccess({ data: mockedRole }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the createRole (failure)', () => {
      testSaga(createRoleRequest, { body: mockedRole })
        .next()
        .call(createRole, { body: mockedRole })
        .throw({ message: errMessage })
        .put(Creators.createRoleFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
});
