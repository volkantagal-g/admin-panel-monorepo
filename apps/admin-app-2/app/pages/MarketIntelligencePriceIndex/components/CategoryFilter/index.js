import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Select } from 'antd';

import SelectTitle from '@app/pages/MarketIntelligencePriceIndex/components/SelectTitle';
import DropdownRender from '@app/pages/MarketIntelligencePriceIndex/components/DropdownRender';
import { listSelector, stateSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';
import { FILTER_KEY, INDEX_BY_LIST } from '@app/pages/MarketIntelligencePriceIndex/constants';

const { Option } = Select;

const CategoryFilter = ({ excludeCategory, setExcludeCategory, isLoading, setFilters, filters }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const [excludeCategories, setExcludeCategories] = useState(excludeCategory);

  const indexBy = useSelector(stateSelector.indexBy);
  const categoryList = useSelector(listSelector.categoryList);
  const excludeCategoryList = useSelector(listSelector.excludeCategoryList);

  const dropdownRender = indexBy !== INDEX_BY_LIST.PRODUCT[0]
    ? menu => (DropdownRender(setExcludeCategory, excludeCategories, menu, false))
    : false;

  useEffect(() => {
    setExcludeCategories(excludeCategory);
  }, [excludeCategory]);

  const maxTagCount = excludeCategories?.length > 2 ? excludeCategories.length - 2 : 0;

  const handleChange = value => {
    switch (indexBy) {
      case INDEX_BY_LIST.PRODUCT[0]:
        setFilters({ ...filters, [FILTER_KEY.CATEGORY]: value || '' });
        break;
      case INDEX_BY_LIST.CATEGORIES[0]:
        setExcludeCategories(value);
        break;
      default:
    }
  };

  return (
    <div className={classes.categoryFilter}>
      <SelectTitle src="category" description={t(indexBy === INDEX_BY_LIST.PRODUCT[0] ? 'CATEGORY' : 'CATEGORY_EXCLUDE')} />
      <Select
        mode="multiple"
        maxTagCount={2}
        maxTagPlaceholder={`+ ${maxTagCount} ${t('CATEGORY')}`}
        allowClear
        showSearch
        filterOption
        disabled={isLoading}
        className={indexBy === INDEX_BY_LIST.PRODUCT[0] ? classes.selectWidth : classes.selectWidthOther}
        placeholder={t('SELECT_CATEGORY')}
        onChange={handleChange}
        dropdownRender={dropdownRender}
        value={indexBy === INDEX_BY_LIST.PRODUCT[0] && filters ? filters[FILTER_KEY.CATEGORY] : []}
      >
        {(indexBy === INDEX_BY_LIST.PRODUCT[0] ? categoryList : excludeCategoryList).map(category => (
          <Option key={category} value={category} label={category}>
            <div className={classes.demoOptionLabelItem}>{category}</div>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CategoryFilter;
