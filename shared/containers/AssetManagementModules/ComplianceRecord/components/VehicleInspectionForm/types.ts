import { FORM_MODES } from '@app/pages/Employee/AssetManagement/constants';

export interface IVehicleInspectionFormProps {
    mode: keyof typeof FORM_MODES;
    vehicleInspection: any;
}
