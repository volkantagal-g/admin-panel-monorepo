import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import { expectItemToBeSelected } from '@test/publicUtils/assertions';

import MarketProductGroupDetailForm from './index';
import { getMarketProductGroupSelector } from '@app/pages/MarketProduct/Group/Detail/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/Group/Detail/redux/actions';
import { PRODUCT_GROUP_HIERARCHY, PRODUCT_GROUP_PLACEMENT, PRODUCT_GROUP_TYPE } from '@app/pages/MarketProduct/constants';
import { getirMarketDomainTypes, productGroupHierarchies, productGroupPlacements, productGroupTypes } from '@app/pages/MarketProduct/constantValues';
import { rankingScenarioNamesSelector } from '@app/pages/MarketProduct/Group/redux/selectors';

const rankingScenarioNamesMock = [
  {
    label: 'PERSONAL CATEGORY - Buy Again',
    value: 'personel-category-buyagain',
  },
  {
    label: 'PERSONAL CATEGORY - Pick For You',
    value: 'personel-category-pick-for-you',
  },
  {
    label: 'DBL - Most Relevant Bundles',
    value: 'dbl-most-relevant-bundles',
  },
];

const mockedFilterScenarioNames = [rankingScenarioNamesMock[2]];

const manualProductGroupMock = {
  _id: '65c0ccf467fbe8e43f7be383',
  name: {
    tr: 'test name tr',
    en: 'test name en',
  },
  domainTypes: [
    1,
  ],
  activeness: false,
  type: PRODUCT_GROUP_TYPE.MANUAL,
  order: 12,
  placement: PRODUCT_GROUP_PLACEMENT.DBL,
  hierarchy: PRODUCT_GROUP_HIERARCHY.FALLBACK,
  abTestVariableName: 'a:b:c:d',
  abTestValueId: 'ab test value id',
  filterScenarioNames: mockedFilterScenarioNames.map(item => item.value),
};

const algorithmProductGroupMock = {
  ...manualProductGroupMock,
  order: 2,
  type: PRODUCT_GROUP_TYPE.ALGORITHM,
  algorithmScenarioName: rankingScenarioNamesMock[1].label,
  scenarioVariant: 'test scenario variant',
};

