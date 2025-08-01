export const INITIAL_FORM_VALUES = {
  name: {
    tr: '',
    en: '',
  },
  description: {
    tr: '',
    en: '',
  },
  reportTags: [],
  reportOwners: [],
  isActive: false,
  scriptFile: '',
  parameters: [],
};

export const getInitialParameterValues = () => ({
  type: null,
  name: {
    tr: '',
    en: '',
  },
  variableName: '',
  fakeKey: Date.now(),
  // eslint-disable-next-line no-use-before-define
  dropdownOptions: [getInitialDropdownValues(), getInitialDropdownValues(1)],
});

export const getInitialDropdownValues = (extra = 0) => ({ fakeKey: Date.now() + extra, optionType: null, optionValue: '', optionName: '' });

export const TAG_VALUE_SEPARATOR = ';_;';
