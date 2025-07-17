import { createUseStyles } from 'react-jss';

export default createUseStyles({
  antDefaultForm: { '& .ant-form-item-explain': { height: '32px' } },
  textEditor: {
    '& .ql-editor': { height: '120px' },
    '& .ql-picker-label': { fontSize: '12px' },
    '& .ql-toolbar.ql-snow .ql-formats': { marginRight: '5px !important' },
    '& .ql-snow.ql-toolbar button, .ql-snow .ql-toolbar button': { width: '23px' },
    '& .ql-snow.ql-toolbar button, .ql-snow .ql-toolbar svg': { width: '23px' },
  },
});
