export const getTableColumns = ({ t }) => {
  return [
    {
      title: t('courierLoyalty:COURIER_NAME'),
      dataIndex: 'courierName',
      width: 130,
    },
    {
      title: t('courierLoyalty:LEVEL'),
      dataIndex: 'level',
      width: 70,
    },
    {
      title: t('courierLoyalty:PERFORMANCE_CLASS'),
      dataIndex: 'performanceGroup',
    },
    {
      title: t('courierLoyalty:PERFORMANCE_SCORES'),
      dataIndex: 'performanceScore',
    },
    {
      title: t('courierLoyalty:PERFORMANCE_RANK'),
      dataIndex: 'rank',
    },
    {
      title: t('courierLoyalty:XP'),
      dataIndex: 'xp',
      width: 60,
    },
    {
      title: t('courierLoyalty:WAREHOUSE'),
      dataIndex: 'warehouse',
      width: 170,
    },
    {
      title: t('courierLoyalty:SAFETY_SCORES'),
      dataIndex: 'safetyScore',
      width: 120,
    },
    {
      title: t('courierLoyalty:RATINGS'),
      dataIndex: 'rating',
      width: 70,
    },
    {
      title: t('courierLoyalty:TIP'),
      dataIndex: 'tip',
      width: 60,
    },
    {
      title: t('courierLoyalty:ESTIMATED_BONUS'),
      dataIndex: 'estimatedBonus',
    },
    {
      title: t('courierLoyalty:TOTAL_ORDER_COUNT'),
      dataIndex: 'totalOrderCount',
      width: 120,
    },
  ];
};
