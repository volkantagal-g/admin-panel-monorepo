import { useState } from 'react';
import { Row, Col, Typography, Collapse, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { SelectWrapper } from '@shared/components/UI/Form';
import SelectFranchise from '@shared/containers/Select/Franchise';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';
import { AgreementStatusCodeENUM, AgreementStatusCodes } from '../../constants';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = ({ filters, handleSubmit, isPending }) => {
  const { t } = useTranslation('franchiseLegalPage');

  const [franchiseIds, setFranchiseIds] = useState(filters.franchiseIds || []);
  const [agreementStatus, setAgreementStatus] = useState(filters.status || undefined);

  const handleSubmitClick = () => {
    handleSubmit({
      franchiseIds,
      status: agreementStatus,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12} md={12}>
                <Text>{t('FRANCHISE')}</Text>
                <SelectFranchise
                  isMultiple
                  isActivated
                  placeholder={t('FILTER')}
                  onChange={value => {
                    setFranchiseIds(value);
                  }}
                  showArrow={false}
                  disabled={isPending}
                />
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Text>{t('DETAIL.AGREEMENT_STATUS')}</Text>
                <SelectWrapper
                  style={{ width: '100%' }}
                  placeholder={t('FILTER')}
                  selectKey="status"
                  allowClear
                  optionsData={convertConstantValueTranslationsToSelectOptions(
                    {
                      constants: AgreementStatusCodes,
                      translationBaseKey: 'franchiseLegalPage:DETAIL',
                    },
                  )}
                  shouldMapOptionsData
                  showSearch={false}
                  onChangeCallback={value => {
                    setAgreementStatus(AgreementStatusCodeENUM[value]);
                  }}
                  disabled={isPending}
                />
              </Col>
            </Row>
            <Row>
              <Button
                type="primary"
                onClick={handleSubmitClick}
                disabled={isPending}
              >
                {t('BRING')}
              </Button>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
