import { InputNumber } from 'antd';

import { currency, handleKeyDownForPriceInput } from '@shared/utils/common';

const InputPrice = props => {
  const handleFormatter = (value, info) => {
    if (info?.input?.includes(',')) {
      return info?.input?.replace(/,/g, '.');
    }
    return value;
  };

  const handleParser = value => {
    if (value.includes(',')) {
      return value.replace(/,/g, '.');
    }
    return value;
  };

  return (
    <InputNumber
      addonAfter={currency()}
      onKeyDown={handleKeyDownForPriceInput}
      formatter={handleFormatter}
      parser={handleParser}
      {...props}
    />
  );
};

export default InputPrice;
