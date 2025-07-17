import { Col, Row, Select } from 'antd';

import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { FILTER_FORM } from './config';
import { getLangKey } from '@shared/i18n';
import useStyles from '@app/pages/Client/Detail/components/LoyaltyDetails/styles';
import { loyaltyStampsSelector } from '@app/pages/Client/Detail/redux/selectors';

const Filters = ({ filters, setFilters }) => {
  const langKey = getLangKey();
  const { t } = useTranslation('clientDetail');
  const loyaltyStamps = useSelector(loyaltyStampsSelector.getStamps);
  const classes = useStyles();

  const handleSelectChange = fieldName => {
    return (_selectedItems, selectedOption) => {
      setFilters({ ...filters, [fieldName]: selectedOption });
    };
  };

  const { LOYALTY_TYPE } = useMemo(
    () => FILTER_FORM({ t, langKey, loyaltyStamps }),
    [langKey, loyaltyStamps, t],
  );

  return (
    <Row className={classes.rowPadding} gutter={24}>
      <Col span={6}>
        <Select className={filters.loyaltyType} value={filters.loyaltyType} onChange={handleSelectChange(LOYALTY_TYPE.name)} {...LOYALTY_TYPE} />
      </Col>
    </Row>
  );
};

export default Filters;
