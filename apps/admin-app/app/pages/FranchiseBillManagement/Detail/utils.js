import moment from 'moment';

export const isStringADate = string => moment(string, moment.ISO_8601, true).isValid();

export const camelCaseToUpperCase = str => str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
