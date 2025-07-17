import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import Modal from './Modal';

const ProductsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Modal />
  );
};

const reduxKey = REDUX_KEY.PRODUCTS_LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ProductsList);
