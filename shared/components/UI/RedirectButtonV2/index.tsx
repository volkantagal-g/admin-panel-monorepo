import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { usePermission } from '@shared/hooks';
import useStyles from './styles';

type PropsTypes = {
  to: string;
  text?: string | number | React.ReactNode;
  target?: string;
  iconComponent?: React.ReactNode;
  permKey?: string;
  size?: 'large' | 'middle' | 'small';
  type?: 'dashed' | 'default' | 'ghost' | 'link' | 'primary' | 'text';
  [x: string]: any,
}

const RedirectButtonV2 = ({ to, text, target, iconComponent, permKey, size = 'small', type = 'default', ...otherButtonProps } : PropsTypes) => {
  const { canAccess } = usePermission();
  const classes = useStyles();
  if (
    !permKey ||
    (permKey && canAccess(permKey))
  ) {
    return (
      <Button
        size={size}
        type={type}
        icon={iconComponent}
        className={classes.button}
        {...otherButtonProps}
      >
        <Link to={to} target={target}>{text}</Link>
      </Button>
    );
  }

  return null;
};

RedirectButtonV2.defaultProps = {
  text: undefined,
  target: undefined,
  iconComponent: undefined,
  permKey: undefined,
  size: 'small',
  type: 'default',
};

export default RedirectButtonV2;
