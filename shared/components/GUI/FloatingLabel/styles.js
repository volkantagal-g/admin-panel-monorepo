import { createUseStyles } from 'react-jss';

import { placeholder, primary } from '@shared/components/GUI/styles/guiThemes';

const labelHighlightSelector =
  '& input:not([value=""]) + .flabel,' +
  '& textarea:not(:empty) + .flabel,' +
  '& :focus-within > .flabel,' +
  '& input:focus + .flabel,' +
  '& textarea:focus + .flabel,' +
  '& .ant-select-focused + .flabel,' +
  '& .ant-input-number-focused + .flabel,' +
  '& .ant-input-number:has(input:not([value=""])) + .flabel,' +
  // Detects normal item on selector
  '& .ant-select:has(.ant-select-selection-item) + .flabel,' +
  // Detects tags on selector
  '& .ant-select:has(.ant-select-selection-overflow-item:not(.ant-select-selection-overflow-item-suffix)) + .flabel,' +
  '& .ant-input-number-affix-wrapper:has(input:not([value=""])) + .flabel,' +
  '& .quill:has(.ql-editor:not(.ql-blank)) + .flabel,' +
  '& .quill:has(.ql-editor[contenteditable="true"]) + .flabel';

export default createUseStyles({
  floatingLabelContainer: {
    position: 'relative',
    display: 'flex',
    '& .flabel': {
      color: placeholder,
      position: 'absolute',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '16px',
      transform: 'translate(0, 15px)',
      transformOrigin: 'top left',
      transition: 'all 200ms ease',
      left: '12px',
      zIndex: 1,
      pointerEvents: 'none',
    },
    [labelHighlightSelector]: {
      color: primary,
      transform: 'translate(0, 0)',
      fontSize: '12px',
      top: '6px',
      zIndex: 1,
      pointerEvents: 'none',
    },
  },
});
