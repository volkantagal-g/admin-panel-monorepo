import React, { memo, useEffect } from 'react';
import { Button, Col, Collapse, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { DownloadOutlined } from '@ant-design/icons';

import { ChildrenPromosTable } from '@app/pages/Promo/Detail/components/ChildPromos/ChildrenPromosTable';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { GenerateChildPromos } from '@app/pages/Promo/Detail/components/ChildPromos/GenerateChildPromos';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ChildrenPromosSlice } from '@app/pages/Promo/Detail/components/ChildPromos/slice';
import { childrenPromosSaga } from '@app/pages/Promo/Detail/components/ChildPromos/saga';
import { handleExportChildren } from '@app/pages/Promo/Detail/components/ChildPromos/config';
import { AddRemoveChildPromosModal } from '@app/pages/Promo/Detail/components/ChildPromos/addRemoveChildPromosModal';
import { ChildrenResultModal } from '@app/pages/Promo/Detail/components/ChildPromos/childrenResultModal';
import { GeneralPopConfirm } from '@shared/components/UI/GeneralPopConfirm/GeneralPopConfirm';
import { useInitAndDestroyPage } from '@shared/hooks';

function ChildPromos() {
  const { t } = useTranslation('promoPage');
  const dispatch = useDispatch();
  const children = useSelector(ChildrenPromosSlice.selectors.children);
  const isTableLoading = useSelector(ChildrenPromosSlice.selectors.isTableLoading);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);
  const { length: selectedChildrenCount } = useSelector(ChildrenPromosSlice.selectors.selected);

  const handleActivate = () => dispatch(ChildrenPromosSlice.actions.activateChildPromosRequest());

  const handleDeactivate = () => dispatch(ChildrenPromosSlice.actions.deactivateChildPromosRequest());

  const handleDownload = () => children && handleExportChildren(children, t);

  const handleRemoveSelected = () => dispatch(ChildrenPromosSlice.actions.removeSelectedPromos('table'));

  useEffect(() => {
    dispatch(ChildrenPromosSlice.actions.changeTable({ filters: null }));
  }, [dispatch]);

  useInitAndDestroyPage({ dispatch, Creators: ChildrenPromosSlice.actions });

  return (
    <Row gutter={[8, 8]}>
      <ChildrenResultModal />
      <Col span={24}>
        <ChildrenPromosTable />
      </Col>
      <Col span={24}>
        <Row justify="end" align="middle" gutter={[8, 8]}>
          {
            isParent && (
              <Col>
                <AddRemoveChildPromosModal />
              </Col>
            )
          }
          <Col>
            <GeneralPopConfirm onConfirm={handleRemoveSelected} disabled={isTableLoading || !selectedChildrenCount}>
              <Button
                size="middle"
                type="primary"
                disabled={isTableLoading || !selectedChildrenCount}
                loading={isTableLoading}
              > {t('CHILD_PROMOS.REMOVE_SELECTED')}
              </Button>
            </GeneralPopConfirm>
          </Col>
          <Col>
            <GeneralPopConfirm onConfirm={handleActivate} disabled={isTableLoading || !selectedChildrenCount}>
              <Button
                size="middle"
                type="primary"
                disabled={isTableLoading || !selectedChildrenCount}
                loading={isTableLoading}
              > {t('CHILD_PROMOS.BULK_ACTIVATE')}
              </Button>
            </GeneralPopConfirm>
          </Col>
          <Col>
            <GeneralPopConfirm onConfirm={handleDeactivate} disabled={isTableLoading || !selectedChildrenCount}>
              <Button
                size="middle"
                type="primary"
                disabled={isTableLoading || !selectedChildrenCount}
                loading={isTableLoading}
              > {t('CHILD_PROMOS.BULK_DEACTIVATE')}
              </Button>
            </GeneralPopConfirm>
          </Col>
          <Col>
            <Button
              size="middle"
              disabled={!children?.length}
              onClick={handleDownload}
              icon={<DownloadOutlined />}
            > {t('global:DOWNLOAD_AS_CSV')}
            </Button>
          </Col>
        </Row>
      </Col>

    </Row>
  );
}

const ChildPromoSection = memo(function ChildPromoSection() {
  const { t } = useTranslation('promoPage');
  const canHaveChildPromos = useSelector(PromoDetailSlice.selectors.canHaveChildPromos);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);

  useInjectReducer({ key: ChildrenPromosSlice.reducerPath, reducer: ChildrenPromosSlice.reducer });
  useInjectSaga({ key: ChildrenPromosSlice.reducerPath, saga: childrenPromosSaga });

  if (!canHaveChildPromos) {
    return null;
  }

  return (
    <Col xs={24}>
      <Collapse className="mb-2">
        <Collapse.Panel header={t('CHILD_PROMOS.TITLE')} key={1} extra={isParent && <GenerateChildPromos />}>
          <ChildPromos />
        </Collapse.Panel>
      </Collapse>
    </Col>
  );
});

export default ChildPromoSection;
