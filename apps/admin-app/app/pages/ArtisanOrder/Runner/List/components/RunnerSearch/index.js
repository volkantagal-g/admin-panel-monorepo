import { Button, Col, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

function RunnerSearch(props) {
  const {
    onSearchChange,
    onCompanyIdChange,
    onShoppingMallIdChange,
    onSearchByShoppingMallId,
    onSearchByCompanyId,
    searchQuery,
    companyId,
    shoppingMallId,
  } = props;
  const { t } = useTranslation(['runnerListPage', 'global']);

  return (
    <div>
      <Input
        size="large"
        className="mb-2"
        placeholder={t('global:SEARCH')}
        onChange={event => {
          onSearchChange(event.target.value);
        }}
        value={searchQuery}
      />
      <Row>
        <Col flex="auto">
          <Input
            placeholder="fa68f4e77d53a07e332ee6bb"
            onChange={event => onCompanyIdChange(event.target.value)}
            onPressEnter={onSearchByCompanyId}
            value={companyId}
          />
        </Col>
        <Col flex="auto">
          <Button type="primary" onClick={onSearchByCompanyId}>
            {t('GET_RUNNER_BY_COMPANY_ID')}
          </Button>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col flex="auto">
          <Input
            placeholder="fa68f4e77d53a07e332ee6bb"
            onChange={event => onShoppingMallIdChange(event.target.value)}
            onPressEnter={onSearchByShoppingMallId}
            value={shoppingMallId}
          />
        </Col>
        <Col flex="auto">
          <Button type="primary" onClick={onSearchByShoppingMallId}>
            {t('GET_RUNNER_BY_SHOPPING_MALL_ID')}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default RunnerSearch;
