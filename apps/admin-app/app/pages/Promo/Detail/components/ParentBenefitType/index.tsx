import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Collapse, Row, Space } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { DownloadOutlined } from '@ant-design/icons';

import { injected } from '@shared/utils/injected';
import { ParentBenefitTypeSlice } from '@app/pages/Promo/Detail/components/ParentBenefitType/slice';
import { parentBenefitTypeSaga } from '@app/pages/Promo/Detail/components/ParentBenefitType/saga';
import { ValidatedCsvImporter } from '@app/pages/Promo/components/ValidatedCsvImporter/ValidatedCsvImporter';
import { ExampleCSV } from '@app/pages/Promo/Detail/components/ExampleCSVModal';
import { CSV_VALIDATION_SCHEMA, EXAMPLE_CSV } from './constants';
import { Footer } from '@app/pages/Promo/Detail/components/Footer';
import permKey from '@shared/shared/permKey.json';
import { ChildrenBenefitProduct } from '@app/pages/Promo/Detail/components/ParentBenefitType/types';

const ParentBenefitType = injected(function ParentBenefitType() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const pending = useSelector(ParentBenefitTypeSlice.selectors.isPending);
  const open = useSelector(ParentBenefitTypeSlice.selectors.isEditing);

  function handleDownload() {
    dispatch(ParentBenefitTypeSlice.actions.getParentPromoProducts());
  }

  function handleImport(data: Record<string, string>[]) {
    dispatch(ParentBenefitTypeSlice.actions.upsertChildrenProducts(data as any as ChildrenBenefitProduct[]));
  }

  function setOpen(value: boolean) {
    dispatch(ParentBenefitTypeSlice.actions.setIsEditing(value));
  }

  function onSave() {
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space size="middle">
          <ValidatedCsvImporter
            buttonType="primary"
            validationSchema={CSV_VALIDATION_SCHEMA}
            onChange={handleImport}
            loading={pending}
            disabled={!open || pending}
            exampleCsv={<ExampleCSV exampleCsv={EXAMPLE_CSV} disabled={pending} />}
            hideFeedback
          />
          <Button
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            loading={pending}
            disabled={!open || pending}
          >
            {t('global:DOWNLOAD_AS_CSV')}
          </Button>
        </Space>
      </Col>
      <Col span={24}>
        <Footer
          permKey={permKey.PAGE_PROMO_DETAIL_EDIT}
          open={open}
          setOpen={setOpen}
          disabled={pending}
          loading={pending}
          onSave={onSave}
        />
      </Col>
    </Row>
  );
}, {
  key: ParentBenefitTypeSlice.reducerPath,
  reducer: ParentBenefitTypeSlice.reducer,
  saga: parentBenefitTypeSaga,
});

const ParentBenefitTypeSection = memo(function ParentBenefitTypeSection() {
  const { t } = useTranslation('promoPage');

  return (
    <Collapse className="mb-2">
      <Collapse.Panel header={t('BENEFIT_TYPE.HEADER_TITLE')} key={1}>
        <ParentBenefitType />
      </Collapse.Panel>
    </Collapse>
  );
});

export default ParentBenefitTypeSection;
