import * as Yup from 'yup';
import { get, isEmpty } from 'lodash';

import { QuestionTypes } from '@app/pages/Kds/constant';

export const defaultValues = {};

export const validationSchema = () => {
  return Yup.object().shape({});
};

export const validateForm = data => {
  let isValid = true;

  for (let i = 0; i < data?.questionGroups?.length; i += 1) {
    const questionGroup = data.questionGroups[i];
    for (let k = 0; k < questionGroup?.questions?.length; k += 1) {
      const question = questionGroup.questions[k];
      isValid = validateQuestion(question);
      if (!isValid) {
        return isValid;
      }
    }
  }

  return isValid;
};

export const validateQuestion = question => {
  if (question.questionType === QuestionTypes.NUMBER_INPUT) {
    if (isEmpty(question.answer)) {
      return false;
    }
  }
  else if (isEmpty(question.answer) ||
    (!Object.prototype.hasOwnProperty.call(question, 'files') || (question?.isPhotoForced && question?.files?.length === 0))) {
    return false;
  }
  return true;
};

export const answeredQuestionsLength = questionGroup => {
  let result = 0;
  const questions = get(questionGroup, 'questions', []);
  questions.forEach(question => {
    const isValid = validateQuestion(question);
    if (isValid) {
      result += 1;
    }
  });
  return result;
};
