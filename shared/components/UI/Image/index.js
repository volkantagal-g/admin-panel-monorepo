import { useState } from 'react';

import notFound from '@shared/assets/images/not-found.png';
import useStyles from './styles';

const Image = props => {
  const classes = useStyles();
  const { src = '', width, height, onClick, alt = 'image', showCursor = false, fallbackImage } = props;
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const isImageValid = src && !imageError;
  const isImageClickable = onClick && isImageValid;
  const imageClass = `${isImageClickable || showCursor ? classes.cursorPointer : classes.cursorAuto} mw-100 `;
  let image = isImageValid ? src : '';
  const extraProps = { ...(isImageClickable && { onClick }) };

  if (!image) {
    image = fallbackImage || notFound;
  }

  return (
    <img
      {...extraProps}
      onError={handleImageError}
      src={image}
      width={width}
      height={height}
      alt={alt}
      className={imageClass}
    />
  );
};

export default Image;
