import { Link } from 'react-router-dom';

import getirWhiteLogo from '@shared/assets/images/getir_white_logo.png';
import { inDevelopmentEnvironment } from '@shared/utils/common';
import useStyles from './styles';
import { DEVELOPMENT_BG_COLOR } from '../../constants';

export default function Logo() {
  const bgColor = inDevelopmentEnvironment ? DEVELOPMENT_BG_COLOR : null;
  const classes = useStyles({ bgColor });

  return (
    <div className={`${classes.logoWrapper} ${inDevelopmentEnvironment && 'development'}`}>
      <Link to="/">
        <img src={getirWhiteLogo} height={20} alt="logo" />
      </Link>
    </div>

  );
}
