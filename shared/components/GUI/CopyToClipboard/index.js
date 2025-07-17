import copy from 'copy-to-clipboard';

import { message, Tooltip } from 'antd';

import PropTypes from 'prop-types';

import { memo, useMemo } from 'react';

import { Tag } from '../Tag';
import useStyles from './styles';

import { t } from '@shared/i18n';

export const CopyToClipboard = memo(function CopyToClipboard({
  title,
  messageFromUser,
  placement,
  color,
  icon,
  children,
  isArrowPointAtCenter,
  size,
  ...otherProps
}) {
  const classes = useStyles({ title });

  const memoizedTag = useMemo(() => (
    <Tag
      className={classes.tag}
      {...otherProps}
      icon={icon}
      color={color}
      onClick={() => {
        copy(messageFromUser);
        message.success(`${t('global:COPIED_TO_CLIPBOARD')}: ${messageFromUser}`, 1);
      }}
    >
      <span className={classes.clipboard}>{children}</span>
    </Tag>
  ), [children, classes.clipboard, classes.tag, color, icon, messageFromUser, otherProps]);

  if (title) {
    return (
      <Tooltip
        title={title}
        placement={placement}
        arrowPointAtCenter={isArrowPointAtCenter}
      >
        {memoizedTag}
      </Tooltip>
    );
  }
  return memoizedTag;
});

CopyToClipboard.propTypes = {
  isArrowPointAtCenter: PropTypes.bool,
  messageFromUser: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'active', 'danger', 'inactive']),
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
  title: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),

};

CopyToClipboard.defaultProps = {
  isArrowPointAtCenter: true,
  color: 'primary',
  placement: 'right',
  title: undefined,
  size: 'medium',
};
