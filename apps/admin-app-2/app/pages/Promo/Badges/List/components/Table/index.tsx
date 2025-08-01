import { Button, Col, Row } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { badgePromoMechanics } from '@app/pages/Promo/constantValues';

import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { PaginationType, PromoBadge, PromoBadgeList } from '../../interfaces';
import AntTableV2 from '@shared/components/UI/AntTableV2';

type TableProps = {
  filteredPromoBadges: PromoBadgeList;
  isSearchPending: Boolean;
  total: number;
  onPaginationChange: (pagination: PaginationType) => void;
  pagination: PaginationType;
  onBadgeEdit: (promoBadge: PromoBadge) => void;
};

const Table: FC<TableProps> = ({
  filteredPromoBadges,
  isSearchPending,
  total,
  onPaginationChange,
  pagination,
  onBadgeEdit,
}) => {
  const selectedLanguage = useSelector(getSelectedLanguage);
  const { t } = useTranslation('promoBadgesPage');

  const tableColumns: ColumnType<PromoBadge>[] = [
    {
      title: t('HEADER.NAME'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('LIST.PROMO_MECHANIC'),
      dataIndex: 'promoMechanic',
      key: 'promoMechanic',
      render: record => (
        <div>{badgePromoMechanics?.[record]?.[selectedLanguage]}</div>
      ),
    },
    {
      title: t('HEADER.PRODUCT_LISTING_PAGE_BADGE'),
      dataIndex: 'productListingPage',
      key: 'productListingPage',
      render: record => <div>{record?.[selectedLanguage]}</div>,
    },
    {
      title: t('HEADER.PRODUCT_DETAIL_PAGE_BADGE'),
      dataIndex: 'productDetailPage',
      key: 'productDetailPage',
      render: record => <div>{record?.[selectedLanguage]}</div>,
    },
    {
      title: t('HEADER.BASKET_APPLIED_BADGE'),
      dataIndex: 'basketApplied',
      key: 'basketApplied',
      render: record => <div>{record?.[selectedLanguage]}</div>,
    },
    {
      title: t('HEADER.BASKET_NOT_APPLIED_BADGE'),
      dataIndex: 'basketNotApplied',
      key: 'basketNotApplied',
      render: record => <div>{record?.[selectedLanguage]}</div>,
    },
    {
      title: t('HEADER.ACTION'),
      dataIndex: '',
      render: record => (
        <Button onClick={() => onBadgeEdit(record)}>{t('HEADER.EDIT')}</Button>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          columns={tableColumns}
          data={filteredPromoBadges}
          loading={isSearchPending}
          total={total}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
      </Col>
    </Row>
  );
};

export default Table;
