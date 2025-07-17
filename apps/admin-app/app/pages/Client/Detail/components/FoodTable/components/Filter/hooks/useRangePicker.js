import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { foodOrdersSelector } from '@app/pages/Client/Detail/redux/selectors';

export default function useRangePicker() {
  const dispatch = useDispatch();

  const startDate = useSelector(foodOrdersSelector.getStartDate);
  const endDate = useSelector(foodOrdersSelector.getEndDate);

  const handleDateChange = () => {
    return (instances, dates, info) => {
      if (!instances) {
        dispatch(Creators.setStartDate({ startDate: moment().subtract(7, 'd').startOf('day') }));
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
