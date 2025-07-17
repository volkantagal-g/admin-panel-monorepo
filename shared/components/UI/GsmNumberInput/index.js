import { useState, useEffect } from 'react';
import { Input } from 'antd';

import SelectCountryDialingCode from '@shared/components/Select/CountryDialingCode';

const GsmNumberInput = ({ disabled, value, onChange }) => {
  const [gsmNumber, setGsmNumber] = useState('');
  const [countryCode, setCountryCode] = useState(undefined);

  const handleInputChange = e => {
    setGsmNumber(e.target.value);
  };

  const handleSelectChange = code => {
    setCountryCode(code);
  };

  useEffect(() => {
    if (!gsmNumber && !countryCode) {
      onChange(undefined);
    }
    else {
      onChange(`${countryCode}-${gsmNumber}`);
    }
  }, [gsmNumber, countryCode]);

  useEffect(() => {
    if (value) {
      const [code, number] = value.split('-');
      setCountryCode(code);
      setGsmNumber(number);
    }
  }, [value]);

  return (
    <div>
      <Input
        addonBefore={(
          <SelectCountryDialingCode
            isDisabled={disabled}
            isFirstOptionSelected={false}
            value={countryCode}
            onChange={code => handleSelectChange(code)}
          />
        )}
        value={gsmNumber}
        disabled={disabled}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default GsmNumberInput;