describe('Market Product/Product Groups/Detail/Form', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  describe.each([
    {
      type: 'Manual',
      productGroupMock: manualProductGroupMock,
    },
    {
      type: 'Algorithm',
      productGroupMock: algorithmProductGroupMock,
    },
  ])('$type Product Group', ({ productGroupMock }) => {
    afterAll(cleanup);

    const currentDomainType = productGroupMock.domainTypes[0];
    const currentType = productGroupMock.type;
    const currentHierarchy = productGroupMock.hierarchy;
    const currentPlacement = productGroupMock.placement;
    const currentOrder = productGroupMock.order.toString();
    const currentNameTR = productGroupMock.name.tr;
    const currentNameEN = productGroupMock.name.en;
    const currentABTestVariableName = productGroupMock.abTestVariableName;
    const currentABTestValueId = productGroupMock.abTestValueId;
    const currentDecisionEngineABScenarioVariant = productGroupMock.scenarioVariant;

    const currentPlacementName = productGroupPlacements[currentPlacement];
    const currentHierarchyName = productGroupHierarchies[currentHierarchy].en;
    const currentDomainTypeName = getirMarketDomainTypes[currentDomainType].en;
    const currentTypeName = productGroupTypes[currentType].en;

    it('should render correct values by default', async () => {
      const marketProductGroupSpy = jest.spyOn(getMarketProductGroupSelector, 'getData');
      marketProductGroupSpy.mockReturnValue(productGroupMock);
      const rankingScenarioNamesSpy = jest.spyOn(rankingScenarioNamesSelector, 'getData');
      rankingScenarioNamesSpy.mockReturnValue(rankingScenarioNamesMock);

      await renderComponent({ ui: <MarketProductGroupDetailForm /> });

      expectItemToBeSelected(currentDomainTypeName);
      expectItemToBeSelected(currentTypeName);
      expectItemToBeSelected(currentPlacementName);
      expectItemToBeSelected(currentHierarchyName);
      expectItemToBeSelected(mockedFilterScenarioNames[0].label);

      expect(screen.getByLabelText('Group Order')).toHaveValue(currentOrder);
      expect(screen.getByTestId('name.tr')).toHaveValue(currentNameTR);
      expect(screen.getByTestId('name.en')).toHaveValue(currentNameEN);
      expect(screen.getByLabelText('AB Test Variable Name')).toHaveValue(currentABTestVariableName);
      expect(screen.getByLabelText('AB Test Value Id')).toHaveValue(currentABTestValueId);

      screen.getByText('Group Details');
      screen.getByText('Filter Details');

      if (currentType === PRODUCT_GROUP_TYPE.ALGORITHM) {
        screen.getByText('Algorithm Details');
      }
    });

    it('only editable fields should turn on when Edit button is clicked', async () => {
      userEvent.click(screen.getByText('Edit'));

      expect(screen.getByLabelText('Group Type')).toBeDisabled();

      expect(screen.getByLabelText('Group Target')).toBeEnabled();
      expect(screen.getByLabelText('Group Order')).toBeEnabled();
      expect(screen.getByTestId('name.en')).toBeEnabled();
      expect(screen.getByTestId('name.tr')).toBeEnabled();
      expect(screen.getByLabelText('Group Placement')).toBeEnabled();
      expect(screen.getByLabelText('Group Hierarchy')).toBeEnabled();
      expect(screen.getByLabelText('AB Test Variable Name')).toBeEnabled();
      expect(screen.getByLabelText('AB Test Value Id')).toBeEnabled();
      expect(screen.getByLabelText('Filter Scenario Names')).toBeEnabled();

      if (currentType === PRODUCT_GROUP_TYPE.ALGORITHM) {
        expect(screen.getByLabelText('Algorithm Scenario Name')).toBeEnabled();
        expect(screen.getByLabelText('Decision Engine AB Scenario Variant')).toBeEnabled();
      }
    });

    it('should show copy button on required inputs', async () => {
      const formContainer = await screen.findByTestId('product-group-form');

      await Promise.all([
        ['AB Test Variable Name', currentABTestVariableName],
        ['AB Test Value Id', currentABTestValueId],
        ['Decision Engine AB Scenario Variant', currentDecisionEngineABScenarioVariant],
      ].map(async ([label, validInput]) => {
        if (validInput) {
          const input = await screen.findByLabelText(label);
          userEvent.clear(input);
          userEvent.type(input, validInput);
          userEvent.click(formContainer);
          const copyBtn = await screen.findByRole('button', { name: 'Copy to Clipboard' });
          userEvent.clear(input);
          expect(copyBtn).not.toBeInTheDocument();
        }
      }));

      const abTestVariableName = await screen.findByLabelText('AB Test Variable Name');
      const abTestValueId = await screen.findByLabelText('AB Test Value Id');

      userEvent.type(abTestVariableName, productGroupMock.abTestVariableName);
      userEvent.type(abTestValueId, productGroupMock.abTestValueId);

      if (currentType === PRODUCT_GROUP_TYPE.ALGORITHM) {
        const decisionEngineABScenarioVariant = await screen.findByLabelText('Decision Engine AB Scenario Variant');
        userEvent.type(decisionEngineABScenarioVariant, currentDecisionEngineABScenarioVariant);
      }
    });

    it('should give validation errors on required text inputs', async () => {
      const formContainer = screen.getByTestId('product-group-form');

      const nameTR = screen.getByTestId('name.tr');
      userEvent.type(nameTR, '{selectall}{backspace}');
      userEvent.click(formContainer);
      const nameTRError = await screen.findByText('Required.');
      userEvent.type(nameTR, productGroupMock.name.tr);
      userEvent.click(formContainer);
      await waitForElementToBeRemoved(nameTRError);

      const nameEN = screen.getByTestId('name.en');
      userEvent.type(nameEN, '{selectall}{backspace}');
      userEvent.click(formContainer);
      const nameENError = await screen.findByText('Required.');
      userEvent.type(nameEN, productGroupMock.name.en);
      expect(nameEN).toHaveValue(productGroupMock.name.en);
      await waitForElementToBeRemoved(nameENError);

      const order = screen.getByLabelText('Group Order');
      userEvent.type(order, '{selectall}{backspace}');
      userEvent.click(formContainer);
      const orderError = await screen.findByText('Invalid.');
      userEvent.type(order, '13');
      await waitForElementToBeRemoved(orderError);

      const abTestVariableName = screen.getByLabelText('AB Test Variable Name');
      userEvent.clear(abTestVariableName);
      userEvent.click(formContainer);
      const abTestVariableNameError = await screen.findByText('Required.');
      userEvent.type(abTestVariableName, 'a:b:c:d');
      await waitForElementToBeRemoved(abTestVariableNameError);

      const abTestValueId = screen.getByLabelText('AB Test Value Id');
      userEvent.clear(abTestValueId);
      userEvent.click(formContainer);
      const abTestValueIdError = await screen.findByText('Required.');
      userEvent.type(abTestValueId, 'ab test value id');
      await waitForElementToBeRemoved(abTestValueIdError);
    });

    it('should create action with correct values when submitted for changed inputs', async () => {
      const updateMarketProductGroupRequestSpy = jest.spyOn(Creators, 'updateMarketProductGroupRequest');

      const [
        groupTarget,,
        groupPlacement,
        groupHierarchy,
      ] = screen.getAllByRole('combobox');

      userEvent.click(groupTarget);
      userEvent.click(screen.getByText('GetirMore'));
      expectItemToBeSelected('GetirMore');

      userEvent.click(groupPlacement);
      userEvent.click(screen.getByText('Basket'));
      expectItemToBeSelected('Basket');

      userEvent.click(groupHierarchy);
      userEvent.click(screen.getByText('Primary'));
      expectItemToBeSelected('Primary');

      const changedNameTR = 'test name tr changed';
      const changedNameEN = 'test name en changed';

      const nameTR = screen.getByTestId('name.tr');
      const nameEN = screen.getByTestId('name.en');
      userEvent.type(nameTR, '{selectall}{backspace}');
      userEvent.type(nameTR, changedNameTR);
      userEvent.type(nameEN, '{selectall}{backspace}');
      userEvent.type(nameEN, changedNameEN);

      const changedOrder = '13';
      const order = screen.getByLabelText('Group Order');
      userEvent.type(order, '{selectall}{backspace}');
      userEvent.type(order, changedOrder);

      userEvent.click(screen.getByText('Save'));

      await waitFor(() => {
        expect(screen.queryByText('Required.')).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.queryByText('Invalid.')).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(updateMarketProductGroupRequestSpy).toHaveBeenCalledWith(
          {
            id: productGroupMock._id,
            body: {
              name: {
                tr: changedNameTR,
                en: changedNameEN,
              },
              order: 13,
              domainTypes: [
                3,
              ],
              hierarchy: PRODUCT_GROUP_HIERARCHY.PRIMARY,
              placement: PRODUCT_GROUP_PLACEMENT.BASKET,
            },
          },
        );
      });
    });
  });
});
