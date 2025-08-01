import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { FormEdit, FormNew } from './components';
import { Creators } from './redux/actions';
import reduxKey from './redux/key';
import reducer from './redux/reducer';
import saga from './redux/saga';
import useStyles from './styles';

const Detail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id } = useParams();
  const isEdit = id && id !== 'new';

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const { name, squad } = ROUTE.WORKFORCE_CONTRACT_DETAIL;
  usePageViewAnalytics({ name, squad });

  const { t } = useTranslation(['personCandidatePage', 'personContractType']);

  return (
    <>
      <div className={classes.header}>
        <PageHeader className="p-0 page-title" title={`${t('personContractType:DETAIL.PAGE_TITLE')} - ${t(isEdit ? 'EDIT' : 'NEW')}`} />

        <Link className={classes.goBack} to="/person/contract">
          {t('personContractType:DETAIL.GO_BACK')}
        </Link>
      </div>

      {isEdit ? <FormEdit t={t} id={id} /> : <FormNew t={t} />}
    </>
  );
};

export default Detail;
