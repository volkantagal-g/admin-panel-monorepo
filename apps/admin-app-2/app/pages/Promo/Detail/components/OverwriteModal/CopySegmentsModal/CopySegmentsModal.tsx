import { useTranslation } from 'react-i18next';

import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { compose } from 'redux';

import { OverwriteFormType, OverwriteModal } from '@app/pages/Promo/Detail/components/OverwriteModal';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { CopySegmentsSlice } from '@app/pages/Promo/Detail/components/OverwriteModal/CopySegmentsModal/slice';
import { copySegmentsSaga } from '@app/pages/Promo/Detail/components/OverwriteModal/CopySegmentsModal/saga';

const withSaga = injectSaga({ key: CopySegmentsSlice.reducerPath, saga: copySegmentsSaga });
const withReducer = injectReducer({ key: CopySegmentsSlice.reducerPath, reducer: CopySegmentsSlice.reducer });

function CopySegmentsModalInternal() {
  const { t } = useTranslation('promoPage');
  const dispatch = useDispatch();
  const isPending = useSelector(CopySegmentsSlice.selectors.isPending);
  const isModalOpen = useSelector(CopySegmentsSlice.selectors.isModalOpen);

  const toggleModal = useCallback(() => {
    dispatch(CopySegmentsSlice.actions.toggleModal());
  }, [dispatch]);

  const onSubmit = useCallback(({ promoId }: OverwriteFormType) => {
    dispatch(CopySegmentsSlice.actions.overwriteRequest(promoId));
  }, [dispatch]);

  return (
    <OverwriteModal
      slice="copy-segments"
      onSubmit={onSubmit}
      title={t('SEGMENT.COPY_SEGMENTS')}
      isPending={isPending}
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      creators={CopySegmentsSlice.actions}
    />
  );
}

export const CopySegmentsModal = compose(withReducer, withSaga)(CopySegmentsModalInternal) as typeof CopySegmentsModalInternal;
