import { cloneDeep } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { QuestionTypes } from '@app/pages/Kds/constant';

export const convertConstantValuesToSelectOptions = (values = {}, filterBy = '') => {
  if (filterBy) {
    return Object.entries(values[filterBy] || {}).map(([value, label]) => {
      return {
        value,
        label: label[getLangKey()] || label,
      };
    });
  }
  return Object.entries(values).map(([value, label]) => {
    return {
      value,
      label: label[getLangKey()] || label,
    };
  });
};

export const editRequest = answerOptions => {
  const inputValue = answerOptions;
  if (typeof inputValue === 'object') return inputValue;
  if (typeof inputValue === 'number') return [inputValue.toString()];
  return null;
};

const editScoreMappings = scoreMapping => {
  const editedScores = {};
  Object.entries(scoreMapping).forEach(domain => {
    const [key, value] = domain;
    if (value) {
      editedScores[key] = value;
    }
  });
  return editedScores;
};

export const updateQuestionDetailBody = (values, id) => {
  const formValues = cloneDeep(values);
  const scoreMapping = editScoreMappings(formValues.scoreMapping);
  if (formValues.questionType === QuestionTypes.NUMBER_INPUT) {
    const answerOptions = editRequest(formValues.answerOptions);
    delete formValues.notApplicableOptionAvailable;
    return { ...formValues, answerOptions, scoreMapping, _id: id };
  }
  return { ...formValues, scoreMapping, _id: id };
};

export const createNewQuestionBody = values => {
  const formValues = cloneDeep(values);
  const scoreMapping = editScoreMappings(formValues.scoreMapping);
  if (formValues.questionType === QuestionTypes.NUMBER_INPUT) {
    const updated = editRequest(formValues.answerOptions, formValues.questionType);
    delete formValues.notApplicableOptionAvailable;
    return { ...formValues, answerOptions: updated, scoreMapping };
  }
  return { ...formValues, scoreMapping };
};
