import * as Yup from 'yup';
import { get } from 'lodash';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const validationSchema = () => {
  return Yup.object().shape({
    imageObject: Yup.object().shape({
      loadedImage: Yup.string().nullable(),
      file: Yup.mixed().nullable(),
      isDeleting: Yup.boolean().default(false),
    }),
  });
};

export const getInitialValues = (marketProductGroup = {}) => {
  return {
    imageObject: {
      loadedImage: get(marketProductGroup, 'picURL', ''),
      file: null,
      isDeleting: false,
    },
  };
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const initialImage = get(initialValues, 'imageObject.loadedImage', '');
  const currentImage = get(values, 'imageObject.loadedImage', '');
  const newFile = get(values, 'imageObject.file');
  const isDeleting = get(values, 'imageObject.isDeleting', false);
  const hasNewFile = !!newFile;
  const imageUrlChanged = initialImage !== currentImage;
  const imageRemoved = initialImage && !currentImage && !newFile;

  if (hasNewFile || imageUrlChanged || imageRemoved || isDeleting) {
    const { newValues: changedValues } = getDiffObj(initialValues, values);
    setNullToEmptyStringDeep(changedValues);
    return changedValues;
  }

  return null;
};
