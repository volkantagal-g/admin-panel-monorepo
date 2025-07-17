import { TFunction, useTranslation } from 'react-i18next';

import { ColumnType } from 'antd/lib/table/interface';

import React, { ChangeEventHandler, useMemo } from 'react';

import { Checkbox, Col, Empty, Input, Row, Space, Tag } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { ChildPromo, PromoDomains, PromoStatus, PromoTagType } from '@app/pages/Promo/types';
import { PromoTag } from '@app/pages/Promo/components/PromoTag';
import { PromoStatusTag } from '@app/pages/Promo/components/PromoStatusTag';
import { downloadDataAsCSV } from '@shared/utils/common';
import { promoDomainTypes, promoStatuses } from '@app/pages/Promo/constantValues';
import { getLangKey } from '@shared/i18n';
import { CopyableText } from '@shared/components/UI/CopyableText/copyableText';
import { useEmptyDomainsStyles } from '@app/pages/Promo/Detail/components/ChildPromos/styles';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { ChildrenPromosSlice } from '@app/pages/Promo/Detail/components/ChildPromos/slice';
import { selectFilteredPromos } from '@app/pages/Promo/Detail/components/ChildPromos/selectors';
import { Hint } from '@app/pages/Promo/Detail/components/Hint';

function EmptyDomains() {
  const { t } = useTranslation();
  const styles = useEmptyDomainsStyles();

  return (
    <Space align="center" className={styles.wrapper}>
      {Empty.PRESENTED_IMAGE_SIMPLE}
      <span>
        {t('global:NONE')}
      </span>
    </Space>
  );
}

export function PromoCodeHeader() {
  const { t } = useTranslation('promoPage');

  const dispatch = useDispatch();
  const tableParams = useSelector(ChildrenPromosSlice.selectors.getTableParams);

  const handleCodeSearch: ChangeEventHandler<HTMLInputElement> = event => {
    dispatch(ChildrenPromosSlice.actions.changeTable({
      ...tableParams,
      promoCode: event.target.value,
    }));
  };

  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        {t('SEARCH_IN_TABLE')}
      </Col>
      <Col span={24}>
        <Input size="small" placeholder={t('SEARCH_IN_TABLE')} onChange={handleCodeSearch} value={tableParams.promoCode} />
      </Col>
    </Row>
  );
}

type CheckAllBoxProps = {
  disabled?: boolean;
}

export function CheckAllBox({ disabled }: CheckAllBoxProps) {
  const dispatch = useDispatch();
  const selectedChildIds = useSelector(ChildrenPromosSlice.selectors.selected);
  const filteredPromos = useSelector(selectFilteredPromos);
  const { t } = useTranslation('promoPage');

  const { indeterminate, checkAll } = useMemo(() => {
    const allChecked = filteredPromos.every(item => selectedChildIds.includes(item._id));
    const someChecked = !allChecked && filteredPromos.some(item => selectedChildIds.includes(item._id));
    return {
      indeterminate: someChecked,
      checkAll: allChecked,
    };
  }, [filteredPromos, selectedChildIds]);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    dispatch(ChildrenPromosSlice.actions.setSelected(e.target.checked ? filteredPromos.map(item => item._id) : []));
  };

  return (
    <Space>
      <Checkbox disabled={disabled} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        {t('CHILD_PROMOS.CHECK_ALL')}
      </Checkbox>
      <Hint translationKey="promoPage:CHILD_PROMOS.CHECK_ALL_HINT" />
    </Space>
  );
}

export function useChildrenTableColumns(): ColumnType<ChildPromo>[] {
  const { t } = useTranslation('promoPage');

  const isParent = useSelector(PromoDetailSlice.selectors.isParent);
  const masters = useSelector(PromoDetailSlice.selectors.masters);

  const masterOptions = masters?.map(item => ({
    value: item._id,
    text: <PromoTag promo={item} />,
  }));

  return [
    {
      title: t('global:ID'),
      dataIndex: '_id',
      key: '_id',
      width: '50px',
      render: _id => <CopyableText>{_id}</CopyableText>,
    },
    {
      title: t('GENERAL_INFO.PROMO_CODE'),
      dataIndex: 'promoCode',
      key: 'promoCode',
      width: '300px',
      render(_, record) {
        return <PromoTag promo={record} hasRedirect />;
      },
    },
    ...isParent ? [{
      title: t('MASTER_PROMO'),
      dataIndex: 'master',
      key: 'master',
      width: '200px',
      render(master: PromoTagType | null) {
        return master ? <PromoTag promo={master} hasRedirect /> : null;
      },
      ...(masters?.length && {
        filters: masters.map(item => ({
          value: item._id,
          text: <PromoTag promo={item} />,
        })),
      }),
      filters: masterOptions,
    }] : [],
    ...!isParent ? [{
      title: t('GENERAL_INFO.PROMO_DOMAIN'),
      dataIndex: 'domainTypes',
      key: 'domainTypes',
      width: '200px',
      render(domainTypes: PromoDomains[]) {
        const domains = Object.entries(promoDomainTypes)
          .filter(([key]) => domainTypes.includes(+key))
          .map(([_, value]) => value[getLangKey()])
          .map(label => <Tag key={label}>{label}</Tag>);
        return domains.length ? domains : <EmptyDomains />;
      },
    }] : [],
    {
      title: t('global:STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: '120px',
      render: status => {
        return <PromoStatusTag status={status} />;
      },
      filters: [
        {
          value: PromoStatus.Active,
          text: <PromoStatusTag status={PromoStatus.Active} />,
        },
        {
          value: PromoStatus.Inactive,
          text: <PromoStatusTag status={PromoStatus.Inactive} />,
        },
      ],
    },
  ];
}

export function handleExportChildren(promos: ChildPromo[], t:TFunction) {
  const csvData = promos.map(item => ({
    _id: item._id,
    promoCode: item.promoCode,
    status: promoStatuses[item.status][getLangKey()],
    domains: Object.entries(promoDomainTypes)
      .filter(([key]) => item.domainTypes.includes(+key))
      .map(([_, value]) => value[getLangKey()]).join('/'),
    creatorParentId: item.creatorParentId,
    parentId: item.parentId,
    isMaster: item.isParent ? t('global:YES') : t('global:NO'),
    masterId: item.master?._id,
    masterPromoCode: item.master?.promoCode,
  }));

  const columns = {
    _id: t('global:ID'),
    promoCode: t('GENERAL_INFO.PROMO_CODE'),
    status: t('global:STATUS'),
    domains: t('global:DOMAIN_TYPES'),
    creatorParentId: t('CHILD_PROMOS.CREATOR_PARENT_ID'),
    parentId: t('CHILD_PROMOS.PARENT_ID'),
    isMaster: t('CHILD_PROMOS.IS_MASTER'),
    masterId: t('CHILD_PROMOS.MASTER_ID'),
    masterPromoCode: t('CHILD_PROMOS.MASTER_PROMO_CODE'),
  };

  downloadDataAsCSV({
    data: csvData,
    columns: [columns],
    fileName: 'children_promos',
  });
}
