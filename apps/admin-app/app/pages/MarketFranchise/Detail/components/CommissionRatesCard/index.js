import PropTypes from 'prop-types';
import { Button, Row, Col, Steps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { CloseCircleOutlined, PlusSquareFilled } from '@ant-design/icons';

import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import { MARKET_FRANCHISE_COMMISSION_RATE_UPPER_BOUND } from '@shared/shared/constants';

import useStyles from './styles';

const { Step } = Steps;
const { Text } = Typography;

function CommissionRatesCard(props) {
  const {
    domainType,
    domainCommissionRates,
    touched,
    errors,
    setFieldValue,
    isFormEditable,
    customKey,
    handleAdd,
    handleRemove,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const REST_OF_ITEMS_TEXT = t("marketFranchisePage:REST_OF_ITEMS");

  const formatter = formatValue => {
    if (formatValue === MARKET_FRANCHISE_COMMISSION_RATE_UPPER_BOUND) {
      return REST_OF_ITEMS_TEXT;
    }
    return formatValue;
  };

  const parser = parserValue => {
    if (parserValue === REST_OF_ITEMS_TEXT) {
      return MARKET_FRANCHISE_COMMISSION_RATE_UPPER_BOUND;
    }
    return parserValue;
  };

  const additionalNumberProps = {
    min: -1,
    formatter,
    parser,
  };

  const handleOnRemoveButtonClick = index => {
    return () => {
      handleRemove(index);
    };
  };

  const renderRateWrapper = () => {
    return domainCommissionRates.map((commissionRateItem, index) => {
      const customRateItemKey = `commission-rate-card-${domainType}-item-${index}`;
      const commissionRateTitle = `#${(index + 1)}`;
      return (
        <Step
          key={customRateItemKey}
          title={commissionRateTitle}
          status="finish"
          description={(
            <Card
              extra={[
                <Button
                  icon={<CloseCircleOutlined />}
                  key={`${customRateItemKey}-removeButton`}
                  onClick={handleOnRemoveButtonClick(index)}
                  disabled={!isFormEditable}>
                </Button>,
              ]}
            >
              <Row gutter={[16]} align="bottom">
                <Col span={12}>
                  <InputWrapper
                    inputKey={[domainType, index, "min"]}
                    label={t('marketFranchisePage:MIN')}
                    value={commissionRateItem.min}
                    isTouched={_.get(touched, `${index}.min`)}
                    hasError={_.get(errors, `${index}.min`)}
                    disabled={!isFormEditable}
                    setFieldValue={setFieldValue}
                    mode="number"
                  />
                </Col>
                <Col span={12}>
                  <InputWrapper
                    inputKey={[domainType, index, "max"]}
                    label={t('marketFranchisePage:MAX')}
                    value={commissionRateItem.max}
                    isTouched={_.get(touched, `${index}.max`)}
                    hasError={_.get(errors, `${index}.max`)}
                    disabled={!isFormEditable}
                    setFieldValue={setFieldValue}
                    mode="number"
                    additionalProps={additionalNumberProps}
                  />
                </Col>
              </Row>
              <Row gutter={[16]} align="bottom">
                <Col span={12}>
                  <InputWrapper
                    inputKey={[domainType, index, "commissionRate"]}
                    label={t('marketFranchisePage:COMMISSION_RATE')}
                    value={commissionRateItem.commissionRate}
                    isTouched={_.get(touched, `${index}.commissionRate`)}
                    hasError={_.get(errors, `${index}.commissionRate`)}
                    disabled={!isFormEditable}
                    setFieldValue={setFieldValue}
                    mode="number"
                  />
                </Col>
              </Row>
            </Card>
          )}>
        </Step>
      );
    });
  };

  return (
    <Col span={12}>
      <Card
        title={t(`global:GETIR_MARKET_DOMAIN_TYPES:${domainType}`)}
        key={customKey}
        actions={[
          <Button
            key={`${customKey}-addButton`}
            onClick={handleAdd}
            disabled={!isFormEditable}
            icon={<PlusSquareFilled/>}
          />,
        ]}
      >
        {domainCommissionRates.length ?
          <Steps direction="vertical" progressDot>
            {renderRateWrapper()}
          </Steps>
          : <Text className={classes.noDataText}>
            {t('marketFranchisePage:NO_COMMISSION_RATE_ENTRY')}
          </Text>
        }
      </Card>
    </Col>
  );
}

CommissionRatesCard.propTypes = {
  domainType: PropTypes.string,
  domainCommissionRates: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  isFormEditable: PropTypes.bool,
  customKey: PropTypes.string,
  handleAdd: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default CommissionRatesCard;
