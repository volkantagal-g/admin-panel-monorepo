/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/Brand/New/redux/actions';

describe('Brand/New', () => {
  describe('action-creator #createBrandRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createBrandRequest();
      const expectedAction = { type: Types.CREATE_BRAND_REQUEST, body: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.createBrandRequest({ body: { name: 'Brand Name' } });
      const expectedAction = { type: Types.CREATE_BRAND_REQUEST, body: { name: 'Brand Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBrandSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createBrandSuccess({ data: [{ name: 'Brand name' }] });
      const expectedAction = { type: Types.CREATE_BRAND_SUCCESS, data: [{ name: 'Brand name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should return empty array if no arg provided', () => {
      const receivedAction = Creators.createBrandSuccess();
      const expectedAction = { type: Types.CREATE_BRAND_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createBrandFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createBrandFailure();
      const expectedAction = { type: Types.CREATE_BRAND_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.createBrandFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.CREATE_BRAND_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.createBrandFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.CREATE_BRAND_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
