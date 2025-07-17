import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Row, Col, Switch, Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { compose } from 'redux';

import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { InternalService } from '@app/pages/InternalAuthentication/types';

import { ServiceDetail, SlackConfigurations } from './components';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { serviceByIdSelector, updateServiceSelector } from './redux/selectors';

const InternalAuthenticationServiceDetailPage = () => {
  const { teamId, serviceId } = useParams();
  const { t } = useTranslation(['internalAuthentication', 'global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.INTERNAL_AUTHENTICATION_SERVICE_DETAIL.name, squad: ROUTE.INTERNAL_AUTHENTICATION_SERVICE_DETAIL.squad });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getServiceByIdRequest({ teamId, serviceId }));
    dispatch(Creators.getSlackConfigurationsRequest({ teamId, serviceId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, teamId, serviceId]);

  const service = useSelector(serviceByIdSelector.getData);
  const isPending = useSelector(serviceByIdSelector.getIsPending);
  const updateIsPending = useSelector(updateServiceSelector.getIsPending);

  const navigate = useNavigate();

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE.INTERNAL_AUTHENTICATION.REPOSITORY_DETAIL')} />
      <Row align="middle">
        <Col flex={1}>
          <PageHeader title={service?.name} />
        </Col>
        <Col>
          <Switch
            key="0"
            loading={isPending || updateIsPending}
            checkedChildren={t('global:ACTIVE')}
            unCheckedChildren={t('global:INACTIVE')}
            checked={!!service?.status}
            onChange={() => dispatch(Creators.updateServiceRequest({
              service: {
                teamId,
                serviceId,
                active: !service?.status,
              },
            }))}
            className={service?.status ? 'bg-success' : 'bg-danger'}
          />
        </Col>
        <Col>
          <Popconfirm
            className="ml-2"
            onConfirm={() => {
              dispatch(Creators.deleteServiceRequest({
                teamId,
                serviceId,
                onSuccess: () => navigate(ROUTE.INTERNAL_AUTHENTICATION_SERVICE_LIST.path),
              }));
            }}
            okText={t('YES')}
            cancelText={t('CANCEL')}
            disabled={isPending || updateIsPending}
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
      <ServiceDetail />
      <SlackConfigurations />
    </>
  );
};

const reduxKey = REDUX_KEY.INTERNAL_AUTHENTICATION.SERVICE.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(InternalAuthenticationServiceDetailPage);
