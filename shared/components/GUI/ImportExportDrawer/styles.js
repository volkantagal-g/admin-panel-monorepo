import { createUseStyles } from 'react-jss';

import { guiTheme, placeholder } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles(() => {
  return {
    group: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '8px',
    },
    option: {
      border: guiTheme.borders.imageBorder,
      '& label': {
        width: '100%',
        padding: '24px',
        '& .ant-radio': { marginRight: '12px' },
      },
    },
    explanation: { fontSize: '12px', color: placeholder },
  };
});
