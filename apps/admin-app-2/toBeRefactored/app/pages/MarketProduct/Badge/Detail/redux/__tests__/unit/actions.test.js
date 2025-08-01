/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/MarketProduct/Badge/Detail/redux/actions';

describe('MarketProduct/Badge/Detail', () => {
  describe('action-creator #getBadgeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBadgeRequest();
      const expectedAction = { type: Types.GET_BADGE_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBadgeRequest({ id: '123' });
      const expectedAction = { type: Types.GET_BADGE_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBadgeRequest({ id: '123', wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BADGE_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getBadgeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBadgeSuccess();
      const expectedAction = { type: Types.GET_BADGE_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBadgeSuccess({ data: { name: 'BadgeName' } });
      const expectedAction = { type: Types.GET_BADGE_SUCCESS, data: { name: 'BadgeName' } };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBadgeSuccess({ data: { name: 'BadgeName' }, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BADGE_SUCCESS, data: { name: 'BadgeName' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getBadgeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBadgeFailure();
      const expectedAction = { type: Types.GET_BADGE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBadgeFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_BADGE_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBadgeFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BADGE_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBadgeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateBadgeRequest();
      const expectedAction = { type: Types.UPDATE_BADGE_REQUEST, id: null, body: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateBadgeRequest({ id: '123', body: {} });
      const expectedAction = { type: Types.UPDATE_BADGE_REQUEST, id: '123', body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateBadgeRequest({ id: '123', body: {}, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_BADGE_REQUEST, id: '123', body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBadgeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateBadgeSuccess();
      const expectedAction = { type: Types.UPDATE_BADGE_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.updateBadgeSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_BADGE_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBadgeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateBadgeFailure();
      const expectedAction = { type: Types.UPDATE_BADGE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateBadgeFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_BADGE_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateBadgeFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_BADGE_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBadgeImageUrlRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateBadgeImageUrlRequest();
      const expectedAction = {
        type: Types.UPDATE_BADGE_IMAGE_URL_REQUEST,
        id: null,
        loadedImage: null,
        extension: null,
        body: null,
        imagePath: null,
        isAppliedToOtherLanguanges: false,
      };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateBadgeImageUrlRequest({
        id: '123',
        loadedImage: 'test.png',
        extension: 'png',
        body: {},
        imagePath: 'picURL',
        isAppliedToOtherLanguanges: false,
      });
      const expectedAction = {
        type: Types.UPDATE_BADGE_IMAGE_URL_REQUEST,
        id: '123',
        loadedImage: 'test.png',
        extension: 'png',
        body: {},
        imagePath: 'picURL',
        isAppliedToOtherLanguanges: false,
      };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateBadgeImageUrlRequest({
        id: '123',
        loadedImage: 'test.png',
        extension: 'png',
        body: {},
        imagePath: 'picURL',
        isAppliedToOtherLanguanges: false,
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = {
        type: Types.UPDATE_BADGE_IMAGE_URL_REQUEST,
        id: '123',
        loadedImage: 'test.png',
        extension: 'png',
        body: {},
        isAppliedToOtherLanguanges: false,
        imagePath: 'picURL',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBadgeImageUrlSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateBadgeImageUrlSuccess();
      const expectedAction = { type: Types.UPDATE_BADGE_IMAGE_URL_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.updateBadgeImageUrlSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_BADGE_IMAGE_URL_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateBadgeImageUrlFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateBadgeImageUrlFailure();
      const expectedAction = { type: Types.UPDATE_BADGE_IMAGE_URL_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateBadgeImageUrlFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_BADGE_IMAGE_URL_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateBadgeImageUrlFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_BADGE_IMAGE_URL_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.initPage({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.destroyPage({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
