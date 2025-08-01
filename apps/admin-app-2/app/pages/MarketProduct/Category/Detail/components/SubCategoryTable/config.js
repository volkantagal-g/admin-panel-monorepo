import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import { getLangKey } from '@shared/i18n';
import ImageWithPopover from '@shared/components/UI/ImageWithPopover';
import { renderCategoryStatusTag } from '@app/pages/MarketProduct/utils';

export const tableColumns = ({ t }) => [
  {
    title: t('ACTIVENESS'),
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 80,
    render: status => renderCategoryStatusTag({ t, status }),
  },
  {
    title: t('IMAGE'),
    dataIndex: 'picURL',
    key: 'picURL',
    width: 60,
    render: (picURL, { _id }) => {
      const imageSrc = picURL?.[getLangKey()];
      return (
        <ImageWithPopover src={imageSrc} height={32} alt={`categoryImage-${_id}`} />
      );
    },
  },
  {
    title: t('NAME_1'),
    dataIndex: 'name',
    key: 'name',
    width: 160,
    render: name => {
      return name?.[getLangKey()];
    },
  },
  {
    title: t('DESCRIPTION'),
    dataIndex: 'description',
    key: 'description',
    width: 160,
    render: description => {
      return description;
    },
  },
  {
    title: t('ACTION'),
    align: 'right',
    dataIndex: '_id',
    key: '_id',
    width: 80,
    render: _id => {
      const path = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', _id);

      return (
        <Link to={path}>
          <Button type="default" size="small">
            {t('DETAIL')}
          </Button>
        </Link>
      );
    },
  },
];
