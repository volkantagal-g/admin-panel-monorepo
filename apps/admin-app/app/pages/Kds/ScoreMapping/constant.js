const TabKeyEnum = {
  MULTIPLE_CHOICE: '1',
  NUMBER_INPUT: '2',
};

const QuestionTypeEnum = {
  1: 'MULTIPLE_CHOICE',
  2: 'NUMBER_INPUT',
};

const ScoreMappingPanelTabs = [{
  translation: 'G10_WAREHOUSES',
  name: 'GETIR10',
  key: 1,
},
{
  translation: 'GMORE_WAREHOUSES',
  name: 'MARKET',
  key: 2,
},
{
  translation: 'WATER_WAREHOUSES',
  name: 'WATER',
  key: 3,
},
{
  translation: 'STORE_CONVERSION_WAREHOUSES',
  name: 'STORE_CONVERSION',
  key: 4,
},
{
  translation: 'MAIN_WAREHOUSE',
  name: 'MAIN_WAREHOUSE',
  key: 5,
}];

const TAB_DEBOUNCE_TIME_MS = '500';

export { TabKeyEnum, QuestionTypeEnum, TAB_DEBOUNCE_TIME_MS, ScoreMappingPanelTabs };
