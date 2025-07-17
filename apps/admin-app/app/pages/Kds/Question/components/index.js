import Loadable from '@shared/utils/loadable';

export const QuestionGroupSelection = Loadable(() => {
  return import('./QuestionGroupSelection');
});

export const ScoreMappingSelection = Loadable(() => {
  return import('./ScoreMappingSelection');
});

export const MultiChoiceQuestion = Loadable(() => {
  return import('./MultiChoiceQuestion');
});

export const NumberInputQuestion = Loadable(() => {
  return import('./NumberInputQuestion');
});
