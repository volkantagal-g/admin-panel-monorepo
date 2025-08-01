import { Row, Col, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Space, TextInput, FloatingLabel } from '@shared/components/GUI';
import { getLangKey } from '@shared/i18n';
import { filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { RECIPE_STATUSES, RECIPE_STATUSES_LABELS, DOMAIN_TYPES, DOMAIN_TYPES_LABELS } from '../../../constants';

import useSelectStyles from '@shared/components/GUI/Select/styles';

import { INITIAL_SELECTED_DOMAINS_OPTIONS, INITIAL_SELECTED_STATUS_OPTION } from '@app/pages/MarketProduct/Recipes/List/redux/reducer';

const { Option } = Select;

const statusFilterOptions =
  Object.entries(RECIPE_STATUSES).map(([, value]) => {
    return (
      <Option key={value} value={value}>
        {RECIPE_STATUSES_LABELS?.[value]?.[getLangKey()]}
      </Option>
    );
  });

export const domainsFilterOptions = Object.entries(DOMAIN_TYPES).map(([, value]) => {
  return (
    <Option key={value} value={value}>
      {DOMAIN_TYPES_LABELS?.[value]?.[getLangKey()]}
    </Option>
  );
});

const onClear = () => {
  Creators.setSelectedStatus({ selectedStatus: null });
};

const RecipesFilters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');
  const selectedDomains = useSelector(filtersSelector.getSelectedDomains) ?? INITIAL_SELECTED_DOMAINS_OPTIONS;
  const selectedStatus = useSelector(filtersSelector.getSelectedStatus) ?? INITIAL_SELECTED_STATUS_OPTION;

  const selectStyles = useSelectStyles({ label: true });
  const multipleSelectStyles = useSelectStyles({ mode: 'multiple', label: true });

  const handleOptionChange = options => {
    dispatch(Creators.setSelectedDomains({ selectedDomains: options }));
  };

  const handleStatusOptionChange = option => {
    dispatch(Creators.setSelectedStatus({ selectedStatus: option }));
  };

  const handleQueryTextChange = value => {
    dispatch(Creators.setQueryText({ queryText: value }));
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space title={t('FILTERS.TITLE')} className="w-100">
          <FloatingLabel label={<label htmlFor="status-filter-select">{t('FILTERS.STATUS')}</label>}>
            <Select
              id="status-filter-select"
              value={selectedStatus}
              onChange={handleStatusOptionChange}
              className={classNames('w-100', selectStyles.select)}
              showArrow
              allowClear
              onClear={onClear}
            >
              {statusFilterOptions}
            </Select>
          </FloatingLabel>
          <FloatingLabel label={<label htmlFor="domains-filter-multiselect">{t('FILTERS.DOMAINS')}</label>}>
            <Select
              id="domains-filter-multiselect"
              value={selectedDomains}
              mode="multiple"
              onChange={handleOptionChange}
              className={classNames('w-100', multipleSelectStyles.select)}
              showSearch
              showArrow
            >
              {domainsFilterOptions}
            </Select>
          </FloatingLabel>
          <TextInput
            label={<label htmlFor="search-input">{t('FILTERS.SEARCH')}</label>}
            id="search-input"
            onChange={({ target }) => handleQueryTextChange(target.value)}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default RecipesFilters;
