import { useEffect, useState, memo } from 'react';
import { Select } from 'antd';

const DeliveryTime = ({ name, defaultValue, options: optionsProps, fieldValues, setFieldValue, disabled = false }) => {
  const [options, setOptions] = useState(optionsProps);

  const handleSelectChange = fieldName => {
    return selectedItem => {
      setFieldValue(`${name}[${fieldName}]`, selectedItem);
    };
  };

  useEffect(() => {
    if (fieldValues?.startTime || !defaultValue?.startTime) return;
    setFieldValue(`${name}['startTime']`, defaultValue.startTime);
    setFieldValue(`${name}['endTime']`, defaultValue.endTime);
  }, [defaultValue]);

  useEffect(() => {
    if ((optionsProps?.length > 0) && (options.length < 1)) {
      setOptions(() => optionsProps);
    }
  }, []);

  if (options?.length < 1) return 'loading...';
  
  return (
    <div className="flex-wrapper">
      <div className="num-cell">
        <Select
          value={fieldValues?.startTime} 
          options={options}
          disabled={disabled}
          onChange={handleSelectChange('startTime')} />
      </div>
      <div className="num-cell">
        <Select
          value={fieldValues?.endTime} 
          options={options}
          disabled={disabled}
          onChange={handleSelectChange('endTime')} />
      </div>
    </div>
  );
};

export default memo(DeliveryTime);