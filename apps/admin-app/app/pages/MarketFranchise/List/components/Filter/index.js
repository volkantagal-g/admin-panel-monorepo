import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Input,
  Typography,
  Switch,
  Button,
} from 'antd';
import { useTranslation } from 'react-i18next';

import SelectCity from '@shared/containers/Select/City';
import SelectDomainType from '@shared/containers/Select/DomainType';
import SelectFranchiseType from '@shared/containers/Select/FranchiseType';

import useStyles from './styles';
import { GETIR_FINANCE_DOMAIN_TYPE } from '@shared/shared/constants';

const { Text } = Typography;
const { Panel } = Collapse;

function Filter({ filters, handleSubmit, isPending, isGetirFinanceEmployees = false }) {
  const [selectedDomainTypes, setSelectedDomainTypes] = useState(filters.domainTypes);
  const [selectedFranchiseTypes, setSelectedFranchiseTypes] = useState(filters.franchiseTypes);
  const [selectedCities, setSelectedCities] = useState(filters.cities);
  const [name, setName] = useState(filters.name);
  const [isActivated, setIsActivated] = useState(filters.isActivated);

  const { t } = useTranslation();

  const classes = useStyles();

  const handleDomainTypeChange = domainTypes => {
    setSelectedDomainTypes(domainTypes);
  };

  const handleFranchiseTypeChange = franchiseTypes => {
    setSelectedFranchiseTypes(franchiseTypes);
  };

  const handleCityChange = cities => {
    setSelectedCities(cities);
  };

  const handleIsActiveChange = isActive => {
    setIsActivated(isActive);
  };

  const handleSetName = event => {
    setName(event.target.value);
  };

  const submitButtonClick = () => {
    handleSubmit({
      isActivated,
      name,
      cities: selectedCities,
      domainTypes: selectedDomainTypes,
      franchiseTypes: selectedFranchiseTypes,
    });
  };

  useEffect(() => {
    if (isGetirFinanceEmployees) {
      handleDomainTypeChange([GETIR_FINANCE_DOMAIN_TYPE]);
    }
  }, [isGetirFinanceEmployees]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Text>{t('global:FRANCHISE_TYPES')}</Text>
              <SelectFranchiseType
                value={selectedFranchiseTypes}
                mode="multiple"
                placeholder={t('global:FILTER')}
                onChange={handleFranchiseTypeChange}
                showArrow={false}
                isDisabled={isPending}
              />
              <Text>{t('global:DOMAIN_TYPE')}</Text>
              <SelectDomainType
                value={selectedDomainTypes}
                mode="multiple"
                placeholder={t('global:FILTER')}
                onChange={handleDomainTypeChange}
                showArrow={false}
                className={classes.domainTypeSelect}
                isDisabled={isPending || isGetirFinanceEmployees}
              />
              <Text>{t('global:CITY')}</Text>
              <SelectCity
                value={selectedCities}
                mode="multiple"
                showArrow={false}
                onChange={handleCityChange}
                isDisabled={isPending}
              />
              <Text>{t('global:SEARCH')}</Text>
              <Input
                value={name}
                placeholder={t('global:NAME')}
                onChange={handleSetName}
              />
              <Switch
                checked={isActivated}
                onChange={handleIsActiveChange}
                checkedChildren={t('global:ACTIVE')}
                unCheckedChildren={t('global:INACTIVE')}
                className={isActivated ? 'bg-success' : 'bg-danger'}
              />
            </Space>
            <div className={classes.buttonContainer}>
              <Button type="primary" onClick={submitButtonClick}>
                {t('global:BRING')}
              </Button>
            </div>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

export default Filter;
