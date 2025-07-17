import { Button, Select } from 'antd';

import { t } from '@shared/i18n';

export function SelectWithSelectAll({ label, ...rest }: any) {
  const allOptions = rest.options.map((option: any) => option.value);
  const handleSelectAll = () => {
    rest.onChange(allOptions);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {label}
        <Button onClick={handleSelectAll} size="small">{t('SELECT_ALL')}</Button>
      </div>
      <Select {...rest} />
    </>
  );
}
