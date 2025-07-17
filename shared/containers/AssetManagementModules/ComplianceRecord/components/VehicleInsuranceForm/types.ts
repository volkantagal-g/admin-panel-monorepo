import { FORM_MODES } from '@app/pages/Employee/AssetManagement/constants';

export interface IVehicleInsuranceFormProps {
  mode: keyof typeof FORM_MODES;
  vehicleInsurance: any;
}
