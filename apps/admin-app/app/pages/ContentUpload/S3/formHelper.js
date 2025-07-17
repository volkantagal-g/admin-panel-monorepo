import * as Yup from 'yup';

import moment from 'moment';

import { contentUploadBuckets } from '@shared/shared/constantValues';

const randomFileName = lengthOfString => {
  const charMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < lengthOfString; i++) {
    text += charMap.charAt(Math.floor(Math.random() * charMap.length));
  }
  return text;
};

export const validationSchema = () => {
  const validation = {
    bucket: Yup.string().trim().required(),
    fileName: Yup.string().trim().required(),
  };
  return Yup.object().shape(validation);
};

export const getInitialValues = () => ({
  bucket: contentUploadBuckets.GETIR,
  folder: null,
  file: null,
  fileName: randomFileName(16),
  useOriginalFileName: true,
  addTimestamp: false,
});

export const getBucketsOptions = () => {
  return Object.entries(contentUploadBuckets).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value,
    };
  });
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values, document }) => {
  const { fileName, bucket, addTimestamp, useOriginalFileName } = values;
  let name = useOriginalFileName ? document?.name : fileName;
  if (addTimestamp) {
    name = `${name}_${moment().valueOf()}`;
  }
  return {
    ...document,
    fileName: name,
    bucket,
    folder: 'misc',
  };
};
