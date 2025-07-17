import { memo, useMemo } from 'react';

import { Tooltip } from 'antd';

import { InfoCircleFilled } from '@ant-design/icons';

import PropTypes from 'prop-types';

import { placeholder } from '@shared/components/GUI/styles/guiThemes';

export const InfoIcon = memo(function InfoIcon({ color, margin, title, ...otherProps }) {
  const memoizedInfoIcon = useMemo(() => <InfoCircleFilled style={{ color, margin }} />, [color, margin]);

  if (title) {
    return <Tooltip {...otherProps} title={title}>{memoizedInfoIcon}</Tooltip>;
  }
  return memoizedInfoIcon;
});

InfoIcon.propTypes = {
  color: PropTypes.string,
  isArrowPointAtCenter: PropTypes.bool,
  margin: PropTypes.string,
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
};

InfoIcon.defaultProps = {
  color: placeholder,
  isArrowPointAtCenter: true,
  margin: '0px 4px',
  placement: 'right',
  title: undefined,
};
