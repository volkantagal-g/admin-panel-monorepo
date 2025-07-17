import { createUseStyles } from 'react-jss';

import addonAfter from '@shared/styles/addonAfter';

export default createUseStyles(theme => ({
  disabledEditable: {
    backgroundColor: '#f5f5f5',
    userSelect: 'none',
  },
  textEditorContainer: {
    '& .ql-editor': {
      // maxHeight: 50,
      resize: 'vertical',
    },
    '& .ql-tooltip': { zIndex: 1000 },
  },
  textEditor: {
    padding: 10,
    border: '1px solid #d9d9d9',
  },
  iconButtonActive: {
    border: 'none',
    '& svg': { fill: 'black' },
  },
  iconButtonFaded: {
    border: 'none',
    '& svg': { fill: 'rgb(204, 204, 204)' },
  },
  ...addonAfter(theme),
}));
