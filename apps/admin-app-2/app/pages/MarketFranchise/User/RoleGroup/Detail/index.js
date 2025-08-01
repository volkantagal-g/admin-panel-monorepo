import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { franchiseUserRoleGroupDetailSelector } from './redux/selectors';
import UpdateFranchiseUserRoleGroupForm from './components/Form';

const reduxKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE_GROUP.DETAIL;

const Detail = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_DETAIL.name,
    squad: ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_DETAIL.squad,
  });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { id } = useParams();
  const { t } = useTranslation();

  const data = useSelector(franchiseUserRoleGroupDetailSelector.getData);
  const isPending = useSelector(franchiseUserRoleGroupDetailSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getFranchiseUserRoleGroupDetailRequest({ id }));
  }, [dispatch, id]);

  return (
    <>
      <PageHeader
        className="p-0 page-title"
        title={t('PAGE_TITLE.MARKET_FRANCHISE_USER_ROLE_GROUP.DETAIL')}
      />
      <UpdateFranchiseUserRoleGroupForm data={data} isPending={isPending} id={id} />
    </>
  );
};

export default Detail;
