import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntSelect from '@shared/components/UI/AntSelect';
import { Creators } from '../../redux/actions';
import { getVehicleTypesSelectOptions } from './utils';
import useStyles from './styles';
import { getSelectedVehicleTypes } from '../../redux/selectors';

const Filters = () => {
  const { t } = useTranslation('localsCourierLiveMonitoringPage');
  const dispatch = useDispatch();
  const classes = useStyles();

  const selectedVehicleTypes = useSelector(getSelectedVehicleTypes);
  const vehicleTypeOptions = getVehicleTypesSelectOptions(t);

  const handleVehicleTypeChange = value => {
    dispatch(Creators.setSelectedVehicleTypes({ selectedVehicleTypes: value }));
  };

  return (
    <AntSelect
      size="small"
      mode="multiple"
      className={classes.vehicleTypeSelect}
      placeholder={t('FILTER_BY_VEHICLE_TYPE')}
      value={selectedVehicleTypes}
      onChange={handleVehicleTypeChange}
      options={vehicleTypeOptions}
    />
  );
};

export default Filters;
