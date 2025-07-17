import { useLayoutEffect } from 'react';
import { Action, Dispatch } from 'redux';

type ParamTypes = {
  dispatch: Dispatch<any>,
  Creators: {
    initPage: () => Action,
    destroyPage: () => Action
  }
}

const useInitAndDestroyPage = ({ dispatch, Creators }: ParamTypes) => {
  // we want this to run first so that the page is initialized
  useLayoutEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, Creators]);
};

export default useInitAndDestroyPage;
