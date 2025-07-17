import { useTranslation } from 'react-i18next';

import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { compose } from 'redux';

import { OverwriteFormType, OverwriteModal } from '@app/pages/Promo/Detail/components/OverwriteModal';
import { CopyPromoSlice } from '@app/pages/Promo/Detail/components/OverwriteModal/CopyPromoModal/slice';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { copyPromoSaga } from '@app/pages/Promo/Detail/components/OverwriteModal/CopyPromoModal/saga';

const withSaga = injectSaga({ key: CopyPromoSlice.reducerPath, saga: copyPromoSaga });
const withReducer = injectReducer({ key: CopyPromoSlice.reducerPath, reducer: CopyPromoSlice.reducer });

function CopyPromoModalInternal() {
  const { t } = useTranslation('promoPage');
  const dispatch = useDispatch();
  const isPending = useSelector(CopyPromoSlice.selectors.isPending);
  const isModalOpen = useSelector(CopyPromoSlice.selectors.isModalOpen);

  const toggleModal = useCallback(() => {
    dispatch(CopyPromoSlice.actions.toggleModal());
  }, [dispatch]);

  const onSubmit = useCallback(({ promoId }: OverwriteFormType) => {
    dispatch(CopyPromoSlice.actions.overwriteRequest(promoId));
  }, [dispatch]);

  return (
    <OverwriteModal
      slice="copy-promo"
      onSubmit={onSubmit}
      title={t('COPY_PROMO.TITLE')}
      isRounded
      isPending={isPending}
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      creators={CopyPromoSlice.actions}
    />
  );
}

export const CopyPromoModal = compose(withReducer, withSaga)(CopyPromoModalInternal) as typeof CopyPromoModalInternal;
