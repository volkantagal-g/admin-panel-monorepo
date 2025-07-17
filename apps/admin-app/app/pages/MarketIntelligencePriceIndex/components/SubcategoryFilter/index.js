import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import DropdownRender from '@app/pages/MarketIntelligencePriceIndex/components/DropdownRender';
import SelectTitle from '@app/pages/MarketIntelligencePriceIndex/components/SelectTitle';
import { listSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';
import { FILTER_KEY, INDEX_BY_LIST } from '../../constants';

const { Option } = Select;

const SubCategoryFilter = ({
  setExcludeSubCategory,
  excludeSubCategory,
  indexBy,
  isLoading,
  setFilters,
  filters,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const subCategoryList = useSelector(listSelector.subCategoryList);
  const excludeSubCategoryList = useSelector(listSelector.excludeSubCategoryList);

  const [excludeSubCategories, setExcludeSubCategories] = useState(excludeSubCategory);

  useEffect(() => {
    setExcludeSubCategories(excludeSubCategory);
  }, [excludeSubCategory]);

  const maxTagPlaceHold = excludeSubCategories ? excludeSubCategories.length - 1 : '';

  const handleChange = value => {
    switch (indexBy) {
      case INDEX_BY_LIST.PRODUCT[0]:
        setFilters({ ...filters, [FILTER_KEY.SUBCATEGORY]: value || '' });
        break;
      case INDEX_BY_LIST.CATEGORIES[0]:
        setExcludeSubCategories(value);
        break;
      default:
    }
  };

  const dropdownRender = indexBy !== INDEX_BY_LIST.PRODUCT[0]
    ? menu => (DropdownRender(setExcludeSubCategory, excludeSubCategories, menu, false))
    : false;

  return (
    <div>
      <SelectTitle src="subcategory" description={t(indexBy === INDEX_BY_LIST.PRODUCT[0] ? 'SUBCATEGORY' : 'SUBCATEGORY_EXLUDE')} />
      <Select
        mode="multiple"
        maxTagCount={1}
        maxTagPlaceholder={`+ ${maxTagPlaceHold} ${t('SUBCATEGORY')}`}
        allowClear
        showSearch
        filterOption
        className={indexBy === INDEX_BY_LIST.PRODUCT[0] ? classes.selectWidth : classes.selectWidthOther}
        placeholder={t('SELECT_SUBCATEGORY')}
        onChange={handleChange}
        disabled={isLoading}
        dropdownRender={dropdownRender}
        value={indexBy === INDEX_BY_LIST.PRODUCT[0] && filters ? filters[FILTER_KEY.SUBCATEGORY] : []}
      >
        {indexBy === INDEX_BY_LIST.PRODUCT[0]
          ? subCategoryList.map(c => (
            <Option key={c} value={c}>
              <div className={classes.demoOptionLabelItem}>{c}</div>
            </Option>
          ))
          : excludeSubCategoryList?.map(c => (
            <Option key={c.key} value={c.subcategory_name}>
              <div className={classes.demoOptionLabelItem}>{c.subcategory_name}</div>
            </Option>
          ))}
      </Select>
    </div>
  );
};

export default SubCategoryFilter;
