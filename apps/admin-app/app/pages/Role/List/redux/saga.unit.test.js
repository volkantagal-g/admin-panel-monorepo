import { call, select, put } from 'redux-saga-test-plan/matchers';

import {
  exportRolesExcel,
  requestRoleRequest,
  getUserRoleRequestsRequest,
  getRoleRequestsForApprovalByRoleOwnerRequest,
  getRoleRequestByIdRequest,
  cancelRoleRequestRequest,
  approveRoleRequestRequest,
  rejectRoleRequestRequest,
  getExtendedUserInfoRequest,
  getRolesOfTeammatesRequest,
} from './saga';
import { Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { getRoles, getRolesOfTeammates } from '@shared/api/role';
import {
  createRoleRequest,
  getRoleRequestsForApprovalByRoleOwner,
  getRoleRequest,
  approveOrCancelRoleRequest,
  getUserRoleRequests,
  updateRoleRequest,
} from '@shared/api/roleRequest';
import { getUserById } from '@shared/api/user';
import { getEmployeesFilter, getEmployeesPure } from '@shared/api/employee';
import { ROLE_REQUEST_STATES, ROLE_REQUEST_STATUSES } from '@app/pages/Role/List/constants';
import { mockedUserId, mockedUser } from '@shared/api/user/index.mock.data';
import { mockedRolesOfTeammates } from '@shared/api/role/index.mock.data';
import { mockedEmployee } from '@shared/api/employee/index.mock.data';

const roleRequests = [{
  status: 'COMPLETED',
  requestState: 'USER_CANCELED',
  _id: '62a05298de5734695e231132',
  user: '62432218ecfc227c9690a08b',
  role: {
    _id: '6034fcbd548be3a8b7ad91a7',
    name: 'test5',
  },
  requestReason: 'test',
  createdAt: '2022-06-08T07:41:12.750Z',
  updatedAt: '2022-06-20T14:24:30.313Z',
  responder: null,
  responseReason: '',
}];
describe('Role/List', () => {
  describe('sagas', () => {
    it('exportRolesExcel runs without errors', async () => {
      global.URL.createObjectURL = jest.fn(); // needed for exportExcel()
      const roles = [{
        description: { en: 'Do not use this role anymore, define Dev Admin role for everyone in dev.' },
        roleOwners: [{
          _id: '6051bdfeb427eb08b64596ef',
          name: 'Amadi Innocent Tobechukwu',
          email: 'innocent.amadi@getir.com',
        },
        ],
        _id: '6006bea91ae409d343bcb970',
        name: 'All except user management',
        isActive: true,
        createdAt: '2022-06-21T09:59:29.275Z',
      }];
      const language = 'en';

      const saga = exportRolesExcel();
      let next = saga.next();

      expect(next.value).toMatchObject(call(getRoles, { limit: 10000, populateOwners: true }));
      next = saga.next(roles);

      expect(next.value).toMatchObject(select(getSelectedLanguage));
      next = saga.next(language);

      expect(next.done).toBe(true);
    });

    it('createRoleRequest runs without errors', () => {
      const mockedUserRoleRequest = {
        roleId: '62a05298de5734695e231132',
        requestReason: 'requestReason',
        timeLimit: 'PERMANENT',
        durationType: 'DURATION',
        durationDays: 1,
        endDate: new Date(),
      };

      const saga = requestRoleRequest(mockedUserRoleRequest);

      expect(saga.next().value).toMatchObject(call(createRoleRequest, mockedUserRoleRequest));
      expect(saga.next().value).toMatchObject(put(ToastCreators.success()));
      expect(saga.next().value).toMatchObject(put(Creators.getUserRoleRequestsRequest()));
      expect(saga.next().done).toBeTruthy();
    });

    it('getUserRoleRequestsRequest runs without errors', () => {
      const saga = getUserRoleRequestsRequest();

      expect(saga.next().value).toMatchObject(call(getUserRoleRequests));
      expect(saga.next(roleRequests).value).toMatchObject(put(Creators.getUserRoleRequestsSuccess({ roleRequests })));
      expect(saga.next().done).toBeTruthy();
    });

    it('getRoleRequestsForApprovalByRoleOwnerRequest runs without errors', () => {
      const saga = getRoleRequestsForApprovalByRoleOwnerRequest();

      expect(saga.next().value).toMatchObject(call(getRoleRequestsForApprovalByRoleOwner));
      expect(saga.next(roleRequests).value).toMatchObject(put(Creators.getRoleRequestsForApprovalByRoleOwnerSuccess({ roleRequests })));
    });

    it('getRoleRequestByIdRequest runs without errors', () => {
      const id = '62a05298de5734695e231132';
      const saga = getRoleRequestByIdRequest({ id });

      expect(saga.next().value).toMatchObject(call(getRoleRequest, { id }));
      expect(saga.next(roleRequests[0]).value).toMatchObject(put(Creators.getRoleRequestByIdSuccess({ roleRequest: roleRequests[0] })));
    });

    it('cancelRoleRequestRequest runs without errors', () => {
      const roleRequestId = '62a05298de5734695e231132';
      const saga = cancelRoleRequestRequest({ roleRequestId });

      expect(saga.next().value).toMatchObject(call(updateRoleRequest, {
        roleRequestId,
        requestState: ROLE_REQUEST_STATES.USER_CANCELED,
        status: ROLE_REQUEST_STATUSES.CANCELED,
      }));
      expect(saga.next().value).toMatchObject(put(Creators.getUserRoleRequestsRequest()));
      expect(saga.next().done).toBeTruthy();
    });

    it('approveRoleRequestRequest runs without errors', () => {
      const roleRequestId = '62a05298de5734695e231132';
      const responseReason = 'responseReason';
      const saga = approveRoleRequestRequest({ roleRequestId, responseReason });

      expect(saga.next().value).toMatchObject(call(approveOrCancelRoleRequest, {
        roleRequestId,
        requestState: ROLE_REQUEST_STATES.APPROVED,
        status: ROLE_REQUEST_STATUSES.COMPLETED,
        responseReason,
      }));
      expect(saga.next().value).toMatchObject(put(ToastCreators.success()));
      expect(saga.next().value).toMatchObject(put(Creators.getRoleRequestsForApprovalByRoleOwnerRequest()));
      expect(saga.next().done).toBeTruthy();
    });

    it('approveRoleRequestRequest sets a default response reason', () => {
      const roleRequestId = '62a05298de5734695e231132';
      const responseReason = 'response reason';
      const saga = approveRoleRequestRequest({ roleRequestId, responseReason });

      expect(saga.next().value).toMatchObject(call(approveOrCancelRoleRequest, {
        roleRequestId,
        requestState: ROLE_REQUEST_STATES.APPROVED,
        status: ROLE_REQUEST_STATUSES.COMPLETED,
        responseReason,
      }));
    });

    it('rejectRoleRequestRequest runs without errors', () => {
      const roleRequestId = '62a05298de5734695e231132';
      const responseReason = 'responseReason';
      const saga = rejectRoleRequestRequest({ roleRequestId, responseReason });

      expect(saga.next().value).toMatchObject(call(approveOrCancelRoleRequest, {
        roleRequestId,
        requestState: ROLE_REQUEST_STATES.REJECTED,
        status: ROLE_REQUEST_STATUSES.CANCELED,
        responseReason,
      }));
      expect(saga.next().value).toMatchObject(put(ToastCreators.success()));
      expect(saga.next().value).toMatchObject(put(Creators.getRoleRequestsForApprovalByRoleOwnerRequest()));
      expect(saga.next().done).toBeTruthy();
    });

    it('getExtendedUserInfoRequest runs without errors', () => {
      const saga = getExtendedUserInfoRequest({ user: mockedUserId });
      const userById = mockedUser;
      expect(saga.next().value).toMatchObject(call(getUserById, { id: mockedUserId }));
      expect(saga.next(userById).value).toMatchObject(call(getEmployeesFilter, { workEmail: [userById.email] }));
      expect(saga.next({ employees: [mockedEmployee] }).value).toMatchObject(call(getEmployeesPure, { employeeIds: [mockedEmployee.supervisor] }));
      expect(saga.next({ employees: [mockedEmployee] }).value).toMatchObject(
        put(Creators.getExtendedUserInfoSuccess({ user: { ...mockedUser, employee: mockedEmployee } })),
      );
    });

    it('getRolesOfTeammatesRequest runs without errors', () => {
      const body = { limit: 1, offset: 10, queryText: 'role', isActive: true };
      const saga = getRolesOfTeammatesRequest(body);

      expect(saga.next().value).toMatchObject(call(getRolesOfTeammates, body));
      expect(saga.next(mockedRolesOfTeammates).value).toMatchObject(put(Creators.getRolesOfTeammatesSuccess({ data: mockedRolesOfTeammates })));
      expect(saga.next().done).toBeTruthy();
    });
  });
});
