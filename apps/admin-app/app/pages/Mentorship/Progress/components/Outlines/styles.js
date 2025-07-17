import { createUseStyles } from 'react-jss';

export default createUseStyles({
  textEditor: {
    marginBottom: 16,
    paddingBottom: 8,
    '& .ql-editor': { minHeight: 56 },
    '& .ql-editor:not(.ql-editor.ql-blank)': {
      minHeight: 90,
      padding: '8px 12px !important',
      '& ul': { paddingLeft: 0 },
    },
  },
});
