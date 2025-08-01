const moment = require('moment');

const { DAILY_STATS_STATUSES, DAILY_STATS_INVITE_STATUSES } = require('./constants');

export interface IEmployeeDailyStatsRecord {
  day: Date | moment.Moment;
  employeeId: MongoIDType;
  employeeEmail: string;
  status: DAILY_STATS_STATUSES;
  employeeDepartmentId?: string; // not MongoIDType
  employeeDepartmentName?: string;
  employeeBusinessUnitId?: string; // not MongoIDType;
  employeeBusinessUnitName: string;
  employeeOfficeId?: string; // not MongoIDType;
  checkInOfficeId?: string; // not MongoIDType;
  invitedOfficeId?: string; // not MongoIDType;
  timezone?: string;
  isFromAnotherOffice?: boolean;
  firstCheckInLocal?: Date | moment.Moment;
  firstCheckInUtc?: Date | moment.Moment;
  lastCheckOutLocal?: Date | moment.Moment;
  lastCheckOutUtc?: Date | moment.Moment;
  lastCheckInLocal?: Date | moment.Moment;
  lastCheckInUtc?: Date | moment.Moment;
  lastCheckInId?: MongoIDType;
  totalDuration?: number;
  durationInSec?: number;
  isAtTheOffice?: boolean;
  isAutoClosed?: boolean;
  scheduleStatus?: { type: String };
  inviteStatus?: DAILY_STATS_INVITE_STATUSES;
  isOnLeave?: boolean;
  checkedInOfficeIds?: Array<string>;
  isCheckedInIrregularOffice?: boolean;
  employeeLeaveDetails?: {
    note: string;
    type: number,
  };
  hasNoShowExcuse?: boolean;
  employeeNoShowExcuseDetails?: {
    note: string;
  };
  isVisited?: boolean;
  atOfficeDays?: number;
}

export interface IEmployeeDailyStatsWithEmployeeDetails extends IEmployeeDailyStatsRecord {
  employeeDetail?: {
    fullName: string;
    businessUnitId?: string;
    businessUnitName?: string;
    departmentId?: string;
    departmentName?: string;
    mainWorkLocation: {
      _id: MongoIDType;
      name: {
        tr: string;
        en: string;
      }
    };
    lineManager?: {
      _id: MongoIDType;
      fullName: string;
    };
  };
}

export interface ITransactions {
  _id: string;
  employeeEmail: string;
  officeId: string;
  turnGateId: string;
  localDate: string;
  utcDate: string;
  timezone: string;
  checkinOrCheckout: number;
  [x: string | number]: any;
}

export type InvalidEmails = {
  email: string;
  rowId: number;
}
