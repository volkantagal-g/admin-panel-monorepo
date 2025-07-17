import { ROUTE } from '@app/routes';
import { camelCaseToUpperCase } from '@app/pages/BusinessAlertingTool/utils';
import { WAREHOUSE_ID_BREAKDOWN_FIELD } from '@app/pages/BusinessAlertingTool/constants';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';

export const tableColumns = (t: any) => (breakdownField: string) => {
  return [
    {
      title: t(`batIncidentDetailPage:TEXT_TEMPLATE:${camelCaseToUpperCase(breakdownField)}`),
      dataIndex: 'breakdownField',
      key: 'breakdownField',
      width: 170,
      render: (renderValue: number, rowObject: any) => {
        if (breakdownField === WAREHOUSE_ID_BREAKDOWN_FIELD) {
          return (
            <RedirectButtonV2
              text={renderValue}
              to={ROUTE.WAREHOUSE_DETAIL.path.replace(':id', rowObject.resultBreakdownFieldId)}
              permKey={permKey.PAGE_WAREHOUSE_DETAIL}
              target="_blank"
              type="link"
              size="small"
              iconComponent
            />
          );
        }
        return renderValue;
      },
    },
    {
      title: t('batIncidentDetailPage:TEXT_TEMPLATE.THRESHOLD'),
      dataIndex: 'threshold',
      key: 'threshold',
      width: 200,
      render: (threshold: number) => <b>{threshold}</b>,
    },
    {
      title: t('batIncidentDetailPage:TEXT_TEMPLATE.ABOVE_BELOW'),
      dataIndex: 'operator',
      key: 'operator',
      width: 200,
      render: (operator: number) => t(`batAlertConditionCommon:CONSTANT_VALUES.ALERT_THRESHOLD_OPERATORS_HUMAN_READABLE.${operator}`),
    },
    {
      title: t('batIncidentDetailPage:TEXT_TEMPLATE.VALUE'),
      dataIndex: 'value',
      key: 'value',
      width: 200,
      render: (value: number) => <b>{value}</b>,
      sorter: { compare: (a: any, b: any) => a.value - b.value },
    },
  ];
};
