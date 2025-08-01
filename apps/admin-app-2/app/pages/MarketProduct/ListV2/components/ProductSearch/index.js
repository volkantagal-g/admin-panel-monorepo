import { useMemo } from 'react';
import { Row, Col, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fromPairs } from 'lodash';
import classNames from 'classnames';

import { Space, TextInput, FloatingLabel } from '@shared/components/GUI';
import { getLangKey } from '@shared/i18n';
import { filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { marketProductStatuses, productFilters } from '@shared/shared/constantValues';
import { DEFAULT_DEBOUNCE_MS, MARKET_PRODUCT_STATUS } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

import useSelectStyles from '@shared/components/GUI/Select/styles';

import { INITIAL_SELECTED_FILTER_OPTIONS, INITIAL_SELECTED_STATUS_OPTIONS } from '@app/pages/MarketProduct/ListV2/redux/reducer';

const { Option } = Select;

const productFilterOptions = Object.entries(productFilters).map(([key, value]) => {
  return (
    <Option key={key} value={key}>
      {value[getLangKey()]}
    </Option>
  );
});

const productStatusFilterOptions =
  Object.entries(MARKET_PRODUCT_STATUS).map(([key, value]) => {
    return (
      <Option key={key} value={key}>
        {marketProductStatuses?.[value]?.[getLangKey()]}
      </Option>
    );
  });

const ProductSearch = ({ onSearch }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const filterOptions = useSelector(filtersSelector.getSelectedFilterOptions) ?? INITIAL_SELECTED_FILTER_OPTIONS;
  const selectedStatusOptions = useSelector(filtersSelector.getSelectedStatusFilterOptions) ?? INITIAL_SELECTED_STATUS_OPTIONS;
  const enteredIds = useSelector(filtersSelector.getEnteredIds) ?? [];
  const selectedOptions = useMemo(() => Object.keys(filterOptions), [filterOptions]);

  const selectStyles = useSelectStyles({ mode: 'multiple', label: true });

  const { debouncedCallback } = useDebouncedCallback({
    callback: onSearch,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const handleOptionChange = options => {
    dispatch(Creators.setFilterOptions({ selectedOptions: fromPairs(options.map(value => [value, true])) }));
  };

  const handleStatusOptionChange = newSelectedStatusOptions => {
    dispatch(Creators.setStatusFilterOptions({ selectedStatusOptions: newSelectedStatusOptions }));
  };

  const handleChange = ids => {
    dispatch(Creators.setEnteredIds({ ids }));
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space title={t('FILTER')} className="w-100">
          <FloatingLabel label={<label htmlFor="filter-option-input">{t('FILTER_OPTION')}</label>}>
            <Select
              id="filter-option-input"
              value={selectedOptions}
              mode="multiple"
              placeholder={t('FILTER_OPTION')}
              onChange={handleOptionChange}
              className={classNames('w-100', selectStyles.select)}
              filterOption={getSelectFilterOption}
              showSearch
              showArrow
            >
              {productFilterOptions}
            </Select>
          </FloatingLabel>
          <FloatingLabel label={<label htmlFor="status-filter-option-input">{t('STATUS_FILTER_OPTION')}</label>}>
            <Select
              id="status-filter-option-input"
              value={selectedStatusOptions}
              mode="multiple"
              onChange={handleStatusOptionChange}
              className={classNames('w-100', selectStyles.select)}
              showSearch
              showArrow
            >
              {productStatusFilterOptions}
            </Select>
          </FloatingLabel>
          <TextInput
            label={<label htmlFor="search-input">{t('SEARCH')}</label>}
            id="search-input"
            onChange={({ target }) => debouncedCallback(target.value)}
          />
          <FloatingLabel label={<label htmlFor="search-by-ids-input">{t('SEARCH_BY_IDS')}</label>}>
            <Select
              id="search-by-ids-input"
              value={enteredIds}
              mode="tags"
              onChange={handleChange}
              className={classNames('w-100', selectStyles.select)}
              showSearch
              showArrow
            />
          </FloatingLabel>
        </Space>
      </Col>
    </Row>
  );
};

export default ProductSearch;
