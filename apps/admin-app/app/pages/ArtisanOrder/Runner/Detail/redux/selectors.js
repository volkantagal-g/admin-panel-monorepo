import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GL_RUNNER_DETAIL;
const runnerByIdSelector = state => state?.[reducerKey]?.getRunnerById;
const updateRunnerSelect = state => state?.[reducerKey]?.updateRunner;
const getTasksByRunnerIdSelect = state => state?.[reducerKey]?.getTasksByRunnerId?.data?.data?.types;

export const getRunnerByIdSelector = {
  getData: createSelector(
    runnerByIdSelector,
    ({ data: { data } = {} }) => data,
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.getTasksByRunnerId,
    ({ isPending }) => isPending
    ,
  ),
};

export const getTasksByRunnerIdSelector = {
  getData: createSelector(
    getTasksByRunnerIdSelect,
    data => data?.sort(({ createdAt: date1 }, { createdAt: date2 }) => new Date(date2) - new Date(date1)) || [],
  ),
  getIsPending: createSelector(
    getTasksByRunnerIdSelect,
    ({ isPending } = {}) => isPending
    ,
  ),
};

export const updateRunnerSelector = {
  getData: createSelector(
    updateRunnerSelect,
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    updateRunnerSelect,
    ({ isPending }) => isPending,
  ),
};
