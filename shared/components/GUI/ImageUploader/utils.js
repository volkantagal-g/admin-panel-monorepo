import { DATA_UNIT_SIZE } from '@shared/shared/constants';
import { t } from '@shared/i18n';

const validateMaxWidth = (width, maxWidth) => (maxWidth ? maxWidth >= width : true);
const validateMinWidth = (width, minWidth) => (minWidth ? minWidth <= width : true);
const validateMaxHeight = (height, maxHeight) => (maxHeight ? maxHeight >= height : true);
const validateMinHeight = (height, minHeight) => (minHeight ? minHeight <= height : true);
const validateFileType = (file, supportedFileTypes) => supportedFileTypes.includes(file.type);

const validateRatio = (width, height, validImageRatios) => {
  if (!(Array.isArray(validImageRatios) && validImageRatios.length > 0)) {
    return true;
  }
  return validImageRatios.some(validImageRatio => {
    const [widthRation, heightRatio] = validImageRatio.split(':');
    return Number(widthRation) / Number(heightRatio) === width / height;
  });
};

const validateSize = (file, maxImageSizeInMB) => {
  const { BYTES_IN_A_KB, KBYTES_IN_A_MB } = DATA_UNIT_SIZE;
  const isImageSizeValid = file.size / BYTES_IN_A_KB / KBYTES_IN_A_MB < maxImageSizeInMB;
  return !(file && file.size && !isImageSizeValid);
};

export const validateImage = ({
  file,
  dimensions,
  validImageRatios,
  maxImageSizeInMB,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  supportedFileTypes,
}) => {
  const { width, height } = dimensions;
  let errBag = [];

  if (!validateRatio(width, height, validImageRatios)) {
    const message = t('error:VALID_IMAGE_RATIO', { imageRatios: validImageRatios.join(', ') });
    errBag = [...errBag, message];
  }
  if (!validateSize(file, maxImageSizeInMB)) {
    const message = t('error:VALID_IMAGE_SIZE', { imageSize: maxImageSizeInMB });
    errBag = [...errBag, message];
  }

  if (!validateMaxWidth(width, maxWidth)) {
    const message = t('error:VALID_IMAGE_MAX_WIDTH', { maxWidth });
    errBag = [...errBag, message];
  }

  if (!validateMinWidth(width, minWidth)) {
    const message = t('error:VALID_IMAGE_MIN_WIDTH', { minWidth });
    errBag = [...errBag, message];
  }

  if (!validateMaxHeight(height, maxHeight)) {
    const message = t('error:VALID_IMAGE_MAX_HEIGHT', { maxHeight });
    errBag = [...errBag, message];
  }

  if (!validateMinHeight(height, minHeight)) {
    const message = t('error:VALID_IMAGE_MIN_HEIGHT', { minHeight });
    errBag = [...errBag, message];
  }

  if (!validateFileType(file, supportedFileTypes)) {
    const message = t('error:VALID_FILE_TYPE', { types: supportedFileTypes.join(', ') });
    errBag = [...errBag, message];
  }

  return errBag;
};

export const getImageDimensions = file => {
  return new Promise(resolved => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', event => {
      const loadedImageUrl = event.target.result;
      const image = document.createElement('img');
      image.src = loadedImageUrl;
      image.addEventListener('load', () => {
        const { width, height } = image;
        resolved({ width, height });
      });
    });
  });
};
