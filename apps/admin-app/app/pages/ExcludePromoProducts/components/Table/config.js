import { Checkbox, Tag } from 'antd';

export const tableColumns = (t, handleUnselectPromos, unselectedPromoIds) => ([
  {
    title: t('COLUMNS.ACTION'),
    dataIndex: '_id',
    key: '_id',
    width: '100px',
    render(_id) {
      if (unselectedPromoIds.includes(_id)) {
        return <Checkbox onClick={e => handleUnselectPromos(e, _id)} />;
      }
      return <Checkbox onClick={e => handleUnselectPromos(e, _id)} defaultChecked />;
    },
  },
  {
    title: t('COLUMNS.PROMO_CODE'),
    dataIndex: 'promoCode',
    key: 'promoCode',
    width: '200px',
    render(promoCode, record) {
      const statusText = promoCode;
      const tagColor = record?.bgColor || '#5cb85c';
      return (
        <Tag key={promoCode} color={tagColor}>
          {statusText}
        </Tag>
      );
    },
  },
  {
    title: t('COLUMNS.PROMO_ID'),
    dataIndex: '_id',
    key: '_id',
    width: '120px',
  },
]);
