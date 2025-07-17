import { getLimitAndOffset } from '@shared/utils/common';
import { ALL_VALUE } from './constants';

export const getRequestParams = filters => {
  const params = {};
  const { description, active, title, rowsPerPage, currentPage, announcementType } = filters;

  const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });

  params.limit = limit;
  params.offset = offset;
  params.announcementType = announcementType;
  params.description = description;
  params.title = title;
  params.active = active === ALL_VALUE ? undefined : active;

  return params;
};

export const convertStringFromCamelCaseToUpperCase = str => str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
