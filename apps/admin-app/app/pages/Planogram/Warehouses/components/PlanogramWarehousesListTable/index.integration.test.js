import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { listPlanogramWarehousesSelector, getSizesSelector, getDemographiesSelector } from '@app/pages/Planogram/Warehouses/redux/selectors';
import PlanogramWarehousesListTable from '.';

describe('Warehouses List Table', () => {
  beforeAll(() => {
    const spyIsPending = jest.spyOn(listPlanogramWarehousesSelector, 'getIsPending');
    const spyIsPlanogram = jest.spyOn(listPlanogramWarehousesSelector, 'getData');
    spyIsPending.mockReturnValue(false);
    spyIsPlanogram.mockReturnValue([]);
    const spySizeIsPending = jest.spyOn(getSizesSelector, 'getIsPending');
    const spySizeIsPlanogram = jest.spyOn(getSizesSelector, 'getData');
    spySizeIsPending.mockReturnValue(false);
    spySizeIsPlanogram.mockReturnValue([]);
    const spyIsDemographyPending = jest.spyOn(getDemographiesSelector, 'getIsPending');
    const spyIsDemographyPlanogram = jest.spyOn(getDemographiesSelector, 'getData');
    spyIsDemographyPending.mockReturnValue(false);
    spyIsDemographyPlanogram.mockReturnValue([]);
  });
  afterAll(cleanup);

  describe('Warehouses List Table - PlanogramWarehousesListTable', () => {
    it('should have correct PlanogramWarehousesListTable table column', async () => {
      await renderComponent({
        ui: (
          <PlanogramWarehousesListTable
            formValues={{}}
            initialPagination={{ page: 1, pageSize: 10 }}
          />
        ),
      });
      expect(screen.getByText('Warehouse Name')).toBeInTheDocument();
      expect(screen.getByText('Demography')).toBeInTheDocument();
      expect(screen.getByText('Size')).toBeInTheDocument();
      expect(screen.getByText('Domain')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Type')).toBeInTheDocument();
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('Region')).toBeInTheDocument();
      expect(screen.getByText('Product Count')).toBeInTheDocument();
      expect(screen.getByText('Last Updated')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });
});
