import { testSaga } from 'redux-saga-test-plan';

import { Creators } from './actions';
import { getShiftPlanReport, getLeaveManagementReport, getSlotPerformanceReport, getSlotChangeLogReport } from './saga';
import {
  getShiftPlanReport as getShiftPlanReportApi,
  getSlotPerformanceReport as getSlotPerformanceReportApi,
  getSlotChangeLogReport as getSlotChangeLogReportApi,
} from '@shared/api/workforceReports';
import { getLeaveExcel as getLeaveManagementReportApi } from '@shared/api/leaveManagement';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { mockReportResponse } from '../../../api/workforceReports/index.mock.data';

describe('Workforce Reports', () => {
  describe('leaveManagementReport sagas', () => {
    const body = {
      franchiseIds: ['63721c7a94106f66da67007f'],
      utcOffset: 180,
      startDatetime: '2024-01-14T00:00:00.000Z',
      endDatetime: '2024-01-20T23:59:59.999Z',
    };
    const mockResponse = { url: 'franchise-leave-export.xlsx' };
    const errMessage = '404 Not Found';

    it('should download report (success)', () => {
      testSaga(getLeaveManagementReport, body)
        .next()
        .call(getLeaveManagementReportApi, body)
        .next({ ...mockResponse })
        .put(Creators.getLeaveManagementReportSuccess())
        .next()
        .isDone();
    });
    it('should show no report (success)', () => {
      testSaga(getLeaveManagementReport, body)
        .next()
        .call(getLeaveManagementReportApi, body)
        .next({ url: '' })
        .put(Creators.getLeaveManagementReportSuccess())
        .next()
        .isDone();
    });
    it('should download report (failure)', () => {
      testSaga(getLeaveManagementReport, body)
        .next()
        .call(getLeaveManagementReportApi, body)
        .throw({ message: errMessage })
        .put(Creators.getLeaveManagementReportFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
  describe('shiftPlanReport sagas', () => {
    const mockResponse = mockReportResponse;
    const body = {
      startDate: '2024-01-07T21:00:00.000Z',
      endDate: '2024-01-14T20:59:59.999Z',
      employeeType: 1,
      warehouseIds: [
        '63721ecafcbcaf01c64e0adf',
      ],
    };
    const errMessage = '404 Not Found';

    it('should download report (success)', () => {
      testSaga(getShiftPlanReport, body)
        .next()
        .call(getShiftPlanReportApi, body)
        .next({ ...mockResponse })
        .put(Creators.getShiftPlanReportSuccess())
        .next()
        .isDone();
    });
    it('should show no report (success)', () => {
      testSaga(getShiftPlanReport, body)
        .next()
        .call(getShiftPlanReportApi, body)
        .next({ url: '' })
        .put(Creators.getShiftPlanReportSuccess())
        .next()
        .isDone();
    });
    it('should download report (failure)', () => {
      testSaga(getShiftPlanReport, body)
        .next()
        .call(getShiftPlanReportApi, body)
        .throw({ message: errMessage })
        .put(Creators.getShiftPlanReportFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
  describe('slotPerformanceReport sagas', () => {
    const mockResponse = mockReportResponse;
    const body = {
      startDate: '2024-01-07T21:00:00.000Z',
      endDate: '2024-01-14T20:59:59.999Z',
      warehouseIds: [
        '63721ecafcbcaf01c64e0adf',
      ],
    };
    const errMessage = '404 Not Found';

    it('should download report (success)', () => {
      testSaga(getSlotPerformanceReport, body)
        .next()
        .call(getSlotPerformanceReportApi, body)
        .next({ ...mockResponse })
        .put(Creators.getSlotPerformanceReportSuccess())
        .next()
        .isDone();
    });
    it('should show no report (success)', () => {
      testSaga(getSlotPerformanceReport, body)
        .next()
        .call(getSlotPerformanceReportApi, body)
        .next({ url: '' })
        .put(Creators.getSlotPerformanceReportSuccess())
        .next()
        .isDone();
    });
    it('should download report (failure)', () => {
      testSaga(getSlotPerformanceReport, body)
        .next()
        .call(getSlotPerformanceReportApi, body)
        .throw({ message: errMessage })
        .put(Creators.getSlotPerformanceReportFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
  describe('slotChangeLogReport sagas', () => {
    const mockResponse = mockReportResponse;
    const body = {
      startDate: '2024-01-07T21:00:00.000Z',
      endDate: '2024-01-14T20:59:59.999Z',
      warehouseIds: [
        '63721ecafcbcaf01c64e0adf',
      ],
    };
    const errMessage = '404 Not Found';

    it('should download report (success)', () => {
      testSaga(getSlotChangeLogReport, body)
        .next()
        .call(getSlotChangeLogReportApi, body)
        .next({ ...mockResponse })
        .put(Creators.getSlotChangeLogReportSuccess())
        .next()
        .isDone();
    });
    it('should show no report (success)', () => {
      testSaga(getSlotChangeLogReport, body)
        .next()
        .call(getSlotChangeLogReportApi, body)
        .next({ url: '' })
        .put(Creators.getSlotChangeLogReportSuccess())
        .next()
        .isDone();
    });
    it('should download report (failure)', () => {
      testSaga(getSlotChangeLogReport, body)
        .next()
        .call(getSlotChangeLogReportApi, body)
        .throw({ message: errMessage })
        .put(Creators.getSlotChangeLogReportFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
});
