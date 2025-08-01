import { createUseStyles } from 'react-jss';

import { HEADER_HIGHT } from '../constants';

export default createUseStyles({
  appContent: {
    overflowX: 'hidden',
    transition: 'all 0.2s',
    // content should slide with sidebar on desktop
    marginLeft: props => props.sidebarWidth,
    // content should be under the sidebar on mobile
    '@media (max-width: 768px)': { marginLeft: '0px !important', width: '100% !important' },
  },

});
