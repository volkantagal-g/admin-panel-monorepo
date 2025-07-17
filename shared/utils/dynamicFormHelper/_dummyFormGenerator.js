import { FormTypes } from '@shared/utils/dynamicFormHelper/components/DynamicForm/constants';

const sampleFormItems = [
  {
    groupName: 'PERSON_FORM.GROUP.GENERAL_INFORMATION',
    columns: 2,
    children: [
      {
        componentType: 'input',
        componentName: null,
        name: 'name',
        label: 'PERSON_FORM.NAME',
        placeholder: 'PERSON_FORM.NAME',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.NAME',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      },
      {
        componentType: 'input',
        componentName: null,
        name: 'lastName',
        label: 'PERSON_FORM.LASTNAME',
        placeholder: 'PERSON_FORM.LASTNAME',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.LASTNAME',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      },
      {
        componentType: 'date',
        componentName: null,
        name: 'birthday',
        label: 'PERSON_FORM.BIRTHDAY',
        placeholder: 'PERSON_FORM.BIRTHDAY',
        initialValue: undefined,
        editable: true,
        validations: [],
        validationType: 'date',
        backendValidationType: '',
      },
      {
        componentType: 'date',
        componentName: null,
        name: 'commencementDate',
        label: 'PERSON_FORM.COMMENCEMENT_DATE',
        placeholder: 'PERSON_FORM.COMMENCEMENT_DATE',
        initialValue: undefined,
        editable: true,
        validations: [],
        validationType: 'date',
        backendValidationType: '',
      },
      {
        componentType: 'input',
        componentName: null,
        name: 'nationalInsuarenceNo',
        label: 'PERSON_FORM.NATIONAL_NUMBER',
        placeholder: 'PERSON_FORM.NATIONAL_NUMBER',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.NATIONAL_NUMBER',
          },
          {
            type: 'test',
            validationName: 'isValidTcNo',
            params: 'PERSON_FORM.NATIONAL_NUMBER_NOT_VALID',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      },
      {
        componentType: 'input',
        componentName: null,
        name: 'iban',
        label: 'PERSON_FORM.IBAN',
        placeholder: 'PERSON_FORM.IBAN',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.IBAN',
          },
          {
            type: 'test',
            validationName: 'isValidIBAN',
            params: 'PERSON_FORM.IBAN_NOT_VALID',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      },
      {
        componentType: 'dropdown',
        componentName: 'SelectGender',
        name: 'gender',
        label: 'PERSON_FORM.GENDER',
        placeholder: 'PERSON_FORM.GENDER',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.GENDER',
          },
        ],
        validationType: 'number',
        backendValidationType: '',
      },
    ],
  },
  {
    groupName: 'PERSON_FORM.GROUP.CONTACT_INFORMATION',
    columns: 2,
    children: [
      {
        componentType: 'input',
        componentName: 'GsmNumberInput',
        name: 'gsm',
        label: 'PERSON_FORM.GSM',
        placeholder: 'PERSON_FORM.GSM',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.GSM',
          },
          {
            type: 'test',
            validationName: 'isValidGSM',
            params: 'PERSON_FORM.GSM_NOT_VALID',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      },
      {
        componentType: 'input',
        componentName: null,
        name: 'address',
        label: 'PERSON_FORM.ADDRESS',
        placeholder: 'PERSON_FORM.ADDRESS',
        rows: 4,
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.ADDRESS',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      },
      {
        componentType: 'input',
        componentName: null,
        name: 'email',
        label: 'PERSON_FORM.EMAIL',
        placeholder: 'PERSON_FORM.EMAIL',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'email',
            params: 'PERSON_FORM.EMAIL',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      },
    ],
  },
  {
    groupName: 'PERSON_FORM.GROUP.PERSONAL_INFORMATION',
    columns: 2,
    children: [
      {
        componentType: 'dropdown',
        componentName: 'SelectBloodType',
        name: 'bloodType',
        label: 'PERSON_FORM.BLOOD_TYPE',
        placeholder: 'PERSON_FORM.BLOOD_TYPE',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.BLOOD_TYPE',
          },
        ],
        validationType: 'number',
        backendValidationType: '',
      },
      {
        componentType: 'input',
        componentName: null,
        name: 'relativeName',
        label: 'PERSON_FORM.RELATIVE_NAME',
        placeholder: 'PERSON_FORM.RELATIVE_NAME',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.RELATIVE_NAME',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      },
      {
        componentType: 'dropdown',
        componentName: 'SelectRelativeStatus',
        name: 'relativeStatus',
        label: 'PERSON_FORM.RELATIVE_STATUS',
        placeholder: 'PERSON_FORM.RELATIVE_STATUS',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.RELATIVE_STATUS',
          },
        ],
        validationType: 'number',
        backendValidationType: '',
      },
      {
        componentType: 'input',
        componentName: 'GsmNumberInput',
        name: 'relativeGsm',
        label: 'PERSON_FORM.RELATIVE_GSM',
        placeholder: 'PERSON_FORM.RELATIVE_GSM',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'test',
            validationName: 'isValidGSM',
            params: 'PERSON_FORM.RELATIVE_GSM',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      },
    ],
  },
  {
    groupName: 'PERSON_FORM.GROUP.EMPLOYEE_INFORMATION',
    columns: 1,
    children: [
      {
        componentType: 'dropdown',
        componentName: 'SelectWorkerType',
        componentProps: {},
        name: 'workerType',
        label: 'PERSON_FORM.EMPLOYEE_TYPE',
        placeholder: 'PERSON_FORM.EMPLOYEE_TYPE',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.EMPLOYEE_TYPE',
          },
        ],
        validationType: 'number',
        backendValidationType: '',
      },
      {
        componentType: 'dropdown',
        componentName: 'SelectWorkType',
        componentProps: {},
        name: 'workType',
        label: 'PERSON_FORM.CONTRACT_TYPE',
        placeholder: 'PERSON_FORM.CONTRACT_TYPE',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.CONTRACT_TYPE',
          },
        ],
        validationType: 'number',
        backendValidationType: '',
      },
      {
        componentType: 'dropdown',
        componentName: 'SelectWarehouse',
        componentProps: { isFirstOptionSelected: false }, // should belong to only this component
        name: 'warehouses',
        label: 'PERSON_FORM.WAREHOUSE',
        placeholder: 'PERSON_FORM.WAREHOUSE',
        initialValue: undefined,
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'PERSON_FORM.WAREHOUSE',
          },
        ],
        validationType: 'string',
        backendValidationType: '',
      }],
  },
  {
    groupName: 'PERSON_FORM.GROUP.REQUIRED_DOCUMENTS',
    columns: 1,
    children: [{
      componentType: 'file',
      componentName: null,
      componentProps: { multiple: true, accept: 'image/png, image/jpeg,.pdf' },
      name: 'files',
      label: 'PERSON_FORM.FILES',
      placeholder: 'PERSON_FORM.FILES',
      initialValue: undefined,
      editable: true,
      validations: [
        {
          type: 'required',
          params: 'PERSON_FORM.FILES',
        },
      ],
      validationType: 'array',
      backendValidationType: '',
    }],
  },
];

const generateDummyForm = formType => ({
  formName: 'person',
  formType: FormTypes[formType],
  formItems: sampleFormItems,
  countryCode: '',
  submitEndPoint: {
    method: 'GET/POST',
    url: '',
  },
  initialValuesEndpoint: {
    method: '',
    url: '',
  },
  dependencyList: { description: { workerType: 'files' } },
});

export { generateDummyForm };
