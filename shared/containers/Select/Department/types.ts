import { type CascaderProps } from 'antd';

import { DepartmentLevel as DepartmentLevelType, IDepartment } from '@app/pages/Employee/types';

export interface ISelectDepartmentProps {
  size?: CascaderProps<ICascaderOption>['size'];
  value?: string[] | IParsedReturnValue;
  defaultValue?: string[];
  onChange: (
    selectedValue: IParsedReturnValue | String[],
    allValues: { selectedValue: string[], selectedValuePure: ICascaderOption[], parsedValue?: IParsedReturnValue }
  ) => void;
  disabled?: CascaderProps<ICascaderOption>['disabled'];
  allowClear?: CascaderProps<ICascaderOption>['allowClear'];
  placeholder?: CascaderProps<ICascaderOption>['placeholder'];
  className?: CascaderProps<ICascaderOption>['className'];
  minSelectedLevel?: number;
  isReturnParsedValue?: boolean;
  isFetchOptionsOnLoad?: boolean;
  initialSearchTerm?: string;
  filters?: {
    fields?: string[];
    isActive?: boolean;
    levels: DepartmentLevelType[];
  };
  showLastSucceededSelect?: boolean;
}

export interface ICascaderOption {
  value: string;
  label: string;
  data: IDepartment;
  children?: ICascaderOption[];
}

export interface IParsedReturnValue {
  department: string | undefined
  subDepartments: Record<string, string>
}

export interface SelectDepartmentRef {
  clearSelection: () => void;
}
