import { createUseStyles } from 'react-jss';

import bg from '@shared/assets/images/petal_grey_bg.svg';

export default createUseStyles({
  mainWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${bg})`,
  },
  loginCard: {
    borderRadius: 8,
    padding: 20,
    width: 490,
    height: 277,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  },
  magicLinkVisible: { height: 350 },
  noGetirEmailButton: { marginTop: 15 },
});
