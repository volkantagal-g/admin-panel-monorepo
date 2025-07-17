import { Input } from 'antd';
import { forwardRef } from 'react';
import { flatMap, intersection } from 'lodash';
import { Moment } from 'moment';

import useModuleStyles from '@app/pages/Employee/AssetManagement/style';
import SelectVehicleBrand from '@app/pages/Employee/AssetManagement/components/Select/VehicleBrand';
import SelectVehicleModel from '@app/pages/Employee/AssetManagement/components/Select/VehicleModel';
import SelectVehicleModelYear from '@app/pages/Employee/AssetManagement/components/Select/VehicleModelYear';
import SelectVehicleFuelType from '@app/pages/Employee/AssetManagement/components/Select/VehicleFuelType';
import SelectRegistrationOwner from '@app/pages/Employee/AssetManagement/components/Select/RegistrationOwner';
import SelectCityOfCountry from '@app/pages/Employee/components/Select/City';
import SelectUser from '@shared/containers/Select/User';
import UniqueIdentifier from '@app/pages/Employee/AssetManagement/components/Select/UniqueIdentifier';
import SelectVehicleIsCommonCar from '@app/pages/Employee/AssetManagement/components/Select/VehicleIsCommonCar';
import SelectAssignableStatus from '@app/pages/Employee/AssetManagement/components/Select/AssignableStatus';
import SelectAssignableReasonStatus from '@app/pages/Employee/AssetManagement/components/Select/AssignableReasonStatus';
import S3Upload from '@app/pages/Employee/AssetManagement/components/Upload/S3Upload';
import FinancialLeasingCompany from '@app/pages/Employee/AssetManagement/components/Select/FinancialLeasingCompany';
import ShortLongTermRentingDateRange from '@app/pages/Employee/AssetManagement/components/Select/ShortLongTermRentingDateRange';
import ShortLongTermRentingCompany from '@app/pages/Employee/AssetManagement/components/Text/ShortLongTermRentingCompany';

import SelectVehicleTransmissionType from '@app/pages/Employee/AssetManagement/components/Select/VehicleTransmissionType';
import { COMPONENT_TYPES, FORM_MODES, VEHICLE_BRANDS_TO_MODELS_MAP, REGISTRATION_OWNERS } from '@app/pages/Employee/AssetManagement/constants';
import { IDynamicAssetInputProps } from '@app/pages/Employee/AssetManagement/types';
import { getLangKey } from '@shared/i18n.ts';
import SelectAssignmentStatus from '@app/pages/Employee/AssetManagement/components/Select/AssignmentStatus';
import DateRange from '@app/pages/Employee/AssetManagement/components/Select/DateRange';
import FinancialLeasingDateRange from '@app/pages/Employee/AssetManagement/components/Select/FinancialLeasingDateRange';
import { EffectedField } from '@app/pages/Employee/AssetManagement/components';

