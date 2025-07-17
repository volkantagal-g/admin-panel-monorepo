type JOB_STATUSES_TYPE = Readonly<{
    WORKING: 100;
    ON_LEAVE: 200;
    NOT_WORKING: 300;
}>;

type WORK_TYPES_TYPE = Readonly<{
    FULL_TIME: 1;
    PART_TIME: 2;
    INTERN: 3;
}>;

type COLLAR_TYPES_TYPE = Readonly<{
    WHITE_COLLAR: 1;
    BLUE_COLLAR: 2;
}>;

type EmployeeType = {
    _id: MongoIDType,
    workdayId: string;
    fullName: string;
    fullPreferredName?: string;
    personalEmail?: string;
    jobFamilyId?: string;
    jobFamilyName?: string;
    workEmail: string;
    jobTitle?: string;
    businessTitle?: string;
    uniqueIdentifier?: string;
    birthday?: Date;
    payrollCountryCode?: string;
    isInternationalBusinessEmployee?: boolean;
    payrollStatus: number;
    personalGsm?: string;
    businessCountryCodes?: Schema.Types.Mixed;
    locationId?: string;
    locationName?: string;
    businessUnitId?: string;
    businessUnitName?: string;
    customBusinessUnitIds?: string[];
    customBusinessUnitNames?: string[];
    supervisor?: MongoIDType | EmployeeType;
    supervisorWorkdayId?: string;
    jobStatus?: JOB_STATUSES_TYPE[keyof JOB_STATUSES_TYPE];
    workStartDate: Date;
    workEndDate?: Date;
    department?: MongoIDType;
    departmentName?: string;
    subDepartmentId?: string;
    subDepartmentName?: string;
    workType?: WORK_TYPES_TYPE[keyof WORK_TYPES_TYPE];
    nationality?: string,
    collarType?: COLLAR_TYPES_TYPE[keyof COLLAR_TYPES_TYPE];
    rndEntranceCardId?: string;
    lastWorkdaySyncDate?: Date;
    isLaidOff?: boolean;
    createdAt: string;
    updatedAt: string;
}

type DepartmentType = {
    _id: MongoIDType,
    workdayId: string;
    name: {
      tr: string,
      en: string,
    }
    isActive: boolean;
    level: number;
    parent: MongoIDType | DepartmentType,
}
