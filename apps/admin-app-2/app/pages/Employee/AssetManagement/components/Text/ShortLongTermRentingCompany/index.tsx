import React from 'react';
import { Input } from 'antd';

import { IShortLongTermRentingCompanyProps } from './types';

const ShortLongTermRentingCompany: React.FC<IShortLongTermRentingCompanyProps> = (props: IShortLongTermRentingCompanyProps) => {
  const { className, onChange, placeholder, disabled, value, allowClear } = props || {};
  return (
    <Input
      disabled={disabled}
      className={className}
      placeholder={placeholder}
      value={value}
      allowClear={allowClear || false}
      // @ts-ignore
      onChange={onChange}
    />
  );
};

export default ShortLongTermRentingCompany;
