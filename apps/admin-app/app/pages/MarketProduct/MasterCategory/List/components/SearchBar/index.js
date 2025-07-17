import { useCallback } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';

const { Text } = Typography;
const { Panel } = Collapse;

const  SearchBar = ({ onSearch }) => {
  const { t } = useTranslation('marketProductCategoryPage');

  const handleSearch = inputValue => {
    return onSearch(inputValue);
  };

  const onChange = useCallback(_.debounce(handleSearch, DEFAULT_DEBOUNCE_MS), []);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t("FILTER")} key="1">
            <Space direction="vertical" className="w-100">
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

export default SearchBar;
