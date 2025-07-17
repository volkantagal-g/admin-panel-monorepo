import cn from 'classnames';
import { InfoCircleFilled } from '@ant-design/icons';

import useStyles from './styles';

/**
 * @typedef {object} Props
 * @prop {boolean} Props.hideIcon
 * @prop {'primary' | 'gray' | 'warning' | 'error' | 'success'} Props.variant
 * @param {Props & React.HtmlHTMLAttributes<HTMLDivElement>} props
 */
const HelperText = ({ className, variant, hideIcon, children, ...props }) => {
  const styles = useStyles();

  return (
    <div className={cn(styles.base, styles[variant], className)} {...props}>
      {!hideIcon && <InfoCircleFilled size={16} />}
      {children}
    </div>
  );
};

export default HelperText;
