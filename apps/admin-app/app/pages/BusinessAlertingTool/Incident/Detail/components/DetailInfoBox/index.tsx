import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { find, get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Typography, Skeleton, Col } from 'antd';

import { incidentConditions, FILTER_COMPONENT_FIELDS } from '@app/pages/BusinessAlertingTool/constants';
import { getLangKey } from '@shared/i18n';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import BATCard from '@app/pages/BusinessAlertingTool/components/BATCard';

import { incidentSelector } from '../../redux/selectors';
import useStyles from './styles';
import { tableColumns } from './config';
import { marketOrderStatuses, marketVehicleTypes, paymentMethods, posBanks } from '@shared/shared/constantValues';
import { DEVICE_TYPES } from '@shared/shared/constants';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';

const { Title } = Typography;

function DetailInfoBox() {
  const { t } = useTranslation(['batIncidentDetailPage']);
  const langKey = getLangKey();
  const classes = useStyles();

  const incident = useSelector(incidentSelector.getData);
  const isIncidentPending = useSelector(incidentSelector.getIsPending);

  const [isDetailInfoVisible, setIsDetailInfoVisible] = useState(false);

  const nonRelatedFieldsValues: { [x: string]: any } = {
    vehicleType: marketVehicleTypes,
    marketOrderStatus: marketOrderStatuses,
    orderChannel: DEVICE_TYPES,
    paymentPosBank: posBanks,
    marketOrderDomainType: getirMarketDomainTypes,
    paymentMethod: paymentMethods,
  };

  const getResultObject = () => {
    const currentPriority = get(incident, ['priority']);
    const resultObject = get(incident, ['conditions', incidentConditions[currentPriority]], {});
    const resultValuesByBreakdown = get(resultObject, 'resultValueByBreakdown', []);
    return { resultValuesByBreakdown, resultObject, currentPriority };
  };

  useEffect(() => {
    if (incident) {
      const { resultValuesByBreakdown } = getResultObject();
      setIsDetailInfoVisible(resultValuesByBreakdown.length > 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incident]);

  const columns = tableColumns(t);

  const getDetailInfoTitle = () => (`
    ${t('batIncidentDetailPage:PLACEHOLDERS:DETAIL')}
  `);

  const getBreakdownField = () => {
    const breakdownField = get(incident, ['alertSignals', 'breakdownField']);
    const filters = get(incident, ['metricGroup', 'tableSchema', 'filters']);
    const targetBreakdownField = find(filters, { fieldName: breakdownField });
    return get(targetBreakdownField, ['component', 'type']);
  };

  const breakdownField = getBreakdownField();

  const mappedBreakdownValue = (breakdownValue: any) => {
    const relatedFieldsKey = ['resultBreakdown', 'details', 'name'];
    const nonRelatedFieldsKey = ['resultBreakdown', 'key'];
    const fieldId = get(breakdownValue, ['resultBreakdown', 'key']);
    let targetFieldKey = '';
    let breakdownFieldValue = '';
    switch (breakdownField) {
      case FILTER_COMPONENT_FIELDS.WAREHOUSE:
        breakdownFieldValue = get(breakdownValue, relatedFieldsKey);
        break;
      case FILTER_COMPONENT_FIELDS.CITY:
        breakdownFieldValue = get(breakdownValue, [...relatedFieldsKey, langKey]);
        break;
      case FILTER_COMPONENT_FIELDS.ORDER_CHANNEL: {
        targetFieldKey = get(breakdownValue, nonRelatedFieldsKey, '');
        breakdownFieldValue = get(nonRelatedFieldsValues, [breakdownField, targetFieldKey.toUpperCase()], '-');
        break;
      }
      case FILTER_COMPONENT_FIELDS.VEHICLE_TYPE:
      case FILTER_COMPONENT_FIELDS.MARKET_ORDER_STATUS:
      case FILTER_COMPONENT_FIELDS.PAYMENT_POS_BANK:
      case FILTER_COMPONENT_FIELDS.MARKET_ORDER_DOMAIN_TYPE:
      case FILTER_COMPONENT_FIELDS.PAYMENT_METHOD:
      case FILTER_COMPONENT_FIELDS.COURIER_DOMAIN_TYPE: {
        targetFieldKey = get(breakdownValue, nonRelatedFieldsKey, '');
        if (breakdownField === FILTER_COMPONENT_FIELDS.COURIER_DOMAIN_TYPE) {
          breakdownFieldValue = t(`batAlertConditionCommon:CONSTANT_VALUES.ABSTRACT_COURIER_DOMAIN_TYPES.${targetFieldKey}`);
          break;
        }
        breakdownFieldValue = get(nonRelatedFieldsValues, [breakdownField, targetFieldKey, langKey], '-');
        break;
      }
      default:
        break;
    }
    return {
      breakdownField: breakdownFieldValue,
      occursAt: get(breakdownValue, 'occursAt'),
      threshold: get(breakdownValue, 'threshold'),
      operator: get(breakdownValue, 'operator'),
      value: get(breakdownValue, ['resultBreakdown', 'value']),
      resultBreakdownFieldId: fieldId,
    };
  };

  const getMappedResultBreakdowns = () => {
    const { resultValuesByBreakdown, resultObject } = getResultObject();

    return resultValuesByBreakdown.map((resultBreakdown: any) => {
      return mappedBreakdownValue({ ...resultObject, resultBreakdown });
    });
  };

  if (!isDetailInfoVisible) {
    return null;
  }

  return (
    <Col xs={24}>
      <BATCard>
        <div className={classes.fullWidth}>
          <Skeleton active loading={isIncidentPending}>
            <Title level={4}>{getDetailInfoTitle()}</Title>
            <AntTableV2
              data={getMappedResultBreakdowns()}
              columns={columns(breakdownField)}
              loading={isIncidentPending}
              showSorterTooltip={false}
              scroll={{ y: '500px' }}
            />
          </Skeleton>
        </div>
      </BATCard>
    </Col>
  );
}

export default DetailInfoBox;
