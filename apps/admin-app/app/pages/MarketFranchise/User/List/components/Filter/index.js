import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Collapse, Typography, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AntSelect from '@shared/components/UI/AntSelect';
import { convertedActivenessOptions } from '../../utils';
import useStyles from './styles';
import { franchiseUserListSelector } from '../../redux/selectors';

const { Text } = Typography;
const { Panel } = Collapse;

const FranchiseUserFilter = ({ filters, handleSearch }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketFranchiseUserPage');

  const isPending = useSelector(franchiseUserListSelector.getIsPending);

  const [searchValue, setSearchValue] = useState(filters.searchValue);
  const [isActivated, setIsActivated] = useState(filters.isActivated);

  const handlePersonStatus = selectedStatus => {
    setIsActivated(selectedStatus);
  };

  const handleSearchValue = searchTerm => {
    setSearchValue(searchTerm.target.value);
  };

  const searchButtonClick = () => {
    handleSearch({ searchValue: searchValue.trim(), isActivated });
  };

  return (

    <Collapse flex={1} defaultActiveKey={['1']}>
      <Panel key="1" header={t('global:FILTER')} className={classes.panelContainer}>
        <Row gutter={[8, 8]}>
          <Col flex={3}>
            <Text>{t('global:SEARCH')}</Text>
            <Input
              value={searchValue}
              onChange={handleSearchValue}
              disabled={isPending}
              placeholder={t('global:SEARCH')}
            />
          </Col>
          <Col flex={1}>
            <Text>{t('global:ACTIVENESS')}</Text>
            <AntSelect
              value={isActivated}
              onChange={handlePersonStatus}
              options={convertedActivenessOptions}
              placeholder={t('global:ACTIVENESS')}
              allowClear
              disabled={isPending}
              className={classes.activenessInput}
            />
          </Col>
          <Col flex="none">
            <div className={classes.buttonContainer}>
              <Button type="primary" disabled={isPending} onClick={searchButtonClick}>
                {t('global:BRING')}
              </Button>
            </div>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

FranchiseUserFilter.propTypes = {
  filters: PropTypes.shape({
    searchValue: PropTypes.string,
    isActivated: PropTypes.bool,
  }).isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default FranchiseUserFilter;
