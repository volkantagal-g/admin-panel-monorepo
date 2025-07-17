import { useCallback, useState } from 'react';
import { Row, Col, Input, Typography } from 'antd';
import { debounce } from 'lodash';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { t } from '@shared/i18n';

const { Text } = Typography;

const GiveawaySearch = ({ onSearch, searchTerm }) => {
  const [value, setValue] = useState(searchTerm || '');

  const handleSearch = inputValue => {
    return onSearch(inputValue);
  };

  const onChange = useCallback(debounce(handleSearch, DEFAULT_DEBOUNCE_MS), []);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Text>{t('SEARCH')}</Text>
        <Input
          value={value}
          placeholder={t('SEARCH_GIVEAWAY')}
          onChange={({ target }) => {
            setValue(target.value);
            return onChange(target.value);
          }}
        />
      </Col>
    </Row>
  );
};

export default GiveawaySearch;
