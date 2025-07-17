import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import SlotReportsFilter from '../SlotReportsFilter';
import { slotChangeLogReportSelector } from '../../redux/selectors';

const SlotChangeLogFilter = () => {
  const dispatch = useDispatch();
  const isReportPending = useSelector(slotChangeLogReportSelector.getIsPending);

  const handleDownloadSlotChangeLogReports = (
    startDate,
    endDate,
    warehouseIds,
  ) => {
    dispatch(
      Creators.getSlotChangeLogReportRequest({
        startDate,
        endDate,
        warehouseIds,
      }),
    );
  };

  return (
    <SlotReportsFilter onReportDownload={handleDownloadSlotChangeLogReports} isReportPending={isReportPending} />
  );
};

export default SlotChangeLogFilter;
