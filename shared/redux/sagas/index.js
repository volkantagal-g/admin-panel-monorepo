import { all, fork } from 'redux-saga/effects';

import init from './init';
import loadingBar from './loadingBar';
import auth from './auth';
import common from './common';
import core from './core';
import toast from './toast';
import countrySelection from './countrySelection';
import languageSelection from './languageSelection';
import planogramSelection from './planogram';
import franchiseCommon from './franchiseCommon';

export default function* root() {
  yield all([
    fork(init),
    fork(loadingBar),
    fork(auth),
    fork(core),
    fork(common),
    fork(toast),
    fork(countrySelection),
    fork(languageSelection),
    fork(planogramSelection),
    fork(franchiseCommon),
  ]);
}
