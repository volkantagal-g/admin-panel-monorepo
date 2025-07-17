import { take, all, fork } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { Types } from '../actions/toast';
import { t } from '@shared/i18n';
import { getErrorMessage } from '@shared/utils/common';

function* pendingMessage() {
  while (true) {
    const { message, toastOptions } = yield take(Types.PENDING);
    const options = { autoClose: 2000, ...toastOptions };
    toast.info(message || t('success:PENDING'), options);
  }
}

function* successMessage() {
  while (true) {
    const { message, toastOptions } = yield take(Types.SUCCESS);
    const options = { autoClose: 2000, ...toastOptions };
    toast.success(message || t('success:SUCCESS'), options);
  }
}

function* errorMessage() {
  while (true) {
    const params = yield take(Types.ERROR);
    const { error, message, toastOptions } = params;

    const options = { autoClose: 2000, ...toastOptions };

    let errMessage = message;

    // read microservice response errors
    if (!errMessage) {
      errMessage = getErrorMessage(error);
    }

    // read regular js errors from error object
    if (!errMessage && error) {
      errMessage = error.message;
    }

    toast.error(errMessage || t('error:UNKNOWN_ERROR'), options);
  }
}

function* dismissMessage() {
  while (true) {
    const { toastId } = yield take(Types.DISMISS);
    toast.dismiss(toastId);
  }
}

function* saga() {
  yield all([fork(successMessage), fork(errorMessage), fork(pendingMessage), fork(dismissMessage)]);
}

export default saga;
