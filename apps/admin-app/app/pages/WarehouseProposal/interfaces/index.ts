export interface IWarehouseProposalFormValues {
  applicant: IApplicant;
  property: IPropertyValues;
  photos: any[];
  videos: any[];
  note?: string;
  proposal?: IProposalValues;
  location: {
    lat: number | null;
    lon: number | null;
  };
  }

export interface IPropertyValues {
    city: string;
    district: string;
    neighborhood: string;
    addressDescription: string;
    street: string;
    buildingNo: string;
    netFloorSize: number | null;
    netBasementSize: number | null;
    netMezzanineSize: number | null;
    netTotalSize: number | null;
    rent: number | null;
    year: number | null;
    taxType: string | null;
    kind: string | null;
    hasOccupancyPermit: boolean;
    hasConstructionRegistration: boolean;
    note: string;
    country?: string;
  }

export interface IPropertyInfoFormProps {
    isDisabled: boolean;
    values: IPropertyValues;
    errors?: Record<string, string>;
    touched?: Record<string, boolean>;
    handleChange: (field: string, value: string | boolean | number) => void;
    onDetail?: boolean;
    note?: string;
  }

export interface IProposalValues {
    name: string;
  }
export interface IProposalInfoFormProps {
    isDisabled: boolean;
    values: IProposalValues;
    errors?: Record<string, string>;
    touched?: Record<string, boolean>;
    handleChange: (field: string, value: string | boolean | number) => void;
  }

export interface IApplicant {
    name: string;
    surname: string;
    gsm: string;
    email: string;
    isPropertyOwner: boolean;
    countryGsmCode: string;
  }

export interface IApplicantInfoFormProps {
    isDisabled: boolean;
    values: IApplicant;
    errors: {
      name: string;
      surname: string;
      gsm: string;
      email: string;
      isPropertyOwner: string;
    };
    touched: {
      name: boolean;
      surname: boolean;
      gsm: boolean;
      email: boolean;
      isPropertyOwner: boolean;
    };
    onEdit: boolean;
    handleChange: (fieldName: string, value: string | boolean) => void;
  }

export interface City {
  _id: string;
  name: Record<string, string>;
}

export interface SelectCitiesProps {
  value: string | { name: string };
  onChangeCallback: (value: string) => void;
  disabled?: boolean;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
}

export interface District {
  id: string;
  name: Record<string, string>;
}

export interface SelectDistrictProps {
  value: string;
  onChangeCallback: (value: string) => void;
  disabled?: boolean;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  city: string;
}

export interface Neighborhood {
  id: string;
  name: string;
}

export interface SelectNeighborhoodProps {
  value: string;
  onChangeCallback: (value: string) => void;
  disabled?: boolean;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  district: string;
}
