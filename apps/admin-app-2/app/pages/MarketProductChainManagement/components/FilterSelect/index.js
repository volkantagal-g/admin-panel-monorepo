import React, { useCallback, useEffect, useRef } from 'react';

import { FormItem, Select } from '@shared/components/GUI';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import chevronDown from '@app/pages/MarketProductChainManagement/assets/Icons/chevron-down.svg';
import { getSelectFilterOption } from '@shared/utils/common';

const FilterSelect = React.memo(({
  name,
  label,
  form,
  mode = 'single',
  maxTagCount,
  optionsData = [],
  loading,
  onChange,
  defaultValue,
}) => {
  // Değer değişikliğini takip etmek için bir ref kullanıyoruz
  const valueChangedRef = useRef(false);

  // defaultValue varsa, form'a set et
  useEffect(() => {
    if (defaultValue !== undefined && form) {
      form.setFieldsValue({ [name]: defaultValue });
    }
  }, [defaultValue, form, name]);

  const handleChange = useCallback(value => {
    // console.log(`FilterSelect ${name} value changed:`, value);
    form.setFieldsValue({ [name]: value });
    // Değer değiştiğinde flag'i true yapıyoruz
    valueChangedRef.current = true;
    if (onChange) {
      onChange(value);
    }
    // Değer değiştiğinde doğrudan form submit ediyoruz
    form.submit();
  }, [form, name, onChange]);

  const handleBlur = useCallback(() => {
    // Sadece değer değiştiyse form submit ediyoruz
    if (valueChangedRef.current) {
      form.submit();
      // İşlem tamamlandıktan sonra flag'i sıfırlıyoruz
      valueChangedRef.current = false;
    }
  }, [form]);

  const { debouncedCallback } = useDebouncedCallback({
    callback: handleChange,
    delay: 300,
  });

  // Debug için
  useEffect(() => {
    // console.log(`FilterSelect ${name} optionsData:`, optionsData);
  }, [optionsData, name]);

  return (
    <FormItem name={name}>
      <Select
        label={label}
        id={name}
        name={name}
        autoComplete="off"
        allowClear
        showSearch
        mode={mode}
        maxTagCount={maxTagCount}
        filterOption={getSelectFilterOption}
        onChange={debouncedCallback}
        onBlur={handleBlur}
        suffixIcon={<img src={chevronDown} alt="chevron-down" />}
        optionsData={optionsData}
        loading={loading}
        defaultValue={defaultValue}
      />
    </FormItem>
  );
});

export default FilterSelect;
