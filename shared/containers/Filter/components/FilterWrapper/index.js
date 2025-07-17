import { Fragment, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Filter/redux/reducer';
import saga from '@shared/containers/Filter/redux/saga';

import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from '@shared/containers/Filter/redux/actions';
import { getIsFiltersInitialized } from '@shared/containers/Filter/redux/selectors';
import { createChildrenWithFilterKeyProp } from './utils';

const FilterWrapper = ({ children, filterKey }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('filterComponent');

  if (isEmpty(filterKey)) {
    throw new Error(t('FILTER_KEY_IS_REQUIRED', { componentName: 'FilterWrapper' }));
  }

  if (typeof filterKey !== 'string') {
    throw new Error(t('INVALID_FILTER_KEY_TYPE', { componentName: 'FilterWrapper', filterKey }));
  }

  const isStateInitialized = useSelector(getIsFiltersInitialized);
  const childrenWithProps = useMemo(
    () => (isStateInitialized ? createChildrenWithFilterKeyProp(children, filterKey) : null),
    [children, filterKey, isStateInitialized],
  );

  useEffect(() => {
    dispatch(Creators.initFilter(filterKey));
    return () => dispatch(Creators.destroyFilter());
  }, [dispatch, filterKey]);

  return isStateInitialized ? <Fragment key={filterKey}>{childrenWithProps}</Fragment> : null;
};

FilterWrapper.propTypes = { filterKey: PropTypes.string.isRequired };

const reduxKey = REDUX_KEY.FILTER;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FilterWrapper);
