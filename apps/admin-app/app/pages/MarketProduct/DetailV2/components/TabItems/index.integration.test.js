import '@testing-library/jest-dom';
import { getTabItems, TabLabel } from './index';
import { PRODUCT_DETAIL_TAB_ID } from '@app/pages/MarketProduct/constants';
import { filterValidationErrors } from '@app/pages/MarketProduct/utils';

jest.mock('@app/pages/MarketProduct/DetailV2/components/GeneralInfo', () => () => 'GeneralInfo');
jest.mock('@app/pages/MarketProduct/DetailV2/components/GalleryInfo', () => () => 'GalleryInfo');
jest.mock('@app/pages/MarketProduct/DetailV2/components/ProductInfo', () => () => 'ProductInfo');
jest.mock('@app/pages/MarketProduct/DetailV2/components/PricingInfo', () => () => 'PricingInfo');
jest.mock('@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo', () => () => 'SupplyAndLogisticInfo');

describe('getTabItems', () => {
  const mockT = key => key;
  const mockCanAccess = jest.fn();

  it('should return all tabs when user has pricing access', () => {
    mockCanAccess.mockReturnValue(true);
    const tabs = getTabItems({ t: mockT, validationErrors: [], canAccess: mockCanAccess });

    expect(tabs).toHaveLength(5);
    expect(tabs[0].key).toBe(PRODUCT_DETAIL_TAB_ID.GENERAL_INFO);
    expect(tabs[1].key).toBe(PRODUCT_DETAIL_TAB_ID.GALLERY_INFO);
    expect(tabs[2].key).toBe(PRODUCT_DETAIL_TAB_ID.PRODUCT_INFO);
    expect(tabs[3].key).toBe(PRODUCT_DETAIL_TAB_ID.PRICING_INFO);
    expect(tabs[4].key).toBe(PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO);
  });

  it('should not include pricing tab when user lacks access', () => {
    mockCanAccess.mockReturnValue(false);
    const tabs = getTabItems({ t: mockT, validationErrors: [], canAccess: mockCanAccess });

    expect(tabs).toHaveLength(4);
    expect(tabs.some(tab => tab.key === PRODUCT_DETAIL_TAB_ID.PRICING_INFO)).toBeFalsy();
  });

  it('should render TabLabel components with correct props', () => {
    mockCanAccess.mockReturnValue(true);
    const tabs = getTabItems({ t: mockT, validationErrors: [], canAccess: mockCanAccess });

    tabs.forEach(tab => {
      expect(tab.label.type).toBe(TabLabel);
      expect(tab.label.props.t).toBe(mockT);
      expect(tab.label.props.tabId).toBeDefined();
      expect(tab.label.props.label).toBeDefined();
      expect(tab.label.props.validationErrors).toEqual([]);
    });
  });

  it('should handle empty validationErrors array', () => {
    const filteredErrors = filterValidationErrors({
      validationErrors: [],
      tabId: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
    });

    expect(filteredErrors).toHaveLength(0);
  });
});
