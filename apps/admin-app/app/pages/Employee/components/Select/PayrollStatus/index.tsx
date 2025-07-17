import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { ISelectPayrollStatusProps } from './types';

function SelectPayrollStatus({ value, className, onChange, disabled }: ISelectPayrollStatusProps) {
  const { t } = useTranslation(['global', 'employeePage']);
  return (
    <Select
      value={value}
      className={className ? `${className} w-100` : 'w-100'}
      onChange={onChange}
      placeholder={t('employeePage:IN_GETIR_PAYROLL')}
      disabled={disabled}
      allowClear={false}
      options={[
        { label: t('global:YES'), value: 1 },
        { label: t('global:NO'), value: 2 },
      ]}
    />
  );
}

export default SelectPayrollStatus;
