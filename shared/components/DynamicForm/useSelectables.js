import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

const useSelectables = ({ initialSelectables, label }) => {
  const areSelectablesAsync = typeof initialSelectables === 'function';

  const dispatch = useDispatch();
  const [asyncLoadedSelectables, setAsyncLoadedSelectables] = useState([]);
  // we need this distinction for modifying selectables by filters
  const [liveSelectables, setLiveSelectables] = useState([]);
  const [selectablesLoading, setSelectablesLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // when it is not async loaded
  useEffect(() => {
    if (!areSelectablesAsync) {
      setLiveSelectables(initialSelectables);
    }
  }, [areSelectablesAsync, initialSelectables]);

  useEffect(() => {
    if (areSelectablesAsync) {
      setLiveSelectables(asyncLoadedSelectables);
    }
  }, [areSelectablesAsync, asyncLoadedSelectables]);

  useEffect(() => {
    if (isError) {
      dispatch(ToastCreators.error({ message: `Failed Loading ${label} selects`, toastOptions: { autoClose: 3000 } }));
    }
  }, [isError, label, dispatch]);

  useEffect(() => {
    if (areSelectablesAsync) {
      const fetchSelectables = async () => {
        setSelectablesLoading(true);
        setIsError(false);
        try {
          const result = await initialSelectables();
          setAsyncLoadedSelectables(result);
          setSelectablesLoading(false);
        }
        catch (error) {
          console.error('useSelectables error');
          console.error(error);
          setSelectablesLoading(false);
          setIsError(true);
        }
      };

      fetchSelectables();
    }
  }, [areSelectablesAsync, initialSelectables]);

  const localInitialSelectables = areSelectablesAsync ? asyncLoadedSelectables : initialSelectables;

  return { localInitialSelectables, liveSelectables, setLiveSelectables, selectablesLoading };
};

export default useSelectables;
