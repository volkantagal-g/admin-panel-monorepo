import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import SlotReportsFilter from '../SlotReportsFilter';
import { slotSelectionReportSelector } from '../../redux/selectors';

const SlotSelectionReport = () => {
  const dispatch = useDispatch();
  const isReportPending = useSelector(slotSelectionReportSelector.getIsPending);

  const handleDownloadSlotSelectionReports = (
    startDate,
    endDate,
    warehouseIds,
  ) => {
    dispatch(
      Creators.getSlotSelectionReportRequest({
        startDate,
        endDate,
        warehouseIds,
      }),
    );
  };

  return (
    <SlotReportsFilter onReportDownload={handleDownloadSlotSelectionReports} isReportPending={isReportPending} />
  );
};

export default SlotSelectionReport;
