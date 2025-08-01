import { createUseStyles } from 'react-jss';

import { primary, placeholder } from '@shared/components/GUI/styles/guiThemes';

export default createUseStyles({
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  floatingLabel: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'all 0.2s',
    pointerEvents: 'none',
    color: placeholder,
  },
  floatingLabelActive: {
    top: -8,
    left: 8,
    fontSize: 12,
    padding: '0 4px',
    backgroundColor: '#fff',
    color: primary,
  },
});
