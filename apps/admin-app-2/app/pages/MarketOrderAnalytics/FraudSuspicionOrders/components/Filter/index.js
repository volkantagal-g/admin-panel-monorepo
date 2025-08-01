import { Col, Row } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';

import { Creators } from '../../redux/actions';
import { filtersSelector } from '../../redux/selectors';
import useStyles from './styles';
import { Select, Space } from '@shared/components/GUI';

const Filter = () => {
  const { t } = useTranslation('fraudSuspicionOrdersPage');
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);

  const domainTypeOptions = useMemo(
    () => GETIR_MARKET_DOMAIN_TYPES.map(value => ({
      label: t(`global:GETIR_MARKET_DOMAIN_TYPES:${value}`),
      value,
    })),
    [t],
  );

  return (
    <Space title={t('TITLE')}>
      <Row gutter={[8, 8]}>
        <Col md={8} className={classes.fullWidth}>
          <Select
            label={t('global:DOMAIN')}
            value={selectedDomainType}
            onChange={domainType => {
              dispatch(Creators.setSelectedDomainType({ domainType }));
            }}
            allowClear
            optionsData={domainTypeOptions}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default Filter;