const DynamicAssetInput = forwardRef<HTMLInputElement, IDynamicAssetInputProps>(
  (
    {
      form,
      itemConfig,
      value,
      disabled,
      onChange,
      externalFormStates,
      mode,
    }: IDynamicAssetInputProps,
    ref,
  ) => {
    const moduleClasses = useModuleStyles();
    const componentType = itemConfig?.component?.type;
    const isUniqueIdentifierEnabled = itemConfig?.fieldName === 'uniqueIdentifier' && mode === FORM_MODES.EDIT;

    const registrationOwner = form?.getFieldValue('registrationOwner');
    const isRegistrationOwnerFinancialRenting = registrationOwner === (REGISTRATION_OWNERS.FINANCIAL_RENTING);
    const isRegistrationOwnerShortLongTermRenting = registrationOwner === (REGISTRATION_OWNERS.SHORT_LONG_TERM_RENTING);
    const isRegistrationOwnerGetir = registrationOwner === (REGISTRATION_OWNERS.GETIR);

    const handleBrandChange = (brandValue: number | number[]) => {
      if (typeof brandValue === 'object' && brandValue?.length > 0) {
        const modelValue = externalFormStates?.vehicleModel?.value;
        const modelValueFromBrand = flatMap((brandValue || [])?.map((brand : any) => VEHICLE_BRANDS_TO_MODELS_MAP[brand])) || [];
        const validModels = intersection(modelValueFromBrand, modelValue);

        externalFormStates?.vehicleBrand?.setValue(brandValue);
        externalFormStates?.vehicleModel?.setValue(validModels);
        form?.setFieldsValue({
          vehicleBrand: brandValue,
          vehicleModel: validModels,
        });
      }
      else {
        externalFormStates?.vehicleBrand?.setValue(brandValue);
        externalFormStates?.vehicleModel?.setValue(undefined);
        form?.setFieldsValue({
          vehicleBrand: brandValue,
          vehicleModel: undefined,
        });
      }

      form?.validateFields(['vehicleModel']);
      // @ts-ignore
      onChange(brandValue);
    };

    const handleModelChange = (modelValue: number) => {
      externalFormStates?.vehicleModel?.setValue(modelValue);
      form?.setFieldsValue({ vehicleModel: modelValue });
      // @ts-ignore
      onChange(modelValue);
    };

    const handleFinancialLeasingCompanyChange = (leasingCompany: number) => {
      externalFormStates?.financialLeasingCompany?.setValue(leasingCompany);
      form?.setFieldsValue({ financialLeasingCompany: leasingCompany });
      // @ts-ignore
      onChange(leasingCompany);
    };

    const handleFinancialLeasingDateChange = (date: [Moment | undefined, Moment | undefined]) => {
      externalFormStates?.financialLeasingValidationDate?.setValue(date);
      form?.setFieldsValue({ financialLeasingValidationDate: date });
      // @ts-ignore
      onChange(date);
    };

    const handleRentingDateChange = (date: [Moment | undefined, Moment | undefined]) => {
      externalFormStates?.shortLongTermRentingValidationDate?.setValue(date);
      form?.setFieldsValue({ shortLongTermRentingValidationDate: date });
      // @ts-ignore
      onChange(date);
    };

    const handleRegistrationOwnerChange = (registrationOwnerValue: number) => {
      externalFormStates?.registrationOwner?.setValue(registrationOwnerValue);
      form?.setFieldsValue({ registrationOwner: registrationOwnerValue });

      // @ts-ignore
      onChange(registrationOwnerValue);
      if (registrationOwnerValue === REGISTRATION_OWNERS.FINANCIAL_RENTING) {
        externalFormStates?.shortLongTermRentingCompany?.setValue(undefined);
        externalFormStates?.shortLongTermRentingValidationDate?.setValue(undefined);
        form?.setFieldsValue({
          shortLongTermRentingCompany: undefined,
          shortLongTermRentingValidationDate: undefined,
        });
      }
      if (registrationOwnerValue === REGISTRATION_OWNERS.SHORT_LONG_TERM_RENTING) {
        externalFormStates?.financialLeasingCompany?.setValue(undefined);
        externalFormStates?.financialLeasingValidationDate?.setValue(undefined);
        form?.setFieldsValue({
          financialLeasingCompany: undefined,
          financialLeasingValidationDate: undefined,
        });
      }
      if (registrationOwnerValue === REGISTRATION_OWNERS.GETIR) {
        externalFormStates?.shortLongTermRentingCompany?.setValue(undefined);
        externalFormStates?.shortLongTermRentingValidationDate?.setValue(undefined);
        form?.setFieldsValue({
          shortLongTermRentingCompany: undefined,
          shortLongTermRentingValidationDate: undefined,
        });
        externalFormStates?.financialLeasingCompany?.setValue(undefined);
        externalFormStates?.financialLeasingValidationDate?.setValue(undefined);
        form?.setFieldsValue({
          financialLeasingCompany: undefined,
          financialLeasingValidationDate: undefined,
        });
      }
    };

    const handleAssignStatusChange = (assignableStatusValue: number) => {
      externalFormStates?.assignableStatus?.setValue(assignableStatusValue);
      externalFormStates?.assignableStatusReason?.setValue(undefined);
      form?.setFieldsValue({ assignableStatus: assignableStatusValue, assignableStatusReason: undefined });
      // @ts-ignore
      onChange(assignableStatusValue);
    };

    const handleAssignStatusReasonChange = (assignableStatusReasonValue: number) => {
      externalFormStates?.assignableStatusReason?.setValue(assignableStatusReasonValue);
      form?.setFieldsValue({ assignableStatusReason: assignableStatusReasonValue });
      // @ts-ignore
      onChange(assignableStatusReasonValue);
    };

    switch (componentType) {
      case COMPONENT_TYPES.TEXT:
        return (
          <Input
            key={itemConfig?.fieldName}
            ref={ref}
            value={value}
            disabled={disabled || isUniqueIdentifierEnabled}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.VEHICLE_BRAND:
        return (
          <SelectVehicleBrand
            key={itemConfig?.fieldName}
            disabled={disabled}
            {...itemConfig?.component?.params}
            value={externalFormStates?.vehicleBrand?.value}
            className={moduleClasses.inputContainer}
            onChange={handleBrandChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.VEHICLE_MODEL:
        return (
          <SelectVehicleModel
            key={itemConfig?.fieldName}
            disabled={disabled}
            {...itemConfig?.component?.params}
            value={externalFormStates?.vehicleModel?.value}
            brand={externalFormStates?.vehicleBrand?.value}
            className={moduleClasses.inputContainer}
            onChange={handleModelChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.VEHICLE_MODEL_YEAR:
        return (
          <SelectVehicleModelYear
            key={itemConfig?.fieldName}
            disabled={disabled}
            {...itemConfig?.component?.params}
            value={value}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.VEHICLE_FUEL_TYPE:
        return (
          <SelectVehicleFuelType
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.VEHICLE_TRANSMISSION_TYPE:
        return (
          <SelectVehicleTransmissionType
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.REGISTRATION_OWNER:
        return (
          <SelectRegistrationOwner
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={externalFormStates?.registrationOwner?.value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={handleRegistrationOwnerChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.CITY:
        return (
          <SelectCityOfCountry
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={value}
            onChange={onChange}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.ASSIGNABLE_STATUS:
        return (
          <SelectAssignableStatus
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={externalFormStates?.assignableStatus?.value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={handleAssignStatusChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.ASSIGNABLE_STATUS_REASON:
        return (
          <SelectAssignableReasonStatus
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={externalFormStates?.assignableStatusReason?.value}
            assignableStatus={externalFormStates?.assignableStatus?.value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={handleAssignStatusReasonChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.VEHICLE_IS_COMMON_CAR:
        return (
          <SelectVehicleIsCommonCar
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.UPLOAD:
        return (
          <S3Upload
            key={itemConfig?.fieldName}
            value={value}
            form={form}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            disabled={disabled}
            folderPath={itemConfig?.component?.params?.folderPath}
          />
        );
      case COMPONENT_TYPES.ASSIGNMENT_STATUS:
        return (
          <SelectAssignmentStatus
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.FINANCIAL_LEASING_VALIDATION_DATE:
        return (
          <FinancialLeasingDateRange
            form={form}
            key={itemConfig?.fieldName}
            disabled={disabled || isRegistrationOwnerGetir || isRegistrationOwnerShortLongTermRenting}
            value={externalFormStates?.financialLeasingValidationDate?.value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={handleFinancialLeasingDateChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.FINANCIAL_LEASING_COMPANY:
        return (
          <FinancialLeasingCompany
            form={form}
            key={itemConfig?.fieldName}
            disabled={disabled || isRegistrationOwnerGetir || isRegistrationOwnerShortLongTermRenting}
            value={externalFormStates?.financialLeasingCompany?.value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={handleFinancialLeasingCompanyChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.SHORT_LONG_TERM_RENTING_VALIDATION_DATE:
        return (
          <ShortLongTermRentingDateRange
            form={form}
            key={itemConfig?.fieldName}
            disabled={disabled || isRegistrationOwnerFinancialRenting || isRegistrationOwnerGetir}
            value={externalFormStates?.shortLongTermRentingValidationDate?.value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={handleRentingDateChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.SHORT_LONG_TERM_RENTING_COMPANY:
        return (
          <ShortLongTermRentingCompany
            form={form}
            key={itemConfig?.fieldName}
            value={value}
            disabled={disabled || isRegistrationOwnerFinancialRenting || isRegistrationOwnerGetir}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.EFFECTED_FIELD:
        return (
          <EffectedField
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={value}
            {...itemConfig?.component?.params}
            options={itemConfig?.component?.options}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.DATE_RANGE:
        return (
          <DateRange
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={value}
            onChange={onChange}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.UNIQUE_IDENTIFIER:
        return (
          <UniqueIdentifier
            key={itemConfig?.fieldName}
            disabled={disabled}
            value={value}
            onChange={onChange}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            placeholder={itemConfig?.label?.[getLangKey()]}
          />
        );
      case COMPONENT_TYPES.USER_ID:
        return (
          <SelectUser
            key={itemConfig?.fieldName}
            value={value}
            {...itemConfig?.component?.params}
            className={moduleClasses.inputContainer}
            onChange={onChange}
            placeholder={itemConfig?.label?.[getLangKey()]}
            showSearch
          />
        );
      default:
        return null;
    }
  },
);

export default DynamicAssetInput;
