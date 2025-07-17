import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    datePickerWidth: { width: '100%' },
    inputCol6: { '& .ant-form-item-control': { top: '-0.2rem' } },
    inputCol12: { '& .ant-form-item-with-help': { top: '-0.5rem', position: 'relative' } },
    costRow: { alignItems: 'center' },
  };
});
