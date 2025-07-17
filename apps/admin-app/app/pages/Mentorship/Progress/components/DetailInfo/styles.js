import { createUseStyles } from 'react-jss';

import { guiTheme } from '@shared/components/GUI/styles/guiThemes';
import BgSvg from './Bg.svg';

export default createUseStyles({
  root: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'relative',
    padding: '60px 16px',
    zIndex: 10,
    '&:before': {
      zIndex: -1,
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${BgSvg})`,
    },
    '& .ant-image-mask': { borderRadius: '50%' },
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '24px',
    margin: '8px 0',
    textTransform: 'capitalize',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '22px',
    padding: '12px 16px',
    borderRadius: 8,
    ...guiTheme.colors.secondary,
  },
});
