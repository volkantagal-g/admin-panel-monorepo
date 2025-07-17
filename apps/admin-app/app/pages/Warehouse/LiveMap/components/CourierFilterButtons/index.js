import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { Creators } from '../../redux/actions';
import { filtersSelector } from '../../redux/selectors';
import { TEST_ID } from '@app/pages/Warehouse/LiveMap/constants';

const CourierFilterButtons = () => {
  const { t } = useTranslation(['warehouseBasedLiveMapPage']);
  const dispatch = useDispatch();

  const filters = useSelector(filtersSelector.getFilters);

  const handleShowCourierTypeChange = field => {
    dispatch(Creators.setFilterParams({
      filterParams: {
        showCouriers: {
          ...filters.showCouriers,
          [field]: !filters.showCouriers[field],
        },
      },
    }));
  };

  return (
    <div data-testid={TEST_ID.TOP_RIGHT_PANEL.COURIER_FILTER_BUTTONS_WRAPPER}>
      <Button
        className="w-100"
        size="small"
        type={filters.showCouriers.showBusyCouriers ? 'success' : 'default'}
        onClick={() => handleShowCourierTypeChange('showBusyCouriers')}
      >
        {t('warehouseBasedLiveMapPage:SHOW_BUSY_COURIERS')}
      </Button>
    </div>
  );
};

export default CourierFilterButtons;
