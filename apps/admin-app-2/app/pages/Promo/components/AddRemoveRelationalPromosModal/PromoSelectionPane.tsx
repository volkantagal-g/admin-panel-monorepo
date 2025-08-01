import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Col, Row, Select } from 'antd';

import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { SelectPromo } from '@shared/containers/Select/Promo';
import { ValidatedCsvImporter } from '@app/pages/Promo/components/ValidatedCsvImporter/ValidatedCsvImporter';
import { ExampleCSV } from '@app/pages/Promo/Detail/components/ExampleCSVModal';

export type SelectionMode = 'add' | 'remove';

export type PromoOption = {
  _id: MongoIDType,
  promoCode: string
}

interface PromoSelectionPaneProps {
  mode: SelectionMode
  isPending: boolean
  onChange: (values: MongoIDType[]) => void
  value: MongoIDType[]
  existingOptions: PromoOption[]
  isParentPromo?: boolean,
  slice: string
}

const CSV_VALIDATION_SCHEMA = Yup.object().shape({ id: Yup.string().required() });

const EXAMPLE_CSV = [{ id: '679378e665265831149a2093' }, { id: '679378fc06efb4f780bc43b2' }, { id: '67937901dde542b6b858f5e0' }];

export function PromoSelectionPane({ mode, isPending, onChange, value, existingOptions, isParentPromo, slice }: PromoSelectionPaneProps) {
  const { t } = useTranslation('promoPage');

  const [hasImported, setHasImported] = useState(false);

  const promoId = useSelector(PromoDetailSlice.selectors.promoId);
  const excludedPromosToAdd = useMemo(() => existingOptions.map(child => child._id).concat(promoId), [promoId, existingOptions]);

  const handleImport = (data: Record<string, string> []) => {
    onChange(data.map(d => d.id));
    setHasImported(true);
  };

  const handleClearImport = () => {
    setHasImported(false);
  };

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <p className="mb-0">
          {t('CHILD_PROMOS.ADD_REMOVE_PROMOS_HELPER')}
        </p>
      </Col>
      {!hasImported && (
        <Col span={24}>
          {
            mode === 'add' ? (
              <SelectPromo
                slice={slice}
                placeholder={t('SEARCH_PROMO')}
                allowClear
                onChange={onChange}
                disabled={isPending}
                mode="multiple"
                className="w-100"
                excludedOptions={excludedPromosToAdd}
                loading={isPending}
                value={value}
                showIds
                isParentPromo={isParentPromo}
              />
            ) : (
              <Select
                placeholder={t('SEARCH_PROMO')}
                allowClear
                onChange={onChange}
                options={existingOptions.map(option => ({ label: `${option.promoCode} (${option._id})`, value: option._id }))}
                disabled={isPending}
                mode="multiple"
                className="w-100"
                showSearch
                loading={isPending}
                value={value}
                filterOption={(input, option) => !!option?.label.toLowerCase().includes(input.toLowerCase())}
              />
            )
          }
        </Col>
      )}
      <Col span={24}>
        <ValidatedCsvImporter
          buttonType="primary"
          validationSchema={CSV_VALIDATION_SCHEMA}
          onChange={handleImport}
          loading={isPending}
          disabled={isPending}
          exampleCsv={<ExampleCSV exampleCsv={EXAMPLE_CSV} disabled={isPending} />}
          onClear={handleClearImport}
        />
      </Col>
    </Row>
  );
}
