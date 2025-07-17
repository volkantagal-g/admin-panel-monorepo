import { useCallback } from 'react';
import { Row, Col, Collapse, Space, Select, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import { firmTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../redux/actions';
import { suppliersSelector } from '../../redux/selectors';
import { getSelectFilterOption } from '@shared/utils/common';

const { Search } = Input;

const { Text } = Typography;

const { Option } = Select;

const { Panel } = Collapse;

const Filter = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['global']);
  const { t: translate } = useTranslation(['supplierPage']);

  const supplierTypes = useSelector(suppliersSelector.getSupplierTypes);
  const searchValue = useSelector(suppliersSelector.getSearchValue);

  const handleSupplierTypeChange = selects => {
    dispatch(Creators.setSupplierTypes({ supplierTypes: selects }));
  };

  const firmTypeOptions = Object.entries(firmTypes).map(([key, value]) => {
    return (
      <Option key={key} value={key}>
        {value[getLangKey()]}
      </Option>
    );
  });

  const handleSearch = inputValue => {
    if (inputValue === searchValue) {
      return;
    }
    dispatch(Creators.setSearchValue({ searchValue: inputValue }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = useCallback(debounce(handleSearch, 500), []);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className="w-100">
              <Text>{translate('SUPPLIER_TEXT')}</Text>
              <Select
                value={supplierTypes}
                mode="multiple"
                placeholder={t('FILTER')}
                onChange={handleSupplierTypeChange}
                showArrow={false}
                className="w-100"
                showSearch
                filterOption={getSelectFilterOption}
              >
                {firmTypeOptions}
              </Select>
              <Text>{t('SEARCH')}</Text>
              <Search
                placeholder={translate('SEARCH_INPUT')}
                onSearch={handleSearch}
                onChange={({ target }) => {
                  return onChange(target.value);
                }}
                enterButton
              />
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
