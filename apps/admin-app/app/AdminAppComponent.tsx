import App from './app.tsx';
import ROUTE_COMPONENTS from './routeComponents';

const AdminAppComponent = () => {
  return <App routeComponentsMap={ROUTE_COMPONENTS}>
    <div id="root"></div>
  </App>;
};

export default AdminAppComponent; 