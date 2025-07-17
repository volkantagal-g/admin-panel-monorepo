import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import OverallStats from './components/OverallStats';
import WarehouseInfoTable from './components/WarehouseInfoTable';
import CourierInfoTable from './components/CourierInfoTable';
import ArtisanActiveOrders from './components/ArtisanActiveOrders';
import CourierPlanAndCountsTable from './components/CourierPlanAndCountsTable';
import RedBasketInfoTable from './components/RedBasketInfoTable';
import TotalCourierCountsTable from './components/TotalCourierCountsTable';
import TotalCourierCountsByLocationTable from './components/TotalCourierCountsByLocationTable';

import renderComponent from '@test/publicUtils/renderComponent';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  overallStats,
  selectedMarkerId,
  courierId,
  activeOrder,
  warehousesMap,
  couriersMap,
  selectedCouriersVehicleType,
  couriers,
  selectedCityWarehouses,
  warehouses,
  selectedCity,
  selectedCountry,
  redBasket,
} from './index.mock.data';
import PageComponent from '.';

const initialUrl = '/artisanOrder/liveMap';

describe('In Artisan Order Live Map Page:', () => {
  describe('For live map', () => {
    it('should render successfully ', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_ARTISAN_ORDER_LIVE_MAP,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
  });
  describe('<OverallStats /> Component', () => {
    it('Should render table', async () => {
      await renderComponent({
        ui:
  <OverallStats
    overallStats={overallStats}
    currentCityId={selectedCity}
    currentCountryId={selectedCountry}
  />,
      });
      const table = screen.getAllByText(/SHOW_OVERALL_STATS_TABLE/)[0];
      expect(table).toBeInTheDocument();
    });
  });
  describe('<WarehouseInfoTable /> Component', () => {
    it('Should render table', async () => {
      await renderComponent({ ui: <WarehouseInfoTable warehouseId={selectedMarkerId} /> });
      const table = screen.getAllByText(/Warehouse/)[0];
      expect(table).toBeInTheDocument();
    });
  });
  describe('<CourierInfoTable /> Component', () => {
    it('Should render table', async () => {
      await renderComponent(
        {
          ui: <CourierInfoTable
            courierId={courierId}
            warehousesMap={warehousesMap}
            couriersMap={couriersMap}
            activeOrders={activeOrder}
            onClose
          />,
        },
      );
      const table = screen.getAllByText(/Courier/)[0];
      expect(table).toBeInTheDocument();
    });
  });
  describe('<ArtisanActiveOrders /> Component', () => {
    it('Should render table', async () => {
      await renderComponent({ ui: <ArtisanActiveOrders activeOrders={activeOrder} /> });
      const table = screen.getAllByText(/Active Orders/)[0];
      expect(table).toBeInTheDocument();
    });
  });
  describe('<CourierPlanAndCountsTable /> Component', () => {
    it('Should render table', async () => {
      await renderComponent(
        {
          ui: <CourierPlanAndCountsTable
            activeOrders={activeOrder}
            selectedCourierVehicleTypes={selectedCouriersVehicleType}
            courierPlanAndCounts={{}}
            couriers={couriers}
            warehousesMap={warehousesMap}
            couriersMap={couriersMap}
            currentCityId={selectedCity}
            currentCountryId={selectedCountry}
            isActiveAllWarehouses={false}
            isDedicatedMarkersVisible
            isPoolMarkersVisible={false}
            selectedCityWarehouses={selectedCityWarehouses}
            selectedMarkerId={null}
            selectedMarkerType={null}
            warehouses={warehouses}
          />,
        },
      );
      const table = screen.getAllByText(/Total/)[0];
      expect(table).toBeInTheDocument();

      const courierCountsTable = screen.getByText('GL Dedicated');
      expect(courierCountsTable).toBeInTheDocument();

      const courierCountsTableByLocation = screen.getByText('GL Dedicated (TR)');
      expect(courierCountsTableByLocation).toBeInTheDocument();
    });
  });
  describe('<RedBasketInfoTable /> Component', () => {
    it('Should render table', async () => {
      await renderComponent(
        {
          ui: <RedBasketInfoTable
            order={redBasket}
          />,
        },
      );
      const table = screen.getAllByText(/Order/)[0];
      expect(table).toBeInTheDocument();
    });
  });
  describe('<TotalCourierCountsTable /> Component', () => {
    it('Should render table', async () => {
      await renderComponent(
        {
          ui: <TotalCourierCountsTable
            courierPlanAndCounts={{}}
            warehouses={warehouses}
            currentCityId={selectedCity}
            searchTerm=""
            expandableKeys={{}}
            selectedCourierVehicleTypes={selectedCouriersVehicleType}
          />,
        },
      );
      const table = screen.getAllByText(/Total/)[0];
      expect(table).toBeInTheDocument();
    });
  });
  describe('<TotalCourierCountsByLocationTable /> Component', () => {
    it('Should render table', async () => {
      await renderComponent(
        {
          ui: <TotalCourierCountsByLocationTable
            courierPlanAndCounts={{}}
            warehouses={warehouses}
            searchTerm=""
            currentCountryId="55999ad00000010000000000"
            expandableKeys={{}}
            selectedCourierVehicleTypes={selectedCouriersVehicleType}
          />,
        },
      );
      const table = screen.getAllByText(/Total/)[0];
      expect(table).toBeInTheDocument();
    });
  });
});
