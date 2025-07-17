import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import PlanogramProductsListTable from '@app/pages/Planogram/Products/components/PlanogramProductsListTable/index';
import { getPlanogramProductListSelector, getSizesSelector, getDemographiesSelector } from '@app/pages/Planogram/Products/redux/selectors';

describe('PlanogramProduct/List/Table', () => {
  beforeAll(() => {
    const spyIsPending = jest.spyOn(getPlanogramProductListSelector, 'getIsPending');
    const spyIsPlanogram = jest.spyOn(getPlanogramProductListSelector, 'getData');
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

  describe('Products List Table', () => {
    it('should have correct PlanogramProductsListTable table column', async () => {
      await renderComponent({
        ui: (
          <PlanogramProductsListTable />
        ),
      });
      expect(screen.getByText('Product Id')).toBeInTheDocument();
      expect(screen.getByText('Product Name')).toBeInTheDocument();
      expect(screen.getByText('Demography')).toBeInTheDocument();
      expect(screen.getByText('Size')).toBeInTheDocument();
      expect(screen.getByText('Domain')).toBeInTheDocument();
      expect(screen.getByText('Segment')).toBeInTheDocument();
      expect(screen.getByText('Local')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Count')).toBeInTheDocument();
      expect(screen.getByText('Last Updated')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });
});
