import { Button, Tooltip, Typography } from 'antd';
import moment from 'moment';

const { Text } = Typography;

export const generateColumns = ({ dataTimeZone, t, handleCourierReassign }) => {
  const rules = [
    {
      title: t('SLOT'),
      dataIndex: 'slot',
      key: 'slot',
      render: (_, slotData) => {
        return (
          <>
            <Text> {moment.tz(slotData?.start, dataTimeZone).format('HH:mm')}</Text>
            -
            <Text> {moment.tz(slotData?.end, dataTimeZone).format('HH:mm')}</Text>
          </>
        );
      },
    },
    {
      title: t('PLANNED_COURIER'),
      dataIndex: 'nOfCouriersPlanned',
      key: 'nOfCouriersPlanned',
      render: nOfCouriersPlanned => nOfCouriersPlanned,
    },
    {
      title: <Tooltip title={t('TOOLTIP_PLANNED_ROUTE')}>{t('PLANNED_ROUTE')}</Tooltip>,
      dataIndex: 'nOfRoutesPlanned',
      key: 'nOfRoutesPlanned',
      render: nOfRoutesPlanned => nOfRoutesPlanned,
    },
    {
      title: <Tooltip title={t('TOOLTIP_PLANNED_RETURN')}>{t('PLANNED_RETURN')}</Tooltip>,
      dataIndex: 'nOfReturnsPlanned',
      key: 'nOfReturnsPlanned',
      render: nOfReturnsPlanned => nOfReturnsPlanned,
    },
    {
      title: t('ASSIGNED_COURIER'),
      dataIndex: 'nOfCouriersAssigned',
      key: 'nOfCouriersAssigned',
      render: nOfCouriersAssigned => nOfCouriersAssigned,
    },
    {
      title: <Tooltip title={t('TOOLTIP_SLOT_OCCUPANCY')}>{t('SLOT_OCCUPANCY')}</Tooltip>,
      dataIndex: 'occupancy',
      key: 'occupancy',
      render: occupancy => occupancy,
    },
    {
      title: '#',
      dataIndex: 'id',
      render: id => {
        return (
          <Button
            onClick={() => {
              handleCourierReassign(id);
            }}
            size="small"
            data-testid={{ id }}
          >
            {t('BUTTON_TRY_COURIER_REASSIGN')}
          </Button>
        );
      },
    },
  ];

  return rules;
};
