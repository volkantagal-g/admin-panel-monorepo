import { type Moment } from 'moment';

import {
  EMERGENCY_CONTACT_RELATIONSHIPS,
  GENDERS,
  LOCATION_TYPES,
  POSITION_LEVELS,
  EMPLOYMENT_TYPES,
  CONTRACT_TYPES,
  EMPLOYMENT_STATUSES,
  DEPARTMENT_LEVELS,
  EDUCATION_LEVELS,
  EDUCATION_STATUSES,
} from './constants';

export type Gender = typeof GENDERS[keyof typeof GENDERS];
export type EmergencyContactRelationship = typeof EMERGENCY_CONTACT_RELATIONSHIPS[keyof typeof EMERGENCY_CONTACT_RELATIONSHIPS];
export type PositionLevel = typeof POSITION_LEVELS[keyof typeof POSITION_LEVELS];
export type LocationType = typeof LOCATION_TYPES[keyof typeof LOCATION_TYPES];
export type EmploymentType = typeof EMPLOYMENT_TYPES[keyof typeof EMPLOYMENT_TYPES];
export type ContractType = typeof CONTRACT_TYPES[keyof typeof CONTRACT_TYPES];
export type EmploymentStatus = typeof EMPLOYMENT_STATUSES[keyof typeof EMPLOYMENT_STATUSES];
export type DepartmentLevel = typeof DEPARTMENT_LEVELS[keyof typeof DEPARTMENT_LEVELS];
export type EducationLevel = typeof EDUCATION_LEVELS[keyof typeof EDUCATION_LEVELS];
export type EducationStatus = typeof EDUCATION_STATUSES[keyof typeof EDUCATION_STATUSES];

export type BaseGsm = {
  number: string;
  dialCode: string;
};

export type ResidentialAddress = {
  address: string;
  city: MongoIDType;
  country: MongoIDType;
  district: string;
};

export type EmergencyContact = {
  relationsType: EmergencyContactRelationship;
  name: string;
  dialCode: BaseGsm['dialCode'];
  gsm: BaseGsm['number'];
};

export type SubDepartments = {
  firstLevelSub: MongoIDType;
};

export interface IEmployee {
  _id: MongoIDType;
  id: MongoIDType;
  name: string;
  surname: string;
  fullName: string;
  uniqueIdentifier: string;
  picURL: string;
  birthdate: Moment;
  nationality: string;
  gender: Gender;
  personalEmail: string;
  personalGSM: BaseGsm;
  residentialAddress: ResidentialAddress;
  emergencyContact: EmergencyContact;
  workStartDate: Moment;
  employmentType: EmploymentType;
  contractType: ContractType;
  payrollStatus: number;
  employmentStatus: EmploymentStatus;
  businessUnit: MongoIDType;
  department: MongoIDType;
  subDepartments: SubDepartments;
  jobTitle: string;
  positionLevel: PositionLevel;
  lineManager: MongoIDType;
  matrixManager: MongoIDType;
  mainWorkLocation: MongoIDType;
  mainWorkLocationType: LocationType;
  officeAccessCardId: string;
  seniorityStartDate: Moment;
  annualLeaveCalculationStartDate: Moment;
  payrollCountryCode: string;
  isInternationalBusinessEmployee: boolean;
  workEmail: string;
  workGSM: BaseGsm;
  company: MongoIDType;
  businessCountryCodes: string[];
  businessPartner: MongoIDType;
}

interface IEmployeeWithDbValues extends IEmployee {
  createdAt: Moment;
  updatedAt: Moment;
}

export interface IDepartment {
  _id: MongoIDType;
  id: MongoIDType;
  name: BaseTranslationObjectType;
  isActive: boolean;
  level: DepartmentLevel;
  parent?: MongoIDType;
  createdAt: Moment;
  updatedAt: Moment;
}

export interface ILocation {
  _id: MongoIDType;
  id: MongoIDType;
  name: BaseTranslationObjectType;
  isActive: boolean;
  type: LocationType;
  createdAt: Moment;
  updatedAt: Moment;
}

export interface IBusinessUnit {
  _id: MongoIDType;
  id: MongoIDType;
  name: BaseTranslationObjectType;
  isActive: boolean;
  createdAt: Moment;
  updatedAt: Moment;
}

export interface ICompany {
  _id: MongoIDType;
  id: MongoIDType;
  name: BaseTranslationObjectType;
  isActive: boolean;
  createdAt: Moment;
  updatedAt: Moment;
}

export interface IEmployeeEducation {
  _id: MongoIDType;
  id: MongoIDType;
  employee: MongoIDType;
  level: EducationLevel;
  status: EducationStatus;
  institute: string;
  graduationYear: number;
  academicProgram: string;
  isDeleted: boolean;
}

export interface IEmployeeSurveyHistory {
  _id: MongoIDType;
  id: MongoIDType;
  workEndDate: Moment;
  surveyInfo: {
    turnoverType: number;
    leaveType: number;
  },
  shouldImmediatelyTerminate: boolean;
  status: number;
  terminationBy: {
    id: MongoIDType;
    name: string;
    email: string;
  }
  surveyActionBy: string;
  updatedAt: Moment;
}
