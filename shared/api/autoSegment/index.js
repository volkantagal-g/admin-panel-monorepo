import axios from '@shared/axios/common';

export const getAutoSegmentTemplates = async ({ limit, offset, status }) => {
  const { data } = await axios.post('/autoSegment/getAutoSegmentTemplates', {
    limit,
    skip: offset,
    status,
  });
  return data;
};

export const createNewAutoSegmentTemplate = async ({ payload }) => {
  const { data } = await axios.post('/autoSegment/createNewAutoSegmentTemplate', { ...payload });
  return data;
};

export const getAutoSegmentTemplate = async ({ id }) => {
  const { data } = await axios.post('/autoSegment/getAutoSegmentTemplate', { id });
  return data;
};

export const updateAutoSegmentTemplate = async ({ id, updateData }) => {
  const { data } = await axios.post('/autoSegment/updateAutoSegmentTemplate', { id, updateData });
  return data;
};

export const activateAutoSegmentTemplateVersion = async ({ id, updateData }) => {
  const { data } = await axios.post('/autoSegment/activateAutoSegmentTemplateVersion', { id, updateData });
  return data;
};

export const activateAutoSegmentTemplate = async ({ id }) => {
  const { data } = await axios.post('/autoSegment/activateAutoSegmentTemplate', { id });
  return data;
};

export const deactivateAutoSegmentTemplate = async ({ id }) => {
  const { data } = await axios.post('/autoSegment/deactivateAutoSegmentTemplate', { id });
  return data;
};

export const getSegmentClientCounts = async ({ segments }) => {
  const { data } = await axios.post('/autoSegment/getSegmentClientCounts', { segments });
  return data;
};

export const getClientListTemplates = async () => {
  const { data } = await axios.post('/autoSegment/getClientListTemplates');
  return data;
};
