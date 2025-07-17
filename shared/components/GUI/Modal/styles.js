import { createUseStyles } from 'react-jss';

import { primary } from '../styles/guiThemes';

export default createUseStyles({
  modal: props => ({
    '& .ant-modal-header, & .ant-modal-content': { borderRadius: '8px !important' },
    '& .ant-modal-header': { borderBottom: 'none' },
    '& .ant-modal-footer': { borderTop: 'none', marginTop: 24 },
    '& .ant-modal-body': { paddingTop: 0, paddingBottom: 0 },
    '& .ant-modal-title': {
      fontWeight: 700,
      fontSize: '16px',
      color: primary,
      ...(props.centerTitle ? { textAlign: 'center' } : undefined),
    },

  }),
});
