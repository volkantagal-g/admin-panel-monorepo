import { createUseStyles } from 'react-jss';

import { HEADER_HIGHT } from '../../constants';

export default createUseStyles(theme => ({
  logoWrapper: {
    display: 'flex',
    textAlign: 'center',
    position: 'sticky',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_HIGHT,
    backgroundColor: props => (props.bgColor || theme.color.primary),
    width: '100%',
    color: 'white',
  },
}));
