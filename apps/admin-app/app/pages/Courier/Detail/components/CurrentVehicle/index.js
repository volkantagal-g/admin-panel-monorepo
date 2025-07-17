import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Title } from '@app/pages/Person/Request/Detail/components';
import AntCard from '@shared/components/UI/AntCard';
import { marketVehicleTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

const CurrentVehicle = ({ data }) => {
  const { t } = useTranslation('courierPage');
  const langKey = getLangKey();

  const fleetVehiclePlate = get(data, 'fleetVehiclePlate', '-');
  const fleetVehicleType = get(data, 'fleetVehicleType');

  return (
    <AntCard
      bordered={false}
      title={t('CURRENT_VEHICLE')}
    >
      <Title>{t('CURRENT_VEHICLE')}:</Title>
      {`${fleetVehiclePlate}(${fleetVehicleType ? (marketVehicleTypes[fleetVehicleType][langKey] || fleetVehicleType) : '-'})`}
    </AntCard>
  );
};

CurrentVehicle.defaultProps = { data: {} };

CurrentVehicle.propTypes = { data: PropTypes.shape({}) };

export default CurrentVehicle;
