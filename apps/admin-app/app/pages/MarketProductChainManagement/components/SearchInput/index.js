import { Input } from 'antd';
import React, { useCallback } from 'react';

import useStyles from '@app/pages/MarketProductChainManagement/components/SearchInput/styles';

import { FormItem } from '@shared/components/GUI';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import magnifyingGlass from '@app/pages/MarketProductChainManagement/assets/Icons/magnifying-glass.svg';

const SearchInput = React.memo(({ name, label, form }) => {
  const classes = useStyles();

  const handleChange = useCallback(value => {
    form.setFieldsValue({ [name]: value });

    if (value === undefined || value === null || value.trim() === '') {
      const prevValue = form.getFieldValue(name);
      if (prevValue && prevValue.trim() !== '') {
        form.submit();
      }
    }
    else {
      form.submit();
    }
  }, [form, name]);

  const handlePressEnter = useCallback(() => {
    form.submit();
  }, [form]);

  const { debouncedCallback } = useDebouncedCallback({
    callback: handleChange,
    delay: 500,
  });

  return (
    <FormItem name={name} className={classes.inputWrapper}>
      <Input
        placeholder={label}
        prefix={<img src={magnifyingGlass} alt="magnifying-glass" />}
        onChange={({ target }) => debouncedCallback(target.value)}
        onPressEnter={handlePressEnter}
        className={classes.textInput}
        allowClear
      />
    </FormItem>
  );
});

export default SearchInput;
