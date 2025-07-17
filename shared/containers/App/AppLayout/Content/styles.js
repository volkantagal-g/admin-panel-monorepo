import { createUseStyles } from 'react-jss';

import { HEADER_HIGHT } from '../constants';

export default createUseStyles({
  appContent: {
    marginTop: HEADER_HIGHT,
    overflowX: 'hidden',
    transition: 'all 0.2s',
    padding: '.25rem',
    minHeight: `calc(100% - ${HEADER_HIGHT})`,
    // content should slide with sidebar on desktop
    marginLeft: props => props.sidebarWidth,
    '@media (min-width: 768px)': { width: props => props.desktopContentWidth },
    // content should be under the sidebar on mobile
    '@media (max-width: 768px)': { marginLeft: '0px !important', width: '100% !important' },
  },

});
