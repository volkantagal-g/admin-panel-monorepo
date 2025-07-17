import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;

export function columns(t: Function, classes: { [x: string]: any }, npsTimeInterval: number) {
  return [
    {
      title: () => (
        <div>
          <Text className={classes.textBold}>{t('getirMarketDashboardPage:NET_PROMOTER_SCORE')} &nbsp;</Text>
          {/* '...' is loading */}
          <Tooltip title={t('getirMarketDashboardPage:NPS_TOOLTIP', { numOfDays: npsTimeInterval || '...' })}>
            <InfoCircleOutlined className="icon-type3" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'domainType',
      key: 'domainType',
      render: (domainType: number | string) => <Text>{t(`global:NPS_DOMAIN_TYPES.${domainType}`)}</Text>,
    },
    {
      title: <Text className={classes.textBold}>%</Text>,
      dataIndex: 'ratio',
      key: 'ratio',
      width: 30,
      align: 'right',
      render: (ratio: number) => {
        if (typeof ratio === 'number') return numberFormat({ maxDecimal: 0 }).format(ratio || 0);
        return ratio;
      },
    },
  ];
}
