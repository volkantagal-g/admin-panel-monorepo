import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  Drawer,
  Select,
  Tooltip,
} from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  COMPETITORS,
  FILTER_KEY,
  RULE_NAME_TRANSLATER,
  TABLE_FILTER_OPTIONS,
} from '../../constants';
import { listSelector } from '../../redux/selectors';
import SelectFilter from '../SelectFilter';

const { Option } = Select;
const { Panel } = Collapse;

const FilterDrawer = ({
  setOpenDrawer,
  openDrawer,
  setFilters,
  filters,
  classes,
  filterDisabled,
  tableData,
}) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const [indeterminate, setIndeterminate] = useState({
    [FILTER_KEY.directMatchedProduct]: false,
    [FILTER_KEY.inDirectMatchedProduct]: false,
  });
  const [checkedList, setCheckedList] = useState({
    [FILTER_KEY.directMatchedProduct]: [],
    [FILTER_KEY.inDirectMatchedProduct]: [],
  });
  const [checkAll, setCheckAll] = useState({
    [FILTER_KEY.directMatchedProduct]: false,
    [FILTER_KEY.inDirectMatchedProduct]: false,
  });

  const competitorList = useSelector(listSelector.competitorList);

  const categoryRoleList = useSelector(listSelector.categoryRoleList);
  const globalCategoryList = useSelector(listSelector.globalCategoryList);
  const kviList = useSelector(listSelector.kviList);
  const familyList = useSelector(listSelector.familyList);
  const categoryPlanningList = useSelector(listSelector.categoryPlanningList);

  const productList = useSelector(listSelector.productList);
  const manufacturerList = useSelector(listSelector.manufacturerList);
  const brandList = useSelector(listSelector.brandList);
  const supplierList = useSelector(listSelector.supplierList);

  const calculatedRuleList = useSelector(listSelector.calculatedRuleList);

  const COLLAPSE_FILTERS_PREFIX = 'COLLAPSE_FILTERS_PREFIX';
  const COLLAPSE_FILTERS_DETAIL_PREFIX = 'COLLAPSE_FILTERS_DETAIL_PREFIX';

  const handleClear = () => {
    setCheckedList({
      [FILTER_KEY.directMatchedProduct]: [],
      [FILTER_KEY.inDirectMatchedProduct]: [],
    });
    setCheckAll({
      [FILTER_KEY.directMatchedProduct]: false,
      [FILTER_KEY.inDirectMatchedProduct]: false,
    });
    setFilters({
      [FILTER_KEY.supplier]: [],
      [FILTER_KEY.brand]: [],
      [FILTER_KEY.manufacturer]: [],
      [FILTER_KEY.product]: [],
      [FILTER_KEY.categoryRole]: [],
      [FILTER_KEY.globalCategory]: [],
      [FILTER_KEY.categoryPlanning]: [],
      [FILTER_KEY.kvi]: [],
      [FILTER_KEY.family]: [],
      [FILTER_KEY.tableFilter]: {
        [FILTER_KEY.matchedProduct]: {
          [FILTER_KEY.directMatchedProduct]: [],
          [FILTER_KEY.inDirectMatchedProduct]: [],
          [FILTER_KEY.notMatchedProduct]: [],
        },
        [FILTER_KEY.guardrailFailed]: [],
        [FILTER_KEY.finalAlert]: [],
        [FILTER_KEY.newRecommendation]: [],
        [FILTER_KEY.bundledProduct]: [],
        [FILTER_KEY.discountedProduct]: [],
        [FILTER_KEY.activeRule]: [],
      },
    });
  };

  const onCheckAllChange = (event, type) => {
    setCheckedList({
      ...checkedList,
      [type]: event.target.checked ? competitorList : [],
    });
    setIndeterminate({
      [FILTER_KEY.directMatchedProduct]: false,
      [FILTER_KEY.inDirectMatchedProduct]: false,
    });
    setCheckAll({ ...checkAll, [type]: event.target.checked });
    setFilters({
      ...filters,
      [FILTER_KEY.tableFilter]: {
        ...filters[FILTER_KEY.tableFilter],
        [FILTER_KEY.matchedProduct]: {
          ...filters[FILTER_KEY.tableFilter][FILTER_KEY.matchedProduct],
          [type]: event.target.checked ? competitorList : [],
        },
      },
    });
  };

  return (
    <Drawer
      title={t('FILTERS')}
      placement="right"
      onClose={() => setOpenDrawer(false)}
      visible={openDrawer}
      getContainer={false}
      className={classes.filterDrawer}
      maskClosable
    >
      <Collapse defaultActiveKey={`${COLLAPSE_FILTERS_PREFIX}0`}>
        <Panel header={t('SPECIFICATIONS')} key={`${COLLAPSE_FILTERS_PREFIX}0`}>
          <div className={classes.filterWrapper}>
            <SelectFilter
              type={FILTER_KEY.kvi}
              description={t('KVI')}
              placeholder={t('SELECT_KVI')}
              setFilters={setFilters}
              filters={filters}
              mode="multiple"
              optionList={kviList}
              disabled={filterDisabled}
              src="kvi"
            />
            <SelectFilter
              type={FILTER_KEY.categoryRole}
              description={t('CATEGORY_ROLE')}
              placeholder={t('SELECT_CATEGORY_ROLE')}
              setFilters={setFilters}
              filters={filters}
              mode="multiple"
              optionList={categoryRoleList}
              disabled={filterDisabled}
              src="role"
            />
            <SelectFilter
              type={FILTER_KEY.globalCategory}
              description={t('L1_CATEGORY')}
              placeholder={t('SELECT_L1_CATEGORY')}
              setFilters={setFilters}
              filters={filters}
              mode="multiple"
              optionList={globalCategoryList}
              disabled={filterDisabled}
              src="global"
            />
            <SelectFilter
              type={FILTER_KEY.categoryPlanning}
              description={t('L2_CATEGORY')}
              placeholder={t('SELECT_L2_CATEGORY')}
              setFilters={setFilters}
              filters={filters}
              mode="multiple"
              optionList={categoryPlanningList}
              disabled={filterDisabled}
              src="planning"
            />
            <SelectFilter
              type={FILTER_KEY.brand}
              description={t('BRAND')}
              placeholder={t('SELECT_BRAND')}
              setFilters={setFilters}
              filters={filters}
              mode="multiple"
              optionList={brandList}
              disabled={filterDisabled}
              src="brand"
            />
            <SelectFilter
              type={FILTER_KEY.supplier}
              description={t('SUPPLIER')}
              placeholder={t('SELECT_SUPPLIER')}
              setFilters={setFilters}
              filters={filters}
              mode="multiple"
              optionList={supplierList}
              disabled={filterDisabled}
              src="supplier"
            />
            <SelectFilter
              type={FILTER_KEY.manufacturer}
              description={t('MANUFACTURER')}
              placeholder={t('SELECT_MANUFACTURER')}
              setFilters={setFilters}
              filters={filters}
              mode="multiple"
              optionList={manufacturerList}
              disabled={filterDisabled}
              src="manufacturer"
            />
            <SelectFilter
              type={FILTER_KEY.product}
              description={t('PRODUCT')}
              placeholder={t('SELECT_PRODUCT')}
              setFilters={setFilters}
              filters={filters}
              mode="multiple"
              options={productList.map(value => (
                <Option key={value} value={value} label={value}>
                  <div className="demo-option-label-item">
                    <img
                      alt={t('PRODUCT')}
                      src={
                        tableData?.find(e => e[FILTER_KEY.product] === value)
                          ?.picurl
                      }
                      className={classes.productSelectImg}
                    />
                    &nbsp;
                    {
                      tableData?.find(e => e[FILTER_KEY.product] === value)
                        ?.product_name
                    }
                  </div>
                </Option>
              ))}
              disabled={filterDisabled}
              src="product"
            />
            <SelectFilter
              type={FILTER_KEY.family}
              description={t('FAMILY')}
              placeholder={t('SELECT_FAMILY')}
              setFilters={setFilters}
              filters={filters}
              mode="multiple"
              optionList={familyList}
              disabled={filterDisabled}
              src="family"
            />
          </div>
        </Panel>
        <Panel header={t('ACTIVE_RULE')} key={`${COLLAPSE_FILTERS_PREFIX}7`}>
          <Checkbox.Group
            onChange={value => {
              setFilters({
                ...filters,
                [FILTER_KEY.tableFilter]: {
                  ...filters[FILTER_KEY.tableFilter],
                  [FILTER_KEY.activeRule]: value,
                },
              });
            }}
            value={filters[FILTER_KEY.tableFilter][FILTER_KEY.activeRule]}
            className={classes.checkboxGroupForm}
          >
            {calculatedRuleList.map(
              element => element && (
              <Checkbox value={element}>
                {RULE_NAME_TRANSLATER[element]}
              </Checkbox>
              ),
            )}
          </Checkbox.Group>
        </Panel>
        <Panel
          header={t('MATCHED_PRODUCT')}
          key={`${COLLAPSE_FILTERS_PREFIX}1`}
        >
          <div>
            <Checkbox
              indeterminate={indeterminate[FILTER_KEY.directMatchedProduct]}
              onChange={event => onCheckAllChange(event, FILTER_KEY.directMatchedProduct)}
              checked={checkAll[FILTER_KEY.directMatchedProduct]}
              className={`${classes.checkboxGroupMatchedForm} ${classes.matchedCheckboxGroup}`}
            >
              <span className={classes.checkboxSpan}>
                {t('DIRECT_MATCHED')}
              </span>
            </Checkbox>
            <Checkbox.Group
              onChange={value => {
                setIndeterminate({
                  ...indeterminate,
                  [FILTER_KEY.directMatchedProduct]:
                    !!value?.length && value?.length < competitorList?.length,
                });
                setCheckedList({
                  ...checkedList,
                  [FILTER_KEY.directMatchedProduct]: value,
                });
                setCheckAll({
                  ...checkAll,
                  [FILTER_KEY.directMatchedProduct]:
                    value?.length === competitorList?.length,
                });
                setFilters({
                  ...filters,
                  [FILTER_KEY.tableFilter]: {
                    ...filters[FILTER_KEY.tableFilter],
                    [FILTER_KEY.matchedProduct]: {
                      ...filters[FILTER_KEY.tableFilter][
                        FILTER_KEY.matchedProduct
                      ],
                      [FILTER_KEY.directMatchedProduct]: value,
                    },
                  },
                });
              }}
              value={checkedList[FILTER_KEY.directMatchedProduct]}
              className={`${classes.checkboxGroupForm} ${classes.matchedCheckboxGroup}`}
            >
              {competitorList.map(element => (
                <Checkbox value={element}>
                  <div>
                    <Tooltip title={element} placement="top">
                      <img
                        src={COMPETITORS[element][1]}
                        alt={element}
                        className={classes.productNameCompetitorImage}
                      />
                      {element}
                    </Tooltip>
                  </div>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
          <Divider className={classes.renderDivider} />
          <div>
            <Checkbox
              indeterminate={indeterminate[FILTER_KEY.inDirectMatchedProduct]}
              onChange={event => onCheckAllChange(event, FILTER_KEY.inDirectMatchedProduct)}
              checked={checkAll[FILTER_KEY.inDirectMatchedProduct]}
              className={`${classes.checkboxGroupMatchedForm} ${classes.matchedCheckboxGroup}`}
            >
              <span className={classes.checkboxSpan}>
                {t('INDIRECT_MATCHED')}
              </span>
            </Checkbox>
            <Checkbox.Group
              onChange={value => {
                setIndeterminate({
                  ...indeterminate,
                  [FILTER_KEY.inDirectMatchedProduct]:
                    !!value?.length && value?.length < competitorList?.length,
                });
                setCheckedList({
                  ...checkedList,
                  [FILTER_KEY.inDirectMatchedProduct]: value,
                });
                setCheckAll({
                  ...checkAll,
                  [FILTER_KEY.inDirectMatchedProduct]:
                    value?.length === competitorList?.length,
                });
                setFilters({
                  ...filters,
                  [FILTER_KEY.tableFilter]: {
                    ...filters[FILTER_KEY.tableFilter],
                    [FILTER_KEY.matchedProduct]: {
                      ...filters[FILTER_KEY.tableFilter][
                        FILTER_KEY.matchedProduct
                      ],
                      [FILTER_KEY.inDirectMatchedProduct]: value,
                    },
                  },
                });
              }}
              value={checkedList[FILTER_KEY.inDirectMatchedProduct]}
              className={`${classes.checkboxGroupForm} ${classes.matchedCheckboxGroup}`}
            >
              {competitorList.map(element => (
                <Checkbox value={element}>
                  <div>
                    <Tooltip title={element} placement="top">
                      <img
                        src={COMPETITORS[element][1]}
                        alt={element}
                        className={classes.productNameCompetitorImage}
                      />
                      {element}
                    </Tooltip>
                  </div>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
          <Divider className={classes.renderDivider} />
          <div>
            <Checkbox
              onChange={event => setFilters({
                ...filters,
                [FILTER_KEY.tableFilter]: {
                  ...filters[FILTER_KEY.tableFilter],
                  [FILTER_KEY.matchedProduct]: {
                    ...filters[FILTER_KEY.tableFilter][
                      FILTER_KEY.matchedProduct
                    ],
                    [FILTER_KEY.notMatchedProduct]: event.target.checked
                      ? [true]
                      : [],
                  },
                },
              })}
              checked={
                filters[FILTER_KEY.tableFilter][FILTER_KEY.matchedProduct][
                  FILTER_KEY.notMatchedProduct
                ]?.length > 0
              }
              className={classes.checkboxGroupForm}
            >
              <span className={classes.checkboxSpan}>{t('NOT_MATCHED')}</span>
            </Checkbox>
          </div>
        </Panel>
        <Panel header={t('ALERTS')} key={`${COLLAPSE_FILTERS_PREFIX}2`}>
          <Collapse>
            <Panel
              header={t('GUARDRAIL_FAILED')}
              key={`${COLLAPSE_FILTERS_DETAIL_PREFIX}1`}
            >
              <Checkbox.Group
                options={[
                  {
                    label: t('YES'),
                    value: TABLE_FILTER_OPTIONS.GUARDRAIL_FAILED,
                  },
                  {
                    label: t('NO'),
                    value: TABLE_FILTER_OPTIONS.NOT_GUARDRAIL_FAILED,
                  },
                ]}
                onChange={value => setFilters({
                  ...filters,
                  [FILTER_KEY.tableFilter]: {
                    ...filters[FILTER_KEY.tableFilter],
                    [FILTER_KEY.guardrailFailed]: value,
                  },
                })}
                value={
                  filters[FILTER_KEY.tableFilter][FILTER_KEY.guardrailFailed]
                }
                className={classes.checkboxGroupForm}
              />
            </Panel>
            <Panel
              header={t('FINAL_ALERT')}
              key={`${COLLAPSE_FILTERS_DETAIL_PREFIX}2`}
            >
              <Checkbox.Group
                options={[
                  {
                    label: t('YES'),
                    value: TABLE_FILTER_OPTIONS.FINAL_ROUND,
                  },
                  {
                    label: t('NO'),
                    value: TABLE_FILTER_OPTIONS.NOT_FINAL_ROUND,
                  },
                ]}
                onChange={value => setFilters({
                  ...filters,
                  [FILTER_KEY.tableFilter]: {
                    ...filters[FILTER_KEY.tableFilter],
                    [FILTER_KEY.finalAlert]: value,
                  },
                })}
                value={filters[FILTER_KEY.tableFilter][FILTER_KEY.finalAlert]}
                className={classes.checkboxGroupForm}
              />
            </Panel>
            <Panel
              header={t('FAMILY_PRICE_ALERT')}
              key={`${COLLAPSE_FILTERS_DETAIL_PREFIX}3`}
            >
              <Checkbox.Group
                options={[
                  {
                    label: t('YES'),
                    value: TABLE_FILTER_OPTIONS.FAMILY_PRICE,
                  },
                  {
                    label: t('NO'),
                    value: TABLE_FILTER_OPTIONS.NOT_FAMILY_PRICE,
                  },
                ]}
                onChange={value => setFilters({
                  ...filters,
                  [FILTER_KEY.tableFilter]: {
                    ...filters[FILTER_KEY.tableFilter],
                    [FILTER_KEY.familyPrice]: value,
                  },
                })}
                value={filters[FILTER_KEY.tableFilter][FILTER_KEY.familyPrice]}
                className={classes.checkboxGroupForm}
              />
            </Panel>
          </Collapse>
        </Panel>
        <Panel header={t('NEW_RECOMMENDATION')} key={`${COLLAPSE_FILTERS_PREFIX}4`}>
          <Checkbox.Group
            options={[
              {
                label: t('YES'),
                value: TABLE_FILTER_OPTIONS.NEW_RECOMMENDATION,
              },
              {
                label: t('NO'),
                value: TABLE_FILTER_OPTIONS.NOT_NEW_RECOMMENDATION,
              },
            ]}
            onChange={value => setFilters({
              ...filters,
              [FILTER_KEY.tableFilter]: {
                ...filters[FILTER_KEY.tableFilter],
                [FILTER_KEY.newRecommendation]: value,
              },
            })}
            value={
              filters[FILTER_KEY.tableFilter][FILTER_KEY.newRecommendation]
            }
            className={classes.checkboxGroupForm}
          />
        </Panel>
        <Panel header={t('BUNDLE_PRODUCT')} key={`${COLLAPSE_FILTERS_PREFIX}5`}>
          <Checkbox.Group
            options={[
              {
                label: t('YES'),
                value: TABLE_FILTER_OPTIONS.BUNDLED,
              },
              {
                label: t('NO'),
                value: TABLE_FILTER_OPTIONS.NOT_BUNDLED,
              },
            ]}
            onChange={value => setFilters({
              ...filters,
              [FILTER_KEY.tableFilter]: {
                ...filters[FILTER_KEY.tableFilter],
                [FILTER_KEY.bundledProduct]: value,
              },
            })}
            value={filters[FILTER_KEY.tableFilter][FILTER_KEY.bundledProduct]}
            className={classes.checkboxGroupForm}
          />
        </Panel>
        <Panel
          header={t('DISCOUNTED_PRODUCT')}
          key={`${COLLAPSE_FILTERS_PREFIX}6`}
        >
          <Checkbox.Group
            options={[
              {
                label: t('YES'),
                value: TABLE_FILTER_OPTIONS.DISCOUNTED,
              },
              {
                label: t('NO'),
                value: TABLE_FILTER_OPTIONS.NOT_DISCOUNTED,
              },
            ]}
            onChange={value => setFilters({
              ...filters,
              [FILTER_KEY.tableFilter]: {
                ...filters[FILTER_KEY.tableFilter],
                [FILTER_KEY.discountedProduct]: value,
              },
            })}
            value={
              filters[FILTER_KEY.tableFilter][FILTER_KEY.discountedProduct]
            }
            className={classes.checkboxGroupForm}
          />
        </Panel>
      </Collapse>
      <div className={classes.clearFilterButton}>
        <Button
          type="text"
          onClick={handleClear}
          className={classes.purpleGetirColor}
        >
          {t('CLEAR_FILTERS')}
        </Button>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
