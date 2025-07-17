import { get } from 'lodash';
import { Button } from 'antd';

import { ENVIRONMENT } from '@shared/config';

const { REACT_APP_WATER_PANEL_URL: WATER_PANEL_URL } = ENVIRONMENT;

export default function generateTableColumns(t, statusList) {
  const columns = [
    {
      title: t('STATUS'),
      dataIndex: 'status',
      render: statusValue => statusList.find(({ id }) => id === statusValue)?.status,
    },
    {
      title: t('IS_OPEN'),
      dataIndex: 'isOpen',
      render: isOpen => t(`FILTER.IS_OPEN.${isOpen ? 'OPEN' : 'CLOSE'}`, { isTableScoped: false }),
    },
    {
      title: t('NAME'),
      dataIndex: 'vendorName',
    },
    {
      title: t('ID'),
      dataIndex: 'vendorId',
    },
    {
      title: t('FIRM'),
      dataIndex: 'firmName',
    },
    {
      title: t('BRAND'),
      dataIndex: 'brandName',
    },
    {
      title: t('CITY'),
      dataIndex: 'cityName',
    },
    {
      title: t('ACTION'),
      dataIndex: '',
      render: record => {
        const vendorId = get(record, 'vendorId', '');
        return (
          <Button>
            <a target="_blank" rel="noreferrer" href={`${WATER_PANEL_URL}/${vendorId}`}>
              {t('DETAIL_BUTTON')}
            </a>
          </Button>
        );
      },
    },
  ];

  return columns;
}
