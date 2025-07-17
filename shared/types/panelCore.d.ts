type RoleOwner = {
  _id: string;
  name: string;
  email: string;
}

type RoleType = {
  _id: MongoIDType;
  name: string;
  description: MinLangObjectType;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
  roleOwners?: RoleOwner[] | MongoIDType[];
  parent?: MongoIDType;
}

type UserType = {
  _id: MongoIDType;
  name: string;
  email: string;
  username: string;
  countries: Array<MongoIDType>;
  roles: Array<MongoIDType>;
  hasGlobalAccess: boolean;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean
  lastActiveAt?: string;
  lastInactivatedAt?: string;
}

type UserRole = {
  _id: MongoIDType;
  name: string;
  roleMemberType: number;
  joinedAt: string;
  expiryDate?: string
}

type PageType = {
  _id: MongoIDType;
  name: MinLangObjectType;
  description: MinLangObjectType;
  permKey: string;
  countries: Array<MongoIDType>;
  hasGlobalAccess: boolean;
  createdAt: string;
  updatedAt: string;
}

type ComponentType = PageType & {
  page: MongoIDType | PageType;
}

type PageTypePopulated = PageType & {
  pageOwners: Array<UserType>;
  components: Array<ComponentType>;
}

type ROLE_REQUEST_STATUSES_TYPE = Readonly<{
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
}>;

type ROLE_REQUEST_STATES_TYPE = Readonly<{
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  USER_CANCELED: 'USER_CANCELED',
  SYSTEM_CANCELED: 'SYSTEM_CANCELED',
  CANCELLED_BY_GRANTING_ROLE_ACCESS: 'CANCELLED_BY_GRANTING_ROLE_ACCESS',
}>;

type ROLE_REQUEST_DURATION_TYPE = Readonly<{
  DURATION: 'DURATION',
  END_DATE: 'END_DATE',
}>;

type ROLE_REQUEST_TIME_LIMIT = Readonly<{
  PERMANENT: 'PERMANENT',
  TEMPORARY: 'TEMPORARY',
}>;

type RoleRequestType = {
  _id: MongoIDType;
  user: MongoIDType | UserType;
  role: MongoIDType | RoleType;
  requestReason: string;
  responseReason: string;
  status: ROLE_REQUEST_STATUSES_TYPE[keyof ROLE_REQUEST_STATUSES_TYPE];
  requestState: ROLE_REQUEST_STATES_TYPE[keyof ROLE_REQUEST_STATES_TYPE];
  responder: MongoIDType | UserType;
  createdAt: string;
  updatedAt: string;
  timeLimit?: ROLE_REQUEST_TIME_LIMIT[keyof ROLE_REQUEST_TIME_LIMIT];
  durationType?: ROLE_REQUEST_DURATION_TYPE[keyof ROLE_REQUEST_DURATION_TYPE];
  durationDays?: number;
  endDate?: string;
}

type ReportType = {
  _id: MongoIDType;
  name: MinLangObjectType;
  description: MinLangObjectType;
  fileName: string;
  type: number;
  url: string;
  status: number;
  departments: string[];
  createdBy: MongoIDType | UserType;
  createdAt: string;
  updatedAt: string;
  updatedAtL: string
  backgroundColor: string;
  textColor: string;
}

type PermissionType = {
  permKey: string
  countries: MongoIDType[]
  hasGlobalAccess: boolean
}

type ComponentPermissionType = {
  componentId: MongoIDType;
  role: string;
  permKey: string;
  countries: string[];
  hasGlobalAccess: boolean;
  isComponent: true;
  name: { tr: string; en: string; };
  description: { tr: string; en: string; };
};

type PageAndComponentPermissionType = {
  _id: MongoIDType;
  pageId: MongoIDType;
  permKey: string;
  role: string;
  countries: string[];
  hasGlobalAccess: boolean;
  name: { tr: string; en: string; };
  description: { tr: string; en: string; };
  components: ComponentPermissionType[];
  createdAt: string;
  updatedAt: string;
};
