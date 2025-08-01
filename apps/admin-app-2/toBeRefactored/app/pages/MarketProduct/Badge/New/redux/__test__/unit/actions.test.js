/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/MarketProduct/Badge/New/redux/actions';

describe('MarketProduct/Badge/New', () => {
  describe('action-creator #createBadgeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createBadgeRequest();
      const expectedAction = { type: Types.CREATE_BADGE_REQUEST, body: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.createBadgeRequest({ body: { name: 'Badge Name' } });
      const expectedAction = { type: Types.CREATE_BADGE_REQUEST, body: { name: 'Badge Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBadgeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createBadgeSuccess({ data: [{ name: 'Badge name' }] });
      const expectedAction = { type: Types.CREATE_BADGE_SUCCESS, data: [{ name: 'Badge name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should return empty array if no arg provided', () => {
      const receivedAction = Creators.createBadgeSuccess();
      const expectedAction = { type: Types.CREATE_BADGE_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createBadgeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createBadgeFailure();
      const expectedAction = { type: Types.CREATE_BADGE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.createBadgeFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.CREATE_BADGE_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.createBadgeFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.CREATE_BADGE_FAILURE, error: new Error('404 Not Found') };
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
