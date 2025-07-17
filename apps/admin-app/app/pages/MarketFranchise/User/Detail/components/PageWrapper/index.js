import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '@shared/components/Spinner';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { franchiseUserDetailSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import Header from '../Header';
import Content from '../Content';

const FranchiseUserDetailPageWrapper = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const { canAccess } = usePermission();

  useEffect(() => {
    dispatch(Creators.getFranchiseUserDetailRequest({ userId }));
    dispatch(Creators.getFranchisesRequest());
    if (canAccess(permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_GROUP_LIST)) {
      dispatch(Creators.getRoleGroupsRequest());
    }
    if (canAccess(permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_LIST)) {
      dispatch(Creators.getRolesRequest());
    }
    if (canAccess(permKey.PAGE_MARKET_FRANCHISE_USER_REPORT_LIST)) {
      dispatch(Creators.getReportsRequest());
    }
  }, [dispatch, userId, canAccess]);

  const isPendingGetFranchiseUserDetail = useSelector(
    franchiseUserDetailSelector.getIsPending,
  );

  if (isPendingGetFranchiseUserDetail) return <Spinner />;

  return (
    <>
      <Header />
      <Content />
    </>
  );
};

export default FranchiseUserDetailPageWrapper;
