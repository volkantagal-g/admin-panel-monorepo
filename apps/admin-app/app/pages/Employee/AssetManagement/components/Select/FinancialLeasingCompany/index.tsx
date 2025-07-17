import React from 'react';
import { Select } from 'antd';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { FINANCIAL_LEASING_COMPANIES } from '@app/pages/Employee/AssetManagement/constants';
import { IFinancialLeasingCompanyProps } from './types';

const FinancialLeasingCompany: React.FC<IFinancialLeasingCompanyProps> = (props: IFinancialLeasingCompanyProps) => {
  const { className, onChange, placeholder, disabled, value, mode, allowClear } = props || {};

  const vehicleBrandSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    FINANCIAL_LEASING_COMPANIES,
    { translationBaseKey: 'assetManagement:FINANCIAL_LEASING_COMPANIES', isConvertToInt: true },
  );

  return (
    <Select
      mode={mode}
      allowClear={allowClear || false}
      disabled={disabled}
      value={value}
      className={className}
      options={vehicleBrandSelectOptions}
      onChange={onChange}
      placeholder={placeholder}
      showSearch
      optionFilterProp="label"
    />
  );
};

export default FinancialLeasingCompany;
