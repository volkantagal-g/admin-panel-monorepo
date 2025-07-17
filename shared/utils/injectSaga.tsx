import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';

type InjectSagaParams = {
  key: string;
  saga: any;
  mode?: string;
};

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export default ({ key, saga, mode } : InjectSagaParams) => {
  return (WrappedComponent : React.FC) => {
    class InjectSaga extends React.Component {
      static WrappedComponent = WrappedComponent;

      static override contextType = ReactReduxContext;

      static displayName = `withSaga(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

      injectors: any;

      constructor(props: any, context: any) {
        super(props, context);

        this.injectors = getInjectors(context.store);

        this.injectors.injectSaga(key, { saga, mode }, this.props);
      }

      override componentWillUnmount() {
        this.injectors.ejectSaga(key);
      }

      override render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };
};

const useInjectSaga = ({ key, saga, mode } : InjectSagaParams) => {
  const context = React.useContext(ReactReduxContext);
  // we want this to run first so that the page is initialized
  React.useLayoutEffect(() => {
    const injectors = getInjectors(context.store);
    injectors.injectSaga(key, { saga, mode });

    return () => {
      injectors.ejectSaga(key);
    };
  }, [context.store, key, saga, mode]);
};

export { useInjectSaga };
