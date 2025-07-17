import { Input, Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';

const UserSearch = ({ onSearch, onSearchById }: { onSearch: (value: string) => void, onSearchById: (searchId: MongoIDType) => void }) => {
  const { t } = useTranslation(['userPage', 'global']);
  const [searchId, setSearchId] = useState('');

  const handleSearchById = () => {
    onSearchById(searchId);
    AnalyticsService.track(PANEL_EVENTS.USER_LIST.EVENT_NAME, { button: PANEL_EVENTS.USER_LIST.BUTTON.GET_USER_BY_ID });
  };

  return (
    <>
      <Input
        size="large"
        className="mb-2"
        placeholder={t('global:SEARCH')}
        onChange={event => {
          onSearch(event.target.value);
        }}
      />
      <Row>
        <Col flex="auto">
          <Input
            placeholder="fa68f4e77d53a07e332ee6bb"
            onChange={event => setSearchId(event.target.value)}
            onPressEnter={handleSearchById}
          />
        </Col>
        <Col flex="auto">
          <Button type="primary" onClick={handleSearchById}>
            {t('GET_USER_BY_ID')}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserSearch;
