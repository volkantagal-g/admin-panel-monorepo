import { COUNTRY_IMAGES } from '../../constants';

export const getOnOffColumns = t => [
  {
    title: t('COUNTRY'),
    dataIndex: 'country',
    key: 'country',
    render: text => (
      <span>
        <img
          src={COUNTRY_IMAGES[text]}
          alt={text}
          style={{
            height: '20px',
            maxWidth: '20px',
            pointerEvents: 'none',
          }}
        />
        &nbsp;
        {text}
      </span>
    ),
    width: '15%',
  },
  {
    title: t('CITY'),
    dataIndex: 'city',
    key: 'city',
    defaultSortOrder: 'ascend',
  },
  {
    title: t('WAREHOUSE'),
    dataIndex: 'warehouse',
    key: 'warehouse',
    defaultSortOrder: 'ascend',
  },
  {
    title: t('Config'),
    dataIndex: 'config',
    key: 'config',
  },
];
