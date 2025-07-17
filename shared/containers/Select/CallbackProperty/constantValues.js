import { CALLBACK_TYPES } from '@shared/containers/Select/CallbackProperty/constants';

export const callbackTypes = {
  [CALLBACK_TYPES.DATA]: {
    selectComponentName: 'dataCallbackUrlIdList',
    isCallbackUrlEnabledName: 'isDataCallbackUrlEnabled',
    label: 'global:DATA_CALLBACK_URL_ENABLED',
    tooltipLabel: 'global:DATA_CALLBACK_URL_ENABLED_TOOLTIP',
  },
  [CALLBACK_TYPES.STATUS]: {
    selectComponentName: 'statusCallbackUrlIdList',
    isCallbackUrlEnabledName: 'isStatusCallbackUrlEnabled',
    label: 'global:STATUS_CALLBACK_URL_ENABLED',
    tooltipLabel: 'global:STATUS_CALLBACK_URL_ENABLED_TOOLTIP',
  },
};
