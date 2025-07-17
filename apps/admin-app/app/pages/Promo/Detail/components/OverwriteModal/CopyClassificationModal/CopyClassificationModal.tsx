import { useTranslation } from 'react-i18next';

import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { compose } from 'redux';

import { OverwriteFormType, OverwriteModal } from '@app/pages/Promo/Detail/components/OverwriteModal';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { CopyClassificationSlice } from '@app/pages/Promo/Detail/components/OverwriteModal/CopyClassificationModal/slice';
import { copyClassificationSaga } from '@app/pages/Promo/Detail/components/OverwriteModal/CopyClassificationModal/saga';

const withSaga = injectSaga({ key: CopyClassificationSlice.reducerPath, saga: copyClassificationSaga });
const withReducer = injectReducer({ key: CopyClassificationSlice.reducerPath, reducer: CopyClassificationSlice.reducer });

function CopyClassificationModalInternal() {
  const { t } = useTranslation('promoPage');
  const dispatch = useDispatch();
  const isPending = useSelector(CopyClassificationSlice.selectors.isPending);
  const isModalOpen = useSelector(CopyClassificationSlice.selectors.isModalOpen);

  const toggleModal = useCallback(() => {
    dispatch(CopyClassificationSlice.actions.toggleModal());
  }, [dispatch]);

  const onSubmit = useCallback(({ promoId }: OverwriteFormType) => {
    dispatch(CopyClassificationSlice.actions.overwriteRequest(promoId));
  }, [dispatch]);

  return (
    <OverwriteModal
      slice="copy-classification"
      onSubmit={onSubmit}
      title={t('CLASSIFICATION.COPY_CLASSIFICATION')}
      isPending={isPending}
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      creators={CopyClassificationSlice.actions}
    />
  );
}

export const CopyClassificationModal = compose(withReducer, withSaga)(CopyClassificationModalInternal) as typeof CopyClassificationModalInternal;
