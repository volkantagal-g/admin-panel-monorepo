import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  btnWrapper: {
    gap: 10,
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  datePickerWidth: { width: '100%' },
  formItem: { '& .ant-form-item-label > label': { marginBottom: 0 }, '& .ant-form-item-control': { width: '100%' } },
  '@global': { '.ant-select-item-option-content': { whiteSpace: 'normal', lineHeight: '16px' } },
}));
