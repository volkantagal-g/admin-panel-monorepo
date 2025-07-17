import { PARAMETER_TYPE } from '../../constants';

export function getInitialArrayValuesWithFakeKeys(reportType) {
  if (!reportType?.parameters?.length) return {};

  const parameters = reportType.parameters.map((parameter, index) => ({ ...parameter, fakeKey: index + 1 }));
  parameters.forEach(parameter => {
    if (parameter.type === PARAMETER_TYPE.dropdown) {
      // eslint-disable-next-line no-param-reassign
      parameter.dropdownOptions = parameter.dropdownOptions.map((option, index) => ({ ...option, fakeKey: index + 1 }));
    }
  });
  return { parameters };
}

export function getUpdateMessageMap({ t }) {
  return {
    error: {
      UPDATE_REPORT_TYPE: t('UPDATE_REPORT_TYPE_FAIL'),
      ADD_TAGS: t('ADD_TAGS_FAIL'),
      REMOVE_TAGS: t('REMOVE_TAGS_FAIL'),
    },
    success: {
      UPDATE_REPORT_TYPE: t('UPDATE_REPORT_TYPE_SUCCESS'),
      ADD_TAGS: t('ADD_TAGS_SUCCESS'),
      REMOVE_TAGS: t('REMOVE_TAGS_SUCCESS'),
    },
  };
}
