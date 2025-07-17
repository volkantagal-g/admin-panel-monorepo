import { compose } from 'redux';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

type InjectionOptions = {
  key: string,
  reducer: Function
  saga: any;
  mode?: string;
}

export function injected<T extends React.FunctionComponent<P>, P>(element: T, { key, saga, mode, reducer }: InjectionOptions): T {
  const withSaga = injectSaga({ key, saga });
  const withReducer = injectReducer({ key, reducer });

  return compose(withReducer, withSaga)(element) as T;
}
