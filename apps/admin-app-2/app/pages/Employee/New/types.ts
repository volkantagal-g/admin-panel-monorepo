import { IEmployee } from '@app/pages/Employee/types';

export type EmployeeCreateFormProps = {
  onSubmit: () => void;
}

export type FormValues = {
  name: IEmployee['name'];
  surname: IEmployee['surname'];
  uniqueIdentifier: IEmployee['uniqueIdentifier'];
  birthdate: IEmployee['birthdate'] | Date;
  nationality: IEmployee['nationality'];
  gender: IEmployee['gender'];
  personalEmail: IEmployee['personalEmail'];
  personalGSMNumber: IEmployee['personalGSM']['number'] | undefined;
  personalGSMDialCode: IEmployee['personalGSM']['dialCode'] | undefined;
  residentialAddress: IEmployee['residentialAddress'];
  emergencyContact: Partial<IEmployee['emergencyContact']>;
  workStartDate: IEmployee['workStartDate'] | Date;
  employmentType: IEmployee['employmentType'];
  contractType: IEmployee['contractType'];
  businessUnit: IEmployee['businessUnit'];
  department: IEmployee['department'];
  subDepartments: IEmployee['subDepartments'];
  jobTitle: IEmployee['jobTitle'];
  positionLevel: IEmployee['positionLevel'];
  lineManager: IEmployee['lineManager'];
  matrixManager?: IEmployee['matrixManager']
  mainWorkLocation: IEmployee['mainWorkLocation'];
  officeAccessCardId?: IEmployee['officeAccessCardId'];
  seniorityStartDate?: IEmployee['seniorityStartDate'] | Date | undefined | null;
  annualLeaveCalculationStartDate?: IEmployee['annualLeaveCalculationStartDate'] | Date | undefined | null;
  payrollCountryCode: IEmployee['payrollCountryCode'];
  isInternationalBusinessEmployee?: IEmployee['isInternationalBusinessEmployee'];
  workEmail: IEmployee['workEmail'];
  workGSMNumber: IEmployee['workGSM']['number'] | undefined;
  workGSMDialCode: IEmployee['workGSM']['dialCode'] | undefined;
  company: IEmployee['company'] | undefined;
  businessCountryCodes?: IEmployee['businessCountryCodes'];
  businessPartner?: IEmployee['businessPartner'];
}
