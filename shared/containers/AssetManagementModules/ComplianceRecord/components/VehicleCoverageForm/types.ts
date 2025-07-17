import { FORM_MODES } from '@app/pages/Employee/AssetManagement/constants';

export interface IVehicleCoverageFormProps {
  mode: keyof typeof FORM_MODES;
  vehicleCoverage: any;
}
