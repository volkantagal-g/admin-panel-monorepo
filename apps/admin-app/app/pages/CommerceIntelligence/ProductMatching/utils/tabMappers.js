import ConfidenceVeryHigh from '@app/pages/CommerceIntelligence/components/ConfidenceVeryHigh';
import {
  CONFIDENCE_LEVELS,
  CONFIDENCE_LEVEL_COUNTS,
  PRODUCT_MATCHING_TABS,
  PRODUCT_MATCHING_TAB_COUNTS,
  TAB_NAMES,
} from '@app/pages/CommerceIntelligence/constants';

const createTab = (key, labelText, count, classes, children) => ({
  key,
  label: (
    <>
      {labelText}
      <span className={classes.countBadge}>{count}</span>
    </>
  ),
  children,
});

export const createTabItems = (t, classes, TabsComponent) => {
  const tabs = [
    {
      key: String(PRODUCT_MATCHING_TABS.CONFIDENCE),
      text: TAB_NAMES.CONFIDENCE,
      count: PRODUCT_MATCHING_TAB_COUNTS.CONFIDENCE,
      content: <TabsComponent isConfidenceTabs wrapperClass={classes.confidenceWrapper} />,
    },
    {
      key: String(PRODUCT_MATCHING_TABS.MATCHED),
      text: TAB_NAMES.MATCHED,
      count: PRODUCT_MATCHING_TAB_COUNTS.MATCHED,
      content: <div>{t(TAB_NAMES.MATCHED)}</div>,
    },
    {
      key: String(PRODUCT_MATCHING_TABS.UNMATCHED),
      text: TAB_NAMES.UNMATCHED,
      count: PRODUCT_MATCHING_TAB_COUNTS.UNMATCHED,
      content: <div>{t(TAB_NAMES.UNMATCHED)}</div>,
    },
  ];

  return tabs.map(tab => createTab(
    tab.key,
    t(tab.text),
    tab.count,
    classes,
    tab.content,
  ));
};

export const createConfidenceTabItems = (t, classes) => {
  const confidenceTabs = [
    {
      key: String(CONFIDENCE_LEVELS.VERY_HIGH),
      text: TAB_NAMES.CONFIDENCE_VERY_HIGH,
      count: CONFIDENCE_LEVEL_COUNTS.VERY_HIGH,
      content: <ConfidenceVeryHigh />,
    },
    {
      key: String(CONFIDENCE_LEVELS.HIGH),
      text: TAB_NAMES.CONFIDENCE_HIGH,
      count: CONFIDENCE_LEVEL_COUNTS.HIGH,
      content: <div>{t(TAB_NAMES.CONFIDENCE_HIGH)}</div>,
    },
    {
      key: String(CONFIDENCE_LEVELS.MEDIUM),
      text: TAB_NAMES.CONFIDENCE_MEDIUM,
      count: CONFIDENCE_LEVEL_COUNTS.MEDIUM,
      content: <div>{t(TAB_NAMES.CONFIDENCE_MEDIUM)}</div>,
    },
    {
      key: String(CONFIDENCE_LEVELS.LOW),
      text: TAB_NAMES.CONFIDENCE_LOW,
      count: CONFIDENCE_LEVEL_COUNTS.LOW,
      content: <div>{t(TAB_NAMES.CONFIDENCE_LOW)}</div>,
    },
  ];

  return confidenceTabs.map(tab => createTab(
    tab.key,
    t(tab.text),
    tab.count,
    classes,
    tab.content,
  ));
};

export const getConfidenceLevelTabItems = (t, classes) => [
  {
    key: String(CONFIDENCE_LEVELS.VERY_HIGH),
    label: (
      <>
        {t('CONFIDENCE_LEVELS.VERY_HIGH')}
        <span className={classes.countBadge}>{CONFIDENCE_LEVEL_COUNTS.VERY_HIGH}</span>
      </>
    ),
    children: <>{t('CONFIDENCE_LEVELS.VERY_HIGH')}</>,
  },
  {
    key: String(CONFIDENCE_LEVELS.HIGH),
    label: (
      <>
        {t('CONFIDENCE_LEVELS.HIGH')}
        <span className={classes.countBadge}>{CONFIDENCE_LEVEL_COUNTS.HIGH}</span>
      </>
    ),
    children: <>{t('CONFIDENCE_LEVELS.HIGH')}</>,
  },
  {
    key: String(CONFIDENCE_LEVELS.MEDIUM),
    label: (
      <>
        {t('CONFIDENCE_LEVELS.MEDIUM')}
        <span className={classes.countBadge}>{CONFIDENCE_LEVEL_COUNTS.MEDIUM}</span>
      </>
    ),
    children: <>{t('CONFIDENCE_LEVELS.MEDIUM')}</>,
  },
  {
    key: String(CONFIDENCE_LEVELS.LOW),
    label: (
      <>
        {t('CONFIDENCE_LEVELS.LOW')}
        <span className={classes.countBadge}>{CONFIDENCE_LEVEL_COUNTS.LOW}</span>
      </>
    ),
    children: <>{t('CONFIDENCE_LEVELS.LOW')}</>,
  },
];

export const getProductMatchingTabItems = (t, ConfidenceTabs, classes) => [
  {
    key: String(PRODUCT_MATCHING_TABS.CONFIDENCE),
    label: (
      <>
        {t('CONFIDENCE')}
        <span className={classes.countBadge}>{PRODUCT_MATCHING_TAB_COUNTS.CONFIDENCE}</span>
      </>
    ),
    children: <ConfidenceTabs />,
  },
  {
    key: String(PRODUCT_MATCHING_TABS.MATCHED),
    label: (
      <>
        {t('MATCHED')}
        <span className={classes.countBadge}>{PRODUCT_MATCHING_TAB_COUNTS.MATCHED}</span>
      </>
    ),
    children: <>{t('MATCHED')}</>,
  },
  {
    key: String(PRODUCT_MATCHING_TABS.UNMATCHED),
    label: (
      <>
        {t('UNMATCHED')}
        <span className={classes.countBadge}>{PRODUCT_MATCHING_TAB_COUNTS.UNMATCHED}</span>
      </>
    ),
    children: <>{t('UNMATCHED')}</>,
  },
];
