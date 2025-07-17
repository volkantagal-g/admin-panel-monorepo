import { useEffect, useRef } from 'react';

/**
 * @param {function} fn
 * @param {array} array
 * @deprecated This custom hook prevents eslint errors to be visible
 *
 * This was written to solve AntTable initial render issue
 *
 * But now we have AntTableV2, which doesn't set pagination state on first render
 *
 * Summary: Don't run 'useEffect' hook on initial render.
 * @see https://getirdev.atlassian.net/wiki/spaces/PK/pages/1733919530/How+to+handle+dependency+array+of+React+hooks
 */
function useEffectSkipInitialRender(fn, array) {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // eslint-disable-next-line consistent-return
    return fn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, array);
}

export default useEffectSkipInitialRender;
