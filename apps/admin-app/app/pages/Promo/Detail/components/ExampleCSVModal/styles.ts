import { createUseStyles } from 'react-jss';

import JssTheme from '@shared/jssTheme';

type ClassNames = 'iconButton' | 'container' | 'table' | 'modal'

export default createUseStyles<ClassNames, unknown, typeof JssTheme>(theme => {
  return {
    iconButton: theme.iconButton.type1,
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 },
    table: {
      touchAction: 'none',
      width: '100%',
      '& table': { width: '100% !important' },
      '& .ant-table-expanded-row-fixed': { width: '100% !important' },
      '& .ant-table-footer': { background: 'none' },
    },
    modal: { '& .ant-modal-body': { padding: '10px 16px' } },
  };
});
