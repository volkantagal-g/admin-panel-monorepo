import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../redux/actions';
import { filtersSelector } from '../redux/selectors';

export default function useRangePicker() {
  const dispatch = useDispatch();

  const startDate = useSelector(filtersSelector.getStartDate);
  const endDate = useSelector(filtersSelector.getEndDate);

  const handleDateChange = () => {
    return (instances, dates, info) => {
      if (!instances) {
        dispatch(Creators.setStartDate({ startDate: moment().startOf('day') }));
        dispatch(Creators.setEndDate({ endDate: moment().endOf('day') }));
        return;
      }

      if (info.range === 'start') {
        const [newStartDate = undefined] = dates;
        dispatch(Creators.setStartDate({ startDate: moment(newStartDate).startOf('day') }));
        return;
      }

      if (info.range === 'end') {
        const [, newEndDate = undefined] = dates;
        dispatch(Creators.setEndDate({ endDate: moment(newEndDate).endOf('day') }));
      }
    };
  };

  return { startDate, endDate, handleDateChange };
}
