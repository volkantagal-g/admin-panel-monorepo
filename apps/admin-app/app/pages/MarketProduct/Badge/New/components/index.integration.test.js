import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { MarketProductBadgeNewForm } from '.';
import { defaultValues, validationSchema, getModifiedValues } from './Form/formHelper';

describe('Market Product/Badge/New Form', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <MarketProductBadgeNewForm /> });
  });
});

describe('Form Utilities', () => {
  describe('defaultValues', () => {
    it('should contain expected default values', () => {
      expect(defaultValues).toEqual({
        name: '',
        description: '',
        position: '',
        domainTypes: [],
      });
    });
  });

  describe('validationSchema', () => {
    it('should validate name, description, position, and domainTypes correctly', async () => {
      const schema = validationSchema();

      let isValid = await schema.isValid({
        name: 'Test Name',
        description: 'Test Description',
        position: 'Test Position',
        domainTypes: ['1'],
      });
      expect(isValid).toBe(true);

      isValid = await schema.isValid({
        description: 'Test Description',
        position: 'Test Position',
        domainTypes: ['1'],
      });
      expect(isValid).toBe(false);

      isValid = await schema.isValid({
        name: 'Test Name',
        description: 'Test Description',
        position: 'Test Position',
        domainTypes: [],
      });
      expect(isValid).toBe(false);
    });
  });

  describe('getModifiedValues', () => {
    it('should convert domainTypes to numbers', () => {
      const inputValues = {
        name: 'Test Name',
        description: 'Test Description',
        position: 'Test Position',
        domainTypes: ['1', '2', '3'],
      };

      const expectedModifiedValues = {
        name: 'Test Name',
        description: 'Test Description',
        position: 'Test Position',
        domainTypes: [1, 2, 3],
      };

      const modifiedValues = getModifiedValues(inputValues);
      expect(modifiedValues).toEqual(expectedModifiedValues);
    });

    it('should handle empty domainTypes array gracefully', () => {
      const inputValues = {
        name: 'Test Name',
        description: 'Test Description',
        position: 'Test Position',
        domainTypes: [],
      };

      const expectedModifiedValues = {
        name: 'Test Name',
        description: 'Test Description',
        position: 'Test Position',
        domainTypes: [],
      };

      const modifiedValues = getModifiedValues(inputValues);
      expect(modifiedValues).toEqual(expectedModifiedValues);
    });
  });
});
