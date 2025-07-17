import { TFunction, useTranslation } from 'react-i18next';

import { ColumnType } from 'antd/lib/table/interface';

import React, { ChangeEventHandler, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { Checkbox, Col, Input, Row, Space } from 'antd';

import { downloadDataAsCSV } from '@shared/utils/common';
import { ParentPromo, PromoStatus, PromoTagType } from '../../../types';
import { PromoStatusTag } from '@app/pages/Promo/components/PromoStatusTag';
import { PromoTag } from '@app/pages/Promo/components/PromoTag';
import { DateTag } from '@app/pages/Promo/components/DateTag';
import { selectFilteredPromos } from '@app/pages/Promo/Detail/components/ParentPromos/selectors';

import { Hint } from '@app/pages/Promo/Detail/components/Hint';
import { ParentPromosSlice } from '@app/pages/Promo/Detail/components/ParentPromos/slice';

export function handleExportParents(promos: PromoTagType[], t: TFunction) {
  const csvData = promos.map(item => ({
    _id: item._id,
    promoCode: item.promoCode,
  }));

  const columns = {
    _id: t('global:ID'),
    promoCode: t('GENERAL_INFO.PROMO_CODE'),
  };

  downloadDataAsCSV({
    data: csvData,
    columns: [columns],
    fileName: 'parent_promos',
  });
}

export function getParentsTableColumns(t: TFunction): ColumnType<ParentPromo>[] {
  return [
    {
      title: t('COLUMNS.PROMO_CODE'),
      dataIndex: 'promoCode',
      key: 'promoCode',
      width: '200px',
      render(_, record) {
        return <PromoTag promo={record} hasRedirect />;
      },
    },
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
    {
      title: t('VALID_FROM'),
      dataIndex: 'validFrom',
      key: 'validFrom',
      width: '200px',
      render: date => <DateTag date={date} />,
    },
    {
      title: t('VALID_UNTIL'),
      dataIndex: 'validUntil',
      key: 'validUntil',
      width: '200px',
      render: date => <DateTag date={date} />,
    },
  ];
}

type CheckAllBoxProps = {
  disabled?: boolean;
}

export function CheckAllBox({ disabled }: CheckAllBoxProps) {
  const dispatch = useDispatch();
  const selectedParentIds = useSelector(ParentPromosSlice.selectors.selected);
  const filteredPromos = useSelector(selectFilteredPromos);
  const { t } = useTranslation('promoPage');

  const { indeterminate, checkAll } = useMemo(() => {
    const allChecked = filteredPromos.every(item => selectedParentIds.includes(item._id));
    const someChecked = !allChecked && filteredPromos.some(item => selectedParentIds.includes(item._id));
    return {
      indeterminate: someChecked,
      checkAll: allChecked,
    };
  }, [filteredPromos, selectedParentIds]);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    dispatch(ParentPromosSlice.actions.setSelected(e.target.checked ? filteredPromos.map(item => item._id) : []));
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

export function PromoCodeHeader() {
  const { t } = useTranslation('promoPage');

  const dispatch = useDispatch();
  const tableParams = useSelector(ParentPromosSlice.selectors.getTableParams);

  const handleCodeSearch: ChangeEventHandler<HTMLInputElement> = event => {
    dispatch(ParentPromosSlice.actions.changeTable({
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
