import { useTranslation } from 'react-i18next';
import { Dropdown, Button, Checkbox } from 'antd';
import { useState } from 'react';

import useStyles from './styles';
import { getActiveColumns, defaultColumns, columnOptions } from '../../../utils';
import { useClickOutside } from '@shared/hooks';

export default function ColumnsButton({ setVisibleColumns, allColumns }) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation(['paymentTransactionPage', 'global']);
  const classes = useStyles();
  const { ref } = useClickOutside({ outside: () => setVisible(false) });
  const menu = (
    <div ref={ref} className={classes.checkBoxMenu}>
      <Checkbox.Group
        className={classes.checkBoxGroup}
        options={columnOptions(allColumns)}
        defaultValue={defaultColumns(allColumns)}
        onChange={onChange}
      />
    </div>
  );
  function onChange(checkedValues = []) {
    setVisible(true);
    const copiedCustomColumns = allColumns.map(column => {
      const isActive = column.hideOnOptions || checkedValues.includes(column.value);
      return { ...column, isActive };
    });
    setVisibleColumns(getActiveColumns(copiedCustomColumns));
  }
  return (

    <Dropdown visible={visible} placement="bottomLeft" arrow overlay={menu} trigger={['click']}>
      <Button onClick={() => setVisible(true)}>{t('paymentTransactionPage:COLUMNS')}</Button>
    </Dropdown>
  );
}
