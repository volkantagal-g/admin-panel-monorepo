import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import { payoutReportsSelector } from '../../redux/selectors';
import DetailCard from '../DetailCard';

const PayoutsForDomains = () => {
  const payoutReportsData = useSelector(payoutReportsSelector.getData);

  const payoutReportsIsPending = useSelector(
    payoutReportsSelector.getIsPending,
  );

  return (
    <div>
      {payoutReportsIsPending ? (
        <div className="text-center p-5">
          <Spin size="large" />
        </div>
      ) : (
        payoutReportsData?.Data?.map(payout => (
          <DetailCard key={payout.Bank} data={payout} />
        ))
      )}
    </div>
  );
};

export default PayoutsForDomains;
