/* eslint-disable indent */
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { InputWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import FeesTable from './FeesTable';
import { FEE_LAYER_TYPE, ORDER_FEE_TYPE } from '@shared/shared/constants';

function DomainConfigCard(props) {
  const { domainType, domainConfigValues, touched, errors, setFieldValue, isFormEditable, customKey } = props;
  const { t } = useTranslation();
  return (
    <Col>
      <Card title={t(`global:GETIR_MARKET_DOMAIN_TYPES:${domainType}`)} key={customKey}>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <InputWrapper
              inputKey={[domainType, 'ORDER_LIMITS', 'MINIMUM_DISCOUNTED_AMOUNT']}
              label={t('warehousePage:MINIMUM_DISCOUNTED_AMOUNT')}
              value={_.get(domainConfigValues, 'ORDER_LIMITS.MINIMUM_DISCOUNTED_AMOUNT')}
              isTouched={_.get(touched, 'ORDER_LIMITS.MINIMUM_DISCOUNTED_AMOUNT')}
              hasError={_.get(errors, 'ORDER_LIMITS.MINIMUM_DISCOUNTED_AMOUNT')}
              disabled={!isFormEditable}
              setFieldValue={setFieldValue}
              mode="number"
              format="price"
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              inputKey={[domainType, 'ORDER_LIMITS', 'MAXIMUM_DISCOUNTED_AMOUNT']}
              label={t('warehousePage:MAXIMUM_DISCOUNTED_AMOUNT')}
              value={_.get(domainConfigValues, 'ORDER_LIMITS.MAXIMUM_DISCOUNTED_AMOUNT')}
              isTouched={_.get(touched, 'ORDER_LIMITS.MAXIMUM_DISCOUNTED_AMOUNT')}
              hasError={_.get(errors, 'ORDER_LIMITS.MAXIMUM_DISCOUNTED_AMOUNT')}
              disabled={!isFormEditable}
              setFieldValue={setFieldValue}
              mode="number"
              format="price"
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              inputKey={[domainType, 'ORDER_DELIVERY_FEE', 'AMOUNT']}
              label={t('warehousePage:AMOUNT')}
              value={_.get(domainConfigValues, 'ORDER_DELIVERY_FEE.AMOUNT')}
              isTouched={_.get(touched, 'ORDER_DELIVERY_FEE.AMOUNT')}
              hasError={_.get(errors, 'ORDER_DELIVERY_FEE.AMOUNT')}
              disabled={!isFormEditable}
              setFieldValue={setFieldValue}
              mode="number"
              format="price"
            />
          </Col>
          <Col span={24}>
            <FeesTable
              isTouched={_.get(touched, 'ORDER_DELIVERY_FEE.LAYERS')}
              hasError={_.get(errors, 'ORDER_DELIVERY_FEE.LAYERS')}
              disabled={!isFormEditable}
              value={_.get(domainConfigValues, 'ORDER_DELIVERY_FEE.LAYERS')}
              setFieldValue={setFieldValue}
              domainType={domainType}
              title={t('warehousePage:DELIVERY_FEES')}
              orderFeeType={ORDER_FEE_TYPE.DELIVERY_FEE}
              feeType={FEE_LAYER_TYPE.REGULAR}
            />
          </Col>
          <Col span={24}>
            <FeesTable
              isTouched={_.get(touched, 'ORDER_DELIVERY_FEE.SURGE_FEE_LAYERS')}
              hasError={_.get(errors, 'ORDER_DELIVERY_FEE.SURGE_FEE_LAYERS')}
              disabled={!isFormEditable}
              value={_.get(domainConfigValues, 'ORDER_DELIVERY_FEE.SURGE_FEE_LAYERS')}
              setFieldValue={setFieldValue}
              domainType={domainType}
              title={t('warehousePage:DELIVERY_FEES_PEAK_HOURS')}
              orderFeeType={ORDER_FEE_TYPE.DELIVERY_FEE}
              feeType={FEE_LAYER_TYPE.PEAK_HOURS}
            />
          </Col>
          <Col span={24}>
            <FeesTable
              isTouched={_.get(touched, 'ORDER_SERVICE_FEE.LAYERS')}
              hasError={_.get(errors, 'ORDER_SERVICE_FEE.LAYERS')}
              disabled={!isFormEditable}
              value={_.get(domainConfigValues, 'ORDER_SERVICE_FEE.LAYERS')}
              setFieldValue={setFieldValue}
              domainType={domainType}
              title={t('warehousePage:SERVICE_FEES')}
              orderFeeType={ORDER_FEE_TYPE.SERVICE_FEE}
              feeType={FEE_LAYER_TYPE.REGULAR}
            />
          </Col>
          <Col span={24}>
            <FeesTable
              isTouched={_.get(touched, 'ORDER_SERVICE_FEE.SURGE_FEE_LAYERS')}
              hasError={_.get(errors, 'ORDER_SERVICE_FEE.SURGE_FEE_LAYERS')}
              disabled={!isFormEditable}
              value={_.get(domainConfigValues, 'ORDER_SERVICE_FEE.SURGE_FEE_LAYERS')}
              setFieldValue={setFieldValue}
              domainType={domainType}
              title={t('warehousePage:SERVICE_FEES_PEAK_HOURS')}
              orderFeeType={ORDER_FEE_TYPE.SERVICE_FEE}
              feeType={FEE_LAYER_TYPE.PEAK_HOURS}
            />
          </Col>
          {_.get(domainConfigValues, 'ORDER_DELIVERY_FEE.AMOUNT', -1) === 0 && (
            <Col span={12}>
              <InputWrapper
                inputKey={[domainType, 'ORDER_DELIVERY_FEE', 'STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO']}
                label={t('warehousePage:STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO')}
                value={_.get(domainConfigValues, 'ORDER_DELIVERY_FEE.STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO')}
                isTouched={_.get(touched, 'ORDER_DELIVERY_FEE.STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO')}
                hasError={_.get(errors, 'ORDER_DELIVERY_FEE.STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO')}
                disabled={!isFormEditable}
                setFieldValue={setFieldValue}
                mode="number"
                format="price"
              />
            </Col>
          )}
          <Col span={12}>
            <InputWrapper
              inputKey={[domainType, 'ORDER_DELIVERY_FEE', 'DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X']}
              label={t('warehousePage:DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X')}
              value={_.get(domainConfigValues, 'ORDER_DELIVERY_FEE.DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X')}
              isTouched={_.get(touched, 'ORDER_DELIVERY_FEE.DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X')}
              hasError={_.get(errors, 'ORDER_DELIVERY_FEE.DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X')}
              disabled={!isFormEditable}
              setFieldValue={setFieldValue}
              mode="number"
              format="price"
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              inputKey={[domainType, 'ORDER_DELIVERY_FEE', 'DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT']}
              label={t('warehousePage:DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT')}
              value={_.get(domainConfigValues, 'ORDER_DELIVERY_FEE.DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT')}
              isTouched={_.get(touched, 'ORDER_DELIVERY_FEE.DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT')}
              hasError={_.get(errors, 'ORDER_DELIVERY_FEE.DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT')}
              disabled={!isFormEditable}
              setFieldValue={setFieldValue}
              mode="number"
            />
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

DomainConfigCard.propTypes = {
  domainConfigValues: PropTypes.shape().isRequired,
  touched: PropTypes.shape(),
  errors: PropTypes.shape(),
  setFieldValue: PropTypes.func.isRequired,
  isFormEditable: PropTypes.bool.isRequired,
  domainType: PropTypes.number.isRequired,
  customKey: PropTypes.string,
};

DomainConfigCard.defaultProps = { touched: undefined, errors: undefined, customKey: '' };

export default DomainConfigCard;
