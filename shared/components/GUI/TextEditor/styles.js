import { createUseStyles } from 'react-jss';

import { primaryText, guiTheme, primary } from '@shared/components/GUI/styles/guiThemes';

const { borderRadius, fontSize } = guiTheme.common.inputStyles;
const antdDisabledBorderColor = '#d9d9d9';
const antdDisabledTextColor = 'rgba(0, 0, 0, 0.65)';

export default createUseStyles(() => ({
  textEditorContainer: {
    '& .quill': {
      height: '100%',
      width: '100%',
    },
    '& .ql-disabled': { backgroundColor: '#f5f5f5' },
    '& .ql-snow': {
      transition: 'all 0.3s',
      borderColor: antdDisabledBorderColor,
    },
    '& .ql-container': {
      borderRadius,
      fontFamily: 'Source Sans Pro',
    },
    // removes border radius from the line between toolbar and editor
    '& .ql-container:has(.ql-editor[contenteditable="true"])': {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    },
    // border highlighting on hover
    '& .quill:has(.ql-editor[contenteditable="true"]):hover .ql-snow': { borderColor: primary },
    // border highlighting on focus, but with box shadow
    '& .quill:has(.ql-editor[contenteditable="true"]):focus-within .ql-snow': {
      borderColor: primary,
      boxShadow: '0 0 0 2px rgba(93, 62, 188, 0.2)',
    },
    '& .ql-container:has(.ql-editor[contenteditable="false"]) *': { cursor: 'not-allowed' },
    '& .ql-editor': {
      resize: 'vertical',
      color: primaryText,
      padding: '6px 12px',
      minHeight: 48,
      fontSize,
    },
    '& .ql-editor[contenteditable="false"]': { color: antdDisabledTextColor },
    // When TextEditor is disabled and there's text in it, this pushes the text down, preventing
    // it from overlapping with the language above
    '&& .ql-editor:not(.ql-editor.ql-blank)': { paddingTop: 24 },
    // When TextEditor is active and open, this undoes the above effect to display the component properly
    '&&& .ql-editor[contenteditable="true"]': { paddingTop: 6 },
    '&& .ql-toolbar': {
      borderColor: antdDisabledBorderColor,
      borderTopRightRadius: borderRadius,
      borderTopLeftRadius: borderRadius,
      paddingTop: 25,
      paddingLeft: 3,
    },
  },
  hideToolbar: { '& .ql-formats': { display: 'none !important' } },
}));
