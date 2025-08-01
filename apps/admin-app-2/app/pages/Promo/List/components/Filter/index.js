import { useState } from 'react';
import { Button, Col, Collapse, DatePicker, Row, Select, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import moment from 'moment';

import { SelectPromo } from '@shared/containers/Select/Promo';
import useStyles from './styles';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import { getDiscountReasonsOptions, getStatusTypesOptions } from '../../config';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { allDomainTypes } from '@app/pages/Promo/constantValues';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

function Filter({ filters, handleSubmit, isPending }) {
  const [validFrom, setValidFrom] = useState(filters.validFrom);
  const [validUntil, setValidUntil] = useState(filters.validUntil);
  const [promoCode, setPromoCode] = useState(filters.promoCode);
  const [status, setStatus] = useState(filters.status);
  const [discountReason, setDiscountReason] = useState(filters.discountReason);
  const [domainTypes, setDomainTypes] = useState([]);

  const { t } = useTranslation('promoPage');
  const classes = useStyles();

  const handleSelectDateRange = ([startDate, endDate]) => {
    setValidFrom(startDate);
    setValidUntil(endDate);
  };

  const submitButtonClick = () => {
    handleSubmit({
      promoCode,
      status: status?.value && +status.value,
      discountReason: discountReason?.value && +discountReason.value,
      domainTypes: domainTypes.map(domain => +domain.value),
      startDate: validFrom ? moment(validFrom).valueOf() : undefined,
      endDate: validUntil ? moment(validUntil).valueOf() : undefined,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={8}>
                  <Text>{t('SEARCH_PROMO')}</Text>
                  <SelectPromo
                    slice="promo-list"
                    onChange={setPromoCode}
                    placeholder={t('SEARCH_PROMO')}
                    disabled={isPending}
                    allowClear
                    className="w-100"
                    showIds
                  />
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Text>{t('global:DATE_RANGE')}</Text>
                  <RangePicker
                    format={DEFAULT_TIME_FORMAT}
                    className="w-100"
                    showTime
                    value={[validFrom, validUntil]}
                    onChange={handleSelectDateRange}
                    disabled={isPending}
                  />
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Text>{t('global:STATUS')}</Text>
                  <Select
                    labelInValue
                    value={status}
                    className="w-100"
                    onChange={selectedStatus => setStatus(selectedStatus)}
                    options={getStatusTypesOptions()}
                    disabled={isPending}
                    autoComplete="off"
                    showSearch
                    allowClear
                  />
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Text>{t('DISCOUNT_REASON')}</Text>
                  <Select
                    labelInValue
                    value={discountReason}
                    className="w-100"
                    onChange={selectedDiscountReason => setDiscountReason(selectedDiscountReason)}
                    options={getDiscountReasonsOptions()}
                    disabled={isPending}
                    autoComplete="off"
                    showSearch
                    allowClear
                  />
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Text>{t('GENERAL_INFO.PROMO_DOMAIN')}</Text>
                  <Select
                    labelInValue
                    mode="multiple"
                    allowClear
                    className="w-100"
                    value={domainTypes}
                    options={convertConstantValuesToSelectOptions(allDomainTypes)}
                    onChange={selectedDomainTypes => {
                      setDomainTypes(selectedDomainTypes);
                    }}
                    autoComplete="off"
                    disabled={isPending}
                    showSearch
                    filterOption={getSelectFilterOption}
                  />
                </Col>
              </Row>
              <Col>
                <div className={classes.submitButtonContainer}>
                  <Button
                    size="medium"
                    variant="contained"
                    type="primary"
                    disabled={isPending}
                    onClick={submitButtonClick}
                  >
                    {t('global:BRING')}
                  </Button>
                </div>
              </Col>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

export default Filter;
