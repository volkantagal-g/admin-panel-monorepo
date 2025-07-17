import axios from '@shared/axios/common';
import { uploadToS3 } from '@shared/api/upload';

export const getMyFavoriteDocuments = async params => {
  const { data } = await axios({
    method: 'POST',
    url: '/panelDoc/getMyFavorites',
    data: params,
  });

  return data;
};

export const addFavorite = async ({ _id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/panelDoc/addFavorite',
    data: { _id },
  });

  return data;
};

export const removeFavorite = async ({ _id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/panelDoc/removeFavorite',
    data: { _id },
  });

  return data;
};

export const getByFilters = async ({ ids, searchText, pageId, componentId, populate, ...rest }) => {
  const response = await axios({
    method: 'POST',
    url: '/panelDoc/getByFilters',
    data: { ids, searchText, pageId, componentId, populate, ...rest },
  });
  return response.data;
};

export const getById = async ({ _id, populate }) => {
  const response = await axios({
    method: 'POST',
    url: '/panelDoc/getById',
    data: { _id, populate },
  });
  return response.data;
};

export const updateActiveness = async ({ _id, pageId, isActive }) => {
  const response = await axios({
    method: 'POST',
    url: '/panelDoc/updateActiveness',
    data: { _id, pageId, isActive },
  });
  return response.data;
};

export const updateHighlight = async ({ _id, pageId, isHighlighted }) => {
  const response = await axios({
    method: 'POST',
    url: '/panelDoc/updateHighlight',
    data: { _id, pageId, isHighlighted },
  });
  return response.data;
};

export const update = async ({ _id, pageId, isActive, ...updateFields }) => {
  const response = await axios({
    method: 'POST',
    url: '/panelDoc/update',
    data: { _id, pageId, isActive, ...updateFields },
  });
  return response.data;
};

export const removePanelDoc = async ({ _id, pageId }) => {
  const response = await axios({
    method: 'POST',
    url: '/panelDoc/delete',
    data: { _id, pageId },
  });
  return response.data;
};

export const createPanelDoc = async ({ name, pageId }) => {
  const response = await axios({
    method: 'POST',
    url: '/panelDoc/create',
    data: { name, pageId },
  });
  return response.data;
};

export const getSignedUrlForUpload = async ({ fileName, contentType, pageId }) => {
  const response = await axios({
    method: 'POST',
    url: '/panelDoc/getSignedUrlForUpload',
    data: { fileName, contentType, pageId },
  });
  return response.data;
};

// takes all files including previously uploaded files
// So that we don't lose the order of the files
// It doesn't re-upload files that are already uploaded
export const uploadFiles = async ({ files, pageId }) => {
  const signedUrlpromises = files.map(async file => {
    const { fileKey, fileName, contentType } = file;
    // skip already uploaded files (fileKey is defined)
    if (fileKey) {
      return null;
    }
    return getSignedUrlForUpload({ fileName, contentType, pageId });
  });

  const signedUrls = await Promise.all(signedUrlpromises);

  const uploadPromises = signedUrls.map(async (signedUrl, index) => {
    // skip null values, which means the file is already uploaded
    if (!signedUrl) {
      return files[index];
    }
    const { fileKey, url } = signedUrl;
    const { data } = files[index];
    await uploadToS3({ signedUrl: url, data });
    return { ...files[index], fileKey };
  });

  const uploadedFiles = await Promise.all(uploadPromises);

  return uploadedFiles;
};

export const deleteFiles = async ({ fileKeys, pageId }) => {
  const response = await axios({
    method: 'POST',
    url: '/panelDoc/deleteFiles',
    data: { fileKeys, pageId },
  });
  return response.data;
};
