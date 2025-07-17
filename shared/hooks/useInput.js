import { useState, useEffect } from 'react';

/**
 * @deprecated - Don't use this hook anymore.
 */
const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = event => {
    setValue(event?.target?.value);
  };

  const _setValue = val => {
    setValue(val);
  };

  return {
    value,
    setValue: _setValue,
    onChange: handleChange,
  };
};

export default useInput;
