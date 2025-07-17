import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { dailyReportSelector } from '../../redux/selectors';

function CountsCard() {
  const dailyReportSelectorTotalCount = useSelector(dailyReportSelector.getTotalCount);
  const dailyReportSelectorIsPending = useSelector(dailyReportSelector.getIsPending);

  const { t } = useTranslation(['bankReconciliationReportPage']);

  return (
    <div className="w-25 p-4 mt-4 mb-4 bg-white">
      <Skeleton loading={dailyReportSelectorIsPending} paragraph={{ rows: 1 }}>
        <h6 className="font-weight-bold">
          {(t('TOTAL_COUNTS'))}
        </h6>
        <h6>
          {dailyReportSelectorTotalCount}
        </h6>
      </Skeleton>

    </div>
  );
}

export default CountsCard;
