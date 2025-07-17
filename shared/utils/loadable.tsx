import React from 'react';
import loadable from '@loadable/component';

import { SPINNER } from '@shared/shared/constants';
import Spinner from '@shared/components/Spinner';
import EmptyDiv from '@shared/components/EmptyDiv';

const Loadable = (importFunction : () => any, spinnerType = SPINNER.DEFAULT, options = {}) => {
  let fallback;
  switch (spinnerType) {
    case SPINNER.DEFAULT:
      fallback = <Spinner />;
      break;
    case SPINNER.EMPTY:
      fallback = <EmptyDiv />;
      break;
    default:
      fallback = <Spinner />;
      break;
  }
  const newOptions = {
    fallback,
    ...options,
  };
  return loadable<any>(importFunction, newOptions);
};

export default Loadable;
