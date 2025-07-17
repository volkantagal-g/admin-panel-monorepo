import { call, put } from 'redux-saga-test-plan/matchers';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from './actions';
import {
  getLeaveRequests as getLeaveRequestsApi,
  batchLeaveRequests as batchLeaveRequestsApi,
  getLeaveDetail as getLeaveDetailApi,
  approveLeaveRequest as approveLeaveRequestApi,
  rejectLeaveRequest as rejectLeaveRequestApi,
  cancelLeaveRequest as cancelLeaveRequestApi,
  getSignedUrl as getSignedUrlApi,
} from '@shared/api/leaveManagement';
import {
  leaveRequestDetail,
  leaveRequests,
} from '@shared/api/leaveManagement/index.mock.data';
import { approveLeaveRequest, batchLeaveRequests, cancelLeaveRequest, getLeaveDetail, getLeaveRequests, getSignedUrl, rejectLeaveRequest } from './saga';
import { EMPLOYEE_LEAVE_STATUSES } from '@shared/shared/constants';

describe('Leave Management', () => {
  describe('sagas', () => {
    it('getLeaveDetail runs without error', () => {
      const leaveRequestId = leaveRequestDetail.id;
      const saga = getLeaveDetail({ leaveRequestId });

      expect(saga.next().value).toMatchObject(
        call(getLeaveDetailApi, { leaveRequestId }),
      );
      expect(saga.next(leaveRequestDetail).value).toMatchObject(
        put(Creators.getLeaveDetailSuccess({ leaveRequestDetail })),
      );
      expect(saga.next().done).toBeTruthy();
    });

    it('getLeaveRequest (status 200) runs without error', () => {
      const status = EMPLOYEE_LEAVE_STATUSES.APPROVED;
      const reqBody = {
        franchiseId: '63721c7a94106f66da67007f',
        status,
        limit: 10,
        offset: 0,
        isEmailRequired: true,
      };
      const saga = getLeaveRequests(status)(reqBody);

      expect(saga.next().value).toMatchObject(
        call(getLeaveRequestsApi, reqBody),
      );
      expect(saga.next(leaveRequests).value).toMatchObject(
        put(Creators[`getLeaveRequestsSuccess${status}`]({ data: leaveRequests.leaves, total: leaveRequests.totalCount })),
      );
      expect(saga.next().done).toBeTruthy();
    });

    it('approveLeaveRequest runs without error', () => {
      const mockResponse = {
        id: '63fde587c505df34c7942acd',
        type: 9002,
        status: EMPLOYEE_LEAVE_STATUSES.APPROVED,
        personId: '5e33cddb8f6a48fabcf28b2a',
        allDay: false,
        startDatetime: '2023-04-19T00:00:00.000Z',
        endDatetime: '2023-04-19T23:59:59.999Z',
        attachments: [],
        createdAt: '2023-02-28T11:29:11.252Z',
        updatedAt: '2023-02-28T11:29:15.085Z',
      };
      const leaveRequestId = leaveRequestDetail.id;
      const saga = approveLeaveRequest({ leaveRequestId });

      expect(saga.next().value).toMatchObject(call(approveLeaveRequestApi, { leaveRequestId }));
      expect(saga.next(mockResponse).value).toMatchObject(put(Creators.approveLeaveRequestSuccess({ data: mockResponse })));
      expect(saga.next(mockResponse).value).toMatchObject(put(ToastCreators.success()));
      expect(saga.next().done).toBeTruthy();
    });

    it('rejectLeaveRequest runs without error', () => {
      const mockResponse = {
        id: '63fde587c505df34c7942acd',
        type: 9002,
        status: EMPLOYEE_LEAVE_STATUSES.DECLINED,
        personId: '5e33cddb8f6a48fabcf28b2a',
        allDay: false,
        startDatetime: '2023-04-19T00:00:00.000Z',
        endDatetime: '2023-04-19T23:59:59.999Z',
        attachments: [],
        createdAt: '2023-02-28T11:29:11.252Z',
        updatedAt: '2023-02-28T11:29:15.085Z',
      };
      const leaveRequestId = leaveRequestDetail.id;
      const description = 'test message';
      const saga = rejectLeaveRequest({ leaveRequestId, description });

      expect(saga.next().value).toMatchObject(call(rejectLeaveRequestApi, { leaveRequestId, description }));
      expect(saga.next(mockResponse).value).toMatchObject(put(Creators.rejectLeaveRequestSuccess({ data: mockResponse })));
      expect(saga.next(mockResponse).value).toMatchObject(put(ToastCreators.success()));
      expect(saga.next().done).toBeTruthy();
    });

    it('cancelLeaveRequest runs without error', () => {
      const mockResponse = {
        id: '63fde587c505df34c7942acd',
        type: 9002,
        status: EMPLOYEE_LEAVE_STATUSES.CANCELED,
        personId: '5e33cddb8f6a48fabcf28b2a',
        allDay: false,
        startDatetime: '2023-04-19T00:00:00.000Z',
        endDatetime: '2023-04-19T23:59:59.999Z',
        attachments: [],
        createdAt: '2023-02-28T11:29:11.252Z',
        updatedAt: '2023-02-28T11:29:15.085Z',
      };
      const leaveRequestId = leaveRequestDetail.id;
      const saga = cancelLeaveRequest({ leaveRequestId });

      expect(saga.next().value).toMatchObject(call(cancelLeaveRequestApi, { leaveRequestId }));
      expect(saga.next(mockResponse).value).toMatchObject(put(Creators.cancelLeaveRequestSuccess({ data: mockResponse })));
      expect(saga.next(mockResponse).value).toMatchObject(put(ToastCreators.success()));
      expect(saga.next().done).toBeTruthy();
    });

    it('batchLeaveRequests (bulk approve) runs without error', () => {
      const mockResponse = [
        {
          id: '6426d0cb9ca422fab4c19b3d',
          personId: '63723af207a290b6dd88ff33',
          type: 1001,
          startDatetime: '2023-04-26T12:23:00.000Z',
          endDatetime: '2023-04-26T16:23:00.000Z',
          success: true,
        },
      ];
      const requestBody = {
        leaves: [
          {
            leaveId: '6426d0cb9ca422fab4c19b3d',
            personId: '63723af207a290b6dd88ff33',
          },
        ],
        status: EMPLOYEE_LEAVE_STATUSES.APPROVED,
      };
      const saga = batchLeaveRequests(requestBody);

      expect(saga.next().value).toMatchObject(call(batchLeaveRequestsApi, requestBody));
      expect(saga.next(mockResponse).value).toMatchObject(put(Creators.batchLeaveRequestsSuccess({ data: mockResponse })));
    });

    it('getSignedUrl runs without error', () => {
      const mockResponse = { signedUrl: 'https://getir-franchise-development.s3.eu-west-1.amazonaws.com/workforce/leave-management/test?signedUrl' };
      const fileKey = 'testKey';
      const saga = getSignedUrl({ fileKey });

      expect(saga.next().value).toMatchObject(call(getSignedUrlApi, { fileKey }));
      expect(saga.next(mockResponse).value).toMatchObject(put(Creators.getSignedUrlSuccess()));
      expect(saga.next().done).toBeTruthy();
    });
  });
});
