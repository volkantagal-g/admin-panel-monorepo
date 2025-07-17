import { Button, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { Creators } from '../../../../redux/actions';
import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '@app/pages/GetirMarket/LiveMap/mixPanelEvents';

const CourierTypeButton = ({ courierType, showCourierType, children, tooltipText, showButton }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { buttonWrapper, bgGreen } = classes;

  const handleToggleButton = selectedCourierType => {
    dispatch(Creators.toggleShowCourierType({ courierType: selectedCourierType }));
    AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, { button: LIVE_MAP_EVENTS.COURIER_TYPES[selectedCourierType] });
  };

  if (!showButton) {
    return null;
  }

  return (
    <Tooltip title={tooltipText}>
      <Button
        size="small"
        className={[buttonWrapper, showCourierType && bgGreen]}
        onClick={() => handleToggleButton(courierType)}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default CourierTypeButton;
