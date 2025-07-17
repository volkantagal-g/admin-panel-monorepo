import { SLACK_WORKSPACES } from '@app/pages/BusinessAlertingTool/constants';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';

const SLACK_WORKSPACES_OPTIONS = {
  GETIR: { value: SLACK_WORKSPACES.GETIR },
  GETIR_DEV: { value: SLACK_WORKSPACES.GETIR_DEV },
};

export const getSlackWorkspacesOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: SLACK_WORKSPACES_OPTIONS,
  translationBaseKey: 'batAlertConditionCommon:SLACK_WORKSPACES',
});
