import React, { memo, useEffect } from 'react';
import { Button, Col, Collapse, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { DownloadOutlined } from '@ant-design/icons';

import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { handleExportParents } from '@app/pages/Promo/Detail/components/ParentPromos/config';
import { AddRemoveParentPromosModal } from '@app/pages/Promo/Detail/components/ParentPromos/addRemoveParentPromosModal';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ParentPromosSlice } from '@app/pages/Promo/Detail/components/ParentPromos/slice';
import { parentPromosSaga } from '@app/pages/Promo/Detail/components/ParentPromos/saga';
import { ParentResultModal } from '@app/pages/Promo/Detail/components/ParentPromos/parentResultModal';
import { ParentPromosTable } from '@app/pages/Promo/Detail/components/ParentPromos/ParentPromosTable';
import { GeneralPopConfirm } from '@shared/components/UI/GeneralPopConfirm/GeneralPopConfirm';
import { useInitAndDestroyPage } from '@shared/hooks';

function ParentPromos() {
  const { t } = useTranslation('promoPage');
  const dispatch = useDispatch();
  const parents = useSelector(PromoDetailSlice.selectors.parents);
  const isTableLoading = useSelector(ParentPromosSlice.selectors.isTableLoading);
  const { length: selectedParentCount } = useSelector(ParentPromosSlice.selectors.selected);

  const handleDownload = () => parents && handleExportParents(parents, t);

  const handleRemoveSelected = () => dispatch(ParentPromosSlice.actions.removeSelectedPromos('table'));

  useInitAndDestroyPage({ dispatch, Creators: ParentPromosSlice.actions });

  useEffect(() => {
    dispatch(ParentPromosSlice.actions.changeTable({ }));
  }, [dispatch]);

  return (
    <Row gutter={[8, 8]}>
      <ParentResultModal />
      <ParentPromosTable />
      <Row justify="end" align="middle" gutter={[8, 8]}>
        <Col>
          <AddRemoveParentPromosModal />
        </Col>
        <Col>
          <GeneralPopConfirm onConfirm={handleRemoveSelected} disabled={isTableLoading || !selectedParentCount}>
            <Button
              size="middle"
              type="primary"
              disabled={isTableLoading || !selectedParentCount}
              loading={isTableLoading}
            > {t('CHILD_PROMOS.REMOVE_SELECTED')}
            </Button>
          </GeneralPopConfirm>
        </Col>
        <Col>
          <Button
            size="middle"
            disabled={!parents?.length}
            onClick={handleDownload}
            icon={<DownloadOutlined />}
          > {t('global:DOWNLOAD_AS_CSV')}
          </Button>
        </Col>
      </Row>
    </Row>
  );
}

const ParentPromosSection = memo(function ParentPromosSection() {
  const { t } = useTranslation('promoPage');
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);
  const isListingPromo = useSelector(PromoDetailSlice.selectors.isListingPromo);

  useInjectReducer({ key: ParentPromosSlice.reducerPath, reducer: ParentPromosSlice.reducer });
  useInjectSaga({ key: ParentPromosSlice.reducerPath, saga: parentPromosSaga });

  if (isParent || !isListingPromo) {
    return null;
  }

  return (
    <Col xs={24} lg={12}>
      <Collapse className="mb-2">
        <Collapse.Panel header={t('PARENT_PROMOS.TITLE')} key={1}>
          <ParentPromos />
        </Collapse.Panel>
      </Collapse>
    </Col>
  );
});

export default ParentPromosSection;
