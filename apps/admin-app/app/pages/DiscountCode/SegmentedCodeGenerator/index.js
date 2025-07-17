import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import SegmentedCodeGeneratorForm from './components/SegmentedCodeGeneratorForm';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.DISCOUNT_CODE.SEGMENTED_CODE_GENERATOR;

const SegmentedDiscountCodeGeneratorPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.SEGMENTED_CODE_GENERATOR.name, squad: ROUTE.SEGMENTED_CODE_GENERATOR.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.SEGMENTED_CODE_GENERATOR')} />
      <SegmentedCodeGeneratorForm />
    </>
  );
};

export default SegmentedDiscountCodeGeneratorPage;
