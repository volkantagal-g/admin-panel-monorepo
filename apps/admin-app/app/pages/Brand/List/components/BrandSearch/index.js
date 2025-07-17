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
import { brandStatuses } from '@shared/shared/constantValues';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';

const { Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const  BrandSearch = ({ onSearch,  onStatusChange }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('brandPage');

  const selectedStatuses = useSelector(filtersSelector.getSelectedFilterOptions) || [];

  const handleOptionChange = statuses => {
    if(statuses.length === 0 || statuses.length  === 2) {
      onStatusChange();
    }
    else {
      const [ status ] = statuses;
      onStatusChange(Boolean(Number(status)));
    }
    dispatch(Creators.setFilterOptions({ selectedStatuses: statuses }));
  };

  const brandStatusOptions = Object.entries(brandStatuses).map(([key, value]) => {
    return (
      <Option key={key} value={key}>
        {value[getLangKey()]}
      </Option>
    );
  });

  const handleSearch = inputValue => {
    return onSearch(inputValue);
  };

  const onChange = useCallback(debounce(handleSearch, DEFAULT_DEBOUNCE_MS), []);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t("FILTER")} key="1">
            <Space direction="vertical" className="w-100">
              <Text>{t("ACTIVENESS")}</Text>
              <Select
                value={selectedStatuses}
                mode="multiple"
                placeholder={t("ACTIVENESS")}
                onChange={handleOptionChange}
                showArrow={false}
                className="w-100"
                showSearch
                filterOption={getSelectFilterOption}
              >
                {brandStatusOptions}
              </Select>
              <Text>{t("SEARCH")}</Text>
              <Input
                placeholder={t("SEARCH")}
                onChange={({ target }) => onChange(target.value)}
              />
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default BrandSearch;
