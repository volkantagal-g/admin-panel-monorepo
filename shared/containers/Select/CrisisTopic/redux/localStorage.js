import { REDUX_KEY } from '@shared/shared/constants';

const REDUCER_KEY = REDUX_KEY.SELECT.CRISIS_TOPIC;
export const CRISIS_TOPIC_LIST_LOCAL_STORAGE_KEY = `${REDUCER_KEY}_selectTopic`;
const TOPICS_LIST_EXPIRE_TIME = 1000 * 60 * 60 * 3;

export const getCrisisTopicsFromLocalStorage = () => {
  const now = new Date();
  let result = localStorage.getItem(CRISIS_TOPIC_LIST_LOCAL_STORAGE_KEY);
  if (result) {
    const parsedResult = JSON.parse(result);
    if (parsedResult.expiry > now.getTime()) {
      result = parsedResult.value;
    }
    else {
      result = null;
    }
  }
  return result;
};

export const setCrisisTopicListToLocalStorage = topicsList => {
  const now = new Date();
  const topicListLocalStorageValue = {
    value: topicsList,
    expiry: now.getTime() + TOPICS_LIST_EXPIRE_TIME,
  };
  localStorage.setItem(CRISIS_TOPIC_LIST_LOCAL_STORAGE_KEY, JSON.stringify(topicListLocalStorageValue));
};
