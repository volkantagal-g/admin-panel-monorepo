import { Image as ImageAntd } from 'antd';
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import notFoundImage from '@shared/assets/GUI/Icons/Solid/photo.svg';
import useStyles from './styles';

export const Image = memo(function Image({
  alt,
  src,
  width,
  height,
  hasBorder,
  fallback,
  ...otherProps
}) {
  const classes = useStyles();

  const memoizedImage = useMemo(() => (
    <ImageAntd
      {...otherProps}
      alt={alt}
      src={src}
      fallback={fallback || notFoundImage}
      width={width}
      height={height}
    />
  ), [alt, fallback, height, otherProps, src, width]);

  if (hasBorder) {
    return (
      <div className={classes.imageBox}>
        {memoizedImage}
      </div>
    );
  }
  return memoizedImage;
});
Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  fallback: PropTypes.element,
  width: PropTypes.number,
  height: PropTypes.number,
  hasBorder: PropTypes.bool,
};
Image.defaultProps = {
  alt: 'image',
  src: 'error',
  fallback: undefined,
  width: undefined,
  height: undefined,
  hasBorder: false,
};
