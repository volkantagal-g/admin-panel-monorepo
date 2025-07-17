import { createSelector } from 'reselect';

import { reduxKey } from '../constants';

export const isModalOpenSelector = createSelector(
  state => state?.[reduxKey],
  state => state?.isModalOpen,
);

export const getIsNewTodoSelector = { getData: state => state?.[reduxKey]?.isNewTodo };

export const getActiveTodoSelector = { getData: state => state?.[reduxKey]?.activeTodo };
