import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.CALLBACK_PROPERTY;
export const getCallbackPropertiesSelector = { getData: state => state?.[reducerKey]?.callbackProperties };
