import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage } from '@shared/hooks';

import { Creators } from '../redux/actions';

const useInitPage = () => {
  const dispatch = useDispatch();

  useInitAndDestroyPage({ dispatch, Creators });
};

export default useInitPage;
