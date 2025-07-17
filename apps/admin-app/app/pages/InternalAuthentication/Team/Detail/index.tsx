import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Row, Col, Button, Switch, Popconfirm } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { compose } from 'redux';

import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { TeamDetail, Services } from './components';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { teamByIdSelector, updateTeamSelector } from './redux/selectors';

const InternalAuthenticationTeamDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation(['internalAuthentication', 'global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.INTERNAL_AUTHENTICATION_TEAM_DETAIL.name, squad: ROUTE.INTERNAL_AUTHENTICATION_TEAM_DETAIL.squad });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getTeamByIdRequest({ id }));
    dispatch(Creators.getTeamServicesRequest({ id }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id]);

  const navigate = useNavigate();

  const team = useSelector(teamByIdSelector.getData);
  const teamIsPending = useSelector(teamByIdSelector.getIsPending);
  const teamUpdateIsPending = useSelector(updateTeamSelector.getIsPending);

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE.INTERNAL_AUTHENTICATION.TEAM_DETAIL')} />
      <Row align="middle">
        <Col flex={1}>
          <PageHeader title={team?.name} />
        </Col>
        <Col>
          <Switch
            key="0"
            loading={teamIsPending || teamUpdateIsPending}
            checkedChildren={t('global:ACTIVE')}
            unCheckedChildren={t('global:INACTIVE')}
            checked={!!team?.status}
            onChange={() => dispatch(Creators.updateTeamRequest({
              team: {
                id,
                active: !team?.status,
              },
            }))}
            className={team?.status ? 'bg-success' : 'bg-danger'}
          />
        </Col>
        <Col>
          <Popconfirm
            className="ml-2"
            onConfirm={() => {
              dispatch(Creators.deleteTeamRequest({
                id,
                onSuccess: () => navigate(ROUTE.INTERNAL_AUTHENTICATION_TEAM_LIST.path),
              }));
            }}
            okText={t('YES')}
            cancelText={t('CANCEL')}
            disabled={teamIsPending || teamUpdateIsPending}
            title={t('COMMON_CONFIRM_TEXT')}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
            >{t('DELETE')}
            </Button>
          </Popconfirm>
        </Col>
      </Row>
      <TeamDetail />
      <Services />
    </>
  );
};

const reduxKey = REDUX_KEY.INTERNAL_AUTHENTICATION.TEAM.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });
export default compose(withReducer, withSaga)(InternalAuthenticationTeamDetailPage);
