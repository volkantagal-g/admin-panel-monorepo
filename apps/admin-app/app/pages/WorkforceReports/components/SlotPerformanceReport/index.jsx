import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import SlotReportsFilter from '../SlotReportsFilter';
import { slotPerformanceReportSelector } from '../../redux/selectors';

const SlotPerformanceFilter = () => {
  const dispatch = useDispatch();
  const isReportPending = useSelector(slotPerformanceReportSelector.getIsPending);

  const handleDownloadSlotPerformanceReports = (
    startDate,
    endDate,
    warehouseIds,
  ) => {
    dispatch(
      Creators.getSlotPerformanceReportRequest({
        startDate,
        endDate,
        warehouseIds,
      }),
    );
  };

  return (
    <SlotReportsFilter onReportDownload={handleDownloadSlotPerformanceReports} isReportPending={isReportPending} />
  );
};

export default SlotPerformanceFilter;
