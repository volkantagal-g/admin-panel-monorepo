import { createUseStyles } from 'react-jss';

import { DEVELOPMENT_BG_COLOR } from '../../constants';

export default createUseStyles(theme => ({
  headerSearchButton: {
    backgroundColor: 'white !important',
    color: props => `${(props.isDev ? DEVELOPMENT_BG_COLOR : theme.color.primary)} !important`,
    width: '200px',
    '@media (max-width: 767px)': { width: '100px' },
  },
  overlayWrapper: {
    backgroundColor: 'white',
    width: '700px',
    maxHeight: '800px',
    overflow: 'auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    '@media (max-width: 767px)': {
      maxHeight: '70vh',
      maxWidth: '90vw',
    },

    '& .ant-tabs-tab-btn:focus': { color: '#8063c9' },
  },
}));
