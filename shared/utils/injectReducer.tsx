import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

type InjectReducerParams = {
  key: string,
  reducer: Function,
};

/**
 * Dynamically injects a reducer
 */
export default ({ key, reducer } : InjectReducerParams) => {
  return (WrappedComponent: React.FC) => {
    class ReducerInjector extends React.Component {
      static WrappedComponent = WrappedComponent;

      static override contextType = ReactReduxContext;

      static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

      constructor(props: any, context: any) {
        super(props, context);

        getInjectors(context.store).injectReducer(key, reducer);
      }

      override render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
};

const useInjectReducer = ({ key, reducer } : InjectReducerParams) => {
  const context = React.useContext(ReactReduxContext);
  // we want this to run first so that the page is initialized
  React.useLayoutEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  }, [context.store, key, reducer]);
};

export { useInjectReducer };
