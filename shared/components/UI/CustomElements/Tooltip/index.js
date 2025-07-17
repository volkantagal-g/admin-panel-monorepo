import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

import jssTheme from '@shared/jssTheme';

function TooltipUI({
  children,
  title,
  color,
  ...otherProps
}) {
  return (
    <Tooltip {...otherProps} color={color} title={title}>
      {children}
    </Tooltip>
  );
}

TooltipUI.propTypes = {
  children: PropTypes.element.isRequired,
  color: PropTypes.string,
  defaultVisible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  placement: PropTypes.oneOf(['top',
    'left',
    'right',
    'bottom',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'leftTop',
    'leftBottom',
    'rightTop',
    'rightBottom']),
  title: PropTypes.string.isRequired,
};

TooltipUI.defaultProps = {
  color: jssTheme.color.primary,
  defaultVisible: false,
  onVisibleChange: () => {},
  placement: 'bottom',
};

export default TooltipUI;
