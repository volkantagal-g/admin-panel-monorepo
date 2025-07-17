import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '@shared/components/Spinner';
import CardSubscriptionDetails from '../CardSubscriptionDetails';
import CardBillDetails from '../CardBillDetails';
import CardFranchiseInformation from '../CardFranchiseInformation';
import { franchiseBillDetailSelector } from '../../redux/selector';
import { Creators } from '../../redux/actions';

const FranchiseBillDetailPageContent = ({ billId }) => {
  const dispatch = useDispatch();

  const billData = useSelector(franchiseBillDetailSelector.getData);
  const isPendingGetBillData = useSelector(franchiseBillDetailSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getFranchiseBillDetailRequest({ billId }));
  }, [dispatch, billId]);

  if (isPendingGetBillData) return <Spinner />;

  return (
    <>
      <CardFranchiseInformation billData={billData} />
      <CardSubscriptionDetails billData={billData} />
      <CardBillDetails billData={billData} />
    </>
  );
};

export default FranchiseBillDetailPageContent;
