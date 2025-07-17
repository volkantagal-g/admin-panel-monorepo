import { createUseStyles } from 'react-jss';

import bg from '@shared/assets/images/yandex_icon.svg';

export default createUseStyles({
  googleMapButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yandexMapButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${bg})`,
    fontSize: 0,
    backgroundPosition: 'center',
    backgroundSize: '35%',
    backgroundRepeat: 'no-repeat',
    width: '24px',
    '&:hover, &:active, &:focus': {
      backgroundImage: `url(${bg})`,
      backgroundPosition: 'center',
      backgroundSize: '35%',
      backgroundRepeat: 'no-repeat',
    },
  },
});
