import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';

import { useInitAndDestroyPage } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';
import AdminGuides from './components/AdminGuides';
import HighlightedDocuments from './components/HighlightedDocuments';
import FavoriteDocs from './components/FavoriteDocs';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';

const PanelDocSearchPage = () => {
  const { t } = useTranslation('panelDocSearchPage');
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.PANEL_DOC_SEARCH.name, squad: ROUTE.PANEL_DOC_SEARCH.squad });
  useInitAndDestroyPage({ dispatch, Creators });

  const classes = useStyles();
  return (
    <div className={classes.pageContainer}>
      <Header title={t('PAGE_TITLE')} />
      <SearchInput />
      <SearchResult />
      <AdminGuides />
      <HighlightedDocuments />
      <FavoriteDocs />
    </div>
  );
};

const reduxKey = REDUX_KEY.PANEL_DOC.SEARCH;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PanelDocSearchPage);
