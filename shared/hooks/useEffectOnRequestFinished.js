import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { noop } from 'lodash';

import usePrevious from '@shared/hooks/usePrevious';

const useEffectOnRequestFinished = (requestSelector, onSuccess = noop, onError = noop) => {
  const isCurrentRequestPending = useSelector(requestSelector.getIsPending);
  const isPreviousRequestPending = usePrevious(isCurrentRequestPending);
  const error = useSelector(requestSelector.getError);

  useEffect(() => {
    if (isPreviousRequestPending && !isCurrentRequestPending) {
      if (error) {
        onError();
      }
      else {
        onSuccess();
      }
    }
  // NOTE: we don't include onSuccess and onError in effect dependency array so that devs
  // won't have to wrap onSuccess and onError in useCallback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPreviousRequestPending, isCurrentRequestPending]);
};

export default useEffectOnRequestFinished;
