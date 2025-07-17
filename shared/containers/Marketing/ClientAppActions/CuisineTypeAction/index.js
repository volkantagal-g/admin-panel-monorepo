import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';
import ArtisanCuisineTypeSelect from '@shared/containers/Marketing/Select/ArtisanCuisineTypeSelect';

const CuisineTypeAction = ({ fieldName, disabled }) => {
  return (
    <ArtisanCuisineTypeSelect rules={rules.merchantType} fieldName={fieldName} disabled={disabled} />
  );
};

export default CuisineTypeAction;
