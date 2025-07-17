import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { isEmpty } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { BagConstraintForm, Header } from './components';
import saga from '../redux/saga';
import reducer from '../redux/reducer';
import { Creators } from '../redux/actions';
import { masterCategoriesSelector } from '../redux/selectors';

const key = REDUX_KEY.BAG_CONSTRAINTS;

const AddConstraint = () => {
  const dispatch = useDispatch();

  const masterCategories = useSelector(masterCategoriesSelector.getData);
  useEffect(() => {
    if (isEmpty(masterCategories)) {
      dispatch(Creators.getMasterCategoriesRequest({}));
    }
  }, [dispatch, masterCategories]);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return (
    <>
      <Header />
      <BagConstraintForm />
    </>
  );
};

export default AddConstraint;
