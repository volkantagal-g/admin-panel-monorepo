import { useCallback } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Select,
  Input,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { debounce } from 'lodash';

import { getLangKey } from '@shared/i18n';

import { filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { marketProductCategoryStatuses } from '@shared/shared/constantValues';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';
import SelectDomainType from '@shared/containers/Select/DomainType';

const { Text } = Typography;

const { Option } = Select;

const { Panel } = Collapse;

const ProductCategorySearch = ({ onSearch, onStatusChange, onDomainChange, domainType }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductCategoryPage');
  const domainTypes = {
    1: { en: 'Getir10', tr: 'Getir10' },
    3: { en: 'GetirMore', tr: 'GetirBüyük' },
  };

  const selectedStatuses = useSelector(filtersSelector.getSelectedFilterOptions) || [];
  const handleOptionChange = statuses => {
    if (statuses.length === 0 || statuses.length === 2) {
      onStatusChange();
    }
    else {
      const [status] = statuses;
      onStatusChange(Number(status));
    }
    dispatch(Creators.setFilterOptions({ selectedStatuses: statuses }));
  };

  const categoryStatuses = Object.entries(marketProductCategoryStatuses).map(([key, value]) => {
    return (
      <Option key={key} value={key}>
        {value[getLangKey()]}
      </Option>
    );
  });

  const handleSearch = inputValue => {
    return onSearch(inputValue);
  };
  const handleDomainType = val => {
    return onDomainChange(val);
  };

  const onChange = useCallback(debounce(handleSearch, DEFAULT_DEBOUNCE_MS), []);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className="w-100">
              <Text>{t('DOMAIN_TYPE')}</Text>
              <SelectDomainType value={domainType} onChange={handleDomainType} domainTypes={domainTypes} />
              <Text>{t('ACTIVENESS')}</Text>
              <Select
                value={selectedStatuses}
                mode="multiple"
                placeholder={t('ACTIVENESS')}
                onChange={handleOptionChange}
                showArrow={false}
                className="w-100"
                showSearch
                filterOption={getSelectFilterOption}
              >
                {categoryStatuses}
              </Select>
              <Text>{t('SEARCH')}</Text>
              <Input
                placeholder={t('SEARCH')}
                onChange={({ target }) => onChange(target.value)}
              />
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default ProductCategorySearch;
