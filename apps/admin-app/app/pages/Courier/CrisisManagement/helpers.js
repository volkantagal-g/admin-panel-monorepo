import { useEffect } from 'react';

import { crisisMgmtTopicMap } from '@shared/shared/constantValues';

export const crisisMgmtTopics = Object.keys(crisisMgmtTopicMap).reduce(
  (a, value) => [
    ...a,
    {
      value,
      label: crisisMgmtTopicMap[value],
    },
  ],
  [],
);

export async function createReadFileList(filesToUpload = []) {
  const toUpload = await Promise.all(
    filesToUpload.map(file => new Promise(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.fileName = file.name;
        reader.onload = e => {
          try {
            const { result } = e.target;
            resolve({ ...file, result });
          }
          catch (err) {
            reject(err);
          }
        };
        reader.onerror = error => {
          reject(error);
        };
        reader.readAsDataURL(file.originFileObj); // from Antd Upload component
      },
    )),
  );
  return toUpload;
}

export function formatIncidentFilters({ type, topics, ...restFilters }, pagination = {}) {
  return {
    ...restFilters,
    topics: topics?.length ? topics.map(Number) : undefined,
    ...pagination,
  };
}

export function formatLogFilters({ type, cardNumbers, ...restFilters }, pagination = {}) {
  return {
    ...restFilters,
    cardNumbers: cardNumbers?.length ? cardNumbers : undefined,
    ...pagination,
  };
}

export function useInitDestroyContainer(dispatch, Creators) {
  useEffect(() => {
    dispatch(Creators.initContainer());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, Creators]);
}
