import axios from '@shared/axios/common';

export const getNotes = async data => {
  const response = await axios({
    method: 'POST',
    url: '/note/getNotes',
    data,
  });
  return response.data;
};

export const createNote = async data => {
  const response = await axios({
    method: 'POST',
    url: '/note/createNote',
    data,
  });
  return response.data;
};

export const updateNote = async data => {
  const response = await axios({
    method: 'POST',
    url: '/note/updateNote',
    data,
  });
  return response.data;
};
