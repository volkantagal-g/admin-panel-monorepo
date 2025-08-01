/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// I should test inputs and their errors one-by-one in order instead of jest's parallel executor of Promise.all
// because input errors aren't associated with inputs in an accessible way with aria-describedby
import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import { expectItemToBeSelected } from '@test/publicUtils/assertions';
import { Creators } from '@app/pages/MarketProduct/Group/New/redux/actions';

import MarketProductGroupNewForm from './index';

import { getirMarketDomainTypes, productGroupHierarchies, productGroupPlacements, productGroupTypes } from '@app/pages/MarketProduct/constantValues';
import { PRODUCT_GROUP_HIERARCHY, PRODUCT_GROUP_PLACEMENT, PRODUCT_GROUP_TYPE } from '@app/pages/MarketProduct/constants';
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

const manualProductGroupMock = {
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
  filterScenarioNames: [rankingScenarioNamesMock[0].value, rankingScenarioNamesMock[2].value],
};

const algorithmProductGroupMock = {
  ...manualProductGroupMock,
  order: 2,
  type: PRODUCT_GROUP_TYPE.ALGORITHM,
  algorithmScenarioName: rankingScenarioNamesMock[1].value,
  scenarioVariant: 'test scenario variant',
};

describe('Market Product/Product Groups/New/Form', () => {
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

    const currentAlgorithmScenarioNameValue = productGroupMock.algorithmScenarioName;
    const currentAlgorithmScenarioNameLabel = rankingScenarioNamesMock.find(
      ({ value }) => value === currentAlgorithmScenarioNameValue,
    )?.label;

    it('should render correct fields per selected type', async () => {
      const rankingScenarioNamesSpy = jest.spyOn(rankingScenarioNamesSelector, 'getData');
      rankingScenarioNamesSpy.mockReturnValue(rankingScenarioNamesMock);

      await renderComponent({ ui: <MarketProductGroupNewForm /> });
      expect(screen.getByLabelText('Group Target')).toBeInTheDocument();
      expect(screen.getByLabelText('Group Type')).toBeInTheDocument();
      expect(screen.getByLabelText('Group Placement')).toBeInTheDocument();
      expect(screen.getByLabelText('Group Hierarchy')).toBeInTheDocument();
      expect(screen.getByLabelText('Filter Scenario Names')).toBeInTheDocument();

      expect(screen.getByLabelText('Group Order')).toBeInTheDocument();
      expect(screen.getByTestId('name.tr')).toBeInTheDocument();
      expect(screen.getByTestId('name.en')).toBeInTheDocument();
      expect(screen.getByLabelText('AB Test Variable Name')).toBeInTheDocument();
      expect(screen.getByLabelText('AB Test Value Id')).toBeInTheDocument();

      screen.getByText('Group Details');
      screen.getByText('Filter Details');

      if (currentType !== PRODUCT_GROUP_TYPE.MANUAL) {
        const formContainer = await screen.findByTestId('product-group-form');
        const [
          , groupType,
        ] = within(formContainer).getAllByRole('combobox');
        userEvent.click(groupType);
        const groupTypeOption = screen.getByText(currentTypeName);
        userEvent.click(groupTypeOption);
        expectItemToBeSelected(currentTypeName);

        screen.getByText('Algorithm Details');
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
    });

    it('should give validation errors on required inputs', async () => {
      cleanup();
      const marketProductGroupSpy = jest.spyOn(rankingScenarioNamesSelector, 'getData');
      marketProductGroupSpy.mockReturnValue(rankingScenarioNamesMock);
      await renderComponent({ ui: <MarketProductGroupNewForm /> });

      const formContainer = screen.getByTestId('product-group-form');

      // select correct group type if we aren't testing default manual product group type
      if (currentType !== PRODUCT_GROUP_TYPE.MANUAL) {
        const [
          , groupType,
        ] = within(formContainer).getAllByRole('combobox');
        userEvent.click(groupType);
        const groupTypeOption = screen.getByText(currentTypeName);
        userEvent.click(groupTypeOption);
        expectItemToBeSelected(currentTypeName);
      }

      const [
        groupTarget,,
        groupPlacement,
        groupHierarchy,
        algorithmScenarioName,
      ] = screen.getAllByRole('combobox');

      const selectBoxes = [
        [groupTarget, currentDomainTypeName],
        [groupPlacement, currentPlacementName],
        [groupHierarchy, currentHierarchyName],
        [algorithmScenarioName, currentAlgorithmScenarioNameLabel],
      ];

      for (const [input, validOptionText] of selectBoxes) {
        if (input && validOptionText) {
          userEvent.click(input);
          userEvent.click(formContainer);
          const error = await screen.findByText('Required.');
          userEvent.click(input);
          const validOption = screen.getByText(validOptionText);
          userEvent.click(validOption);
          expectItemToBeSelected(validOptionText);
          await waitForElementToBeRemoved(error);
        }
      }

      const inputs = [
        [screen.getByTestId('name.tr'), currentNameTR],
        [screen.getByTestId('name.en'), currentNameEN],
        [screen.getByLabelText('Group Order'), currentOrder],
        [screen.getByLabelText('AB Test Variable Name'), currentABTestVariableName],
        [screen.getByLabelText('AB Test Value Id'), currentABTestValueId],
        [screen.queryByLabelText('Decision Engine AB Scenario Variant'), currentDecisionEngineABScenarioVariant],
      ];

      for (const [input, validValue] of inputs) {
        if (input && validValue) {
          userEvent.click(input);
          userEvent.click(formContainer);
          const error = await screen.findByText('Required.');
          userEvent.type(input, validValue);
          expect(input).toHaveValue(validValue);
          userEvent.click(formContainer);
          await waitForElementToBeRemoved(error);
        }
      }
    });

    it('should create action with correct values when submitted for changed inputs', async () => {
      jest.clearAllMocks();
      const updateMarketProductGroupRequestSpy = jest.spyOn(Creators, 'createMarketProductGroupRequest');

      const saveButton = screen.getByText('Save');
      userEvent.click(saveButton);

      await waitFor(() => {
        expect(updateMarketProductGroupRequestSpy).toHaveBeenCalledWith(
          {
            body: {
              type: currentType,
              activeTimes: expect.anything(),
              abTestValueId: currentABTestValueId,
              abTestVariableName: currentABTestVariableName,
              name: {
                tr: currentNameTR,
                en: currentNameEN,
              },
              order: Number(currentOrder),
              domainTypes: [
                currentDomainType,
              ],
              hierarchy: currentHierarchy,
              placement: currentPlacement,
              scenarioVariant: currentDecisionEngineABScenarioVariant,
              algorithmScenarioName: currentAlgorithmScenarioNameValue,
              filterScenarioNames: [],
            },
          },
        );
      });
    });
  });
});
