import { screen } from '@testing-library/react';

import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import {
  getPromoByIdMockMasterBuyXAndGetYFree,
  getPromoByIdMockSingleBuyXAndGetYFree,
  getPromoByIdMockSingleBuyXAndGetYFreeP3Enabled,
  getPromoByIdMockSingleStarDeals,
} from '@shared/api/promo/index.mock.handler';

import { renderPromoDetailPage } from '@app/pages/Promo/Detail/test/utils';

type Section = [string] | [string, { selector?: string }];

const PICTURE_SECTIONS = [
  'Picture Preview (Android) (TR)',
  'Picture Preview (Android) (EN)',
  'Popup Preview (TR)',
  'Popup Preview (EN)',
  'Popup Preview (EN)',
  'Notif Preview (TR)',
  'Notif Preview (EN)',
  'Thumbnail Preview (TR)',
  'Thumbnail Preview (EN)',
];
const allSections: Section[] = [
  ['Usage Information'],
  ['Promo Type', { selector: 'div.ant-card-head-title' }],
  ['General Information'],
  ['Child Promos'],
  ['Button Action'],
  ['Promo Content'],
  ['Promo URLs'],
  ['Classification'],
  ['User Filtering'],
  ['Benefit Type'],
  ['Excluded Products'],
  ['Conditions Products'],
  ['Promo Badges'],
  ['Financial Condition'],
  ['Segments'],
  ['Communications'],
  ['Segment Types'],
  ['Available Times'],
  ['Aggression Levels'],
  ...PICTURE_SECTIONS.map(title => [title] satisfies Section),
];

type TestCase = [string, { url: string, successData: any }, string[]];

const TEST_CASES: TestCase[] = [
  ['Single BuyXAndGetYFree', getPromoByIdMockSingleBuyXAndGetYFree, [
    'Child Promos',
  ]],
  ['Master BuyXAndGetYFree', getPromoByIdMockMasterBuyXAndGetYFree, [
    'Promo Type',
    'Button Action',
    'Excluded Products',
    'Conditions Products',
    'Available Times',
    'Aggression Levels',
    ...PICTURE_SECTIONS,
  ]],
  ['Star Deals', getPromoByIdMockSingleStarDeals, [
    'Child Promos',
    'Conditions Products',
    'Promo Badges',
  ]],
  ['P3 Disabled', getPromoByIdMockSingleBuyXAndGetYFreeP3Enabled, [
    'Child Promos',
    'Segment Types',
  ]],
];

describe('In Promo Detail page', () => {
  test.each(TEST_CASES)('%s promo should render correct sections', async (_, mockData, sections) => {
    mockApiPerTestCase(mockData);
    await renderPromoDetailPage();

    const whitelistedSections = allSections.filter(([title]) => !sections.includes(title));
    const blacklistedSections = allSections.filter(([title]) => sections.includes(title));

    whitelistedSections.forEach(([title, selector]) => {
      expect(screen.getByText(title, selector)).toBeInTheDocument();
    });

    blacklistedSections.forEach(([title, selector]) => {
      expect(screen.queryByText(title, selector)).not.toBeInTheDocument();
    });
  });
});
